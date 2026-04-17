'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

interface NavbarProps {
  onLaunch: () => void;
}

export function Navbar({ onLaunch }: NavbarProps) {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Promptua
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-secondary dark:text-zinc-400">
          <Link href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</Link>
          <Link href="#shortcuts" className="hover:text-foreground transition-colors">Shortcuts</Link>
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/khenzee/promptua"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-secondary hover:text-foreground"
            aria-label="GitHub Repository"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
            </svg>
          </Link>
          <ThemeToggle />
          <button
            onClick={onLaunch}
            className="px-4 sm:px-5 py-2 text-sm font-semibold rounded-full bg-accent text-white hover:bg-accent-hover transition-all hover:shadow-[0_0_24px_var(--accent-glow)] whitespace-nowrap"
          >
            <span className="hidden sm:inline">Launch App →</span>
            <span className="sm:hidden">Launch</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
