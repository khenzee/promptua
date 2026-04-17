'use client';

import { useEffect, useRef } from 'react';
import { useTeleprompterStore } from '@/store/useTeleprompterStore';

// Declare types for Document PiP API
declare global {
  interface Window {
    documentPictureInPicture: {
      requestWindow: (options?: { width?: number; height?: number }) => Promise<Window>;
    };
  }
}

/**
 * Opens a Document Picture-in-Picture window that mirrors the teleprompter
 * viewer and stays scroll-synced with the main window.
 *
 * Requires Chrome/Edge 116+.  Falls back to an alert on unsupported browsers.
 */
export default function TeleprompterPiP({
  viewerRef,
}: {
  viewerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const pipWindowRef = useRef<Window | null>(null);

  useEffect(() => {
    const handleTogglePiP = async () => {
      if (!('documentPictureInPicture' in window)) {
        alert(
          'Document Picture-in-Picture is not supported in your browser.\nPlease use Chrome or Edge 116+.'
        );
        return;
      }

      // If already open, close it
      if (pipWindowRef.current) {
        pipWindowRef.current.close();
        pipWindowRef.current = null;
        return;
      }

      try {
        const pipWindow = await window.documentPictureInPicture.requestWindow({
          width: 600,
          height: 400,
        });

        pipWindowRef.current = pipWindow;

        // ── Base styles (inline, no Tailwind dependency) ──────────────
        const style = pipWindow.document.createElement('style');
        style.textContent = `
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background: #000;
            color: #fff;
            font-family: system-ui, -apple-system, sans-serif;
            overflow: hidden;
            height: 100vh;
          }
          #pip-scroll {
            width: 100%;
            height: 100%;
            overflow-y: auto;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          #pip-scroll::-webkit-scrollbar { display: none; }
          #pip-text {
            padding: 0 1.5rem;
          }
          .pip-line { margin-bottom: 0.75rem; }
          .pip-spacer { height: 50vh; }
          /* Guide line */
          #pip-guide {
            position: fixed;
            top: 50%;
            left: 0;
            width: 100%;
            height: 2px;
            background: rgba(59,130,246,0.45);
            pointer-events: none;
            z-index: 10;
          }
          /* Focus overlays */
          .pip-focus-top {
            position: fixed; top: 0; left: 0; width: 100%; height: 33%;
            background: linear-gradient(to bottom, #000, rgba(0,0,0,.8), transparent);
            pointer-events: none; z-index: 5;
          }
          .pip-focus-bottom {
            position: fixed; bottom: 0; left: 0; width: 100%; height: 33%;
            background: linear-gradient(to top, #000, rgba(0,0,0,.8), transparent);
            pointer-events: none; z-index: 5;
          }
        `;
        pipWindow.document.head.appendChild(style);

        // ── Build DOM ─────────────────────────────────────────────────
        const body = pipWindow.document.body;

        // Guide line
        const guide = pipWindow.document.createElement('div');
        guide.id = 'pip-guide';
        body.appendChild(guide);

        // Focus overlays
        const focusTop = pipWindow.document.createElement('div');
        focusTop.className = 'pip-focus-top';
        const focusBottom = pipWindow.document.createElement('div');
        focusBottom.className = 'pip-focus-bottom';
        body.appendChild(focusTop);
        body.appendChild(focusBottom);

        // Scroll container
        const scrollEl = pipWindow.document.createElement('div');
        scrollEl.id = 'pip-scroll';
        body.appendChild(scrollEl);

        // Text container
        const textEl = pipWindow.document.createElement('div');
        textEl.id = 'pip-text';
        scrollEl.appendChild(textEl);

        // ── Render helper ─────────────────────────────────────────────
        function renderContent() {
          const { text, fontSize, lineHeight, textAlign, isMirrored, focusMode, showGuide } =
            useTeleprompterStore.getState();

          // Rebuild text content
          textEl.innerHTML = '';

          // Top spacer
          const topSpacer = pipWindow.document.createElement('div');
          topSpacer.className = 'pip-spacer';
          textEl.appendChild(topSpacer);

          // Text lines
          const lines = text.split('\n');
          lines.forEach((line) => {
            const div = pipWindow.document.createElement('div');
            div.className = 'pip-line';
            div.textContent = line || '\u00A0';
            textEl.appendChild(div);
          });

          // Bottom spacer
          const bottomSpacer = pipWindow.document.createElement('div');
          bottomSpacer.className = 'pip-spacer';
          textEl.appendChild(bottomSpacer);

          // Apply styles
          textEl.style.fontSize = `${Math.round(fontSize * 0.55)}px`;
          textEl.style.lineHeight = `${lineHeight}`;
          textEl.style.fontWeight = '600';
          textEl.style.textAlign = textAlign;
          scrollEl.style.transform = isMirrored ? 'scaleX(-1)' : 'none';

          // Toggle overlays
          focusTop.style.display = focusMode ? 'block' : 'none';
          focusBottom.style.display = focusMode ? 'block' : 'none';
          guide.style.display = showGuide ? 'block' : 'none';
        }

        // Initial render
        renderContent();

        // ── Subscribe to store changes ────────────────────────────────
        const unsubscribe = useTeleprompterStore.subscribe(renderContent);

        // ── Scroll sync loop ──────────────────────────────────────────
        let syncRaf: number | null = null;

        function syncScroll() {
          const mainEl = viewerRef.current;
          if (mainEl && scrollEl) {
            const mainMax = mainEl.scrollHeight - mainEl.clientHeight;
            const pipMax = scrollEl.scrollHeight - scrollEl.clientHeight;
            if (mainMax > 0 && pipMax > 0) {
              const ratio = mainEl.scrollTop / mainMax;
              scrollEl.scrollTop = ratio * pipMax;
            }
          }
          syncRaf = pipWindow.requestAnimationFrame(syncScroll);
        }

        syncRaf = pipWindow.requestAnimationFrame(syncScroll);

        // ── Cleanup when PiP is closed ────────────────────────────────
        pipWindow.addEventListener('pagehide', () => {
          unsubscribe();
          if (syncRaf !== null) pipWindow.cancelAnimationFrame(syncRaf);
          pipWindowRef.current = null;
        });
      } catch (err) {
        console.error('Failed to open PiP window:', err);
      }
    };

    window.addEventListener('toggle-pip', handleTogglePiP);
    return () => window.removeEventListener('toggle-pip', handleTogglePiP);
  }, [viewerRef]);

  return null;
}
