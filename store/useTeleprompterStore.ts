import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TeleprompterState {
  // Script
  text: string;
  setText: (text: string) => void;
  
  // Display settings
  speed: number; // 0.5 to 10
  setSpeed: (speed: number) => void;
  incrementSpeed: () => void;
  decrementSpeed: () => void;
  
  fontSize: number; // in pixels
  setFontSize: (size: number) => void;
  incrementFontSize: () => void;
  decrementFontSize: () => void;
  
  lineHeight: number;
  setLineHeight: (height: number) => void;
  
  textAlign: 'left' | 'center' | 'right';
  setTextAlign: (align: 'left' | 'center' | 'right') => void;
  
  // Modes
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  togglePlay: () => void;
  
  isMirrored: boolean;
  toggleMirror: () => void;
  
  focusMode: boolean;
  toggleFocusMode: () => void;
  
  showGuide: boolean;
  toggleGuide: () => void;
  
  // Playback state
  scrollPosition: number;
  setScrollPosition: (pos: number) => void;
  resetScroll: () => void;
  
  // Countdown
  countdownDuration: number; // 0, 3, 5, 10
  setCountdownDuration: (duration: number) => void;
  isCountingDown: boolean;
  setIsCountingDown: (is: boolean) => void;
  countdownSeconds: number;
  setCountdownSeconds: (sec: number) => void;

  // Internal counter used to signal a reset (avoids Zustand same-value dedup)
  _resetCounter: number;
}

export const useTeleprompterStore = create<TeleprompterState>()(
  persist(
    (set) => ({
      text: 'Welcome to Promptua. This is your modern teleprompter. \n\nPaste your script here to get started. You can use global keyboard shortcuts to control playback. \n\nSpace to Play/Pause, Arrows to adjust speed and font size. R to reset scroll.',
      setText: (text) => set({ text }),
      
      speed: 3,
      setSpeed: (speed) => set({ speed: Math.max(0.5, Math.min(10, speed)) }),
      incrementSpeed: () => set((state) => ({ speed: Math.min(10, +(state.speed + 0.5).toFixed(1)) })),
      decrementSpeed: () => set((state) => ({ speed: Math.max(0.5, +(state.speed - 0.5).toFixed(1)) })),
      
      fontSize: 48,
      setFontSize: (fontSize) => set({ fontSize: Math.max(16, Math.min(120, fontSize)) }),
      incrementFontSize: () => set((state) => ({ fontSize: Math.min(120, state.fontSize + 4) })),
      decrementFontSize: () => set((state) => ({ fontSize: Math.max(16, state.fontSize - 4) })),
      
      lineHeight: 1.5,
      setLineHeight: (lineHeight) => set({ lineHeight }),
      
      textAlign: 'center',
      setTextAlign: (textAlign) => set({ textAlign }),
      
      isPlaying: false,
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      
      isMirrored: false,
      toggleMirror: () => set((state) => ({ isMirrored: !state.isMirrored })),
      
      focusMode: true,
      toggleFocusMode: () => set((state) => ({ focusMode: !state.focusMode })),
      
      showGuide: true,
      toggleGuide: () => set((state) => ({ showGuide: !state.showGuide })),
      
      scrollPosition: 0,
      setScrollPosition: (scrollPosition) => set({ scrollPosition }),
      resetScroll: () => set((state) => ({
        scrollPosition: 0,
        isPlaying: false,
        isCountingDown: false,
        _resetCounter: state._resetCounter + 1,
      })),

      countdownDuration: 0,
      setCountdownDuration: (countdownDuration) => set({ countdownDuration }),
      isCountingDown: false,
      setIsCountingDown: (isCountingDown) => set({ isCountingDown }),
      countdownSeconds: 0,
      setCountdownSeconds: (countdownSeconds) => set({ countdownSeconds }),

      _resetCounter: 0,
    }),
    {
      name: 'teleprompter-storage',
      partialize: (state) => ({
        text: state.text,
        speed: state.speed,
        fontSize: state.fontSize,
        lineHeight: state.lineHeight,
        textAlign: state.textAlign,
        isMirrored: state.isMirrored,
        focusMode: state.focusMode,
        showGuide: state.showGuide,
        countdownDuration: state.countdownDuration,
      }),
    }
  )
);
