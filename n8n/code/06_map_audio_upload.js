// n8n Code Node: Map to Supabase Storage Upload (06)
// TTS 바이너리 데이터를 Supabase Storage 노드가 인식할 수 있는 파일 객체로 변환합니다.

const items = $input.all();

return items.map(item => {
    const json = item.json;
    const binary = item.binary;

    // 1. JSON 데이터 강제 세탁 (순환 참조 원천 봉쇄)
    // 필요한 데이터만 새 객체에 할당 (Spread 연산자 사용 중지)
    const cleanJson = {
        expression: String(json.expression || ''),
        content: json.content ? JSON.parse(JSON.stringify(json.content)) : {},
        summary: json.summary ? JSON.parse(JSON.stringify(json.summary)) : {},
        tags: Array.isArray(json.tags) ? [...json.tags] : [],
        tts_role: String(json.tts_role || 'A'),
        tts_line_index: Number(json.tts_line_index || 0),
        tts_input: String(json.tts_input || '')
    };

    // 2. 파일명 및 경로 계산
    const safeExpression = cleanJson.expression.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const fileName = `${safeExpression}_${cleanJson.tts_role}_${cleanJson.tts_line_index}.wav`;
    const filePath = `posts/audio/${safeExpression}/${fileName}`;

    cleanJson.storage_path = filePath;
    cleanJson.storage_file_name = fileName;

    // 3. 바이너리 세탁
    // [중요] {...binary.data} 처럼 spread 연산자를 쓰면 n8n 내부의 파일 레퍼런스가 깨져서 0바이트 파일이 됩니다.
    // 기존 바이너리 객체(binary)를 그대로 가져오되, 메타데이터(파일명 등)만 업데이트합니다.
    let cleanBinary = {};
    if (binary && binary.data) {
        cleanBinary.data = binary.data;
        cleanBinary.data.fileName = fileName;
        cleanBinary.data.fileExtension = 'wav';
        cleanBinary.data.mimeType = 'audio/wav';
    }

    return {
        json: cleanJson,
        binary: cleanBinary
    };
});
