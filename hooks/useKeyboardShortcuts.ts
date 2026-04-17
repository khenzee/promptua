'use client';

import { useEffect } from 'react';
import { useTeleprompterStore } from '@/store/useTeleprompterStore';

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      const activeElement = document.activeElement as HTMLElement | null;
      if (
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.isContentEditable
      ) {
        // Special case: Esc should still work to exit fullscreen if focused in textarea
        if (e.key === 'Escape') {
          // handled by browser naturally for fullscreen
        } else {
          return;
        }
      }

      // Read fresh state from the store directly (avoids stale closure issues
      // and removes the need for `store` in the dependency array)
      const s = useTeleprompterStore.getState();

      switch (e.key) {
        case ' ':
          e.preventDefault();
          if (!s.isPlaying && !s.isCountingDown && s.countdownDuration > 0) {
            s.setCountdownSeconds(s.countdownDuration);
            s.setIsCountingDown(true);
          } else {
            if (s.isCountingDown) {
              s.setIsCountingDown(false);
            } else {
              s.togglePlay();
            }
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          s.incrementSpeed();
          break;
        case 'ArrowDown':
          e.preventDefault();
          s.decrementSpeed();
          break;
        case 'ArrowRight':
          e.preventDefault();
          s.incrementFontSize();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          s.decrementFontSize();
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          s.resetScroll();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          s.toggleMirror();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('toggle-pip'));
          break;
        case 'Home':
          e.preventDefault();
          s.resetScroll();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); // Empty deps — we read state imperatively via getState()

  return null;
}
