"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Send,
  Terminal,
  Cpu,
  Wifi,
  Globe,
} from "lucide-react";
import Particles from "@/components/Particles";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      /*
       * PRODUCTION MODE
       * Formspree Endpoint active: mvzqyqyz
       */
      const response = await fetch("https://formspree.io/f/mvzqyqyz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "TRANSMISSION SUCCESSFUL. DATA PACKET RECEIVED.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        // Attempt to read error explanation from server
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "TRANSMISSION FAILED. RETRY SEQUENCE.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitStatus({
        type: "error",
        message: "SYSTEM ERROR. CHECK NETWORK OR FORM ID.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "MAIN_UPLINK",
      value: "kunalray2701@gmail.com",
      href: "mailto:kunalray2701@gmail.com",
      color: "text-emerald-400",
    },
    {
      icon: Github,
      label: "CODE_REPOSITORY",
      value: "github.com/user",
      href: "https://github.com",
      color: "text-white",
    },
    {
      icon: Linkedin,
      label: "PROFESSIONAL_NET",
      value: "linkedin.com/in/user",
      href: "https://linkedin.com",
      color: "text-blue-400",
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-neutral-950 py-24 px-4 sm:px-6 md:px-12 overflow-hidden flex flex-col justify-center"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)] pointer-events-none" />

      {/* Particles */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <Particles
          particleCount={300}
          speed={0.05}
          particleColors={["#10B981", "#34D399", "#ffffff"]}
          particleSpread={10}
          alphaParticles={true}
          className="w-full h-full"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Terminal size={14} />
            </span>
            <h2 className="text-sm font-mono text-emerald-500 tracking-widest uppercase">
              System_Communication_Link
            </h2>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6">
            INITIATE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
              PROTOCOL
            </span>
          </h2>

          <p className="text-neutral-400 font-mono text-sm md:text-base max-w-2xl border-l-2 border-emerald-500/30 pl-6 leading-relaxed">
            SECURE CHANNEL READY. AWAITING INPUT. DEPLOY YOUR REQUIREMENTS FOR
            ANALYSIS AND EXECUTION.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-12"
          >
            {/* Status Panel */}
            <div className="relative p-6 bg-neutral-900/40 border border-white/5 backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-2 h-2 bg-emerald-500" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-500" />
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-emerald-500" />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500" />

              <h3 className="font-mono text-emerald-500 text-sm mb-6 flex items-center gap-2">
                <Cpu size={14} /> SYSTEM_STATUS
              </h3>

              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-neutral-500">UPLINK_STATUS</span>
                  <span className="text-emerald-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    ONLINE
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-neutral-500">RESPONSE_TIME</span>
                  <span className="text-emerald-400">&lt; 24 HOURS</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-neutral-500">LOCATION</span>
                  <span className="text-emerald-400">GLOBAL_REMOTE</span>
                </div>
              </div>
            </div>

            {/* Direct Links */}
            <div className="space-y-6">
              <h3 className="font-mono text-neutral-500 text-xs uppercase tracking-widest pl-2">
                DIRECT_ACCESS_POINTS
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.02] hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all duration-300">
                      <div
                        className={`p-2 bg-white/5 rounded-sm ${item.color}`}
                      >
                        <item.icon size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                          {item.label}
                        </div>
                        <div className="text-neutral-200 font-mono text-sm group-hover:text-emerald-400 transition-colors">
                          {item.value}
                        </div>
                      </div>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500">
                        <Terminal size={14} />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="relative">
              {/* Decorative Corner Lines */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-emerald-500/30" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-emerald-500/30" />

              <div className="space-y-8 bg-neutral-900/30 border border-white/5 p-8 md:p-12 backdrop-blur-sm">
                <h3 className="font-mono text-white text-lg flex items-center gap-3 mb-8">
                  <span className="text-emerald-500">&gt;</span>{" "}
                  COMPOSE_TRANSMISSION
                  <span className="animate-pulse">_</span>
                </h3>

                {/* Name Field */}
                <div className="relative group">
                  <label className="absolute -top-3 left-4 bg-neutral-900 px-2 text-xs font-bold font-mono text-emerald-400 uppercase tracking-widest z-10 transition-colors">
                    OPERATOR_ID
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-black/40 border border-white/10 p-4 pt-5 text-white font-mono text-base font-medium focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all placeholder:text-neutral-600"
                    placeholder="ENTER DESIGNATION..."
                  />
                  {focusedField === "name" && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-emerald-500 animate-pulse" />
                  )}
                </div>

                {/* Email Field */}
                <div className="relative group">
                  <label className="absolute -top-3 left-4 bg-neutral-900 px-2 text-xs font-bold font-mono text-emerald-400 uppercase tracking-widest z-10 transition-colors">
                    COMM_CHANNEL
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-black/40 border border-white/10 p-4 pt-5 text-white font-mono text-base font-medium focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all placeholder:text-neutral-600"
                    placeholder="ENTER_EMAIL_ADDRESS..."
                  />
                  {focusedField === "email" && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-emerald-500 animate-pulse" />
                  )}
                </div>

                {/* Message Field */}
                <div className="relative group">
                  <label className="absolute -top-3 left-4 bg-neutral-900 px-2 text-xs font-bold font-mono text-emerald-400 uppercase tracking-widest z-10 transition-colors">
                    PAYLOAD_DATA
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-black/40 border border-white/10 p-4 pt-5 text-white font-mono text-base font-medium focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all resize-none placeholder:text-neutral-600"
                    placeholder="INPUT_MESSAGE_SEQUENCE..."
                  />
                  {focusedField === "message" && (
                    <div className="absolute right-3 bottom-3 w-1.5 h-4 bg-emerald-500 animate-pulse" />
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative overflow-hidden bg-emerald-500 py-4 px-6 text-black font-extrabold tracking-wider uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-400 transition-all font-mono text-base"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? "TRANSMITTING..." : "EXECUTE_SEND_SEQUENCE"}
                    <Send
                      size={18}
                      strokeWidth={2.5}
                      className={`transition-transform duration-300 ${isSubmitting ? "translate-x-10 opacity-0" : "group-hover:translate-x-1"}`}
                    />
                  </span>
                  {/* Glitch Effect on Hover (Optional Visual) */}
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>

                {/* Status Message */}
                {submitStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className={`p-4 border font-mono text-xs ${
                      submitStatus.type === "success"
                        ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                        : "bg-red-500/10 border-red-500/50 text-red-400"
                    }`}
                  >
                    <span className="font-bold">
                      [{submitStatus.type === "success" ? "SUCCESS" : "ERROR"}]
                    </span>
                    : {submitStatus.message}
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
