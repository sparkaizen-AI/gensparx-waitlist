import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWaitlistSchema, type InsertWaitlist } from "@shared/schema";
import { useJoinWaitlist } from "@/hooks/use-waitlist";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, ArrowRight, Loader2 } from "lucide-react";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

export default function Home() {
  const { toast } = useToast();
  const joinWaitlist = useJoinWaitlist();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<InsertWaitlist>({
    resolver: zodResolver(insertWaitlistSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data: InsertWaitlist) => {
    joinWaitlist.mutate(data, {
      onSuccess: () => {
        setIsSuccess(true);
        toast({
          title: "Welcome aboard!",
          description: "You've been added to the priority list.",
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Couldn't join",
          description: error.message,
        });
      },
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans selection:bg-primary/30 selection:text-primary-foreground">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none z-0" />
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <main className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center text-center">
        
        {/* Top Label with Line */}
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
          <span className="block text-white/90">Join the waitlist for</span>
          <span className="block">
            <span className="text-white/90">the </span>
            <span className="text-[#8B9FE8] text-glow font-normal">
               AI That Actually Does the Work
            </span>
          </span>
        </motion.h1>

        {/* Form or Success State */}
        <div className="w-full max-w-[340px] relative min-h-[160px]">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-3"
              >
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary/70 transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    {...form.register("name")}
                    type="text"
                    placeholder="Full Name"
                    className="w-full h-12 pl-12 pr-4 rounded-lg glass-input outline-none text-sm font-light"
                    disabled={joinWaitlist.isPending}
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary/70 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    {...form.register("email")}
                    type="email"
                    placeholder="Email Address"
                    className="w-full h-12 pl-12 pr-4 rounded-lg glass-input outline-none text-sm font-light"
                    disabled={joinWaitlist.isPending}
                  />
                </div>

                <button
                  type="submit"
                  disabled={joinWaitlist.isPending}
                  className="w-full h-12 mt-4 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 text-white text-sm font-medium transition-all duration-300 flex items-center justify-between px-6 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="mx-auto pl-4">
                    {joinWaitlist.isPending ? "Joining..." : "Join the waitlist"}
                  </span>
                  {joinWaitlist.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white/50" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center space-y-4 py-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                  <div className="w-6 h-6 rounded-full bg-primary animate-pulse" />
                </div>
                <h3 className="text-xl font-medium text-white">You're on the list!</h3>
                <p className="text-sm text-white/60 text-center px-6">
                  Get ready. GenSparx is about to flip the script on everything you thought was possible.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-xs text-primary/70 hover:text-primary mt-4 underline decoration-primary/30 underline-offset-4"
                >
                  Add another email
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer - Fixed mobile positioning */}
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
