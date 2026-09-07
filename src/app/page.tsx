"use client";
import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// SHARED COMPONENTS
// ==========================================

const ReturnToOS = ({ onClick }: { onClick: () => void }) => (
  <button 
    onClick={onClick} 
    className="fixed top-4 left-4 md:top-6 md:left-6 z-50 flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-full text-slate-300 hover:text-white hover:border-sky-500 hover:shadow-[0_0_15px_-3px_rgba(56,189,248,0.4)] transition-all shadow-lg text-xs md:text-sm font-medium group"
  >
    <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> 
    Return to OS
  </button>
);

// ==========================================
// 1. INITIAL BOOT SEQUENCE
// ==========================================

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    const sequence = [
      "Initializing VinishOS...",
      "Loading Cloud Modules...",
      "Loading Projects...",
      "Loading Certifications...",
      "System Ready."
    ];
    
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < sequence.length) {
        setLines(prev => [...prev, sequence[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 400); // Brief pause before transition
      }
    }, 250); // Fast 250ms per line = ~1.25s total

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-[100dvh] w-full bg-[#05080f] flex flex-col items-start justify-center p-8 md:p-24 font-mono text-sky-400"
    >
      <div className="max-w-2xl w-full mx-auto md:mx-0">
        {lines.map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-2 text-sm md:text-base font-medium"
          >
            {line}
          </motion.div>
        ))}
        <span className="inline-block w-2.5 h-4 bg-sky-400 mt-2 animate-[blink_1s_step-end_infinite]"></span>
      </div>
    </motion.div>
  );
};

// ==========================================
// 2. OS GATEWAY SCREEN
// ==========================================

const OSGateway = ({ setMode }: { setMode: (mode: 'recruiter' | 'dev-booting') => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="min-h-[100dvh] w-full bg-[#030712] relative overflow-x-hidden overflow-y-auto flex flex-col items-center justify-center p-4 py-12 md:p-8"
    >
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[600px] bg-sky-500/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center my-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-400 tracking-tight mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            VINISHRAGHAV OS
          </h1>
          <p className="text-sky-400 font-mono text-xs md:text-base mb-6 font-semibold tracking-wide uppercase flex flex-col md:flex-row items-center justify-center gap-1 md:gap-0">
            <span>Software Engineer</span> <span className="hidden md:inline text-slate-600 mx-2">|</span> 
            <span>Full Stack Developer</span> <span className="hidden md:inline text-slate-600 mx-2">|</span> 
            <span>Cloud Engineer</span>
          </p>
          
          {/* Live System Dashboard */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs md:text-sm font-mono text-slate-400 bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 backdrop-blur-sm mx-auto max-w-fit">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div> Projects: 4+</div>
            <div className="hidden sm:block text-slate-700">/</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div> Certifications: 7+</div>
            <div className="hidden sm:block text-slate-700">/</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div> Problems Solved: 1000+</div>
            <div className="hidden lg:block text-slate-700">/</div>
            <div className="flex items-center gap-2 text-sky-300 w-full lg:w-auto justify-center mt-2 lg:mt-0">Focus: Cloud Engineering</div>
          </div>
          
          <p className="text-slate-500 mt-8 text-sm md:text-base font-medium">
            "Choose how you want to explore my system."
          </p>
        </motion.div>

        {/* Mode Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl px-0 sm:px-4">
          
          {/* Recruiter Mode Card */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => setMode('recruiter')}
            className="group relative flex flex-col p-6 md:p-8 bg-slate-900/40 backdrop-blur-xl border border-slate-700 hover:border-sky-500 rounded-2xl text-left transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(56,189,248,0.3)] overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <div className="text-4xl md:text-5xl mb-4">🌐</div>
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Recruiter Mode</h3>
            <p className="text-sky-400 text-sm font-medium mb-4">Designed for recruiters & hiring managers.</p>
            <ul className="space-y-2 text-slate-400 text-sm mb-6 flex-1">
              <li className="flex items-center gap-2"><span className="text-slate-600">→</span> Modern premium portfolio</li>
              <li className="flex items-center gap-2"><span className="text-slate-600">→</span> Fast, card-based navigation</li>
              <li className="flex items-center gap-2"><span className="text-slate-600">→</span> Professional presentation</li>
              <li className="flex items-center gap-2"><span className="text-slate-600">→</span> Instant resume downloads</li>
            </ul>
            <div className="mt-auto inline-flex items-center text-sm font-bold text-white group-hover:text-sky-400 transition-colors">
              Initialize Mode <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </motion.button>

          {/* Developer Mode Card */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => setMode('dev-booting')}
            className="group relative flex flex-col p-6 md:p-8 bg-slate-900/40 backdrop-blur-xl border border-slate-700 hover:border-emerald-500 rounded-2xl text-left transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <div className="text-4xl md:text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Developer Mode</h3>
            <p className="text-emerald-400 text-sm font-medium mb-4">Interactive terminal experience.</p>
            <ul className="space-y-2 text-slate-400 text-sm mb-6 flex-1 font-mono">
              <li className="flex items-center gap-2"><span className="text-slate-600">$</span> Existing CLI portfolio</li>
              <li className="flex items-center gap-2"><span className="text-slate-600">$</span> Terminal commands</li>
              <li className="flex items-center gap-2"><span className="text-slate-600">$</span> Hacker-style interface</li>
              <li className="flex items-center gap-2"><span className="text-slate-600">$</span> Hidden easter eggs</li>
            </ul>
            <div className="mt-auto inline-flex items-center text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
              Execute Command <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </motion.button>

        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// 3. RECRUITER MODE (Premium Web UI)
// ==========================================

const RecruiterMode = ({ onExit }: { onExit: () => void }) => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[100dvh] w-full bg-[#0a0a0a] text-slate-200 selection:bg-sky-500/30 font-sans overflow-x-hidden"
    >
      <ReturnToOS onClick={onExit} />
      
      {/* Background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-gradient-to-b from-sky-500/10 to-transparent blur-3xl pointer-events-none -z-10"></div>

      {/* RESUME HUB MODAL */}
      <AnimatePresence>
        {isResumeModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsResumeModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-3xl bg-slate-900/90 border border-slate-700/50 rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden"
            >
              <button onClick={() => setIsResumeModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Choose a Resume</h3>
              <p className="text-slate-400 text-sm mb-8 font-medium">Select the role most relevant to your hiring requirements.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Software Engineer */}
                <a href="/resumes/software-engineer-resume.pdf" download className="group flex flex-col p-5 bg-slate-800/40 border border-slate-700 hover:border-sky-500/50 rounded-xl transition-all hover:bg-slate-800/80 hover:shadow-[0_0_20px_-5px_rgba(56,189,248,0.2)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-slate-700/50 text-white rounded-lg group-hover:bg-sky-500/20 group-hover:text-sky-400 transition-colors">💻</div>
                    <h4 className="font-bold text-white group-hover:text-sky-400 transition-colors text-sm tracking-tight">Software Engineer Resume</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-1">Backend development, problem solving, algorithms, software engineering fundamentals.</p>
                  <div className="text-xs font-bold text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">Download &rarr;</div>
                </a>

                {/* Full Stack */}
                <a href="/resumes/fullstack-developer-resume.pdf" download className="group flex flex-col p-5 bg-slate-800/40 border border-slate-700 hover:border-purple-500/50 rounded-xl transition-all hover:bg-slate-800/80 hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.2)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-slate-700/50 text-white rounded-lg group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">🌐</div>
                    <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors text-sm tracking-tight">Full Stack Developer Resume</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-1">Frontend, backend, APIs, databases, full-stack web development.</p>
                  <div className="text-xs font-bold text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">Download &rarr;</div>
                </a>

                {/* Cloud Engineer */}
                <a href="/resumes/cloud-engineer-resume.pdf" download className="group flex flex-col p-5 bg-slate-800/40 border border-slate-700 hover:border-emerald-500/50 rounded-xl transition-all hover:bg-slate-800/80 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-slate-700/50 text-white rounded-lg group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">☁️</div>
                    <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors text-sm tracking-tight">Cloud Engineer Resume</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-1">AWS, Linux, Cloud Computing, DevOps, Infrastructure and Deployment.</p>
                  <div className="text-xs font-bold text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">Download &rarr;</div>
                </a>

                {/* Download All */}
                <a href="/resumes/vinish-all-resumes.zip" download className="group flex flex-col p-5 bg-slate-800/40 border border-slate-700 hover:border-amber-500/50 rounded-xl transition-all hover:bg-slate-800/80 hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.2)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-slate-700/50 text-white rounded-lg group-hover:bg-amber-500/20 group-hover:text-amber-400 transition-colors">📦</div>
                    <h4 className="font-bold text-white group-hover:text-amber-400 transition-colors text-sm tracking-tight">Download All Resumes</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-1">ZIP file containing all three specialized role resumes.</p>
                  <div className="text-xs font-bold text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">Download ZIP &rarr;</div>
                </a>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        
        {/* HERO SECTION */}
        <section className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-24 md:mb-32">
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs sm:text-sm font-medium text-sky-400 mb-6 mx-auto md:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                Open to Internships & Entry-Level Opportunities
              </div>
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white mb-6">
              VINISHRAGHAV <br className="hidden md:block" /> K E
            </motion.h1>
            
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg md:text-2xl text-slate-400 font-medium mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
              {portfolioData.profile.title}
            </motion.h2>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-4">
              <button onClick={() => setIsResumeModalOpen(true)} className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-slate-200 transition-colors shadow-lg shadow-white/10 text-center">
                Download Resume
              </button>
              <a href="#projects" className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 border border-slate-700 transition-colors text-center">
                View Projects
              </a>
              <a href="#contact" className="px-6 py-3 bg-transparent text-slate-300 font-semibold rounded-lg hover:text-white border border-transparent hover:border-slate-700 transition-colors text-center">
                Contact Me
              </a>
            </motion.div>
          </div>
          
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shrink-0 order-1 md:order-2">
            <img src={portfolioData.profile.avatarUrl} alt="Vinishraghav K E" className="w-full h-full object-cover" />
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section className="mb-16 md:mb-24">
          <h3 className="text-2xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
            <span className="w-8 h-[1px] bg-sky-500"></span> About Me
          </h3>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-colors">
            <p className="text-slate-300 leading-relaxed text-base md:text-lg whitespace-pre-wrap">
              {portfolioData.profile.bio}
            </p>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section className="mb-16 md:mb-24">
          <h3 className="text-2xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
            <span className="w-8 h-[1px] bg-sky-500"></span> Technical Arsenal
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(portfolioData.skills).map(([category, skills]) => (
              <div key={category} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-sky-500/30 transition-colors">
                <h4 className="text-sky-400 font-semibold mb-4 uppercase text-xs tracking-wider">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-slate-800/80 text-slate-300 rounded-md text-sm border border-slate-700/50">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-16 md:mb-24 pt-4">
          <h3 className="text-2xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
            <span className="w-8 h-[1px] bg-sky-500"></span> Featured Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.projects.map((project, idx) => (
              <div key={idx} className="group bg-slate-900/50 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-6 md:p-8 transition-all hover:shadow-xl hover:shadow-sky-900/20 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">{project.title}</h4>
                  <a href={project.github} target="_blank" rel="noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors shrink-0 ml-4">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
                <p className="text-slate-400 text-sm md:text-base mb-6 flex-1 leading-relaxed">{project.desc}</p>
                <div className="pt-4 border-t border-slate-800">
                  <span className="text-xs font-mono text-slate-500 block mb-2">TECH STACK</span>
                  <div className="text-sm text-slate-300 font-medium">{project.stack}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="mb-16 md:mb-24">
          <h3 className="text-2xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
            <span className="w-8 h-[1px] bg-sky-500"></span> Certifications
          </h3>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8">
            <ul className="space-y-4">
              {portfolioData.certifications.map((cert, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm md:text-base">
                  <span className="text-green-400 mt-0.5">✔</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="mb-12 pt-4">
          <h3 className="text-2xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
            <span className="w-8 h-[1px] bg-sky-500"></span> Let's Connect
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href={`mailto:${portfolioData.contact.email}`} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-slate-800 hover:border-sky-500/50 transition-colors text-center">
              <span className="text-sky-400 text-2xl">✉</span>
              <span className="text-sm text-slate-300 font-medium">Email</span>
            </a>
            <a href={`https://wa.me/${portfolioData.contact.mobile.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-slate-800 hover:border-sky-500/50 transition-colors text-center">
              <span className="text-green-400 text-2xl">📱</span>
              <span className="text-sm text-slate-300 font-medium">WhatsApp</span>
            </a>
            <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-slate-800 hover:border-sky-500/50 transition-colors text-center">
              <span className="text-white text-2xl">⌨</span>
              <span className="text-sm text-slate-300 font-medium">GitHub</span>
            </a>
            <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-slate-800 hover:border-sky-500/50 transition-colors text-center">
              <span className="text-blue-500 text-2xl">💼</span>
              <span className="text-sm text-slate-300 font-medium">LinkedIn</span>
            </a>
          </div>
        </section>

      </main>
    </motion.div>
  );
};

// ==========================================
// 4. DEV BOOT SEQUENCE
// ==========================================

const DevBootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    const sequence = [
      "$ sudo start vinish-os",
      "Loading developer environment...",
      "Loading projects...",
      "Loading certifications...",
      "System ready."
    ];
    
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < sequence.length) {
        setLines(prev => [...prev, sequence[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 400); 
      }
    }, 250);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[100dvh] w-full bg-[#070a13] flex flex-col items-start justify-center p-8 md:p-24 font-mono text-emerald-400"
    >
      <div className="max-w-2xl w-full mx-auto md:mx-0">
        {lines.map((line, i) => (
          <div key={i} className={`mb-2 text-sm md:text-base ${i === 0 ? 'text-slate-300 mb-6' : ''}`}>
            {line}
          </div>
        ))}
        <span className="inline-block w-2.5 h-4 bg-emerald-400 mt-2 animate-[blink_1s_step-end_infinite]"></span>
      </div>
    </motion.div>
  );
};

// ==========================================
// 5. DEVELOPER MODE (Existing Terminal)
// ==========================================

const EASTER_EGGS = [
  "Error: Command not found. Did you try turning your brain off and on again?",
  "Access Denied. Nice try, Mr. Hacker. Vinish's firewall is too strong for your basic scripts.",
  "rm -rf / initiated... Just kidding. Don't play with fire, bro.",
  "Error 404: Motivation to reply not found. Stick to the actual slash commands like /projects.",
  "I'm just a terminal portfolio script, not ChatGPT. Type /about to learn about Vinish!"
];

const TypewriterCommandTerminal = ({ command, onComplete, skipAnimation }: any) => {
  const [text, setText] = useState('');
  const [done, setDone] = useState(skipAnimation);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);
  
  useEffect(() => {
    if (skipAnimation) return;
    let i = 0;
    setDone(false);
    setText('');
    const interval = setInterval(() => {
      if (i <= command.length) {
        setText(command.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    }, 35); 
    return () => clearInterval(interval);
  }, [command, skipAnimation]);

  if (skipAnimation) return <>{command}</>;
  return (
    <>
      {text}
      {!done && <span className="inline-block w-2 md:w-2.5 h-3 md:h-4 bg-sky-400 ml-1 animate-[blink_1s_step-end_infinite] align-middle"></span>}
    </>
  );
};

const TerminalText = ({ text, isActive, onComplete, className, speed = 8, showCursor = true, as = 'span', suffix = null, skipAnimation = false }: any) => {
  const [currentText, setCurrentText] = useState('');
  const [done, setDone] = useState(skipAnimation);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    if (skipAnimation || !isActive) return;
    let i = 0;
    setDone(false);
    setCurrentText('');
    const interval = setInterval(() => {
      if (i <= text.length) {
        setCurrentText(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [isActive, text, speed, skipAnimation]);

  if (skipAnimation) {
    const Tag = as;
    return <Tag className={className}>{text}{suffix}</Tag>;
  }
  if (!isActive && !done) return null;

  const Tag = as;
  return (
    <Tag className={className}>
      {done ? text : currentText}
      {isActive && !done && showCursor && <span className="inline-block w-2 md:w-2.5 h-3 md:h-4 bg-sky-400 ml-1 animate-[blink_1s_step-end_infinite] align-middle"></span>}
      {done && suffix}
    </Tag>
  );
};

const HistoryBlock = ({ entry, isLatest, onBlockComplete }: any) => {
  const [step, setStep] = useState(isLatest ? 0 : 999);
  
  useEffect(() => { if (!isLatest) setStep(999); }, [isLatest]);
  const advance = () => { if (isLatest) setStep(s => s + 1); };

  const getTabMaxSteps = (tab: string) => {
    switch (tab) {
      case 'home': return 3;
      case 'about': return 1;
      case 'skills': return Object.keys(portfolioData.skills).length * 2;
      case 'projects': return portfolioData.projects.length * 3;
      case 'certifications': return portfolioData.certifications.length;
      case 'resumes': return portfolioData.resumes.length;
      case 'contact': return 4;
      default: return 1;
    }
  };

  const skip = !isLatest;

  useEffect(() => {
    if (isLatest) {
      if (entry.type === 'error' && step > 0) onBlockComplete();
      else if (entry.type === 'tab' && step > getTabMaxSteps(entry.tabId)) onBlockComplete();
    }
  }, [step, isLatest, entry, onBlockComplete]);

  return (
    <div className="mb-6 md:mb-8 text-sm md:text-base">
      <div className="text-slate-500 mb-4 md:mb-6 select-none flex flex-wrap break-all">
        <span className="text-green-400 mr-1">vinish@portfolio:</span><span className="text-blue-400 mr-2">~</span>$ 
        <TypewriterCommandTerminal command={` ${entry.command}`} onComplete={() => setStep(1)} skipAnimation={skip} />
      </div>

      {entry.type === 'error' && (step >= 1 || skip) && (
        <div className="pl-2 md:pl-4">
          <TerminalText as="p" className="text-red-400 font-mono" text={entry.reply} skipAnimation={skip} isActive={step === 1} onComplete={advance} speed={10} />
        </div>
      )}

      {entry.type === 'tab' && (step >= 1 || skip) && (
        <div className="pb-2">
          {entry.tabId === 'home' && (
            <div className="pl-0 sm:pl-2 md:pl-4 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start text-center md:text-left">
              <div className="flex-1 order-2 md:order-1 flex flex-col items-center md:items-start">
                {(step >= 1 || skip) && <TerminalText as="h1" className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2" text={portfolioData.profile.name} isActive={step === 1} onComplete={advance} speed={15} skipAnimation={skip} />}
                {(step >= 2 || skip) && <TerminalText as="p" className="text-base md:text-lg text-sky-400 mb-4 font-semibold" text={portfolioData.profile.title} isActive={step === 2} onComplete={advance} speed={8} skipAnimation={skip} />}
                {(step >= 3 || skip) && <TerminalText as="p" className="text-sm md:text-base text-slate-400 max-w-3xl leading-relaxed mb-6 md:mb-8 whitespace-pre-wrap text-left" text={portfolioData.profile.bio} isActive={step === 3} onComplete={advance} speed={3} skipAnimation={skip} />}
                {(step >= 4 || skip) && (
                  <motion.div initial={skip ? { opacity: 1 } : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="flex flex-col sm:flex-row gap-3 md:gap-4 select-none mt-2 md:mt-4 w-full sm:w-auto">
                    <button onClick={() => window.dispatchEvent(new CustomEvent('terminalCommand', { detail: '/contact' }))} className="group flex items-center justify-center px-5 py-3 md:py-2.5 bg-slate-800/60 hover:bg-slate-700/80 hover:border-sky-500/50 hover:shadow-[0_0_15px_-3px_rgba(56,189,248,0.3)] text-sm font-medium border border-slate-700 rounded transition-all w-full sm:w-auto">
                      <span className="text-sky-400 group-hover:translate-x-1 transition-transform mr-2 duration-300">&gt;</span> Contact Me
                    </button>
                    <button onClick={() => window.dispatchEvent(new CustomEvent('terminalCommand', { detail: '/projects' }))} className="group flex items-center justify-center px-5 py-3 md:py-2.5 bg-slate-800/60 hover:bg-slate-700/80 hover:border-sky-500/50 hover:shadow-[0_0_15px_-3px_rgba(56,189,248,0.3)] text-sm font-medium border border-slate-700 rounded transition-all w-full sm:w-auto">
                      <span className="text-sky-400 group-hover:translate-x-1 transition-transform mr-2 duration-300">&gt;</span> View Projects
                    </button>
                  </motion.div>
                )}
              </div>
              {(step >= 1 || skip) && (
                <motion.div initial={skip ? { opacity: 1 } : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="w-full md:w-auto flex flex-col items-center select-none pt-2 shrink-0 order-1 md:order-2 mb-2 md:mb-0">
                  <div className="w-24 h-32 md:w-32 md:h-40 rounded-md border border-slate-700 bg-slate-900 shadow-lg relative group overflow-hidden">
                    <img src={portfolioData.profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {entry.tabId === 'about' && (
            <div className="pl-2 md:pl-4 overflow-x-auto hide-scrollbar">
              {(step >= 1 || skip) && (
                <TerminalText as="pre" className="whitespace-pre-wrap font-mono text-xs md:text-sm leading-relaxed text-emerald-400 break-words" text={JSON.stringify(portfolioData.profile.metadata, null, 2)} speed={2} isActive={step === 1} onComplete={advance} skipAnimation={skip} />
              )}
            </div>
          )}

          {entry.tabId === 'skills' && (
            <div className="pl-2 md:pl-4 space-y-4 md:space-y-5">
              {Object.entries(portfolioData.skills).map(([category, items], idx) => {
                const catStep = (idx * 2) + 1;
                const itemsStep = (idx * 2) + 2;
                return (
                  <div key={category}>
                     {(step >= catStep || skip) && <TerminalText as="div" className="text-yellow-400 font-bold mb-1" text={`./${category}:`} speed={8} isActive={step === catStep} onComplete={advance} skipAnimation={skip} />}
                     {(step >= itemsStep || skip) && <TerminalText as="div" className="text-slate-300 pl-2 md:pl-4 leading-relaxed" text={items.join(' · ')} speed={3} isActive={step === itemsStep} onComplete={advance} skipAnimation={skip} />}
                  </div>
                );
              })}
            </div>
          )}

          {entry.tabId === 'projects' && (
            <div className="pl-2 md:pl-4 space-y-8 md:space-y-6">
              {portfolioData.projects.map((project, idx) => {
                 const baseStep = 1 + (idx * 3);
                 return (
                   <div key={idx} className="border-l-2 border-slate-800 pl-3 md:pl-4 hover:border-sky-500/50 transition-colors flex flex-col">
                      {(step >= baseStep || skip) && <TerminalText as="h3" className="text-white font-bold text-base md:text-lg" text={`📁 ${project.title}`} isActive={step === baseStep} onComplete={advance} speed={8} skipAnimation={skip} />}
                      {(step >= baseStep + 1 || skip) && (
                        <div className="flex flex-wrap gap-2 mt-1 md:mt-1">
                           <span className="text-slate-500">Stack:</span>
                           <TerminalText as="span" className="text-xs text-sky-400" text={project.stack} isActive={step === baseStep + 1} onComplete={advance} speed={5} skipAnimation={skip} />
                        </div>
                      )}
                      {(step >= baseStep + 2 || skip) && (
                        <TerminalText as="p" className="text-slate-400 text-sm mt-3 md:mt-2" text={project.desc} speed={2} isActive={step === baseStep + 2} onComplete={advance} skipAnimation={skip}
                          suffix={<motion.a initial={skip ? {opacity:1} : {opacity:0}} animate={{opacity:1}} href={project.github} target="_blank" rel="noreferrer" className="text-xs text-yellow-400 underline mt-3 md:mt-2 block hover:text-yellow-300 transition-colors">[view repository]</motion.a>}
                        />
                      )}
                   </div>
                 )
              })}
            </div>
          )}

          {entry.tabId === 'certifications' && (
            <div className="pl-2 md:pl-4 text-slate-300 space-y-3 md:space-y-2 text-sm">
              {portfolioData.certifications.map((cert, idx) => (
                 <React.Fragment key={idx}>
                   {(step >= idx + 1 || skip) && (
                     <div className="flex items-start gap-2">
                       <span className="text-green-400 mt-0.5 shrink-0">✔</span>
                       <TerminalText text={cert} isActive={step === idx + 1} onComplete={advance} speed={4} className="flex-1" skipAnimation={skip} />
                     </div>
                   )}
                 </React.Fragment>
              ))}
            </div>
          )}

          {entry.tabId === 'resumes' && (
            <div className="pl-2 md:pl-4 text-xs md:text-sm text-slate-400 space-y-4 md:space-y-2">
              {portfolioData.resumes.map((resume, idx) => (
                <React.Fragment key={idx}>
                  {(step >= idx + 1 || skip) && (
                     <div className="group flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                       <span className="hidden md:inline">-rwxr-xr-x 1 vinish staff</span>
                       <div className="flex items-center gap-3">
                         <span className="md:hidden text-slate-500">-rwxr-xr-x</span>
                         <TerminalText text={resume.name} isActive={step === idx + 1} onComplete={advance} speed={8} skipAnimation={skip} className="text-yellow-400 font-bold break-all" />
                         <motion.a initial={skip ? {opacity:1} : {opacity:0}} animate={{opacity:1}} href={resume.url} target="_blank" rel="noreferrer" className="text-sky-400 underline shrink-0 hover:text-sky-300">[dl]</motion.a>
                       </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {entry.tabId === 'contact' && (
            <div className="pl-2 md:pl-4 text-xs md:text-sm text-slate-300 space-y-4 md:space-y-3">
              {(step >= 1 || skip) && (
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                   <span className="text-green-400 font-mono md:w-28">[✔] Email    :</span>
                   <a href={`mailto:${portfolioData.contact.email}`} className="text-sky-400 hover:underline break-all"><TerminalText text={portfolioData.contact.email} isActive={step === 1} onComplete={advance} speed={10} skipAnimation={skip} /></a>
                </div>
              )}
              {(step >= 2 || skip) && (
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                   <span className="text-green-400 font-mono md:w-28">[✔] WhatsApp :</span>
                   <a href={`https://wa.me/${portfolioData.contact.mobile.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline"><TerminalText text={portfolioData.contact.mobile} isActive={step === 2} onComplete={advance} speed={10} skipAnimation={skip} /></a>
                </div>
              )}
              {(step >= 3 || skip) && (
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                   <span className="text-green-400 font-mono md:w-28">[✔] GitHub   :</span>
                   <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline break-all"><TerminalText text={`[github.com/Vinishraghav](${portfolioData.contact.github})`} isActive={step === 3} onComplete={advance} speed={10} skipAnimation={skip} /></a>
                </div>
              )}
              {(step >= 4 || skip) && (
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                   <span className="text-green-400 font-mono md:w-28">[✔] LinkedIn :</span>
                   <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline break-all"><TerminalText text={`[linkedin.com/in/vinishraghav](${portfolioData.contact.linkedin})`} isActive={step === 4} onComplete={advance} speed={10} skipAnimation={skip} /></a>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const InteractivePrompt = ({ onCommand, disabled }: any) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && inputRef.current) inputRef.current.focus();
  }, [disabled]);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      if (input.trim()) onCommand(input.trim());
      setInput('');
    }
  };

  return (
    <div className="text-emerald-400 font-mono mt-4 pt-3 select-none relative flex flex-wrap items-center pb-8 md:pb-4" onClick={() => inputRef.current?.focus()}>
      <span className="mr-2">vinish@portfolio:~$</span>
      <span className="text-white whitespace-pre-wrap break-all">{input}</span>
      <span className={`inline-block w-2 md:w-2.5 h-3 md:h-4 bg-sky-400 ml-0.5 align-middle ${disabled ? 'opacity-0' : 'animate-[blink_1s_step-end_infinite]'}`}></span>
      
      <input 
        ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} disabled={disabled}
        className="absolute inset-0 opacity-0 cursor-text w-full h-full" autoFocus autoComplete="off" spellCheck="false"
      />
    </div>
  );
};

const DeveloperMode = ({ onExit }: { onExit: () => void }) => {
  const [history, setHistory] = useState<any[]>([{ id: 'initial-home', type: 'tab', command: '/home', tabId: 'home' }]);
  const [isTyping, setIsTyping] = useState(true);
  const [activeTabIndicator, setActiveTabIndicator] = useState('home');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTyping && scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });

  const handleCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase();
    const id = Date.now().toString() + Math.random().toString();
    if (lowerCmd === '/clear') { setHistory([]); setIsTyping(false); return; }

    const validTabs = ['home', 'about', 'skills', 'projects', 'certifications', 'resumes', 'contact'];
    const tabMatch = validTabs.find(t => `/${t}` === lowerCmd);

    if (tabMatch) {
      setHistory(prev => [...prev, { id, type: 'tab', command: cmd, tabId: tabMatch }]);
      setIsTyping(true);
      setActiveTabIndicator(tabMatch);
    } else {
      const randomReply = EASTER_EGGS[Math.floor(Math.random() * EASTER_EGGS.length)];
      setHistory(prev => [...prev, { id, type: 'error', command: cmd, reply: randomReply }]);
      setIsTyping(true);
    }
  };

  useEffect(() => {
    const handleCustomCommand = (e: any) => handleCommand(e.detail);
    window.addEventListener('terminalCommand', handleCustomCommand);
    return () => window.removeEventListener('terminalCommand', handleCustomCommand);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[100dvh] w-full bg-[#070a13] relative overflow-x-hidden flex flex-col items-center justify-center p-2 sm:p-4 font-mono pt-20 md:pt-4"
    >
      <ReturnToOS onClick={onExit} />
      
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 animate-pulse pointer-events-none"></div>

      <div className="w-full max-w-5xl bg-[#0b0f19] border border-slate-800 rounded-lg shadow-2xl flex flex-col overflow-hidden relative z-10 h-[85dvh] md:h-auto md:min-h-[85vh] backdrop-blur-xl mt-4 md:mt-0">
        
        <div className="bg-[#111625] px-3 md:px-4 py-2 md:py-3 flex items-center justify-between border-b border-slate-800 select-none shrink-0">
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500 inline-block hover:brightness-125 transition-all"></span>
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500 inline-block hover:brightness-125 transition-all"></span>
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 inline-block hover:brightness-125 transition-all"></span>
          </div>
          <div className="text-[10px] md:text-xs text-slate-500 font-mono tracking-tight truncate px-2">vinish@portfolio: ~</div>
          <div className="w-8 md:w-10 shrink-0"></div>
        </div>

        <div className="bg-[#0e1321] border-b border-slate-800 flex overflow-x-auto hide-scrollbar gap-1 md:gap-2 px-2 pt-2 shrink-0">
          {['home', 'about', 'skills', 'projects', 'certifications', 'resumes', 'contact'].map((tabId) => (
            <button
              key={tabId} onClick={() => handleCommand(`/${tabId}`)}
              className={`relative px-3 md:px-4 py-2 text-xs md:text-sm font-medium font-mono rounded-t-md transition-all duration-200 group border-t border-x shrink-0 ${activeTabIndicator === tabId ? 'border-slate-800 text-sky-400 font-bold' : 'border-transparent text-slate-500 hover:text-sky-300 hover:scale-[1.02]'}`}
              style={{ marginBottom: activeTabIndicator === tabId ? '-1px' : '0' }}
            >
              {activeTabIndicator === tabId && (
                <motion.div layoutId="activeTabIndicator" className="absolute inset-0 bg-[#0b0f19] border-b border-[#0b0f19] rounded-t-md -z-10 shadow-[inset_0_2px_10px_rgba(56,189,248,0.05)]" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
              <span className="relative z-10 whitespace-nowrap">&gt;_ ~/{tabId}</span>
            </button>
          ))}
        </div>

        <div 
          ref={scrollRef}
          className="flex-1 p-4 md:p-6 font-mono text-left terminal-scrollbar overflow-y-auto overflow-x-hidden"
          onClick={() => {
            if (!isTyping) {
              const input = document.querySelector('input[type="text"]') as HTMLInputElement;
              if (input) input.focus();
            }
          }}
        >
          {history.map((entry, index) => {
            const isLatest = index === history.length - 1;
            return <HistoryBlock key={entry.id} entry={entry} isLatest={isLatest} onBlockComplete={() => setIsTyping(false)} />;
          })}
          {!isTyping && <InteractivePrompt onCommand={handleCommand} disabled={isTyping} />}
          <div className="h-8 md:h-2 shrink-0 w-full"></div>
        </div>

        <div className="bg-sky-600 text-slate-950 px-3 md:px-4 py-1 flex justify-between text-[10px] md:text-xs font-bold uppercase select-none relative z-10 shrink-0">
          <div className="flex gap-2 md:gap-4 items-center">
            <span className="bg-white px-1.5 md:px-2 py-0.5 text-[#070a13] shadow-sm">NORMAL</span>
            <span className="py-0.5 text-white font-mono truncate max-w-[120px] md:max-w-none">v_core v1.0.4</span>
          </div>
          <div className="flex gap-2 md:gap-4 py-0.5 text-white items-center">
            <span className="truncate max-w-[100px] md:max-w-none">{`[ ~/${activeTabIndicator} ]`}</span>
            <span className="hidden sm:inline">UTF-8</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// MASTER ROUTER
// ==========================================

export default function VinishOS() {
  const [osState, setOsState] = useState<'booting' | 'gateway' | 'recruiter' | 'dev-booting' | 'developer'>('booting');

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink { 
          from, to { background-color: transparent } 
          50% { background-color: #38bdf8 } 
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      <AnimatePresence mode="wait">
        {osState === 'booting' && <BootSequence key="boot" onComplete={() => setOsState('gateway')} />}
        {osState === 'gateway' && <OSGateway key="gateway" setMode={setOsState} />}
        {osState === 'recruiter' && <RecruiterMode key="recruiter" onExit={() => setOsState('gateway')} />}
        {osState === 'dev-booting' && <DevBootSequence key="dev-boot" onComplete={() => setOsState('developer')} />}
        {osState === 'developer' && <DeveloperMode key="developer" onExit={() => setOsState('gateway')} />}
      </AnimatePresence>
    </>
  );
}
