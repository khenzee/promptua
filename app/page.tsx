'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTeleprompterStore } from '@/store/useTeleprompterStore';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { AppPreview } from '@/components/landing/AppPreview';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Shortcuts } from '@/components/landing/Shortcuts';
import { Features } from '@/components/landing/Features';
import { Cta } from '@/components/landing/Cta';
import { Footer } from '@/components/landing/Footer';

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
      <Navbar onLaunch={handleStart} />
      <Hero script={script} setScript={setScript} onLaunch={handleStart} />
      <AppPreview />
      <HowItWorks />
      <Shortcuts />
      <Features />
      <Cta onLaunch={handleStart} />
      <Footer />
    </div>
  );
}
