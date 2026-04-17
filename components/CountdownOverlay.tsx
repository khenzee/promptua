'use client';

import React, { useEffect } from 'react';
import { useTeleprompterStore } from '@/store/useTeleprompterStore';
import { Timer } from 'lucide-react';

export default function CountdownOverlay() {
  const {
    isCountingDown,
    setIsCountingDown,
    setIsPlaying,
    countdownSeconds,
    setCountdownSeconds,
  } = useTeleprompterStore();

  useEffect(() => {
    if (isCountingDown) {
      const timer = setInterval(() => {
        // Use the current value from the store
        const currentSeconds = useTeleprompterStore.getState().countdownSeconds;
        
        if (currentSeconds <= 1) {
          clearInterval(timer);
          setIsPlaying(true);
          setIsCountingDown(false);
          setCountdownSeconds(0);
        } else {
          setCountdownSeconds(currentSeconds - 1);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isCountingDown, setIsPlaying, setIsCountingDown, setCountdownSeconds]);

  if (!isCountingDown) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-background/60 backdrop-blur-md animate-fade-in">
      <div className="flex flex-col items-center gap-6 animate-fade-in-up">
        <div className="w-24 h-24 rounded-full border-4 border-accent/20 flex items-center justify-center relative">
          <div 
            className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin" 
            style={{ animationDuration: '2s' }}
          />
          <Timer className="w-10 h-10 text-accent" />
        </div>
        
        <div className="relative">
          <span 
            key={countdownSeconds} 
            className="text-9xl font-black text-foreground drop-shadow-[0_0_30px_var(--accent-glow)] animate-bounce"
          >
            {countdownSeconds}
          </span>
        </div>
        
        <p className="text-xl font-medium text-secondary uppercase tracking-[0.2em]">
          Prepare to speak
        </p>
        
        <button
          onClick={() => setIsCountingDown(false)}
          className="mt-8 px-6 py-2 rounded-full border border-border hover:bg-surface-2 text-secondary text-sm transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
