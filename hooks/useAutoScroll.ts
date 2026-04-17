'use client';

import { useEffect, useRef } from 'react';
import { useTeleprompterStore } from '@/store/useTeleprompterStore';

/**
 * Drives the teleprompter auto-scroll using requestAnimationFrame.
 *
 * Uses a simple rAF loop that reads speed/playing state from the store
 * each frame. No useCallback or self-referencing — the loop function
 * is defined inline inside the effect that owns it.
 */
export function useAutoScroll(containerRef: React.RefObject<HTMLDivElement | null>) {
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Start / stop the rAF loop when isPlaying or speed changes
  const isPlaying = useTeleprompterStore((s) => s.isPlaying);
  const speed = useTeleprompterStore((s) => s.speed);

  useEffect(() => {
    if (!isPlaying || speed <= 0) {
      return;
    }

    // Reset timestamp so the first frame gets a clean delta
    lastTimeRef.current = 0;

    function step(timestamp: number) {
      const container = containerRef.current;
      if (!container) {
        rafRef.current = null;
        return;
      }

      // Check playing state each frame (may have changed externally)
      if (!useTeleprompterStore.getState().isPlaying) {
        rafRef.current = null;
        return;
      }

      // First frame — just record the time, don't scroll
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Read latest speed each frame so mid-scroll changes apply immediately
      const currentSpeed = useTeleprompterStore.getState().speed;
      const BASE_PX_PER_SEC = 50;
      const pxToScroll = (BASE_PX_PER_SEC * currentSpeed * delta) / 1000;

      const maxScroll = container.scrollHeight - container.clientHeight;

      if (container.scrollTop >= maxScroll) {
        useTeleprompterStore.getState().setIsPlaying(false);
        rafRef.current = null;
        return;
      }

      container.scrollTop = Math.min(container.scrollTop + pxToScroll, maxScroll);
      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isPlaying, speed, containerRef]);

  // Handle reset via the dedicated counter
  const resetCounter = useTeleprompterStore((s) => s._resetCounter);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = 0;
    }
  }, [resetCounter, containerRef]);

  return null;
}
