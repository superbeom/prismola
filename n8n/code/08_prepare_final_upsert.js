// n8n Code Node: Prepare Final Upsert (08)
// Supabase PostgreSQL 노드에서 바로 사용할 수 있도록 최종 객체를 구성합니다.

const items = $input.all();

return items.map(item => {
    const data = item.json;

    // 최종 데이터 검증
    if (!data.expression || !data.audio_segments || data.audio_segments.length === 0) {
        throw new Error(`[Prismola] Attempting to upsert empty data for expression: ${data.expression}. Audio segments missing.`);
    }

    return {
        json: {
            expression: data.expression,
            content: data.content,
            summary: data.summary,
            tags: data.tags || [],
            audio_segments: data.audio_segments,
            updated_at: new Date().toISOString()
        }
    };
});

