export interface ContentItem {
    hook: string;
    expression: string;
    meaning: string;
    fatal_mistake: {
        trap: string;
        reason: string;
        fix: string;
    };
    vibe_intensity_scale: string;
    micro_nuance_analysis: string;
    social_intelligence_map: {
        etiquette_guide: string;
        vibe_summary: string;
        shadow_vibe: string;
    };
    contrastive_mastery: {
        synonym_hierarchy: Array<{ word: string; vibe: string; confidence: string }>;
        why_this_wins: string;
    };
    scene_simulation: {
        scene: string;
        dialogue: Array<{ role: 'A' | 'B'; en: string; translation: string; intent: string }>;
    };
    mission: string;
    extreme_iq_quiz: {
        scenario: string;
        question: string;
        options: { A: string; B: string };
        answer: 'A' | 'B';
        social_calibration_feedback: string;
    };
}
