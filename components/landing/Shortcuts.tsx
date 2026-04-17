'use client';

export function Shortcuts() {
  return (
    <section id="shortcuts" className="px-6 py-28 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Keyboard-first{' '}
            <span className="text-accent">control</span>
          </h2>
          <p className="text-secondary text-lg max-w-lg mx-auto">
            Keep your hands free. Every action has a shortcut.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { keys: ['Space'], action: 'Play / Pause scrolling' },
            { keys: ['↑', '↓'], action: 'Increase / Decrease speed' },
            { keys: ['←', '→'], action: 'Decrease / Increase font size' },
            { keys: ['R'], action: 'Reset scroll to beginning' },
            { keys: ['F'], action: 'Toggle fullscreen mode' },
            { keys: ['M'], action: 'Toggle mirror mode' },
            { keys: ['P'], action: 'Picture-in-Picture window' },
            { keys: ['Home'], action: 'Jump to start' },
          ].map((shortcut) => (
            <div
              key={shortcut.action}
              className="flex items-center justify-between px-5 py-4 rounded-xl border border-border-2 bg-surface hover:border-accent/20 transition-colors"
            >
              <span className="text-sm text-secondary">{shortcut.action}</span>
              <div className="flex items-center gap-1.5">
                {shortcut.keys.map((key) => (
                  <kbd
                    key={key}
                    className="inline-flex items-center justify-center min-w-[32px] h-8 px-2.5 text-xs font-mono font-semibold text-foreground bg-surface-2 border border-border-2 rounded-lg shadow-sm"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
