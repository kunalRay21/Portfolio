"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";
import Particles from "@/components/Particles";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "#", color: "#333" },
    { icon: Linkedin, label: "LinkedIn", href: "#", color: "#0077B5" },
    { icon: Twitter, label: "Twitter", href: "#", color: "#1DA1F2" },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:your@email.com",
      color: "#EA4335",
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-black py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden"
    >
      {/* Particles Background */}
      <div className="absolute inset-0 pointer-events-none z-5 opacity-90">
        <Particles
          className=""
          particleCount={20000}
          particleSpread={40}
          speed={0.03}
          particleColors={["#10B981", "#34D399", "#6EE7B7"]}
          alphaParticles={true}
          particleBaseSize={100}
          sizeRandomness={1}
          cameraDistance={10}
          pixelRatio={
            typeof window !== "undefined"
              ? Math.min(window.devicePixelRatio, 2)
              : 1
          }
        />
      </div>

      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] " />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10 h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-3 md:mb-4"
          >
            Get in <span className="text-emerald-500">Touch</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto px-4"
          >
            Have a project in mind or just want to chat? Drop me a message.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Contact Form - 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
            onMouseMove={handleMouseMove}
          >
            <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 border border-zinc-800 overflow-hidden">
              {/* Animated gradient on mouse move */}
              <motion.div
                className="absolute w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
                style={{
                  left: springX,
                  top: springY,
                  x: "-50%",
                  y: "-50%",
                }}
              />

              <form className="space-y-4 md:space-y-6 relative z-10">
                {/* Name Input */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-zinc-300 mb-1.5 md:mb-2">
                    Name
                  </label>
                  <motion.input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-all duration-300"
                    placeholder="Your name"
                    whileFocus={{ scale: 1.01 }}
                    animate={{
                      borderColor:
                        focusedField === "name" ? "#10b981" : "#3f3f46",
                    }}
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-zinc-300 mb-1.5 md:mb-2">
                    Email
                  </label>
                  <motion.input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-all duration-300"
                    placeholder="your@email.com"
                    whileFocus={{ scale: 1.01 }}
                    animate={{
                      borderColor:
                        focusedField === "email" ? "#10b981" : "#3f3f46",
                    }}
                  />
                </motion.div>

                {/* Message Textarea */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-zinc-300 mb-1.5 md:mb-2">
                    Message
                  </label>
                  <motion.textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                    whileFocus={{ scale: 1.01 }}
                    animate={{
                      borderColor:
                        focusedField === "message" ? "#10b981" : "#3f3f46",
                    }}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-emerald-500 text-white text-sm sm:text-base font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors group"
                >
                  <span>Send Message</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.div>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Social Links - 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2 space-y-3 md:space-y-4"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 md:mb-6">
              Connect
            </h3>

            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-zinc-900/50 backdrop-blur-sm rounded-lg md:rounded-xl border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 group"
              >
                <motion.div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors flex-shrink-0"
                  whileHover={{ rotate: 5 }}
                >
                  <link.icon className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-white font-medium truncate">
                    {link.label}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-500">
                    Let's connect
                  </p>
                </div>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
