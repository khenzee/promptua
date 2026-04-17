'use client';

import React from 'react';
import TeleprompterEditor from '@/components/TeleprompterEditor';
import TeleprompterViewer from '@/components/TeleprompterViewer';
import TeleprompterControls from '@/components/TeleprompterControls';
import TeleprompterPiP from '@/components/TeleprompterPiP';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function TeleprompterPage() {
  const viewerRef = React.useRef<HTMLDivElement>(null);

  // Initialize hooks
  useAutoScroll(viewerRef);
  useKeyboardShortcuts();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground selection:bg-accent selection:text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <main className="flex flex-1 relative z-10 overflow-hidden">
        {/* Left Panel: Editor */}
        <div className="w-[400px] lg:w-[450px] shrink-0 hidden md:flex flex-col transition-all duration-300">
          <TeleprompterEditor />
        </div>

        {/* Right Panel: Viewer */}
        <div className="flex-1 flex flex-col relative">
          <TeleprompterViewer scrollContainerRef={viewerRef} />
        </div>
      </main>

      {/* Floating Controls */}
      <TeleprompterControls />

      {/* Logic Components (No UI) */}
      <TeleprompterPiP viewerRef={viewerRef} />
      
      {/* Screen Reader Announcements */}
      <div className="sr-only" aria-live="polite">
        Teleprompter app ready. Use Space to play and pause. Arrow keys for speed and size.
      </div>
    </div>
  );
}
