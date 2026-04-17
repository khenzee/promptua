'use client';

import { ArrowRight } from 'lucide-react';

interface CtaProps {
  onLaunch: () => void;
}

export function Cta({ onLaunch }: CtaProps) {
  return (
    <section className="px-6 py-28 border-t border-white/5">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          Ready to{' '}
          <span className="text-accent">present?</span>
        </h2>
        <p className="text-secondary text-lg mb-10 max-w-md mx-auto">
          No signup needed. Your scripts stay on your device, always.
        </p>
        <button
          onClick={onLaunch}
          className="inline-flex items-center gap-3 px-8 py-4 text-base font-semibold rounded-full bg-accent text-white hover:bg-accent-hover transition-all hover:shadow-[0_0_40px_var(--accent-glow)] hover:scale-105 active:scale-95"
        >
          Launch Promptua
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
