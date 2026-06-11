"use client";
import { motion } from 'framer-motion';

export function SkillBadge({ name, category, index = 0 }: { name: string, category: string, index?: number }) {
  let colorClass = "text-slate-300 border-slate-700 hover:border-slate-500";
  
  switch(category.toLowerCase()) {
    case 'programming':
      colorClass = "text-cyan-400 border-cyan-900 hover:border-cyan-500 hover:box-glow hover:bg-cyan-950/30";
      break;
    case 'frontend':
      colorClass = "text-purple-400 border-purple-900 hover:border-purple-500 hover:box-glow hover:bg-purple-950/30";
      break;
    case 'backend':
      colorClass = "text-green-400 border-green-900 hover:border-green-500 hover:box-glow hover:bg-green-950/30";
      break;
    case 'database':
      colorClass = "text-yellow-400 border-yellow-900 hover:border-yellow-500 hover:box-glow hover:bg-yellow-950/30";
      break;
    case 'cloud & devops':
      colorClass = "text-blue-400 border-blue-900 hover:border-blue-500 hover:box-glow hover:bg-blue-950/30";
      break;
    default:
      colorClass = "text-slate-300 border-slate-700 hover:border-slate-500 hover:box-glow hover:bg-slate-800/50";
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`px-3 py-1.5 border text-xs font-mono transition-all duration-300 cursor-default select-none ${colorClass}`}
    >
      {name}
    </motion.div>
  );
}
