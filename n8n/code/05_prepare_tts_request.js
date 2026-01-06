// n8n Code Node: Prepare Multi-Voice TTS Requests (Groq Orpheus V1)
// 대화문의 역할(A, B)에 따라 아이템을 분리(Fan-out)하고 각각 다른 목소리를 할당합니다.

const items = $input.all();
let results = [];

items.forEach((item, itemIndex) => {
    const data = (item.json && typeof item.json === 'object') ? item.json : {};

    // 1. 영어 대화문 배열 추출 (04_merge_languages.js의 결과 구조 기준)
    const dialogueEntries = (data.content && data.content.en && data.content.en.dialogue)
        ? data.content.en.dialogue
        : [];

    if (dialogueEntries.length === 0) {
        // 대화문이 없는 경우 처리 (필요 시 기존 dialogue_text 활용)
        const fallbackText = data.dialogue_text || "";
        if (fallbackText) {
            results.push({
                json: {
                    ...data,
                    tts_model: "canopylabs/orpheus-v1-english",
                    tts_input: fallbackText.substring(0, 200),
                    tts_voice: "hannah",
                    tts_format: "wav",
                    tts_endpoint: "https://api.groq.com/openai/v1/audio/speech"
                },
                pairedItem: { item: itemIndex }
            });
        }
        return;
    }

    // 2. 대화문 라인별 아이템 생성 (Fan-out)
    dialogueEntries.forEach((entry, lineIndex) => {
        const rawText = entry.en || "";
        const role = (entry.role || "A").toUpperCase(); // A 또는 B

        // 텍스트 정제 (줄바꿈 제거 및 200자 제한)
        const cleanedText = rawText.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
        const ttsInput = cleanedText.length > 200
            ? cleanedText.substring(0, 197) + "..."
            : cleanedText;

        // 역할별 목소리 동적 할당
        // A: Hannah (여성), B: Troy (남성)
        const voice = (role === 'B') ? 'troy' : 'hannah';

        results.push({
            json: {
                ...data,
                tts_model: "canopylabs/orpheus-v1-english",
                tts_input: ttsInput,
                tts_voice: voice,
                tts_role: role,
                tts_line_index: lineIndex, // 순서 보존용
                tts_format: "wav",
                tts_endpoint: "https://api.groq.com/openai/v1/audio/speech"
            },
            pairedItem: { item: itemIndex }
        });
    });
});

return results;
