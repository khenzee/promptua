'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTeleprompterStore } from '@/store/useTeleprompterStore';
import {
  Play,
  Keyboard,
  Monitor,
  FlipHorizontal,
  Focus,
  Eye,
  FileUp,
  PictureInPicture2,
  ArrowRight,
  ChevronDown,
  Zap,
  Space,
  ArrowUp,
  ArrowDown,
  ArrowRightIcon,
} from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

/* ─────────────────────────────────────────────────────────────
   Landing Page – Promptua
   ────────────────────────────────────────────────────────────── */

export default function LandingPage() {
  const router = useRouter();
  const setText = useTeleprompterStore((s) => s.setText);
  const [script, setScript] = useState('');

  const handleStart = () => {
    if (script.trim()) {
      setText(script.trim());
    }
    router.push('/teleprompter');
  };

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* ── Nav ──────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-[var(--border)] bg-background/70 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Promptua
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-500 dark:text-zinc-400">
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
            <a href="#shortcuts" className="hover:text-foreground transition-colors">Shortcuts</a>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={handleStart}
              className="px-5 py-2 text-sm font-semibold rounded-full bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all hover:shadow-[0_0_24px_var(--accent-glow)]"
            >
              Launch App →
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center pt-40 pb-24 px-6">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[var(--accent)] opacity-[0.06] blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 text-[var(--accent)] text-xs font-medium mb-8 animate-fade-in delay-100">
            <Zap className="w-3.5 h-3.5" />
            Free &amp; Open Source Teleprompter
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-foreground">
            Your words.{' '}
            <span className="bg-gradient-to-r from-[var(--accent)] to-[#FF9933] bg-clip-text text-transparent">
              Front and center.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200">
            A sleek, high-performance teleprompter built for presenters, creators, and speakers.
            Paste your script and start presenting in seconds.
          </p>

          {/* ── Hero Input ── */}
          <div className="w-full max-w-2xl mx-auto animate-fade-in-up delay-300">
            <div className="relative group">
              {/* Glow border */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[var(--accent)]/30 via-[var(--accent)]/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-[var(--surface)] border border-[var(--border-2)] rounded-2xl overflow-hidden">
                <textarea
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  placeholder="Paste your script here to get started…"
                  rows={5}
                  className="w-full bg-transparent text-foreground placeholder:text-zinc-500 dark:placeholder:text-zinc-600 px-6 py-5 text-base leading-relaxed resize-none focus:outline-none"
                />

                <div className="flex items-center justify-between px-6 pb-4">
                  <span className="text-xs text-zinc-500 dark:text-zinc-600">
                    {script.trim() ? `${script.trim().split(/\s+/).length} words` : 'Or start with the built-in editor'}
                  </span>

                  <button
                    onClick={handleStart}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all hover:shadow-[0_0_30px_var(--accent-glow)] hover:scale-105 active:scale-95"
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
          <ChevronDown className="w-5 h-5 text-zinc-600 animate-bounce" />
        </div>
      </section>

      {/* ── App Screenshot ───────────────────────────────────── */}
      <section className="relative px-6 pb-32">
        <div className="max-w-5xl mx-auto animate-fade-in-up delay-400">
          <div className="relative group">
            {/* Glow behind screenshot */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
              {/* Browser chrome mock */}
              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md bg-zinc-800 text-xs text-zinc-500 font-mono">
                    promptua.app/teleprompter
                  </div>
                </div>
              </div>

              <img
                src="/app-screenshot.png"
                alt="Promptua teleprompter interface showing the script editor, viewer, and control panel"
                className="w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section id="how-it-works" className="px-6 py-28 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Up and running in{' '}
              <span className="text-[var(--accent)]">seconds</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-lg mx-auto">
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
            ].map((item, i) => (
              <div
                key={item.step}
                className="group relative p-8 rounded-2xl border border-[var(--border-2)] bg-[var(--surface)] hover:border-[var(--accent)]/30 transition-all duration-300 hover:shadow-[0_0_40px_var(--accent-glow)]"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)]/20 transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-widest">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Keyboard Shortcuts ────────────────────────────────── */}
      <section id="shortcuts" className="px-6 py-28 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Keyboard-first{' '}
              <span className="text-[var(--accent)]">control</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-lg mx-auto">
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
                className="flex items-center justify-between px-5 py-4 rounded-xl border border-[var(--border-2)] bg-[var(--surface)] hover:border-[var(--accent)]/20 transition-colors"
              >
                <span className="text-sm text-[var(--text-secondary)]">{shortcut.action}</span>
                <div className="flex items-center gap-1.5">
                  {shortcut.keys.map((key) => (
                    <kbd
                      key={key}
                      className="inline-flex items-center justify-center min-w-[32px] h-8 px-2.5 text-xs font-mono font-semibold text-foreground bg-[var(--surface-2)] border border-[var(--border-2)] rounded-lg shadow-sm"
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

      {/* ── Features ─────────────────────────────────────────── */}
      <section id="features" className="px-6 py-28 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Everything you{' '}
              <span className="text-[var(--accent)]">need</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-lg mx-auto">
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
                className="group p-6 rounded-2xl border border-[var(--border-2)] bg-[var(--surface)] hover:border-[var(--accent)]/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mb-4 group-hover:bg-[var(--accent)]/20 transition-colors">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="px-6 py-28 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Ready to{' '}
            <span className="text-[var(--accent)]">present?</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-10 max-w-md mx-auto">
            No signup needed. Your scripts stay on your device, always.
          </p>
          <button
            onClick={handleStart}
            className="inline-flex items-center gap-3 px-8 py-4 text-base font-semibold rounded-full bg-[var(--accent)] text-black hover:bg-[var(--accent-hover)] transition-all hover:shadow-[0_0_40px_var(--accent-glow)] hover:scale-105 active:scale-95"
          >
            Launch Promptua
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="px-6 py-8 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--text-secondary)]">
          <span>
            © {new Date().getFullYear()} Prompt<span className="text-[var(--accent)]">ua</span>
          </span>
          <span>
            Built with ♥ for presenters everywhere
          </span>
        </div>
      </footer>
    </div>
  );
}
