"use client";

import CosmicBackground from "./CosmicBackground";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Neural Interface",
      description: "Real-time data visualization platform",
      status: "In Progress",
    },
    {
      title: "Quantum Router",
      description: "Advanced routing algorithms",
      status: "Completed",
    },
    {
      title: "Temporal Engine",
      description: "Time-series analytics dashboard",
      status: "In Progress",
    },
  ];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#2a4a3a]">
      <CosmicBackground />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
        <div className="max-w-4xl w-full">
          <h2 className="text-5xl font-semibold tracking-[0.2em] text-white mb-16 text-center">
            FEATURED PROJECTS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative p-8 border border-white/10 rounded-lg hover:border-[#00ff41]/50 transition-all duration-300 hover:bg-white/5 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#00ff41]/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-6">
                    {project.description}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-mono rounded-full ${
                      project.status === "Completed"
                        ? "bg-[#00ff41]/20 text-[#00ff41]"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="px-8 py-3 border border-[#00ff41] text-[#00ff41] font-mono text-sm hover:bg-[#00ff41]/10 transition-all duration-300">
              VIEW ALL PROJECTS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
