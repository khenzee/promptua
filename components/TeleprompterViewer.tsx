'use client';

import React, { useEffect } from 'react';
import { useTeleprompterStore } from '@/store/useTeleprompterStore';
import { cn } from '@/lib/utils';

export default function TeleprompterViewer({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLDivElement | null> }) {
  const {
    text,
    fontSize,
    lineHeight,
    textAlign,
    isMirrored,
    focusMode,
    showGuide,
  } = useTeleprompterStore();

  // Ensure the viewer starts at scroll-top on mount
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTop = 0;
    }
  }, [scrollContainerRef]);

  return (
    <div className="relative flex-1 overflow-hidden bg-background flex flex-col items-center">
      {/* Scrollable Container — NO scroll-smooth (it fights with rAF-based scrolling) */}
      <div
        ref={scrollContainerRef}
        className={cn(
          "w-full h-full overflow-y-auto no-scrollbar",
          isMirrored && "scale-x-[-1]"
        )}
      >
        {/* Spacer at top to allow text to start at the guide line */}
        <div className="h-[50vh]" />
        
        <div
          className={cn(
            "px-12 pb-[50vh] transition-all duration-200 ease-out",
            textAlign === 'left' && "text-left",
            textAlign === 'center' && "text-center",
            textAlign === 'right' && "text-right"
          )}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: lineHeight,
            color: 'var(--foreground)',
            fontWeight: 600,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {text.split('\n').map((line, i) => (
            <div key={i} className="mb-4">
              {line || '\u00A0'}
            </div>
          ))}
        </div>
      </div>

      {/* Focus Mode Overlays */}
      {focusMode && (
        <>
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />
        </>
      )}

      {/* Reading Guide */}
      {showGuide && (
        <div className="absolute top-1/2 left-0 w-full flex items-center justify-center pointer-events-none z-20">
          <div className="w-full h-0.5 bg-blue-500/50 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-blue-500 rounded-r-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-blue-500 rounded-l-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          </div>
        </div>
      )}
    </div>
  );
}
