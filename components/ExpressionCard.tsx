'use client';

import {
    AlertTriangle,
    Thermometer,
    BrainCircuit,
    Users,
    Library,
    Clapperboard,
    Target,
    HelpCircle,
    Play
} from 'lucide-react';
import { Post } from '@/types';
import { useLocale } from '@/context/LocaleContext';

interface ExpressionCardProps {
    post: Post;
}

export function ExpressionCard({ post }: ExpressionCardProps) {
    const { locale } = useLocale();
    const content = post.content[locale];

    if (!content) {
        return <div className="p-8 text-center text-slate-500">Content not available in {locale}</div>;
    }

    return (
        <div className="mx-auto max-w-4xl space-y-12 pb-20">
            {/* 1. Header / The Hook */}
            <header className="text-center space-y-4">
                <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-primary">
                    Premium 2.0 Analysis
                </span>
                <h2 className="prism-text-gradient text-4xl font-black md:text-5xl lg:text-6xl italic">
                    &quot;{content.expression}&quot;
                </h2>
                <h1 className="text-2xl font-bold text-slate-200 md:text-3xl">
                    {content.hook}
                </h1>
                <p className="text-lg text-slate-400 italic">
                    {content.meaning}
                </p>
            </header>

            {/* 2. Fatal Mistake */}
            <section className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 backdrop-blur-sm">
                <div className="flex items-start gap-6">
                    <div className="rounded-2xl bg-red-500/10 p-4 text-red-500">
                        <AlertTriangle size={32} />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-red-500">Fatal Mistake Analysis</h3>
                        <div className="grid gap-6 md:grid-cols-3">
                            <div>
                                <p className="text-xs uppercase font-black text-red-500/50 tracking-widest mb-1">The Trap</p>
                                <p className="font-bold">{content.fatal_mistake.trap}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase font-black text-red-500/50 tracking-widest mb-1">Reason</p>
                                <p className="text-slate-300 text-sm leading-relaxed">{content.fatal_mistake.reason}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase font-black text-red-500/50 tracking-widest mb-1">Modern Fix</p>
                                <p className="text-white font-bold underline decoration-red-500 underline-offset-4">{content.fatal_mistake.fix}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3 & 4. Vibe Scale & Nuance Analysis */}
            <div className="grid gap-8 md:grid-cols-2">
                <section className="glass-card rounded-[2.5rem] p-10 space-y-6">
                    <div className="flex items-center gap-4 text-secondary">
                        <Thermometer size={24} />
                        <h3 className="text-xl font-bold">Vibe Intensity Scale</h3>
                    </div>
                    <div className="relative h-4 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 bg-secondary shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-1000"
                            style={{ width: `${(parseInt(content.vibe_intensity_scale) / 10) * 100}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 tracking-widest">
                        <span>Chill</span>
                        <span>Intense</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-sm">
                        Intensity Level: <span className="text-white font-bold">{content.vibe_intensity_scale}/10</span>
                    </p>
                </section>

                <section className="glass-card rounded-[2.5rem] p-10 space-y-6">
                    <div className="flex items-center gap-4 text-primary">
                        <BrainCircuit size={24} />
                        <h3 className="text-xl font-bold">Micro-Nuance Analysis</h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed italic">
                        &quot;{content.micro_nuance_analysis}&quot;
                    </p>
                </section>
            </div>

            {/* 5 & 6. Social Intelligence & Strategic Hierarchy */}
            <section className="glass-card rounded-[2.5rem] p-10">
                <div className="grid gap-12 md:grid-cols-2">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-accent">
                            <Users size={24} />
                            <h3 className="text-xl font-bold">Social Calibration</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-black uppercase text-accent/50 mb-1">Etiquette Guide</p>
                                <p className="text-sm text-slate-300">{content.social_intelligence_map.etiquette_guide}</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="rounded-xl bg-green-500/10 p-4 border border-green-500/20 w-1/2">
                                    <p className="text-[10px] font-black uppercase text-green-500 mb-1">Vibe</p>
                                    <p className="text-xs font-bold text-white">{content.social_intelligence_map.vibe_summary}</p>
                                </div>
                                <div className="rounded-xl bg-purple-500/10 p-4 border border-purple-500/20 w-1/2">
                                    <p className="text-[10px] font-black uppercase text-purple-500 mb-1">Shadow</p>
                                    <p className="text-xs font-bold text-white">{content.social_intelligence_map.shadow_vibe}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-slate-200">
                            <Library size={24} />
                            <h3 className="text-xl font-bold">Strategic Hierarchy</h3>
                        </div>
                        <div className="space-y-4">
                            {content.contrastive_mastery.synonym_hierarchy.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-2">
                                    <span className="font-bold text-white">{item.word}</span>
                                    <div className="flex gap-2">
                                        <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-bold text-slate-400 uppercase">{item.vibe}</span>
                                        <span className="rounded-md bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary uppercase">IQ: {item.confidence}</span>
                                    </div>
                                </div>
                            ))}
                            <p className="text-xs text-slate-500 pt-2 italic">
                                Why this wins: {content.contrastive_mastery.why_this_wins}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Scene Simulation */}
            <section className="relative rounded-[3rem] bg-bg-surface border border-white/10 p-12 overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Clapperboard size={120} />
                </div>

                <div className="space-y-8 relative z-10">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-2xl font-black italic">Scene Simulation</h3>
                            <p className="text-sm text-slate-400">{content.scene_simulation.scene}</p>
                        </div>
                        <button className="h-14 w-14 rounded-full prism-gradient flex items-center justify-center text-white shadow-xl hover:scale-105 transition-transform">
                            <Play fill="currentColor" size={24} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {content.scene_simulation.dialogue.map((line, idx) => (
                            <div key={idx} className={`flex gap-4 ${line.role === 'B' ? 'flex-row-reverse' : ''}`}>
                                <div className="h-10 w-10 shrink-0 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs">
                                    {line.role}
                                </div>
                                <div className={`max-w-[80%] space-y-2 rounded-2xl p-6 ${line.role === 'B' ? 'bg-primary/20 border border-primary/20 rounded-tr-none' : 'bg-slate-800/50 border border-white/5 rounded-tl-none'}`}>
                                    <p className="text-white font-medium">{line.en}</p>
                                    <p className="text-sm text-slate-400 border-t border-white/5 pt-2">{line.translation}</p>
                                    <span className="inline-block text-[9px] font-black uppercase tracking-widest text-primary/60">{line.intent}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. Mission */}
            <section className="prism-gradient rounded-3xl p-10 flex items-center justify-between overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="relative z-10 space-y-2">
                    <div className="flex items-center gap-3 text-white">
                        <Target size={24} />
                        <h3 className="text-2xl font-black">Mission of the Day</h3>
                    </div>
                    <p className="text-white/90 font-bold text-lg md:text-xl">
                        {content.mission}
                    </p>
                </div>
                <div className="relative z-10 hidden md:block">
                    <button className="rounded-xl bg-white px-6 py-3 font-black text-black text-sm uppercase transition-transform hover:-translate-y-1">
                        Accept Mission
                    </button>
                </div>
            </section>

            {/* 9. Extreme IQ Quiz */}
            <section className="glass-card rounded-[3rem] p-12 space-y-8">
                <div className="flex items-center gap-4 text-amber-500">
                    <HelpCircle size={28} />
                    <h3 className="text-2xl font-black">Extreme IQ Quiz</h3>
                </div>

                <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5">
                    <p className="text-xs uppercase font-black text-slate-500 tracking-widest mb-2">Scenario</p>
                    <p className="text-slate-200">{content.extreme_iq_quiz.scenario}</p>
                </div>

                <div className="space-y-6">
                    <p className="text-xl font-bold">{content.extreme_iq_quiz.question}</p>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {Object.entries(content.extreme_iq_quiz.options).map(([key, value]) => (
                            <button
                                key={key}
                                className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all hover:bg-white/10 hover:border-primary/50"
                            >
                                <div className="mb-4 h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center font-black group-hover:bg-primary/20 group-hover:text-primary">
                                    {key}
                                </div>
                                <p className="font-bold text-slate-300 group-hover:text-white">{value}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
