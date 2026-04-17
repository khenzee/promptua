'use client';

import { Focus, FlipHorizontal, Eye, PictureInPicture2, Keyboard, FileUp } from 'lucide-react';

export function Features() {
  return (
    <section id="features" className="px-6 py-28 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything you{' '}
            <span className="text-accent">need</span>
          </h2>
          <p className="text-secondary text-lg max-w-lg mx-auto">
            Professional features, zero learning curve.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Focus,
              title: 'Focus Mode',
              desc: 'Dims surrounding text so your eyes stay on the current line. Reduces cognitive load during live presentations.',
            },
            {
              icon: FlipHorizontal,
              title: 'Mirror Mode',
              desc: 'Flip the display horizontally for use with beam-splitter glass — just like the pros use on stage.',
            },
            {
              icon: Eye,
              title: 'Reading Guide',
              desc: 'A subtle guide line marks your reading position so you never lose your place mid-sentence.',
            },
            {
              icon: PictureInPicture2,
              title: 'Picture-in-Picture',
              desc: 'Pop the teleprompter into an always-on-top mini window. Perfect for reading while sharing your screen.',
            },
            {
              icon: Keyboard,
              title: 'Keyboard Shortcuts',
              desc: 'Full keyboard control for speed, font size, play/pause, fullscreen, and more — no mouse required.',
            },
            {
              icon: FileUp,
              title: 'File Import',
              desc: 'Import scripts from .txt files with one click. Your text is auto-saved locally across sessions.',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border border-border-2 bg-surface hover:border-accent/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
