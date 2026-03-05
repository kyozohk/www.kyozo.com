import { useState } from "react";
import { Users, Heart, MessageCircle, Sparkles } from "lucide-react";

export function Community() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Welcome to Willer Universe! We'll send updates to ${email}`);
      setEmail("");
    }
  };

  return (
    <main className="max-w-[1090px] mx-auto px-6 pt-12 pb-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-[#926b7f] to-[#7a5968] rounded-full p-6">
            <Users className="size-16 text-white" />
          </div>
        </div>
        <h1 className="font-bold text-5xl text-[#4f4949] tracking-[-1px] mb-4">
          Join the Willer Universe Community
        </h1>
        <p className="text-xl text-[#6b6b6b] leading-relaxed max-w-[700px] mx-auto">
          Connect with fellow explorers at the intersection of sound, consciousness, and creative evolution
        </p>
      </div>

      {/* Main CTA */}
      <section className="bg-gradient-to-br from-[#5c7ea0] to-[#446c91] rounded-[20px] p-12 mb-12">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-bold text-4xl text-[#ffdea8] tracking-[-1px] mb-6 text-center">
            Become a Community Member
          </h2>
          <p className="text-lg text-[#f5f1e8] leading-7 mb-8 text-center">
            Get exclusive access to extended content, private reflections, and join conversations with Willer 
            and other community members exploring the space between sound and thought.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="bg-[rgba(255,255,255,0.9)] border-2 border-[#ede9e1] rounded-xl px-6 py-4 font-medium text-lg text-black placeholder:text-black/60 focus:outline-none focus:border-[#ffdea8]"
              required
            />
            <button
              type="submit"
              className="bg-[#ffdea8] border-2 border-[#ffdea8] px-8 py-4 rounded-xl font-bold text-lg text-[#212e39] hover:bg-[#f5d49a] transition-colors"
            >
              Join Willer Universe Community
            </button>
          </form>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="mb-12">
        <h2 className="font-bold text-3xl text-[#4f4949] mb-8 text-center">
          What You'll Get as a Member
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#f5f1e8] rounded-[20px] p-8">
            <div className="bg-[#926b7f] rounded-full size-12 flex items-center justify-center mb-4">
              <Sparkles className="size-6 text-white" />
            </div>
            <h3 className="font-bold text-2xl text-[#4f4949] mb-3">
              Exclusive Content
            </h3>
            <p className="text-base text-[#504c4c] leading-6">
              Access extended articles, unreleased audio experiments, and in-depth explorations not available 
              to the general public. Dive deeper into the creative process.
            </p>
          </div>

          <div className="bg-[#f5f1e8] rounded-[20px] p-8">
            <div className="bg-[#926b7f] rounded-full size-12 flex items-center justify-center mb-4">
              <MessageCircle className="size-6 text-white" />
            </div>
            <h3 className="font-bold text-2xl text-[#4f4949] mb-3">
              Direct Dialogue
            </h3>
            <p className="text-base text-[#504c4c] leading-6">
              Respond to content pieces and receive private responses from Willer. Share your thoughts, 
              questions, and experiences in this intimate creative exchange.
            </p>
          </div>

          <div className="bg-[#f5f1e8] rounded-[20px] p-8">
            <div className="bg-[#926b7f] rounded-full size-12 flex items-center justify-center mb-4">
              <Heart className="size-6 text-white" />
            </div>
            <h3 className="font-bold text-2xl text-[#4f4949] mb-3">
              Early Access
            </h3>
            <p className="text-base text-[#504c4c] leading-6">
              Be the first to experience new releases, sound experiments, and creative projects. Get a 
              front-row seat to the evolution of Willer Universe.
            </p>
          </div>

          <div className="bg-[#f5f1e8] rounded-[20px] p-8">
            <div className="bg-[#926b7f] rounded-full size-12 flex items-center justify-center mb-4">
              <Users className="size-6 text-white" />
            </div>
            <h3 className="font-bold text-2xl text-[#4f4949] mb-3">
              Community Connection
            </h3>
            <p className="text-base text-[#504c4c] leading-6">
              Connect with like-minded explorers who value depth, creativity, and the transformative 
              power of sound. Share insights and grow together.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-[#f5f1e8] rounded-[20px] p-10">
        <h2 className="font-bold text-3xl text-[#4f4949] mb-6 text-center">
          Our Community Philosophy
        </h2>
        <div className="max-w-[700px] mx-auto space-y-4">
          <p className="text-base text-[#504c4c] leading-7">
            Willer Universe isn't just a platform—it's a living space for exploration and dialogue. 
            This community exists for those who seek to understand the deeper dimensions of sound, 
            creativity, and consciousness.
          </p>
          <p className="text-base text-[#504c4c] leading-7">
            Here, we value quality over quantity, depth over breadth, and genuine connection over 
            superficial engagement. Members are encouraged to share authentically, ask meaningful 
            questions, and contribute to collective learning.
          </p>
          <p className="text-base text-[#504c4c] leading-7">
            By joining, you're not just subscribing to content—you're participating in an ongoing 
            conversation about what it means to create, listen, and evolve in the modern age.
          </p>
        </div>
      </section>
    </main>
  );
}
