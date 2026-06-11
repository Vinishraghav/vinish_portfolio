"use client";
import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const navItems = [
  { name: 'home', href: '#home' },
  { name: 'about', href: '#about' },
  { name: 'skills', href: '#skills' },
  { name: 'projects', href: '#projects' },
  { name: 'certifications', href: '#certifications' },
  { name: 'resumes', href: '#resumes' },
];

export function NavBar() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.name));
      let current = 'home';
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section.id;
          }
        }
      }
      setActiveTab(current);
    };
    
    const container = document.getElementById('terminal-content');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="w-full md:w-56 bg-[#0b0f19] border-b md:border-b-0 md:border-r border-slate-800 p-4 shrink-0 overflow-x-auto md:overflow-y-auto terminal-scrollbar">
      <div className="flex md:flex-col gap-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={() => setActiveTab(item.name)}
            className={`px-3 py-2.5 rounded flex items-center gap-3 text-sm transition-all duration-300 whitespace-nowrap ${
              activeTab === item.name 
                ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-800/50 text-glow box-glow' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
            }`}
          >
            <Terminal size={14} className={activeTab === item.name ? 'text-cyan-400' : ''} />
            ~/{item.name}
          </a>
        ))}
      </div>
    </div>
  );
}
