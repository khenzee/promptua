'use client';

import Image from 'next/image';

export function AppPreview() {
  return (
    <section className="relative px-6 pb-32">
      <div className="max-w-5xl mx-auto animate-fade-in-up delay-400">
        <div className="relative group">
          {/* Glow behind screenshot */}
          <div className="absolute -inset-4 rounded-3xl bg-linear-to-b from-accent/10 via-accent/5 to-transparent blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
            {/* Browser chrome mock */}
            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-zinc-800 text-xs text-secondary font-mono">
                  promptua.app/teleprompter
                </div>
              </div>
            </div>

            <Image
              src="/app-screenshot.png"
              alt="Promptua teleprompter interface showing the script editor, viewer, and control panel"
              width={1920}
              height={1080}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
