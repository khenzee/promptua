'use client';

import React from 'react';
import { useTeleprompterStore } from '@/store/useTeleprompterStore';
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Maximize,
  FlipHorizontal,
  ExternalLink,
  Focus,
  Eye,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Timer,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TeleprompterControls() {
  const store = useTeleprompterStore();
  const [isPiPSupported, setIsPiPSupported] = React.useState(false);

  React.useEffect(() => {
    setIsPiPSupported('documentPictureInPicture' in window);
  }, []);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handlePiP = () => {
    window.dispatchEvent(new CustomEvent('toggle-pip'));
  };

  const handleTogglePlay = () => {
    if (!store.isPlaying && !store.isCountingDown && store.countdownDuration > 0) {
      store.setCountdownSeconds(store.countdownDuration);
      store.setIsCountingDown(true);
    } else {
      if (store.isCountingDown) {
        store.setIsCountingDown(false);
      } else {
        store.togglePlay();
      }
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4">
      {/* Settings Row */}
      <div className="flex items-center gap-2 p-2 bg-surface/60 backdrop-blur-xl border border-border rounded-2xl shadow-2xl w-[90vw] md:w-auto overflow-x-auto no-scrollbar">
        {/* Alignment */}
        <div className="flex items-center gap-1 border-r border-border pr-2 mr-2">
          <button
            onClick={() => store.setTextAlign('left')}
            className={cn("p-2 rounded-lg transition-all", store.textAlign === 'left' ? "bg-foreground text-background" : "text-secondary hover:text-foreground hover:bg-surface-2")}
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => store.setTextAlign('center')}
            className={cn("p-2 rounded-lg transition-all", store.textAlign === 'center' ? "bg-foreground text-background" : "text-secondary hover:text-foreground hover:bg-surface-2")}
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            onClick={() => store.setTextAlign('right')}
            className={cn("p-2 rounded-lg transition-all", store.textAlign === 'right' ? "bg-foreground text-background" : "text-secondary hover:text-foreground hover:bg-surface-2")}
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-1 border-r border-border pr-2 mr-2">
          <button
            onClick={() => store.setLineHeight(Math.max(1, store.lineHeight - 0.1))}
            className="p-2 text-secondary hover:text-foreground hover:bg-surface-2 rounded-lg transition-all"
            title="Decrease Line Height"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <div className="flex flex-col items-center min-w-[30px]">
            <span className="text-[8px] uppercase tracking-tighter text-secondary font-bold">Line</span>
            <span className="text-xs font-mono font-bold text-foreground">{store.lineHeight.toFixed(1)}</span>
          </div>
          <button
            onClick={() => store.setLineHeight(Math.min(3, store.lineHeight + 0.1))}
            className="p-2 text-secondary hover:text-foreground hover:bg-surface-2 rounded-lg transition-all"
            title="Increase Line Height"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={() => store.toggleMirror()}
          className={cn("p-2 rounded-lg transition-all gap-2 flex items-center text-xs font-medium", store.isMirrored ? "bg-accent text-white shadow-[0_0_15px_--accent-glow]" : "text-secondary hover:text-foreground hover:bg-surface-2")}
          title="Mirror Mode (M)"
        >
          <FlipHorizontal className="w-4 h-4" />
          Mirror
        </button>
        <button
          onClick={() => store.toggleFocusMode()}
          className={cn("p-2 rounded-lg transition-all gap-2 flex items-center text-xs font-medium", store.focusMode ? "bg-accent text-white shadow-[0_0_15px_--accent-glow]" : "text-secondary hover:text-foreground hover:bg-surface-2")}
          title="Focus Mode"
        >
          <Focus className="w-4 h-4" />
          Focus
        </button>
        <button
          onClick={() => store.toggleGuide()}
          className={cn("p-2 rounded-lg transition-all gap-2 flex items-center text-xs font-medium", store.showGuide ? "bg-accent text-white shadow-[0_0_15px_--accent-glow]" : "text-secondary hover:text-foreground hover:bg-surface-2")}
          title="Reading Guide"
        >
          <Eye className="w-4 h-4" />
          Guide
        </button>

        {/* Countdown */}
        <div className="flex items-center gap-1 border-l border-border pl-2 ml-2">
          <button
            onClick={() => {
              const options = [0, 3, 5, 10];
              const currentIndex = options.indexOf(store.countdownDuration);
              const nextIndex = (currentIndex + 1) % options.length;
              store.setCountdownDuration(options[nextIndex]);
            }}
            className={cn(
              "p-2 rounded-lg transition-all gap-2 flex items-center text-xs font-medium",
              store.countdownDuration > 0 ? "bg-accent text-white shadow-[0_0_15px_--accent-glow]" : "text-secondary hover:text-foreground hover:bg-surface-2"
            )}
            title="Countdown before start"
          >
            <Timer className="w-4 h-4" />
            {store.countdownDuration === 0 ? 'Off' : `${store.countdownDuration}s`}
          </button>
        </div>
      </div>

      {/* Main Controls Row */}
      <div className="flex items-center gap-6 px-6 py-3 bg-surface/80 backdrop-blur-2xl border border-border rounded-3xl shadow-2xl scale-100 md:scale-110 w-[90vw] md:w-auto overflow-x-auto no-scrollbar">
        {/* Speed */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => store.decrementSpeed()}
            className="p-2 text-secondary hover:text-foreground hover:bg-surface-2 rounded-full transition-all"
            title="Decrease Speed (Down)"
          >
            <Minus className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center min-w-[60px]">
            <span className="text-[10px] uppercase tracking-tighter text-secondary font-bold">Speed</span>
            <span className="text-lg font-mono font-bold text-foreground leading-tight">{store.speed.toFixed(1)}</span>
          </div>
          <button
            onClick={() => store.incrementSpeed()}
            className="p-2 text-secondary hover:text-foreground hover:bg-surface-2 rounded-full transition-all"
            title="Increase Speed (Up)"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Play / Pause */}
        <button
          onClick={handleTogglePlay}
          className="w-14 h-14 flex items-center justify-center bg-foreground text-background rounded-full hover:scale-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          title="Play/Pause (Space)"
        >
          {store.isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
        </button>

        {/* Font Size */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => store.decrementFontSize()}
            className="p-2 text-secondary hover:text-foreground hover:bg-surface-2 rounded-full transition-all"
            title="Decrease Font Size (Left)"
          >
            <Type className="w-4 h-4" />
          </button>
          <div className="flex flex-col items-center min-w-[60px]">
            <span className="text-[10px] uppercase tracking-tighter text-secondary font-bold">Size</span>
            <span className="text-lg font-mono font-bold text-foreground leading-tight">{store.fontSize}</span>
          </div>
          <button
            onClick={() => store.incrementFontSize()}
            className="p-2 text-secondary hover:text-foreground hover:bg-surface-2 rounded-full transition-all"
            title="Increase Font Size (Right)"
          >
            <Type className="w-6 h-6" />
          </button>
        </div>

        {/* Extra Actions */}
        <div className="flex items-center gap-2 border-l border-border pl-4">
          <button
            onClick={() => store.resetScroll()}
            className="p-3 text-secondary hover:text-foreground hover:bg-surface-2 rounded-full transition-all"
            title="Reset (R)"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          {isPiPSupported && (
            <button
              onClick={handlePiP}
              className="p-3 text-secondary hover:text-foreground hover:bg-surface-2 rounded-full transition-all"
              title="Picture in Picture (P)"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={handleToggleFullscreen}
            className="p-3 text-secondary hover:text-foreground hover:bg-surface-2 rounded-full transition-all"
            title="Fullscreen (F)"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
