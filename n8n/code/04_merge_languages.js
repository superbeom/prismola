// n8n Code Node: Merge Languages (Prismola Premium 2.0 Aggregator V5.0)
// 'Prismola Premium 2.0' 체계의 방대한 데이터를 유실 없이 병합하여 구독 가치($20/mo)를 실현합니다.

const items = $input.all();

return items.map((item, index) => {
    const group = item.json;

    // 1. n8n Aggregate 노드의 데이터 구조에 따라 유연하게 대응
    const variants = group.variants || group.data || (Array.isArray(group) ? group : []);

    const content_map = {};
    const summary_map = {};
    let expression = group.expression || "";
    let dialogue_for_tts = "";
    let all_tags = new Set();

    if (variants.length === 0) {
        return { json: { error: "No variants found to merge. Check Aggregate node settings." } };
    }

    variants.forEach(variant => {
        const vData = variant.json ? variant.json : variant;
        const lang = vData.target_lang;
        const res = vData.content; // LLM이 뱉은 Premium 2.0 JSON 객체

        if (lang && res) {
            // [중요] 프리미엄 2.0 스키마 맵핑 (V5.0)
            // 유실 방지를 위해 모든 신규 필드를 포함합니다.
            content_map[lang] = {
                hook: res.hook,
                expression: res.expression || expression,
                meaning: res.meaning,
                fatal_mistake: res.fatal_mistake,
                vibe_intensity_scale: res.vibe_intensity_scale,
                micro_nuance_analysis: res.micro_nuance_analysis,
                social_intelligence_map: res.social_intelligence_map,
                contrastive_mastery: res.contrastive_mastery,
                scene_simulation: res.scene_simulation,
                mission: res.mission,
                quiz: res.extreme_iq_quiz || res.quiz,
                tags: res.tags
            };

            // UI 요약용 헤드라인 (Hook 우선)
            summary_map[lang] = res.hook || (res.micro_nuance_analysis ? res.micro_nuance_analysis.split('.')[0] + '.' : expression);

            // 태그 통합
            if (Array.isArray(res.tags)) {
                res.tags.forEach(t => all_tags.add(t.toLowerCase().trim()));
            }

            // 표현식 메타데이터 보존
            if (!expression && res.expression) {
                expression = res.expression;
            }

            // TTS용 텍스트 (영어 기준, V5.0 scene_simulation.dialogue 필드에서 추출)
            const sceneSimulation = res.scene_simulation;
            const targetDialogue = (sceneSimulation && Array.isArray(sceneSimulation.dialogue))
                ? sceneSimulation.dialogue
                : (res.mastery_dialogue || res.dialogue);

            if (lang === 'en' && Array.isArray(targetDialogue)) {
                dialogue_for_tts = targetDialogue.map(d => d.en).join('\n');
            }
        }
    });

    // Fallback: 영어 대화문이 없을 경우 첫 번째 언어 데이터 활용
    if (!dialogue_for_tts && Object.keys(content_map).length > 0) {
        const firstLang = Object.keys(content_map)[0];
        const firstSceneSim = content_map[firstLang].scene_simulation;
        const firstDialogue = (firstSceneSim && Array.isArray(firstSceneSim.dialogue))
            ? firstSceneSim.dialogue
            : content_map[firstLang].dialogue;

        if (Array.isArray(firstDialogue)) {
            dialogue_for_tts = firstDialogue.map(d => d.en).join('\n');
        }
    }

    return {
        json: {
            expression: expression,
            summary: summary_map,      // UI 상단 노출용 요약
            content: content_map,      // Premium 2.0 상세 데이터 (V5.0)
            tags: Array.from(all_tags),
            dialogue_text: dialogue_for_tts,
            merged_at: new Date().toISOString(),
            status: "success",
            quality_level: "prismola_premium_v5"
        },
        pairedItem: { item: index }
    };
});