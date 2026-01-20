# Flutter Feed Implementation Guide - Willer Community

## Overview

This guide provides complete instructions for implementing the Willer community feed in Flutter. The feed loads posts from Firestore using the community handle "willer".

---

## Current Web Implementation

**Route:** `src/app/(www)/[handle]/page.tsx`  
**URL:** `http://localhost:9008/willer`  
**Server Port:** 9008

The `(www)` is a Next.js route group (ignored in URL). The `[handle]` captures "willer" as a dynamic parameter.

---

## Firestore Query

### For Guest Users (Not Authenticated)

```dart
Stream<QuerySnapshot> getWillerFeed() {
  return FirebaseFirestore.instance
      .collection('blogs')
      .where('communityHandle', isEqualTo: 'willer')
      .where('visibility', isEqualTo: 'public')
      .orderBy('createdAt', descending: true)
      .snapshots();
}
```

**Code Reference:** [`src/app/(www)/[handle]/page.tsx:55-60`](src/app/(www)/[handle]/page.tsx#L55-L60)

### For Authenticated Users

```dart
Stream<QuerySnapshot> getWillerFeedAuthenticated() {
  return FirebaseFirestore.instance
      .collection('blogs')
      .where('communityHandle', isEqualTo: 'willer')
      .where('visibility', whereIn: ['public', 'private'])
      .orderBy('createdAt', descending: true)
      .snapshots();
}
```

**Code Reference:** [`src/app/(www)/[handle]/page.tsx:47-53`](src/app/(www)/[handle]/page.tsx#L47-L53)

---

## Data Models

### Post Model

```dart
enum PostType { text, image, audio, video, poll }
enum PostVisibility { public, private, membersOnly }

class Post {
  final String id;
  final String postId;
  final String? title;
  final PostType type;
  final PostContent content;
  final String authorId;
  final String communityHandle;
  final String? communityId;
  final int likes;
  final int comments;
  final DateTime? createdAt;
  final PostVisibility visibility;

  Post({
    required this.id,
    required this.postId,
    this.title,
    required this.type,
    required this.content,
    required this.authorId,
    required this.communityHandle,
    this.communityId,
    required this.likes,
    required this.comments,
    this.createdAt,
    required this.visibility,
  });

  factory Post.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return Post(
      id: doc.id,
      postId: data['postId'] ?? doc.id,
      title: data['title'],
      type: _parsePostType(data['type']),
      content: PostContent.fromMap(data['content'] ?? {}),
      authorId: data['authorId'] ?? '',
      communityHandle: data['communityHandle'] ?? '',
      communityId: data['communityId'],
      likes: data['likes'] ?? 0,
      comments: data['comments'] ?? 0,
      createdAt: (data['createdAt'] as Timestamp?)?.toDate(),
      visibility: _parseVisibility(data['visibility']),
    );
  }

  static PostType _parsePostType(String? type) {
    switch (type) {
      case 'text': return PostType.text;
      case 'image': return PostType.image;
      case 'audio': return PostType.audio;
      case 'video': return PostType.video;
      case 'poll': return PostType.poll;
      default: return PostType.text;
    }
  }

  static PostVisibility _parseVisibility(String? visibility) {
    switch (visibility) {
      case 'public': return PostVisibility.public;
      case 'private': return PostVisibility.private;
      case 'members-only': return PostVisibility.membersOnly;
      default: return PostVisibility.public;
    }
  }
}

class PostContent {
  final String? text;
  final List<String>? mediaUrls;
  final String? thumbnailUrl;
  final String? fileType;

  PostContent({
    this.text,
    this.mediaUrls,
    this.thumbnailUrl,
    this.fileType,
  });

  factory PostContent.fromMap(Map<String, dynamic> map) {
    return PostContent(
      text: map['text'],
      mediaUrls: (map['mediaUrls'] as List?)?.cast<String>(),
      thumbnailUrl: map['thumbnailUrl'],
      fileType: map['fileType'],
    );
  }
}
```

**Type Reference:** [`src/lib/types.ts:52-71`](src/lib/types.ts#L52-L71)

---

## Complete Flutter Implementation

### Feed Page Widget

```dart
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class WillerFeedPage extends StatefulWidget {
  const WillerFeedPage({Key? key}) : super(key: key);

  @override
  State<WillerFeedPage> createState() => _WillerFeedPageState();
}

class _WillerFeedPageState extends State<WillerFeedPage> {
  final String handle = 'willer';
  String filter = 'all'; // all, read, listen, watch

  Stream<List<Post>> _getPostsStream() {
    final user = FirebaseAuth.instance.currentUser;
    Query query = FirebaseFirestore.instance.collection('blogs');

    // Apply handle filter
    query = query.where('communityHandle', isEqualTo: handle);

    // Apply visibility filter based on authentication
    if (user != null) {
      query = query.where('visibility', whereIn: ['public', 'private']);
    } else {
      query = query.where('visibility', isEqualTo: 'public');
    }

    // Order by creation date
    query = query.orderBy('createdAt', descending: true);

    return query.snapshots().map((snapshot) {
      return snapshot.docs.map((doc) => Post.fromFirestore(doc)).toList();
    });
  }

  List<Post> _filterPosts(List<Post> posts) {
    switch (filter) {
      case 'read':
        return posts.where((p) => 
          p.type == PostType.text || p.type == PostType.image
        ).toList();
      case 'listen':
        return posts.where((p) => p.type == PostType.audio).toList();
      case 'watch':
        return posts.where((p) => p.type == PostType.video).toList();
      default:
        return posts;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFD9D9D9).withOpacity(0.7),
      body: Column(
        children: [
          // Header with filters
          _buildHeader(),
          
          // Feed content
          Expanded(
            child: StreamBuilder<List<Post>>(
              stream: _getPostsStream(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                }

                if (snapshot.hasError) {
                  return Center(
                    child: Text('Error: ${snapshot.error}'),
                  );
                }

                final posts = _filterPosts(snapshot.data ?? []);

                if (posts.isEmpty) {
                  return const Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'No posts yet',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        SizedBox(height: 8),
                        Text(
                          'Be the first to create content!',
                          style: TextStyle(color: Colors.grey),
                        ),
                      ],
                    ),
                  );
                }

                return _buildMasonryGrid(posts);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.15),
        border: Border(
          bottom: BorderSide(
            color: Colors.black.withOpacity(0.08),
          ),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          _buildFilterButton('All', 'all', Colors.grey[700]!),
          const SizedBox(width: 8),
          _buildFilterButton('Read', 'read', const Color(0xFF926B7F)),
          const SizedBox(width: 8),
          _buildFilterButton('Listen', 'listen', const Color(0xFF6E94B1)),
          const SizedBox(width: 8),
          _buildFilterButton('Watch', 'watch', const Color(0xFFF0C679)),
        ],
      ),
    );
  }

  Widget _buildFilterButton(String label, String value, Color activeColor) {
    final isActive = filter == value;
    return GestureDetector(
      onTap: () => setState(() => filter = value),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 6),
        decoration: BoxDecoration(
          color: isActive 
              ? activeColor 
              : Colors.white.withOpacity(0.6),
          borderRadius: BorderRadius.circular(20),
          boxShadow: isActive
              ? [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 4)]
              : [],
        ),
        child: Text(
          label,
          style: TextStyle(
            color: isActive ? Colors.white : Colors.grey[700],
            fontWeight: FontWeight.w500,
            fontSize: 14,
          ),
        ),
      ),
    );
  }

  Widget _buildMasonryGrid(List<Post> posts) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          // First audio post (if exists) - full width
          if (posts.any((p) => p.type == PostType.audio))
            Padding(
              padding: const EdgeInsets.only(bottom: 32),
              child: _buildPostCard(
                posts.firstWhere((p) => p.type == PostType.audio),
                isHorizontal: true,
              ),
            ),
          
          // Masonry grid for other posts
          MasonryGridView.count(
            crossAxisCount: 2,
            mainAxisSpacing: 24,
            crossAxisSpacing: 24,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: posts.where((p) => 
              p.type != PostType.audio || 
              p != posts.firstWhere((p) => p.type == PostType.audio, orElse: () => posts.first)
            ).length,
            itemBuilder: (context, index) {
              final filteredPosts = posts.where((p) => 
                p.type != PostType.audio || 
                p != posts.firstWhere((p) => p.type == PostType.audio, orElse: () => posts.first)
              ).toList();
              return _buildPostCard(filteredPosts[index]);
            },
          ),
        ],
      ),
    );
  }

  Widget _buildPostCard(Post post, {bool isHorizontal = false}) {
    switch (post.type) {
      case PostType.audio:
        return AudioPostCard(post: post, isHorizontal: isHorizontal);
      case PostType.video:
        return VideoPostCard(post: post);
      case PostType.image:
        return ImagePostCard(post: post);
      case PostType.text:
      default:
        return TextPostCard(post: post);
    }
  }
}
```

---

## Brand Guidelines

**Design System Reference:** [`src/styles/themes/theme-variables.css`](src/styles/themes/theme-variables.css)

### Color Palette

```dart
class KyozoColors {
  // Primary Brand Colors
  static const primaryPurple = Color(0xFF843484);
  static const lightPurple = Color(0xFFC170CF);
  
  // Content Type Colors (for badges and filters)
  static const readMauve = Color(0xFF926B7F);
  static const listenBlue = Color(0xFF6E94B1);
  static const watchYellow = Color(0xFFF0C679);
  
  // Section Colors (for admin features)
  static const overviewColor = Color(0xFFC170CF);
  static const membersColor = Color(0xFFCF7770);
  static const broadcastColor = Color(0xFFE1B327);
  static const inboxColor = Color(0xFF06C4B5);
  static const feedColor = Color(0xFF699FE5);
  static const ticketingColor = Color(0xFF8EBE9B);
  static const integrationsColor = Color(0xFF8EA1BE);
  static const analyticsColor = Color(0xFF675263);
  
  // Backgrounds
  static const background = Color(0xFFFFFFFF);
  static const cardBackground = Color(0xFFEEEEEE);
  static const overlayGray = Color(0xFFD9D9D9);
  static const appBackground = Color(0xFFEDEDED);
  
  // Text Colors
  static const textPrimary = Color(0xFF333333);
  static const textSecondary = Color(0xFF666666);
  static const textTertiary = Color(0xFF999999);
  static const headingColor = Color(0xFF222222);
  
  // Gradients
  static const gradientStart = Color(0xFF7C3AED);
  static const gradientEnd = Color(0xFF10B981);
  
  // UI Element Colors
  static const inputBorderColor = Color(0xFFC170CF);
  static const buttonBorderColor = Color(0xFF843484);
  
  // Dark Mode (optional)
  static const darkBackground = Color(0xFF121212);
  static const darkTextPrimary = Color(0xFFE0E0E0);
  static const darkCardBackground = Color(0xFF1E1E1E);
}
```

**CSS Reference:** [`src/styles/themes/theme-variables.css:22-92`](src/styles/themes/theme-variables.css#L22-L92)

---

### Typography

```dart
class KyozoTextStyles {
  // Font Families
  static const String fontFamilyDisplay = 'Canicule Display'; // Custom display font
  static const String fontFamilyBody = 'Inter';
  static const String fontFamilyDMSans = 'DM Sans';
  
  // Card Styles
  static const cardTitle = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.w500,
    fontFamily: fontFamilyBody,
    color: KyozoColors.textPrimary,
    height: 1.2,
  );
  
  static const cardBody = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w400,
    fontFamily: fontFamilyBody,
    color: KyozoColors.textSecondary,
    height: 1.5,
  );
  
  static const badge = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.w500,
    fontFamily: fontFamilyBody,
    color: Colors.white,
  );
  
  // Input & Form Styles
  static const inputText = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w400,
    fontFamily: fontFamilyBody,
    color: KyozoColors.textPrimary,
  );
  
  static const inputLabel = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w400,
    fontFamily: fontFamilyBody,
    color: KyozoColors.textSecondary,
  );
  
  static const inputLabelFocused = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.w400,
    fontFamily: fontFamilyBody,
    color: KyozoColors.inputBorderColor,
  );
  
  // Button Styles
  static const buttonText = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w400,
    fontFamily: fontFamilyBody,
    color: KyozoColors.primaryPurple,
  );
  
  static const buttonTextBold = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w500,
    fontFamily: fontFamilyBody,
  );
  
  // Heading Styles
  static const heading1 = TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.w700,
    fontFamily: fontFamilyDMSans,
    color: KyozoColors.headingColor,
  );
  
  static const heading2 = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.w600,
    fontFamily: fontFamilyDMSans,
    color: KyozoColors.headingColor,
  );
}
```

**Font Files:**
- Display Font: `public/fonts/canicule-display-trial.woff2`
- Body Font: Inter (Google Fonts)
- Alternative: DM Sans (Google Fonts)

**CSS Reference:** [`src/styles/themes/theme-variables.css:3-21`](src/styles/themes/theme-variables.css#L3-L21)

---

### Input Fields

```dart
class KyozoInputField extends StatelessWidget {
  final String? label;
  final String? placeholder;
  final String? error;
  final TextEditingController? controller;
  final bool obscureText;
  final Widget? icon;
  final TextInputType? keyboardType;
  
  const KyozoInputField({
    this.label,
    this.placeholder,
    this.error,
    this.controller,
    this.obscureText = false,
    this.icon,
    this.keyboardType,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          height: 44, // 10% taller than standard
          decoration: BoxDecoration(
            border: Border.all(
              color: error != null 
                  ? Colors.red 
                  : KyozoColors.inputBorderColor,
              width: 1,
            ),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Stack(
            children: [
              // Input field
              Positioned.fill(
                child: TextField(
                  controller: controller,
                  obscureText: obscureText,
                  keyboardType: keyboardType,
                  style: KyozoTextStyles.inputText,
                  decoration: InputDecoration(
                    hintText: placeholder,
                    hintStyle: KyozoTextStyles.inputText.copyWith(
                      color: KyozoColors.inputBorderColor.withOpacity(0.7),
                    ),
                    border: InputBorder.none,
                    contentPadding: EdgeInsets.symmetric(
                      horizontal: icon != null ? 40 : 12,
                      vertical: 12,
                    ),
                  ),
                ),
              ),
              
              // Icon (if provided)
              if (icon != null)
                Positioned(
                  left: 12,
                  top: 0,
                  bottom: 0,
                  child: Center(
                    child: IconTheme(
                      data: IconThemeData(
                        color: KyozoColors.inputBorderColor,
                        size: 20,
                      ),
                      child: icon!,
                    ),
                  ),
                ),
              
              // Floating label
              if (label != null)
                Positioned(
                  left: icon != null ? 40 : 12,
                  top: 12,
                  child: Text(
                    label!,
                    style: KyozoTextStyles.inputLabel,
                  ),
                ),
            ],
          ),
        ),
        
        // Error message
        if (error != null)
          Padding(
            padding: const EdgeInsets.only(top: 4, left: 12),
            child: Text(
              error!,
              style: const TextStyle(
                fontSize: 12,
                color: Colors.red,
              ),
            ),
          ),
      ],
    );
  }
}
```

**Specifications:**
- Height: 44px (10% taller than standard)
- Border: 1px solid `#C170CF` (Light Purple)
- Border Radius: 8px
- Padding: 12px horizontal, 12px vertical
- Font Size: 16px
- Text Color: `#333333`
- Placeholder Color: `#C170CF` with 70% opacity
- Focus Border Color: `#C170CF`
- Background: Transparent

**CSS Reference:** [`src/styles/components.css:145-221`](src/styles/components.css#L145-L221)

---

### Buttons

#### Primary Button (Default)

```dart
class KyozoPrimaryButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final bool isLoading;
  
  const KyozoPrimaryButton({
    required this.text,
    this.onPressed,
    this.isLoading = false,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 48,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(9999), // Fully rounded
        border: Border.all(
          color: KyozoColors.buttonBorderColor,
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Stack(
        children: [
          // Background image
          Positioned.fill(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(9999),
              child: Image.asset(
                'assets/bg/light_app_bg.png',
                fit: BoxFit.cover,
              ),
            ),
          ),
          
          // Purple overlay
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                color: KyozoColors.primaryPurple.withOpacity(0.2),
                borderRadius: BorderRadius.circular(9999),
              ),
            ),
          ),
          
          // Button content
          Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: isLoading ? null : onPressed,
              borderRadius: BorderRadius.circular(9999),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 12),
                child: Center(
                  child: isLoading
                      ? const SizedBox(
                          width: 20,
                          height: 20,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            valueColor: AlwaysStoppedAnimation<Color>(
                              KyozoColors.primaryPurple,
                            ),
                          ),
                        )
                      : Text(
                          text,
                          style: KyozoTextStyles.buttonText,
                        ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
```

**Specifications:**
- Height: 48px
- Border Radius: Fully rounded (9999px)
- Border: 1px solid `#843484` (Primary Purple)
- Background: `light_app_bg.png` with 20% purple overlay
- Text Color: `#843484`
- Font Weight: 400
- Padding: 12px vertical, 32px horizontal
- Shadow: 0 2px 4px rgba(0,0,0,0.1)
- Hover: Translate Y -1px, shadow 0 4px 6px rgba(0,0,0,0.15)

#### Rounded Rectangle Button

```dart
class KyozoRoundedRectButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  
  const KyozoRoundedRectButton({
    required this.text,
    this.onPressed,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 40,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: KyozoColors.buttonBorderColor,
          width: 1,
        ),
      ),
      child: Stack(
        children: [
          Positioned.fill(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: Image.asset(
                'assets/bg/light_app_bg.png',
                fit: BoxFit.cover,
              ),
            ),
          ),
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                color: KyozoColors.primaryPurple.withOpacity(0.2),
                borderRadius: BorderRadius.circular(8),
              ),
            ),
          ),
          Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: onPressed,
              borderRadius: BorderRadius.circular(8),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 10),
                child: Center(
                  child: Text(
                    text,
                    style: KyozoTextStyles.buttonTextBold.copyWith(
                      color: KyozoColors.primaryPurple,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
```

**Specifications:**
- Border Radius: 8px
- Font Weight: 500
- Padding: 10px vertical, 24px horizontal

#### Solid Purple Button

```dart
class KyozoSolidButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  
  const KyozoSolidButton({
    required this.text,
    this.onPressed,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: KyozoColors.primaryPurple,
        foregroundColor: Colors.white,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 10),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        elevation: 2,
      ),
      child: Text(
        text,
        style: KyozoTextStyles.buttonTextBold.copyWith(
          color: Colors.white,
        ),
      ),
    );
  }
}
```

**Specifications:**
- Background: `#843484` solid
- Text Color: White
- Border Radius: 8px
- No border

**CSS Reference:** [`src/styles/components.css:7-124`](src/styles/components.css#L7-L124)

---

### Checkboxes

```dart
class KyozoCheckbox extends StatelessWidget {
  final bool value;
  final ValueChanged<bool?>? onChanged;
  final String? label;
  
  const KyozoCheckbox({
    required this.value,
    this.onChanged,
    this.label,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          width: 20,
          height: 20,
          child: Checkbox(
            value: value,
            onChanged: onChanged,
            activeColor: KyozoColors.primaryPurple,
            checkColor: Colors.white,
            side: BorderSide(
              color: KyozoColors.inputBorderColor,
              width: 1,
            ),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(4),
            ),
          ),
        ),
        if (label != null) ...[
          const SizedBox(width: 8),
          Text(
            label!,
            style: const TextStyle(
              fontSize: 13,
              color: KyozoColors.textSecondary,
            ),
          ),
        ],
      ],
    );
  }
}
```

**Specifications:**
- Size: 20x20px
- Border: 1px solid `#C170CF`
- Border Radius: 4px
- Checked Background: `#843484`
- Check Color: White

**CSS Reference:** [`src/styles/components.css:245-295`](src/styles/components.css#L245-L295)

---

### Design Assets & Backgrounds

**Asset Paths:**

```dart
class KyozoAssets {
  // Background Images
  static const String lightAppBg = 'assets/bg/light_app_bg.png';
  static const String publicFeedBg = 'assets/bg/public-feed-bg.jpg';
  static const String feedBg = 'assets/bg/feed_bg.png';
  static const String audioBg = 'assets/bg/audio_bg.png';
  static const String videoBg = 'assets/bg/video_bg.png';
  static const String textBg = 'assets/bg/text_bg.png';
  
  // Card Backgrounds
  static const String blueCardBg = 'assets/bg/blue_card_bg.png';
  static const String pinkCardBg = 'assets/bg/pink_card_bg.png';
  static const String yellowCardBg = 'assets/bg/yellow_card_bg.png';
  
  // Logos
  static const String logo = 'assets/logo.png';
  static const String logoOrig = 'assets/logo-orig.png';
  static const String favicon = 'assets/favicon.png';
  
  // Fonts
  static const String caniculeDisplayFont = 'assets/fonts/canicule-display-trial.woff2';
  
  // Placeholders
  static const String imagePlaceholder = 'assets/bg/image_placeholder.png';
}
```

**Available Assets in `public/` folder:**
- `bg/light_app_bg.png` - Main app background texture
- `bg/public-feed-bg.jpg` - Public feed page background
- `bg/feed_bg.png` - Feed background
- `bg/audio_bg.png` - Audio card background
- `bg/video_bg.png` - Video card background
- `bg/text_bg.png` - Text card background
- `bg/blue_card_bg.png` - Blue card variant
- `bg/pink_card_bg.png` - Pink card variant
- `bg/yellow_card_bg.png` - Yellow card variant
- `fonts/canicule-display-trial.woff2` - Custom display font
- `logo.png` - Main logo
- `favicon.png` - App icon

**Usage Example:**
```dart
// Background with overlay
Container(
  decoration: BoxDecoration(
    image: DecorationImage(
      image: AssetImage(KyozoAssets.publicFeedBg),
      fit: BoxFit.cover,
    ),
  ),
  child: Container(
    color: KyozoColors.overlayGray.withOpacity(0.7),
    child: YourContent(),
  ),
)
```

---

## Card Components

### Text/Read Post Card

```dart
class TextPostCard extends StatelessWidget {
  final Post post;
  
  const TextPostCard({required this.post, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final readTime = '${(post.content.text?.length ?? 0) ~/ 1000} min read';
    final date = post.createdAt?.toString().substring(0, 10) ?? '';
    
    return Container(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color(0xFFFAF5FF), // purple-50
            Color(0xFFFCE7F3), // pink-50
          ],
        ),
        borderRadius: BorderRadius.circular(8),
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Badge
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
            decoration: BoxDecoration(
              color: KyozoColors.lightPurple,
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Text(
              'Read',
              style: TextStyle(
                color: Colors.white,
                fontSize: 12,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          const SizedBox(height: 16),
          
          // Title
          Text(
            post.title ?? 'Untitled',
            style: KyozoTextStyles.cardTitle,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 8),
          
          // Summary
          if (post.content.text != null)
            Text(
              post.content.text!,
              style: KyozoTextStyles.cardBody,
              maxLines: 3,
              overflow: TextOverflow.ellipsis,
            ),
          const SizedBox(height: 12),
          
          // Metadata
          Row(
            children: [
              Text(
                readTime,
                style: const TextStyle(
                  fontSize: 12,
                  color: Colors.grey,
                ),
              ),
              const SizedBox(width: 8),
              Text(
                date,
                style: const TextStyle(
                  fontSize: 12,
                  color: Colors.grey,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
```

**Code Reference:** [`src/components/community/feed/text-post-card.tsx`](src/components/community/feed/text-post-card.tsx)

### Audio Post Card

```dart
class AudioPostCard extends StatelessWidget {
  final Post post;
  final bool isHorizontal;
  
  const AudioPostCard({
    required this.post,
    this.isHorizontal = false,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: Colors.grey[300]!),
        borderRadius: BorderRadius.circular(8),
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Badge
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
            decoration: BoxDecoration(
              color: KyozoColors.listenBlue,
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Text(
              'Listen',
              style: TextStyle(
                color: Colors.white,
                fontSize: 12,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          const SizedBox(height: 16),
          
          // Title
          Text(
            post.title ?? 'Untitled Audio',
            style: KyozoTextStyles.cardTitle,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 16),
          
          // Waveform visualization (simplified)
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: List.generate(60, (index) {
              final height = 20.0 + (index % 5) * 12.0;
              return Container(
                width: 2,
                height: height,
                decoration: BoxDecoration(
                  color: const Color(0xFFDBEAFE),
                  borderRadius: BorderRadius.circular(1),
                ),
              );
            }),
          ),
          const SizedBox(height: 16),
          
          // Play button
          Row(
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: KyozoColors.listenBlue,
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.play_arrow,
                  color: Colors.white,
                ),
              ),
              const SizedBox(width: 12),
              const Text(
                '0:00',
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.grey,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
```

**Code Reference:** [`src/components/community/feed/audio-post-card.tsx`](src/components/community/feed/audio-post-card.tsx)

### Video Post Card

```dart
class VideoPostCard extends StatelessWidget {
  final Post post;
  
  const VideoPostCard({required this.post, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final imageUrl = post.content.mediaUrls?.isNotEmpty == true
        ? post.content.mediaUrls!.first
        : 'https://picsum.photos/seed/video/800/600';
    
    return Container(
      height: 256,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        image: DecorationImage(
          image: NetworkImage(imageUrl),
          fit: BoxFit.cover,
        ),
      ),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(8),
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Colors.transparent,
              Colors.black.withOpacity(0.8),
            ],
          ),
        ),
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Badge
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              decoration: BoxDecoration(
                color: KyozoColors.watchYellow,
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Text(
                'Watch',
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
            const Spacer(),
            
            // Play button
            Center(
              child: Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  color: KyozoColors.watchYellow,
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.play_arrow,
                  color: Colors.black,
                  size: 32,
                ),
              ),
            ),
            const Spacer(),
            
            // Title
            Text(
              post.title ?? 'Untitled Video',
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }
}
```

**Code Reference:** [`src/components/community/feed/video-post-card.tsx`](src/components/community/feed/video-post-card.tsx)

---

## Required Flutter Packages

Add these to your `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # Firebase
  firebase_core: ^2.24.2
  cloud_firestore: ^4.13.6
  firebase_auth: ^4.15.3
  
  # UI Components
  flutter_staggered_grid_view: ^0.7.0
  cached_network_image: ^3.3.0
  
  # Media Players
  just_audio: ^0.9.36
  video_player: ^2.8.1
```

---

## Creating Test Posts

### Current Status

The Flutter query is correct but returns **0 documents** because no posts exist in Firestore with:
- `communityHandle: "willer"`
- `visibility: "public"`

### Solution: Add Posts via Firebase Console

1. **Go to Firebase Console** → Firestore Database
2. **Navigate to `blogs` collection**
3. **Click "Add document"**
4. **Add these exact fields:**

```json
{
  "postId": "willer-test-1",
  "title": "Welcome to Willer",
  "type": "text",
  "content": {
    "text": "This is the first post in the Willer community!",
    "mediaUrls": []
  },
  "authorId": "YOUR_USER_ID",
  "communityHandle": "willer",
  "communityId": "WILLER_COMMUNITY_ID",
  "visibility": "public",
  "createdAt": [Timestamp - Set to current time],
  "likes": 0,
  "comments": 0
}
```

**Critical Requirements:**
- ✅ `communityHandle` must be exactly `"willer"` (lowercase)
- ✅ `visibility` must be `"public"`
- ✅ `createdAt` must be a Firestore Timestamp
- ✅ `type` must be one of: `"text"`, `"image"`, `"audio"`, `"video"`

---

## Verification

### 1. Check Firestore Data

**Firebase Console → Firestore:**
- ✅ `blogs` collection has documents with `communityHandle: "willer"`
- ✅ Posts have `visibility: "public"`
- ✅ Posts have `createdAt` timestamp

### 2. Test Web App

```
http://localhost:9008/willer
```

Should show the posts you created.

### 3. Test Flutter App

Run your Flutter app and check console output. You should see:
```
🔎 Documents with communityHandle="willer": 1+
✅ Posts loaded successfully
```

---

## Firestore Security Rules

Ensure your `firestore.rules` allows reading posts:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /blogs/{blogId} {
      // Allow anyone to list/query posts
      allow list: if true;
      
      // Allow reading public posts or own private posts
      allow get: if resource.data.visibility == 'public' || 
                    (request.auth != null && request.auth.uid == resource.data.authorId);
    }
  }
}
```

Deploy rules:
```bash
firebase deploy --only firestore:rules
```

---

## Summary

### Query Structure
```dart
FirebaseFirestore.instance
  .collection('blogs')
  .where('communityHandle', isEqualTo: 'willer')
  .where('visibility', isEqualTo: 'public')
  .orderBy('createdAt', descending: true)
```

### Current Status
- ✅ Query is correct
- ✅ Firestore connection works
- ❌ No posts exist with `communityHandle: "willer"`

### Next Steps
1. Create test posts in Firestore
2. Verify posts have correct fields
3. Run Flutter app
4. Posts should load successfully

### Code References
- **Main Feed:** [`src/app/(www)/[handle]/page.tsx`](src/app/(www)/[handle]/page.tsx)
- **Type Definitions:** [`src/lib/types.ts`](src/lib/types.ts)
- **Card Components:** [`src/components/community/feed/`](src/components/community/feed/)
