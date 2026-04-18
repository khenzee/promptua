'use client';

import { Zap, ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  script: string;
  setScript: (val: string) => void;
  onLaunch: () => void;
}

export function Hero({ script, setScript, onLaunch }: HeroProps) {
  return (
    <section className="relative flex flex-col items-center justify-center pt-28 md:pt-40 pb-24 px-6">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-accent opacity-[0.06] blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-medium mb-8 animate-fade-in delay-100">
          <Zap className="w-3.5 h-3.5" />
          Free &amp; Open Source Teleprompter
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-foreground">
          Your words.{' '}
          <span className="bg-linear-to-r from-accent to-[#FF9933] bg-clip-text text-transparent">
            Front and center.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-secondary dark:text-zinc-400 max-w-xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200">
          A sleek, high-performance teleprompter built for presenters, creators, and speakers.
          Paste your script and start presenting in seconds.
        </p>

        {/* ── Hero Input ── */}
        <div className="w-full max-w-2xl mx-auto animate-fade-in-up delay-300">
          <div className="relative group">
            {/* Glow border */}
            <div className="absolute -inset-px rounded-2xl bg-linear-to-b from-accent/30 via-accent/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

            <div className="relative bg-surface border border-border-2 rounded-2xl overflow-hidden">
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Paste your script here to get started…"
                rows={5}
                className="w-full bg-transparent text-foreground placeholder:text-secondary dark:placeholder:text-zinc-300 px-6 py-5 text-base leading-relaxed resize-none focus:outline-none"
              />

              <div className="flex flex-col sm:flex-row items-center sm:justify-between px-6 pb-4 gap-4">
                <span className="text-xs text-secondary dark:text-zinc-600">
                  {script.trim() ? `${script.trim().split(/\s+/).length} words` : 'Or start with the built-in editor'}
                </span>

                <button
                  onClick={onLaunch}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full bg-accent text-white hover:bg-accent-hover transition-all hover:shadow-[0_0_30px_var(--accent-glow)] hover:scale-105 active:scale-95"
                >
                  Start Prompting
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-20 animate-fade-in delay-700">
        <ChevronDown className="w-5 h-5 text-secondary animate-bounce" />
      </div>
    </section>
  );
}
