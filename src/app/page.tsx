"use client";
import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { motion } from 'framer-motion';

const EASTER_EGGS = [
  "Error: Command not found. Did you try turning your brain off and on again?",
  "Access Denied. Nice try, Mr. Hacker. Vinish's firewall is too strong for your basic scripts.",
  "rm -rf / initiated... Just kidding. Don't play with fire, bro.",
  "Error 404: Motivation to reply not found. Stick to the actual slash commands like /projects.",
  "I'm just a terminal portfolio script, not ChatGPT. Type /about to learn about Vinish!"
];

type HistoryEntry = 
  | { id: string; type: 'tab'; command: string; tabId: string }
  | { id: string; type: 'error'; command: string; reply: string };

const TypewriterCommand = ({ command, onComplete, skipAnimation }: any) => {
  const [text, setText] = useState('');
  const [done, setDone] = useState(skipAnimation);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  
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

  if (skipAnimation) {
    return <>{command}</>;
  }

  return (
    <>
      {text}
      {!done && <span className="inline-block w-2.5 h-4 bg-sky-400 ml-1 animate-[blink_1s_step-end_infinite] align-middle"></span>}
    </>
  );
};

const TerminalText = ({ text, isActive, onComplete, className, speed = 8, showCursor = true, as = 'span', suffix = null, skipAnimation = false }: any) => {
  const [currentText, setCurrentText] = useState('');
  const [done, setDone] = useState(skipAnimation);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

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
    return (
      <Tag className={className}>
        {text}
        {suffix}
      </Tag>
    );
  }

  if (!isActive && !done) return null;

  const Tag = as;

  return (
    <Tag className={className}>
      {done ? text : currentText}
      {isActive && !done && showCursor && <span className="inline-block w-2.5 h-4 bg-sky-400 ml-1 animate-[blink_1s_step-end_infinite] align-middle"></span>}
      {done && suffix}
    </Tag>
  );
};

const HistoryBlock = ({ entry, isLatest, onBlockComplete }: any) => {
  const [step, setStep] = useState(isLatest ? 0 : 999);
  
  useEffect(() => {
    if (!isLatest) setStep(999);
  }, [isLatest]);

  const advance = () => {
    if (isLatest) setStep(s => s + 1);
  };

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
      if (entry.type === 'error' && step > 0) {
        onBlockComplete();
      } else if (entry.type === 'tab' && step > getTabMaxSteps(entry.tabId)) {
        onBlockComplete();
      }
    }
  }, [step, isLatest, entry, onBlockComplete]);

  return (
    <div className="mb-6">
      <div className="text-slate-500 mb-6 select-none text-base">
        <span className="text-green-400">vinish@portfolio</span>:<span className="text-blue-400">~</span>$ 
        <TypewriterCommand command={` ${entry.command}`} onComplete={() => setStep(1)} skipAnimation={skip} />
      </div>

      {entry.type === 'error' && (step >= 1 || skip) && (
        <div className="pl-4">
          <TerminalText as="p" className="text-red-400 font-mono" text={entry.reply} skipAnimation={skip} isActive={step === 1} onComplete={advance} speed={10} />
        </div>
      )}

      {entry.type === 'tab' && (step >= 1 || skip) && (
        <div className="pb-2">
          
          {entry.tabId === 'home' && (
            <div className="pl-4 flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                {(step >= 1 || skip) && <TerminalText as="h1" className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2" text={portfolioData.profile.name} isActive={step === 1} onComplete={advance} speed={15} skipAnimation={skip} />}
                
                {(step >= 2 || skip) && <TerminalText as="p" className="text-lg text-sky-400 mb-4 font-semibold" text={portfolioData.profile.title} isActive={step === 2} onComplete={advance} speed={8} skipAnimation={skip} />}
                
                {(step >= 3 || skip) && <TerminalText as="p" className="text-slate-400 max-w-3xl leading-relaxed mb-8" text={portfolioData.profile.bio} isActive={step === 3} onComplete={advance} speed={3} skipAnimation={skip} />}
                
                {(step >= 4 || skip) && (
                  <motion.div initial={skip ? { opacity: 1 } : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="flex flex-wrap gap-4 select-none mt-4">
                    <button onClick={() => window.dispatchEvent(new CustomEvent('terminalCommand', { detail: '/contact' }))} className="group flex items-center px-5 py-2.5 bg-slate-800/60 hover:bg-slate-700/80 hover:border-sky-500/50 hover:shadow-[0_0_15px_-3px_rgba(56,189,248,0.3)] text-sm font-medium border border-slate-700 rounded transition-all">
                      <span className="text-sky-400 group-hover:translate-x-1 transition-transform mr-2 duration-300">&gt;</span> Contact Me
                    </button>
                    <button onClick={() => window.dispatchEvent(new CustomEvent('terminalCommand', { detail: '/projects' }))} className="group flex items-center px-5 py-2.5 bg-slate-800/60 hover:bg-slate-700/80 hover:border-sky-500/50 hover:shadow-[0_0_15px_-3px_rgba(56,189,248,0.3)] text-sm font-medium border border-slate-700 rounded transition-all">
                      <span className="text-sky-400 group-hover:translate-x-1 transition-transform mr-2 duration-300">&gt;</span> View Projects
                    </button>
                  </motion.div>
                )}
              </div>

              {(step >= 1 || skip) && (
                <motion.div initial={skip ? { opacity: 1 } : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="w-full md:w-auto flex flex-col items-center select-none pt-2 shrink-0">
                  <div className="w-32 h-40 rounded-md border border-slate-700 bg-[#111625] flex flex-col items-center justify-center text-center p-1 shadow-[0_0_15px_-3px_rgba(56,189,248,0.2)] relative overflow-hidden group">
                    {portfolioData.profile.avatarUrl && portfolioData.profile.avatarUrl !== "" ? (
                      <>
                        <img 
                          src={portfolioData.profile.avatarUrl} 
                          alt="Vinishraghav K E - Profile Headshot"
                          className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-500 relative z-0"
                          onError={(e) => {
                            // @ts-ignore
                            e.currentTarget.style.display = 'none';
                            // @ts-ignore
                            e.currentTarget.nextSibling.style.display = 'none';
                            // @ts-ignore
                            e.currentTarget.parentElement.querySelector('.fallback-avatar').classList.remove('hidden');
                            // @ts-ignore
                            e.currentTarget.parentElement.querySelector('.fallback-avatar').classList.add('flex');
                          }}
                        />
                        <div className="absolute inset-0 bg-sky-500/10 mix-blend-color z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500"></div>
                      </>
                    ) : null}

                    <div className={`fallback-avatar absolute inset-0 flex-col items-center justify-center p-2 z-20 ${portfolioData.profile.avatarUrl && portfolioData.profile.avatarUrl !== "" ? 'hidden' : 'flex'}`}>
                      <span className="text-xs text-slate-500 font-mono">[ AVATAR ]</span>
                      <span className="text-[9px] text-sky-400/50 font-mono mt-1">vinish.jpg</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {entry.tabId === 'about' && (
            <div className="pl-4">
              {(step >= 1 || skip) && (
                <TerminalText as="pre" className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-emerald-400" text={JSON.stringify(portfolioData.profile.metadata, null, 2)} speed={2} isActive={step === 1} onComplete={advance} skipAnimation={skip} />
              )}
            </div>
          )}

          {entry.tabId === 'skills' && (
            <div className="pl-4 space-y-5">
              {Object.entries(portfolioData.skills).map(([category, items], idx) => {
                const catStep = (idx * 2) + 1;
                const itemsStep = (idx * 2) + 2;
                return (
                  <div key={category}>
                     {(step >= catStep || skip) && <TerminalText as="div" className="text-yellow-400 font-bold mb-1" text={`./${category}:`} speed={8} isActive={step === catStep} onComplete={advance} skipAnimation={skip} />}
                     {(step >= itemsStep || skip) && <TerminalText as="div" className="text-slate-300 pl-4" text={items.join(' · ')} speed={3} isActive={step === itemsStep} onComplete={advance} skipAnimation={skip} />}
                  </div>
                );
              })}
            </div>
          )}

          {entry.tabId === 'projects' && (
            <div className="pl-4 space-y-6">
              {portfolioData.projects.map((project, idx) => {
                 const baseStep = 1 + (idx * 3);
                 const titleStep = baseStep;
                 const stackStep = baseStep + 1;
                 const descStep = baseStep + 2;
                 
                 return (
                   <div key={idx} className="border-l-2 border-slate-800 pl-4 hover:border-sky-500/50 transition-colors">
                      {(step >= titleStep || skip) && (
                        <TerminalText as="h3" className="text-white font-bold text-lg" text={`📁 ${project.title}`} isActive={step === titleStep} onComplete={advance} speed={8} skipAnimation={skip} />
                      )}
                      
                      {(step >= stackStep || skip) && (
                        <div className="flex gap-2 mt-1">
                           <span className="text-slate-500">Stack:</span>
                           <TerminalText as="span" className="text-xs text-sky-400" text={project.stack} isActive={step === stackStep} onComplete={advance} speed={5} skipAnimation={skip} />
                        </div>
                      )}
                      
                      {(step >= descStep || skip) && (
                        <TerminalText as="p" className="text-slate-400 text-sm mt-2" text={project.desc} speed={2} isActive={step === descStep} onComplete={advance} skipAnimation={skip}
                          suffix={
                             <motion.a initial={skip ? {opacity:1} : {opacity:0}} animate={{opacity:1}} href={project.github} className="text-xs text-yellow-400 underline mt-2 block hover:text-yellow-300 transition-colors">
                               [view repository]
                             </motion.a>
                          }
                        />
                      )}
                   </div>
                 )
              })}
            </div>
          )}

          {entry.tabId === 'certifications' && (
            <div className="pl-4 text-slate-300 space-y-2 text-sm">
              {portfolioData.certifications.map((cert, idx) => (
                 <React.Fragment key={idx}>
                   {(step >= idx + 1 || skip) && (
                     <div className="flex items-start gap-2">
                       <span className="text-green-400 mt-0.5">✔</span>
                       <TerminalText text={cert} isActive={step === idx + 1} onComplete={advance} speed={4} className="flex-1" skipAnimation={skip} />
                     </div>
                   )}
                 </React.Fragment>
              ))}
            </div>
          )}

          {entry.tabId === 'resumes' && (
            <div className="pl-4 text-sm text-slate-400 space-y-2">
              {portfolioData.resumes.map((resume, idx) => (
                <React.Fragment key={idx}>
                  {(step >= idx + 1 || skip) && (
                    <div className="group flex items-center gap-2">
                       <span>-rwxr-xr-x 1 vinish staff</span>
                       <TerminalText text={resume.name} isActive={step === idx + 1} onComplete={advance} speed={8} skipAnimation={skip}
                          className="text-yellow-400 font-bold"
                          suffix={
                            <motion.a initial={skip ? {opacity:1} : {opacity:0}} animate={{opacity:1}} href={resume.url} className="text-xs text-sky-400 underline ml-3 hover:text-sky-300">
                              [download]
                            </motion.a>
                          }
                       />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {entry.tabId === 'contact' && (
            <div className="pl-4 text-sm text-slate-300 space-y-3">
              {(step >= 1 || skip) && <TerminalText as="p" text="Connecting via SSH protocol..." isActive={step === 1} onComplete={advance} speed={15} className="text-slate-400 mb-4 block" skipAnimation={skip} />}
              
              {(step >= 2 || skip) && (
                <div className="flex items-center gap-2">
                   <span className="text-green-400 font-mono">[✔] Email    :</span>
                   <a href="mailto:contact@example.com" className="text-sky-400 hover:underline">
                     <TerminalText text="contact@example.com" isActive={step === 2} onComplete={advance} speed={10} skipAnimation={skip} />
                   </a>
                </div>
              )}

              {(step >= 3 || skip) && (
                <div className="flex items-center gap-2">
                   <span className="text-green-400 font-mono">[✔] GitHub   :</span>
                   <a href="https://github.com/username" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                     <TerminalText text="github.com/username" isActive={step === 3} onComplete={advance} speed={10} skipAnimation={skip} />
                   </a>
                </div>
              )}

              {(step >= 4 || skip) && (
                <div className="flex items-center gap-2">
                   <span className="text-green-400 font-mono">[✔] LinkedIn :</span>
                   <a href="https://linkedin.com/in/username" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                     <TerminalText text="linkedin.com/in/username" isActive={step === 4} onComplete={advance} speed={10} skipAnimation={skip} />
                   </a>
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
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      if (input.trim()) {
        onCommand(input.trim());
      }
      setInput('');
    }
  };

  return (
    <div className="text-emerald-400 font-mono mt-4 pt-3 select-none relative flex items-center pb-8" onClick={() => inputRef.current?.focus()}>
      <span>vinish@portfolio:~$</span>
      <span className="ml-2 text-white whitespace-pre">{input}</span>
      <span className={`inline-block w-2.5 h-4 bg-sky-400 ml-0.5 align-middle ${disabled ? 'opacity-0' : 'animate-[blink_1s_step-end_infinite]'}`}></span>
      
      <input 
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="absolute inset-0 opacity-0 cursor-text"
        autoFocus
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );
};

export default function TerminalPortfolio() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { id: 'initial-home', type: 'tab', command: '/home', tabId: 'home' }
  ]);
  const [isTyping, setIsTyping] = useState(true);
  const [activeTabIndicator, setActiveTabIndicator] = useState('home');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic strictly locks to bottom while the terminal is executing output
  useEffect(() => {
    if (isTyping && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  const handleCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase();
    const id = Date.now().toString() + Math.random().toString();

    if (lowerCmd === '/clear') {
      setHistory([]);
      setIsTyping(false);
      return;
    }

    const validTabs = ['home', 'about', 'skills', 'projects', 'certifications', 'resumes', 'contact'];
    // Parse if they typed the slash command directly
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

  // Wire up internal CTA buttons to the global command router
  useEffect(() => {
    const handleCustomCommand = (e: any) => {
      handleCommand(e.detail);
    };
    window.addEventListener('terminalCommand', handleCustomCommand);
    return () => window.removeEventListener('terminalCommand', handleCustomCommand);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink { 
          from, to { background-color: transparent } 
          50% { background-color: #38bdf8 } 
        }
      `}} />
      <div className="min-h-screen w-full bg-[#070a13] relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 animate-pulse pointer-events-none"></div>

        <div className="w-full max-w-5xl bg-[#0b0f19] border border-slate-800 rounded-lg shadow-[0_0_60px_-15px_rgba(14,165,233,0.3)] flex flex-col overflow-hidden relative z-10 min-h-[85vh] backdrop-blur-xl">
          
          <div className="bg-[#111625] px-4 py-3 flex items-center justify-between border-b border-slate-800 select-none shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block hover:brightness-125 transition-all"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block hover:brightness-125 transition-all"></span>
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block hover:brightness-125 transition-all"></span>
            </div>
            <div className="text-xs text-slate-500 font-mono tracking-tight">vinish@portfolio: ~</div>
            <div className="w-10"></div>
          </div>

          <div className="bg-[#0e1321] border-b border-slate-800 flex flex-wrap gap-2 px-2 pt-2 shrink-0">
            {['home', 'about', 'skills', 'projects', 'certifications', 'resumes', 'contact'].map((tabId) => (
              <button
                key={tabId}
                onClick={() => handleCommand(`/${tabId}`)}
                className={`relative px-4 py-1.5 text-sm font-medium font-mono rounded-t-md transition-all duration-200 group border-t border-x ${
                  activeTabIndicator === tabId
                    ? 'border-slate-800 text-sky-400 font-bold'
                    : 'border-transparent text-slate-500 hover:text-sky-300 hover:scale-[1.02]'
                }`}
                style={{ marginBottom: activeTabIndicator === tabId ? '-1px' : '0' }}
              >
                {activeTabIndicator === tabId && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-[#0b0f19] border-b border-[#0b0f19] rounded-t-md -z-10 shadow-[inset_0_2px_10px_rgba(56,189,248,0.05)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">&gt;_ ~/{tabId}</span>
              </button>
            ))}
          </div>

          {/* Core Interactive Shell Body */}
          <div 
            ref={scrollRef}
            className="flex-1 p-6 font-mono text-left max-h-[70vh] terminal-scrollbar overflow-y-auto"
            onClick={() => {
              if (!isTyping) {
                const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                if (input) input.focus();
              }
            }}
          >
            {history.map((entry, index) => {
              const isLatest = index === history.length - 1;
              return (
                <HistoryBlock 
                  key={entry.id} 
                  entry={entry} 
                  isLatest={isLatest} 
                  onBlockComplete={() => setIsTyping(false)} 
                />
              );
            })}

            {/* Always visible bottom prompt when not typing output */}
            {!isTyping && (
              <InteractivePrompt onCommand={handleCommand} disabled={isTyping} />
            )}
          </div>

          <div className="bg-sky-600 text-slate-950 px-4 py-1 flex justify-between text-xs font-bold uppercase select-none relative z-10 shrink-0">
            <div className="flex gap-4">
              <span className="bg-white px-2 py-0.5 text-[#070a13] shadow-sm">NORMAL</span>
              <span className="py-0.5 text-white font-mono">vinish_engine_core v1.0.4</span>
            </div>
            <div className="hidden md:flex gap-4 py-0.5 text-white">
              <span>{`[ ACTIVE: ~/${activeTabIndicator} ]`}</span>
              <span>UTF-8</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
