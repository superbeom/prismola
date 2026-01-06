// n8n Code Node: Merge Languages (Extreme Mastery Aggregator V3.0)
// 'Extreme Mastery' 체계의 방대한 데이터를 유실 없이 병합하여 프리미엄 DB 레코드를 생성합니다.

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
        const res = vData.content; // LLM이 뱉은 Extreme Mastery JSON 객체

        if (lang && res) {
            // [중요] 최신 'Extreme Mastery' 스키마 맵핑 (V3.0)
            content_map[lang] = {
                micro_nuance_analysis: res.micro_nuance_analysis,
                social_intelligence_map: res.social_intelligence_map,
                contrastive_mastery: res.contrastive_mastery,
                dialogue: res.mastery_dialogue || res.dialogue, // V3.0 필드명 우선
                expert_tip: res.native_expert_hack || res.expert_tip, // V3.0 필드명 우선
                quiz: res.extreme_iq_quiz || res.quiz // V3.0 필드명 우선
            };

            // UI 요약용 뜻 (V3.0에서는 별도의 필드 대신 뉘앙스나 핵심 뜻에서 추출)
            summary_map[lang] = res.micro_nuance_analysis ? res.micro_nuance_analysis.split('.')[0] + '.' : expression;

            // 태그 통합
            if (Array.isArray(res.tags)) {
                res.tags.forEach(t => all_tags.add(t.toLowerCase().trim()));
            }

            // 표현식 메타데이터 보존
            if (!expression && res.expression) {
                expression = res.expression;
            }

            // TTS용 텍스트 (영어 기준, dialogue 필드에서 추출)
            const targetDialogue = res.mastery_dialogue || res.dialogue;
            if (lang === 'en' && Array.isArray(targetDialogue)) {
                dialogue_for_tts = targetDialogue.map(d => d.en).join('\n');
            }
        }
    });

    // Fallback: 영어 대화문이 없을 경우 첫 번째 언어 데이터 활용
    if (!dialogue_for_tts && Object.keys(content_map).length > 0) {
        const firstLang = Object.keys(content_map)[0];
        const firstDialogue = content_map[firstLang].dialogue;
        if (Array.isArray(firstDialogue)) {
            dialogue_for_tts = firstDialogue.map(d => d.en).join('\n');
        }
    }

    return {
        json: {
            expression: expression,
            summary: summary_map,      // UI 상단 노출용 요약
            content: content_map,      // Extreme Mastery 상세 데이터
            tags: Array.from(all_tags),
            dialogue_text: dialogue_for_tts,
            merged_at: new Date().toISOString(),
            status: "success",
            quality_level: "extreme_mastery_v3"
        },
        pairedItem: { item: index }
    };
});