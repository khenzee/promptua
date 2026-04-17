'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="px-6 py-8 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-secondary">
        <span>
          © {new Date().getFullYear()} Prompt<span className="text-accent">ua</span>
        </span>
        <div className="flex items-center gap-6">
          <Link
            href="https://github.com/khenzee/promptua"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors inline-flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
            </svg>
            Star on GitHub
          </Link>
          <span>
            Built with ♥ for presenters everywhere
          </span>
        </div>
      </div>
    </footer>
  );
}
