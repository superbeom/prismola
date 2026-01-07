// n8n Code Node: Aggregate Audio Segments (07)
// 업로드된 개별 오디오 파일의 URL을 수집하여 다시 하나의 배열로 병합합니다.

const items = $input.all();
const groups = {};

for (const item of items) {
    const json = item.json;

    // [중요] 비어있는 표현(expression)이거나 오디오 정보가 전혀 없는 아이템은 제외합니다.
    if (!json.expression) {
        console.warn(`[Prismola Warning] Skipping item: 'expression' field is missing. Input: ${JSON.stringify(json)}`);
        continue;
    }
    if (!json.storage_file_name && !json.public_url) {
        console.warn(`[Prismola Warning] Skipping item: Both 'storage_file_name' and 'public_url' are missing for expression '${json.expression}'.`);
        continue;
    }

    const expression = String(json.expression);

    if (!groups[expression]) {
        groups[expression] = {
            expression: expression,
            content: json.content ? JSON.parse(JSON.stringify(json.content)) : {},
            summary: json.summary ? JSON.parse(JSON.stringify(json.summary)) : {},
            tags: Array.isArray(json.tags) ? [...json.tags] : [],
            audio_segments: []
        };
    }

    // 업로드 결과에서 URL 추출
    // [보안] 인프라 URL 하드코딩 제거. 이전 노드(HTTP Request 등)에서 넘겨준 public_url 필드를 그대로 사용합니다.
    const publicUrl = json.public_url || null;

    groups[expression].audio_segments.push({
        role: String(json.tts_role || 'A'),
        index: Number(json.tts_line_index || 0),
        text: String(json.tts_input || ''),
        url: publicUrl
    });
}

// 최종 정렬 및 출력
return Object.values(groups).map(group => {
    group.audio_segments.sort((a, b) => a.index - b.index);
    return { json: group };
});

