'use client';

import Image from "next/image";
import { Sparkles, Globe, AudioLines, Zap, ChevronRight } from "lucide-react";
import { MOCK_POST } from "@/lib/mock-data";
import { ExpressionCard } from "@/components/ExpressionCard";
import { useDictionary } from "@/hooks/useDictionary";

export default function Home() {
  const dict = useDictionary();

  return (
    <div className="relative min-h-screen overflow-x-hidden pt-20">
      {/* Noise Overlay */}
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.03]" />

      {/* Navigation */}
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between px-8 py-6 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg prism-gradient shadow-lg shadow-primary/20" />
          <span className="font-display text-2xl font-black tracking-tighter">{dict.nav.logo}</span>
        </div>
        <div className="hidden gap-8 text-sm font-bold text-slate-400 md:flex">
          <a href="#" className="hover:text-white transition-colors">{dict.nav.philosophy}</a>
          <a href="#" className="hover:text-white transition-colors">{dict.nav.mastery}</a>
          <a href="#" className="hover:text-white transition-colors">{dict.nav.pricing}</a>
        </div>
        <button className="rounded-full bg-white px-6 py-2 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95">
          {dict.nav.getStarted}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 text-center">
        {/* Decorative Orbs */}
        <div className="absolute top-1/4 left-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/20 blur-[120px] animate-pulse delay-700" />

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-primary mb-8">
            {dict.hero.badge}
          </span>
          <h1 className="mx-auto max-w-4xl text-6xl font-black leading-[1.05] md:text-8xl lg:text-9xl">
            {dict.hero.title.prefix} <br />
            <span className="prism-text-gradient italic px-2">{dict.hero.title.highlight}</span>
          </h1>

          <p className="mt-8 mx-auto max-w-2xl text-lg text-slate-400 md:text-xl leading-relaxed">
            {dict.hero.description.text}
            <span className="text-white font-semibold"> {dict.hero.description.highlight}</span>
            {dict.hero.description.suffix}
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="group relative flex items-center gap-2 rounded-2xl prism-gradient px-8 py-4 font-bold text-white shadow-2xl shadow-primary/20 transition-all hover:scale-105">
              {dict.hero.cta.primary} <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10">
              {dict.hero.cta.secondary}
            </button>
          </div>
        </div>

        {/* Hero Image Container */}
        <div className="mt-24 relative w-full max-w-5xl group animate-in zoom-in-95 duration-1000 delay-300">
          <div className="absolute -inset-1 rounded-[2.5rem] prism-gradient opacity-20 blur-2xl transition duration-1000 group-hover:opacity-40" />
          <div className="relative rounded-[2rem] border border-white/10 bg-bg-surface p-2 backdrop-blur-3xl">
            <Image
              src="/images/hero.png"
              alt="Prismola Platform"
              width={1200}
              height={800}
              className="rounded-3xl shadow-2xl shadow-black/50 overflow-hidden"
              priority
            />

            {/* Dynamic Badge */}
            <div className="absolute -bottom-8 -right-8 rounded-2xl glass-card p-6 shadow-2xl hidden lg:block animate-in slide-in-from-right-12 duration-1000 delay-500">
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <AudioLines />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1">{dict.hero.dynamicBadge.label}</p>
                  <p className="font-display font-bold text-lg leading-none">{dict.hero.dynamicBadge.value}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Expression (Live Preview) */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-bg-surface/50">
        <div className="mx-auto max-w-7xl mb-24 text-center">
          <span className="text-secondary font-black uppercase tracking-[0.3em] text-sm">{dict.livePreview.label}</span>
          <h2 className="text-4xl md:text-6xl font-black mt-4">{dict.livePreview.title}</h2>
        </div>
        <ExpressionCard post={MOCK_POST} />
      </section>

      {/* Feature Grid */}
      <section className="py-40 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black mb-6">{dict.featureGrid.title}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{dict.featureGrid.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="text-primary" />,
                title: dict.featureGrid.features.oneSource.title,
                desc: dict.featureGrid.features.oneSource.desc
              },
              {
                icon: <Zap className="text-secondary" />,
                title: dict.featureGrid.features.extremeMastery.title,
                desc: dict.featureGrid.features.extremeMastery.desc
              },
              {
                icon: <Sparkles className="text-accent" />,
                title: dict.featureGrid.features.audioSimulator.title,
                desc: dict.featureGrid.features.audioSimulator.desc
              }
            ].map((feature, i) => (
              <div key={i} className="group relative rounded-[2rem] border border-white/5 bg-white/[0.02] p-10 transition-all hover:bg-white/[0.05] hover:border-white/10">
                <div className="mb-6 h-14 w-14 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/5 transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 text-slate-500 text-center md:text-left">
          <div className="flex items-center gap-2 grayscale brightness-50 justify-center md:justify-start">
            <div className="h-6 w-6 rounded-md prism-gradient" />
            <span className="font-display font-black tracking-tighter text-lg">{dict.nav.logo}</span>
          </div>
          <p className="text-sm">{dict.footer.copyright}</p>
          <div className="flex gap-6 text-sm font-bold justify-center md:justify-end">
            <a href="#" className="hover:text-white transition-colors">{dict.footer.links.twitter}</a>
            <a href="#" className="hover:text-white transition-colors">{dict.footer.links.github}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
