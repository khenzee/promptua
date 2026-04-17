'use client';

import { FileUp, Monitor, Play } from 'lucide-react';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-28 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Up and running in{' '}
            <span className="text-accent">seconds</span>
          </h2>
          <p className="text-secondary text-lg max-w-lg mx-auto">
            No accounts. No setup. Just paste and present.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Paste your script',
              description: 'Type directly, paste from your notes, or import a text file. The built-in editor shows word count and reading time.',
              icon: FileUp,
            },
            {
              step: '02',
              title: 'Customize your view',
              description: 'Adjust scroll speed, font size, line height, and text alignment. Enable focus mode or mirror mode for a professional setup.',
              icon: Monitor,
            },
            {
              step: '03',
              title: 'Present with confidence',
              description: 'Hit play and let the teleprompter guide you. Use keyboard shortcuts for hands-free control during your presentation.',
              icon: Play,
            },
          ].map((item) => (
            <div
              key={item.step}
              className="group relative p-8 rounded-2xl border border-border-2 bg-surface hover:border-accent/30 transition-all duration-300 hover:shadow-[0_0_40px_var(--accent-glow)]"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-secondary uppercase tracking-widest">{item.step}</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
