"use client";
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';

interface ProjectCardProps {
  title: string;
  technologies: string[];
  description: string;
  githubUrl?: string;
  demoUrl?: string;
  delay?: number;
}

export function ProjectCard({ title, technologies, description, githubUrl, demoUrl, delay = 0 }: ProjectCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-[#0b0f19] border border-slate-700/50 p-6 hover:border-cyan-500/50 transition-colors duration-300 group hover:box-glow relative font-mono flex flex-col h-full"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <h3 className="text-lg font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors">{title}</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <span key={tech} className="text-xs px-2 py-1 bg-slate-800 text-green-400 border border-slate-700">
            {tech}
          </span>
        ))}
      </div>
      
      <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-1">
        {description}
      </p>
      
      <div className="flex gap-4 mt-auto border-t border-slate-800 pt-4">
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white hover:text-glow transition-all">
            <GithubIcon size={16} /> GitHub
          </a>
        )}
        {demoUrl && (
          <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 hover:text-glow transition-all">
            <ExternalLink size={16} /> Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}
