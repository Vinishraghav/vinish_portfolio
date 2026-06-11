"use client";
import { useState, useEffect } from 'react';

export function TypewriterText({ 
  text, 
  delay = 0, 
  className = "", 
  showCursor = true,
  speed = 40
}: { 
  text: string, 
  delay?: number, 
  className?: string,
  showCursor?: boolean,
  speed?: number
}) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      setIsTyping(true);
      const interval = setInterval(() => {
        setDisplayText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span className={`ml-1 text-cyan-400 inline-block ${!isTyping ? 'animate-cursor-blink' : ''}`}>█</span>
      )}
    </span>
  );
}
