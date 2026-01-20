# Debugging Guide: "willer" Handle Not Loading Posts

## Issue Summary
Flutter developer reports that no posts are loading when querying with the "willer" handle using:
```dart
collection("blogs").where("communityHandle", isEqualTo: "willer")
```

---

## Root Cause Analysis

Based on the codebase analysis, here are the **most likely issues** and their fixes:

### 1. ⚠️ **CRITICAL: Firestore Security Rules Issue**

**Problem:** The current Firestore rules have a **merge conflict** that needs resolution.

**File:** [`firestore.rules:93-106`](firestore.rules#L93-L106)

```javascript
match /communityMembers/{memberId} {
  allow read: if request.auth != null;
  allow create, update: if request.auth != null;
  allow delete: if request.auth != null && 
                   (resource.data.userId == request.auth.uid || 
                    isCommunityOwner(resource.data.communityId));
}
```

**Fix Required:**
```javascript
match /communityMembers/{memberId} {
  allow read: if request.auth != null;
  allow create: if true;  // Allow anyone to create (for RSVP/signup)
  allow update: if request.auth != null;
  allow delete: if request.auth != null && 
                   (resource.data.userId == request.auth.uid || 
                    isCommunityOwner(resource.data.communityId));
}
```

**Action:** Deploy the corrected rules to Firebase:
```bash
firebase deploy --only firestore:rules
```

---

### 2. ✅ **Security Rules for Blogs Collection**

**Current Rules:** [`firestore.rules:44-68`](firestore.rules#L44-L68)

The blogs collection allows:
- ✅ `allow list: if true;` - Anyone can query/list posts
- ✅ Public posts can be read by anyone
- ✅ Private posts can only be read by the author

**This is CORRECT** - Security rules should NOT be blocking the query.

---

### 3. 🔍 **Query Structure Analysis**

**Web Implementation:** [`src/app/previews/willer/page.tsx:30-36`](src/app/previews/willer/page.tsx#L30-L36)

```typescript
const postsRef = collection(db, 'blogs');
const publicQuery = query(
  postsRef,
  where('communityHandle', '==', handle),
  where('visibility', '==', 'public'),
  orderBy('createdAt', 'desc')
);
```

**Flutter Implementation Should Match:**
```dart
final postsRef = FirebaseFirestore.instance.collection('blogs');
final query = postsRef
    .where('communityHandle', isEqualTo: 'willer')
    .where('visibility', isEqualTo: 'public')
    .orderBy('createdAt', descending: true);
```

---

## Debugging Checklist for Flutter Developer

### Step 1: Verify Firestore Data Exists

**Check in Firebase Console:**
1. Go to Firestore Database
2. Navigate to `blogs` collection
3. Search for documents where `communityHandle == "willer"`
4. Verify:
   - ✅ Documents exist with `communityHandle: "willer"`
   - ✅ Field name is exactly `communityHandle` (case-sensitive)
   - ✅ Value is exactly `"willer"` (case-sensitive, no extra spaces)
   - ✅ `visibility` field is set to `"public"`
   - ✅ `createdAt` field exists (required for orderBy)

**Expected Document Structure:**
```json
{
  "id": "post123",
  "postId": "post123",
  "title": "Sample Post",
  "type": "text",
  "content": {
    "text": "Post content...",
    "mediaUrls": []
  },
  "authorId": "user123",
  "communityHandle": "willer",
  "communityId": "community123",
  "visibility": "public",
  "createdAt": Timestamp,
  "likes": 0,
  "comments": 0
}
```

---

### Step 2: Add Debug Logging to Flutter App

**Add this to your Flutter feed loading code:**

```dart
Future<void> loadWillerPosts() async {
  print('🔍 DEBUG: Starting to load posts for willer handle');
  
  try {
    // Step 1: Test basic collection access
    final blogsRef = FirebaseFirestore.instance.collection('blogs');
    print('✅ Collection reference created: ${blogsRef.path}');
    
    // Step 2: Test query without filters
    final allDocs = await blogsRef.limit(5).get();
    print('📊 Total documents in blogs collection (first 5): ${allDocs.docs.length}');
    
    if (allDocs.docs.isNotEmpty) {
      final firstDoc = allDocs.docs.first.data();
      print('📄 Sample document structure:');
      print('   - Fields: ${firstDoc.keys.toList()}');
      print('   - communityHandle: ${firstDoc['communityHandle']}');
      print('   - visibility: ${firstDoc['visibility']}');
    }
    
    // Step 3: Test query with communityHandle filter only
    final handleQuery = blogsRef
        .where('communityHandle', isEqualTo: 'willer')
        .get();
    
    final handleResults = await handleQuery;
    print('🔎 Documents with communityHandle="willer": ${handleResults.docs.length}');
    
    if (handleResults.docs.isNotEmpty) {
      for (var doc in handleResults.docs) {
        final data = doc.data();
        print('   - Post: ${data['title']} (visibility: ${data['visibility']})');
      }
    }
    
    // Step 4: Test full query with all filters
    final fullQuery = blogsRef
        .where('communityHandle', isEqualTo: 'willer')
        .where('visibility', isEqualTo: 'public')
        .orderBy('createdAt', descending: true)
        .get();
    
    final fullResults = await fullQuery;
    print('✅ Final query results: ${fullResults.docs.length} posts');
    
    if (fullResults.docs.isEmpty) {
      print('⚠️ No posts found with full query. Possible issues:');
      print('   1. No posts have visibility="public"');
      print('   2. Posts missing createdAt field');
      print('   3. Wrong communityHandle value in Firestore');
    }
    
  } catch (e, stackTrace) {
    print('❌ ERROR loading posts: $e');
    print('Stack trace: $stackTrace');
    
    if (e.toString().contains('permission')) {
      print('🔒 PERMISSION ERROR: Check Firestore security rules');
    } else if (e.toString().contains('index')) {
      print('📇 INDEX ERROR: Create composite index in Firebase Console');
    }
  }
}
```

---

### Step 3: Check Firebase Project Configuration

**Verify Flutter app is connected to correct Firebase project:**

```dart
// In your main.dart or Firebase initialization
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  
  // Add this debug line
  print('🔥 Firebase Project ID: ${Firebase.app().options.projectId}');
  print('🔥 Firebase App Name: ${Firebase.app().name}');
  
  runApp(MyApp());
}
```

**Compare with web app:**
- Web project ID is in: `.env.local` or `firebase.json`
- Flutter project ID is in: `android/app/google-services.json` or `ios/Runner/GoogleService-Info.plist`

---

### Step 4: Check for Composite Index Requirement

If you see an error like: `"The query requires an index"`

**Create Composite Index:**
1. Go to Firebase Console → Firestore → Indexes
2. Create index with:
   - Collection: `blogs`
   - Fields:
     - `communityHandle` (Ascending)
     - `visibility` (Ascending)
     - `createdAt` (Descending)

**Or use the link from the error message** - Firebase provides a direct link to create the required index.

---

## Common Issues & Solutions

### Issue 1: Case Sensitivity
```dart
// ❌ WRONG
.where('communityHandle', isEqualTo: 'Willer')  // Capital W
.where('communityHandle', isEqualTo: 'WILLER')  // All caps

// ✅ CORRECT
.where('communityHandle', isEqualTo: 'willer')  // Lowercase
```

### Issue 2: Extra Whitespace
```dart
// ❌ WRONG
.where('communityHandle', isEqualTo: ' willer')   // Leading space
.where('communityHandle', isEqualTo: 'willer ')   // Trailing space

// ✅ CORRECT
.where('communityHandle', isEqualTo: 'willer')
```

### Issue 3: Field Name Typo
```dart
// ❌ WRONG
.where('community_handle', isEqualTo: 'willer')  // Underscore
.where('communityhandle', isEqualTo: 'willer')   // No camelCase

// ✅ CORRECT
.where('communityHandle', isEqualTo: 'willer')   // Exact camelCase
```

### Issue 4: Missing createdAt Field
If posts don't have `createdAt` field, the `orderBy` will fail silently.

**Fix:** Remove orderBy temporarily to test:
```dart
// Test without orderBy first
final query = blogsRef
    .where('communityHandle', isEqualTo: 'willer')
    .where('visibility', isEqualTo: 'public');
    // .orderBy('createdAt', descending: true);  // Comment out
```

### Issue 5: Wrong Firebase Project
Flutter app might be connected to a different Firebase project than the web app.

**Verify:**
- Web: Check `NEXT_PUBLIC_FIREBASE_PROJECT_ID` in `.env.local`
- Flutter: Check `project_id` in `google-services.json` (Android) or `GoogleService-Info.plist` (iOS)

---

## Quick Test Query

**Run this simplified query first:**

```dart
// Minimal query - no filters
final testQuery = await FirebaseFirestore.instance
    .collection('blogs')
    .limit(10)
    .get();

print('Total docs in blogs: ${testQuery.docs.length}');

// Check if any have willer handle
final willerDocs = testQuery.docs.where((doc) => 
    doc.data()['communityHandle'] == 'willer'
).toList();

print('Docs with willer handle: ${willerDocs.length}');
```

---

## Expected Console Output (Success)

```
🔍 DEBUG: Starting to load posts for willer handle
✅ Collection reference created: blogs
📊 Total documents in blogs collection (first 5): 5
📄 Sample document structure:
   - Fields: [id, postId, title, type, content, authorId, communityHandle, communityId, visibility, createdAt, likes, comments]
   - communityHandle: willer
   - visibility: public
🔎 Documents with communityHandle="willer": 3
   - Post: Welcome to Willer (visibility: public)
   - Post: Getting Started (visibility: public)
   - Post: Community Guidelines (visibility: private)
✅ Final query results: 2 posts
```

---

## Expected Console Output (Failure - No Data)

```
🔍 DEBUG: Starting to load posts for willer handle
✅ Collection reference created: blogs
📊 Total documents in blogs collection (first 5): 5
📄 Sample document structure:
   - Fields: [id, postId, title, type, content, authorId, communityHandle, communityId, visibility, createdAt, likes, comments]
   - communityHandle: kyozo
   - visibility: public
🔎 Documents with communityHandle="willer": 0
⚠️ No posts found with full query. Possible issues:
   1. No posts have visibility="public"
   2. Posts missing createdAt field
   3. Wrong communityHandle value in Firestore
```

**This means:** No posts exist in Firestore with `communityHandle: "willer"`. You need to create test posts.

---

## Creating Test Posts in Firestore

**Option 1: Use Firebase Console**
1. Go to Firestore Database
2. Click "Start collection" or select `blogs` collection
3. Add document with this structure:

```json
{
  "postId": "test-post-1",
  "title": "Test Post for Willer",
  "type": "text",
  "content": {
    "text": "This is a test post for the willer community."
  },
  "authorId": "test-user-123",
  "communityHandle": "willer",
  "communityId": "willer-community-id",
  "visibility": "public",
  "createdAt": [Click "Add field" → Type: timestamp → Click "Set to current time"],
  "likes": 0,
  "comments": 0
}
```

**Option 2: Use Web App**
1. Navigate to: `http://localhost:9003/willer/feed` (or your dev URL)
2. Sign in as admin/owner
3. Create a new post using the UI
4. Verify it appears in Firestore with `communityHandle: "willer"`

---

## Verification Steps

After implementing fixes, verify:

1. ✅ Firestore rules deployed without merge conflicts
2. ✅ At least one post exists with `communityHandle: "willer"`
3. ✅ Post has `visibility: "public"`
4. ✅ Post has `createdAt` timestamp field
5. ✅ Flutter app connected to same Firebase project as web app
6. ✅ Debug logs show documents being found
7. ✅ Posts display in Flutter app UI

---

## Code References

| Component | File Path | Description |
|-----------|-----------|-------------|
| **Web Feed Query** | [`src/app/previews/willer/page.tsx:30-36`](src/app/previews/willer/page.tsx#L30-L36) | Reference implementation |
| **Public Feed Query** | [`src/app/(www)/[handle]/page.tsx:47-60`](src/app/(www)/[handle]/page.tsx#L47-L60) | Public feed with auth |
| **Admin Feed Query** | [`src/app/(app)/[handle]/feed/page.tsx:64-66`](src/app/(app)/[handle]/feed/page.tsx#L64-L66) | Admin feed query |
| **Security Rules** | [`firestore.rules:44-68`](firestore.rules#L44-L68) | Blogs collection rules |
| **Post Type Definition** | [`src/lib/types.ts:52-71`](src/lib/types.ts#L52-L71) | Post data model |

---

## Summary

**Most Likely Issue:** No posts exist in Firestore with `communityHandle: "willer"` and `visibility: "public"`.

**Immediate Actions:**
1. ✅ Fix merge conflict in `firestore.rules` and deploy
2. 🔍 Run debug logging in Flutter app to confirm
3. 📝 Create test posts in Firestore with correct structure
4. ✅ Verify Firebase project IDs match between web and Flutter

**Share with Next.js Developer:**
- Console output from debug logging
- Screenshot of Firestore data for "willer" handle
- Confirmation of Firebase project ID match
