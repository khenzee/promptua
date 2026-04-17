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
  Minimize,
  FlipHorizontal,
  ExternalLink,
  Focus,
  Eye,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TeleprompterControls() {
  const store = useTeleprompterStore();

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

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4">
      {/* Settings Row */}
      <div className="flex items-center gap-2 p-2 bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/50 rounded-2xl shadow-2xl">
        {/* Alignment */}
        <div className="flex items-center gap-1 border-r border-zinc-800 pr-2 mr-2">
          <button
            onClick={() => store.setTextAlign('left')}
            className={cn("p-2 rounded-lg transition-all", store.textAlign === 'left' ? "bg-white text-black" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800")}
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => store.setTextAlign('center')}
            className={cn("p-2 rounded-lg transition-all", store.textAlign === 'center' ? "bg-white text-black" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800")}
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            onClick={() => store.setTextAlign('right')}
            className={cn("p-2 rounded-lg transition-all", store.textAlign === 'right' ? "bg-white text-black" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800")}
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-1 border-r border-zinc-800 pr-2 mr-2">
          <button
            onClick={() => store.setLineHeight(Math.max(1, store.lineHeight - 0.1))}
            className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-all"
            title="Decrease Line Height"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <div className="flex flex-col items-center min-w-[30px]">
            <span className="text-[8px] uppercase tracking-tighter text-zinc-500 font-bold">Line</span>
            <span className="text-xs font-mono font-bold text-white">{store.lineHeight.toFixed(1)}</span>
          </div>
          <button
            onClick={() => store.setLineHeight(Math.min(3, store.lineHeight + 0.1))}
            className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-all"
            title="Increase Line Height"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={() => store.toggleMirror()}
          className={cn("p-2 rounded-lg transition-all gap-2 flex items-center text-xs font-medium", store.isMirrored ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800")}
          title="Mirror Mode (M)"
        >
          <FlipHorizontal className="w-4 h-4" />
          Mirror
        </button>
        <button
          onClick={() => store.toggleFocusMode()}
          className={cn("p-2 rounded-lg transition-all gap-2 flex items-center text-xs font-medium", store.focusMode ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800")}
          title="Focus Mode"
        >
          <Focus className="w-4 h-4" />
          Focus
        </button>
        <button
          onClick={() => store.toggleGuide()}
          className={cn("p-2 rounded-lg transition-all gap-2 flex items-center text-xs font-medium", store.showGuide ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800")}
          title="Reading Guide"
        >
          <Eye className="w-4 h-4" />
          Guide
        </button>
      </div>

      {/* Main Controls Row */}
      <div className="flex items-center gap-6 px-6 py-3 bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl shadow-2xl scale-110">
        {/* Speed */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => store.decrementSpeed()}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all"
            title="Decrease Speed (Down)"
          >
            <Minus className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center min-w-[60px]">
            <span className="text-[10px] uppercase tracking-tighter text-zinc-500 font-bold">Speed</span>
            <span className="text-lg font-mono font-bold text-white leading-tight">{store.speed.toFixed(1)}</span>
          </div>
          <button
            onClick={() => store.incrementSpeed()}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all"
            title="Increase Speed (Up)"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Play / Pause */}
        <button
          onClick={() => store.togglePlay()}
          className="w-14 h-14 flex items-center justify-center bg-white text-black rounded-full hover:scale-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          title="Play/Pause (Space)"
        >
          {store.isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
        </button>

        {/* Font Size */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => store.decrementFontSize()}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all"
            title="Decrease Font Size (Left)"
          >
            <Type className="w-4 h-4" />
          </button>
          <div className="flex flex-col items-center min-w-[60px]">
            <span className="text-[10px] uppercase tracking-tighter text-zinc-500 font-bold">Size</span>
            <span className="text-lg font-mono font-bold text-white leading-tight">{store.fontSize}</span>
          </div>
          <button
            onClick={() => store.incrementFontSize()}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all"
            title="Increase Font Size (Right)"
          >
            <Type className="w-6 h-6" />
          </button>
        </div>

        {/* Extra Actions */}
        <div className="flex items-center gap-2 border-l border-zinc-800 pl-4">
          <button
            onClick={() => store.resetScroll()}
            className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all"
            title="Reset (R)"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={handlePiP}
            className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all"
            title="Picture in Picture (P)"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
          <button
            onClick={handleToggleFullscreen}
            className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all"
            title="Fullscreen (F)"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
