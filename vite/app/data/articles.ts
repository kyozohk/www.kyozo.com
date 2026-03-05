export type Article = {
  id: string;
  type: "Read" | "Listen" | "Watch";
  category: string;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  image?: string;
  audioUrl?: string;
  content: string;
};

export const articles: Article[] = [
  {
    id: "modal-jazz-renaissance",
    type: "Read",
    category: "Text",
    readTime: "1 min read",
    date: "Jan 2026",
    title: "Modal Jazz Renaissance: Miles Davis to NYC 2026",
    excerpt: "Ever wonder why Miles Davis's Kind of Blue (1959) still tops jazz charts in 2026? It pioneered modal jazz. Ever wonder why Miles Davis's Kind of Blue (1959) still tops jazz charts in 2026? It pioneered modal jazz…",
    content: `Ever wonder why Miles Davis's Kind of Blue (1959) still tops jazz charts in 2026? It pioneered modal jazz—a style where musicians improvise over scales (modes) rather than complex chord progressions.

This approach gives players more freedom to explore melodies and emotions. Miles didn't just create an album; he unlocked a new way of thinking about jazz that still influences artists today.

In 2026, New York City's jazz scene is experiencing a modal renaissance. Young musicians are rediscovering the spaciousness and freedom that modal jazz provides, creating fresh interpretations that blend the classic sound with contemporary electronic elements.

The beauty of modal jazz lies in its simplicity and depth. By using modes—scales derived from ancient musical traditions—players can create hypnotic, meditative soundscapes that transport listeners to another realm. It's not about technical complexity; it's about emotional truth.

Miles Davis understood this intuitively. On "Kind of Blue," he assembled the perfect ensemble: John Coltrane on tenor saxophone, Cannonball Adderley on alto saxophone, Bill Evans and Wynton Kelly on piano, Paul Chambers on bass, and Jimmy Cobb on drums. Together, they created something timeless.

Today's modal jazz artists are taking inspiration from Miles but adding their own twist. They're incorporating world music influences, electronic production techniques, and even elements of ambient and experimental music. The result is a sound that feels both ancient and futuristic.

What makes modal jazz so relevant in 2026? Perhaps it's the way it encourages mindfulness and presence. In an age of information overload and constant distraction, modal jazz offers a refuge—a space to breathe, reflect, and simply be.`,
  },
  {
    id: "sound-healing-symphony",
    type: "Watch",
    category: "Image",
    readTime: "1 min read",
    date: "Jan 2026",
    title: "Sound Healing Symphony",
    excerpt: "Ancient vibrations from Tibetan bowls and gongs that realign body, mind, and spirit",
    image: "/assets/imgListenVertical.png",
    content: `Sound healing is an ancient practice that uses vibration and frequency to restore balance to the body and mind. At its core, it recognizes that everything in the universe—including our bodies—is in a constant state of vibration.

When we experience stress, trauma, or illness, our natural frequencies can become disrupted. Sound healing works by introducing specific frequencies that help realign and harmonize our energetic systems.

Tibetan singing bowls, one of the most popular sound healing instruments, produce rich, complex tones that create a sense of deep relaxation. When played, these bowls generate waves of sound that wash over the body, helping to release tension and promote healing.

Gongs, another powerful healing instrument, produce a vast spectrum of frequencies simultaneously. The sound of a gong can be overwhelming at first, but as you surrender to its vibrations, you may experience profound shifts in consciousness and perception.

Scientific research is beginning to validate what sound healers have known for centuries. Studies show that sound healing can reduce stress hormones, lower blood pressure, improve sleep quality, and even boost immune function. The vibrations literally help reorganize the cells in our body.

In a typical sound bath session, participants lie down comfortably while a practitioner plays various instruments—bowls, gongs, chimes, and sometimes voice. The experience is deeply meditative, often leading to states of consciousness between waking and sleeping where profound healing can occur.

Many people report experiencing visual imagery, emotional releases, and physical sensations during sound baths. Some describe feeling as if they're floating, or being cradled by waves of sound. These experiences are all part of the healing process, allowing the body to release what no longer serves it.`,
  },
  {
    id: "sound-restores-body-mind",
    type: "Read",
    category: "Text",
    readTime: "1 min read",
    date: "Jan 2026",
    title: "How Sound Restores Body and Mind",
    excerpt: "Sound can support healing by calming the nervous system, which helps lower stress hormones, heart rate, and promotes overall wellbeing through vibrational therapy.",
    content: `The science behind sound healing is fascinating and increasingly supported by research. When we experience sound, it's not just our ears that perceive it—our entire body receives and processes these vibrations.

The human body is approximately 60% water, which is an excellent conductor of sound. When healing frequencies are introduced, they travel through our bodies, affecting us at a cellular level. This is why sound healing can feel so profound and transformative.

One of the primary mechanisms by which sound healing works is through its effect on the nervous system. When we're stressed or anxious, our sympathetic nervous system (fight or flight response) is activated. Sound healing helps activate the parasympathetic nervous system (rest and digest), allowing the body to heal and restore itself.

Research has shown that specific frequencies can influence brainwave states. Slower, deeper sounds can help induce theta and delta brainwave states associated with deep meditation and sleep. Faster frequencies can help with focus and alertness. This is known as "brainwave entrainment."

The vagus nerve, which runs from the brainstem to the abdomen, plays a crucial role in regulating stress and inflammation in the body. Sound healing, particularly low-frequency vibrations, can stimulate the vagus nerve, leading to reduced inflammation and improved emotional regulation.

Beyond the physical benefits, sound healing addresses the emotional and spiritual dimensions of wellbeing. Many people find that sound healing helps them access and release stored emotions, process trauma, and connect with deeper aspects of themselves.

In hospitals and healthcare settings, music and sound therapy are increasingly being used as complementary treatments. Studies show that sound can reduce pain perception, decrease the need for medication, and improve recovery outcomes for surgical patients.`,
  },
  {
    id: "age-of-materialism",
    type: "Read",
    category: "Text",
    readTime: "1 min read",
    date: "Jan 2026",
    title: "The Age of materialism ends here and now",
    excerpt: "The age of materialism was built on a simple equation: more output equals more progress. It rewarded efficiency, productivity, and accumulation above all else.",
    content: `We are living through the twilight of materialism. The belief system that has dominated Western culture for centuries—that material wealth and consumption are the primary sources of happiness and meaning—is beginning to crumble.

The age of materialism was built on a simple equation: more output equals more progress. It rewarded efficiency, productivity, and accumulation. Success was measured by what you owned, what you consumed, and how much you produced.

But something fundamental has shifted. A growing number of people are realizing that this equation is broken. More stuff doesn't equal more happiness. More productivity doesn't equal more meaning. And unlimited growth on a finite planet is, quite simply, impossible.

What's emerging in place of materialism is something harder to name. Some call it post-materialism, others the consciousness revolution. Whatever we call it, it represents a fundamental reorientation of human values away from having and toward being.

This shift is visible everywhere once you start looking. The rise of mindfulness practices, the growing interest in indigenous wisdom traditions, the popularity of minimalism, the increasing importance of mental health and wellbeing—all of these point to a culture that's hungry for something more than material satisfaction.

The end of materialism doesn't mean we all need to become monks and renounce worldly possessions. It means recognizing that material wealth is a tool, not a goal. It means understanding that true wealth consists of things like healthy relationships, creative expression, spiritual connection, and contribution to something larger than ourselves.

Sound and music play a crucial role in this transition. Unlike material goods, which we consume and discard, sound exists purely in the moment. It can't be owned or accumulated. It can only be experienced. In this way, sound points us toward a different mode of being—one based on presence, connection, and shared experience rather than individual acquisition.`,
  },
  {
    id: "living-journal",
    type: "Watch",
    category: "Image",
    readTime: "1 min read",
    date: "Jan 2026",
    title: "A living journal of ideas, process, and creative evolution",
    excerpt: "Exploring the space between sound and thought",
    image: "/assets/imgListenVertical.png",
    content: `This journal is not a static archive. It's a living, breathing document of creative exploration—a space where ideas are planted, nurtured, and allowed to evolve organically.

The space between sound and thought is where magic happens. Before sound becomes music, before thought becomes words, there's a liminal space of pure potential. This journal attempts to capture and explore that space.

Every entry is an experiment, a question posed to the universe: What if we approached creativity not as a means to an end, but as an end in itself? What if the process was the point?

In our culture, we're conditioned to value finished products over the messy, uncertain process of creation. We want the album, not the demo. The published book, not the rough draft. But what if we flipped that around? What if we celebrated the in-between states, the works in progress, the half-formed ideas that contain the seeds of something beautiful?

This is what Willer Universe represents—a commitment to documenting the creative journey in real time, without waiting for everything to be perfect or complete. It's vulnerable work, sharing the process while you're still in the midst of it. But it's also honest and human.

Each piece in this collection—whether text, audio, or visual—is a snapshot of a particular moment in time. A thought captured mid-flight. A sound experiment that might never become a "real" song. A meditation on a theme that's still unfolding.

The beauty of a living journal is that it doesn't pretend to have all the answers. It's comfortable with ambiguity, with contradiction, with not knowing. It trusts that meaning will emerge through the accumulation of moments, through the connections between seemingly unrelated thoughts.

So welcome to this space. Consider it an invitation to slow down, to listen deeply, and to explore the fertile ground between sound and thought.`,
  },
  {
    id: "herbie-hancock-maiden-voyage",
    type: "Read",
    category: "Text",
    readTime: "1 min read",
    date: "Jan 2026",
    title: "Herbie Hancock's Modal Jazz Gem",
    excerpt: "Dive into modal jazz pure magic with Herbie Hancock's 'Maiden Voyage' (1965)—a five-note mode that sails through oceanic soundscapes of improvisation.",
    content: `Released in 1965, Herbie Hancock's "Maiden Voyage" stands as one of the most perfect examples of modal jazz ever recorded. The title track, built around a simple five-note suspended chord, creates a feeling of floating on endless ocean waves.

Hancock was only 25 when he recorded this album, but he had already established himself as one of the most innovative pianists in jazz, thanks to his work with Miles Davis's second great quintet. "Maiden Voyage" was his opportunity to fully explore his own compositional voice.

The genius of the album lies in its simplicity. Rather than cluttering the compositions with complex chord changes, Hancock gave each piece room to breathe. The modes provide a harmonic framework, but within that framework, the musicians have tremendous freedom to explore.

The album's oceanic theme is no accident. Each track is named after some aspect of seafaring: "Maiden Voyage," "The Eye of the Hurricane," "Little One," "Survival of the Fittest," and "Dolphin Dance." The music evokes the vastness, mystery, and power of the sea.

Joining Hancock on the album were some of the greatest musicians of the era: Freddie Hubbard on trumpet, George Coleman on tenor saxophone, Ron Carter on bass, and Tony Williams on drums. Together, they created something that still sounds fresh and vital nearly 60 years later.

What makes "Maiden Voyage" particularly special is its ability to be both accessible and sophisticated. On first listen, it's beautiful and easy to enjoy. But the more you listen, the more you hear—subtle interactions between the musicians, clever harmonic choices, rhythmic complexities that reveal themselves slowly.

The album's influence extends far beyond jazz. Hip-hop producers have sampled it extensively, and musicians in genres from funk to electronic music have drawn inspiration from its spacious, modal approach. It's a testament to the timelessness of great art.`,
  },
];
