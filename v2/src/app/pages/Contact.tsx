import { Mail, MessageSquare, Globe, Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      alert(`Thanks for reaching out, ${name}! We'll get back to you at ${email} soon.`);
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <main className="max-w-[900px] mx-auto px-6 pt-12 pb-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-[#926b7f] to-[#7a5968] rounded-full p-6">
            <Mail className="size-16 text-white" />
          </div>
        </div>
        <h1 className="font-bold text-5xl text-[#4f4949] tracking-[-1px] mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-[#6b6b6b] leading-relaxed">
          Have a question, collaboration idea, or just want to connect? I'd love to hear from you.
        </p>
      </div>

      {/* Contact Methods */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#f5f1e8] rounded-[20px] p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#926b7f] rounded-full size-12 flex items-center justify-center">
              <Mail className="size-6 text-white" />
            </div>
          </div>
          <h3 className="font-bold text-lg text-[#4f4949] mb-2">Email</h3>
          <a 
            href="mailto:hello@willeruniverse.com" 
            className="text-base text-[#6e94b1] hover:underline"
          >
            hello@willeruniverse.com
          </a>
        </div>

        <div className="bg-[#f5f1e8] rounded-[20px] p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#926b7f] rounded-full size-12 flex items-center justify-center">
              <MessageSquare className="size-6 text-white" />
            </div>
          </div>
          <h3 className="font-bold text-lg text-[#4f4949] mb-2">Social</h3>
          <a 
            href="https://instagram.com/willeruniverse" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-[#6e94b1] hover:underline"
          >
            @willeruniverse
          </a>
        </div>

        <div className="bg-[#f5f1e8] rounded-[20px] p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#926b7f] rounded-full size-12 flex items-center justify-center">
              <Globe className="size-6 text-white" />
            </div>
          </div>
          <h3 className="font-bold text-lg text-[#4f4949] mb-2">Location</h3>
          <p className="text-base text-[#504c4c]">
            Brooklyn, NY
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-[#f5f1e8] rounded-[20px] p-8">
        <h2 className="font-bold text-3xl text-[#4f4949] mb-6">
          Send a Message
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[#4f4949] mb-2">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-[#e8dfd0] rounded-xl focus:outline-none focus:border-[#926b7f] transition-colors"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#4f4949] mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-[#e8dfd0] rounded-xl focus:outline-none focus:border-[#926b7f] transition-colors"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-[#4f4949] mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 bg-white border-2 border-[#e8dfd0] rounded-xl focus:outline-none focus:border-[#926b7f] transition-colors resize-none"
              placeholder="What would you like to share or ask?"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#926b7f] border-2 border-[#926b7f] px-8 py-4 rounded-xl font-bold text-base text-white hover:bg-[#7a5968] transition-colors flex items-center justify-center gap-2"
          >
            <Send className="size-5" />
            Send Message
          </button>
        </form>
      </section>

      {/* Additional Info */}
      <section className="mt-12 text-center">
        <p className="text-base text-[#6b6b6b] leading-7">
          <strong>For booking inquiries:</strong> Please include details about your event, venue, and preferred dates.
        </p>
        <p className="text-base text-[#6b6b6b] leading-7 mt-2">
          <strong>For collaboration proposals:</strong> Share your vision and how you see our work aligning.
        </p>
        <p className="text-base text-[#6b6b6b] leading-7 mt-2">
          I typically respond within 2-3 business days.
        </p>
      </section>
    </main>
  );
}
