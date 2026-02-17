import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, ArrowRight, Loader2 } from "lucide-react";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

export default function Home() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setMessage("");
    
    // Basic validation
    if (formData.name.length < 2) {
      setMessage("Name must be at least 2 characters");
      setIsPending(false);
      return;
    }
    
    if (!formData.email.includes("@")) {
      setMessage("Please enter a valid email");
      setIsPending(false);
      return;
    }
    
    try {
      console.log("🚀 Starting submission...");
      console.log("📝 Name:", formData.name);
      console.log("📧 Email:", formData.email);
      
      // Direct Supabase REST API call - EXACT working version
      const response = await fetch('https://ntlmkgbxhnhkzfnfwsnx.supabase.co/rest/v1/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'sb_publishable_-YHYYnOh8l6QQFAgp3Nxqw_yhUN9LVX',
          'Authorization': 'Bearer sb_publishable_-YHYYnOh8l6QQFAgp3Nxqw_yhUN9LVX',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          created_at: new Date().toISOString()
        })
      });

      console.log("📡 Response status:", response.status);
      console.log("✅ Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error response:", errorText);
        throw new Error(`Failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("🎉 Success! Result:", result);

      setIsSuccess(true);
      setMessage("Welcome aboard! You've been added to the GenSparx priority list.");
      setFormData({ name: "", email: "" });
      setIsPending(false);
      
    } catch (error: any) {
      console.error("💥 Submission error:", error);
      setMessage(`Error: ${error.message}`);
      setIsPending(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <main className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center text-center">
        
        {/* Top Label */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 mb-12"
        >
          <div className="w-[60px] h-[1px] bg-white/20" />
          <span className="text-[13px] tracking-[0.2em] text-white/40 uppercase font-medium">
            GenSparx | AI-Powered Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-6xl lg:text-[64px] font-light leading-[1.1] mb-16 tracking-tight"
        >
          <span className="block text-white/90">Join waitlist for</span>
          <span className="block">
            <span className="text-white/90">the </span>
            <span className="text-[#8B9FE8] font-normal">
              AI That Actually Does the Work
            </span>
          </span>
        </motion.h1>

        {/* Form or Success State */}
        <div className="w-full max-w-[340px] relative min-h-[160px]">
          {!isSuccess ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="w-full space-y-3"
            >
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition-colors">
                  <User size={18} />
                </div>
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full h-12 pl-12 pr-4 rounded-lg bg-white/5 border border-white/10 outline-none text-sm font-light focus:border-blue-400/50 transition-all"
                  disabled={isPending}
                />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-12 pl-12 pr-4 rounded-lg bg-white/5 border border-white/10 outline-none text-sm font-light focus:border-blue-400/50 transition-all"
                  disabled={isPending}
                />
              </div>

              {message && (
                <div className={`text-sm text-center px-3 py-2 rounded-lg ${
                  message.includes("Welcome") 
                    ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full h-12 mt-4 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 text-white text-sm font-medium transition-all duration-300 flex items-center justify-between px-6 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="mx-auto pl-4">
                  {isPending ? "Joining..." : "Join the waitlist"}
                </span>
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white/50" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center space-y-4 py-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 animate-pulse" />
              </div>
              <h3 className="text-xl font-medium text-white">You're on the list!</h3>
              <p className="text-sm text-white/60 text-center px-6">
                "Get ready. GenSparx is about to flip the script on everything you thought was possible."
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="text-xs text-blue-400 hover:text-blue-300 mt-4 underline decoration-blue-400/30 underline-offset-4"
              >
                Add another email
              </button>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 z-10 sm:bottom-8">
        <div className="flex items-center justify-center gap-6 px-4">
          <a 
            href="https://x.com/GenSparx" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors duration-300 transform hover:scale-110"
            aria-label="X (Twitter)"
          >
            <FaXTwitter size={20} />
          </a>
          
          <div className="w-[1px] h-4 bg-white/10" />
          
          <a 
            href="https://www.instagram.com/trygensparx/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors duration-300 transform hover:scale-110"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </footer>
    </div>
  );
}
