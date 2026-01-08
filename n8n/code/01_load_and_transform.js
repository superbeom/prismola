// n8n Code Node: Load & Transform (Fan-out)
// Input: Raw JSON array from '0. Load Data'

const items = $input.all();
const target_langs = ['en', 'ko', 'ja', 'es'];

// API 사용량 조절을 위해 한 번 실행 시 단 하나의 표현(Expression)만 처리합니다.
if (items.length === 0) return [];

// 1. n8n 데이터 구조 유연성 확보 (배열인 경우 첫 번째 항목 추출)
let source = items[0].json;
if (Array.isArray(source)) {
    source = source[0];
}

let expression = source.expression || source.word;
let url = source.url || source.source_url || "";

// [Direct Reference Strategy]
// 현재 입력(input)에서 expression을 찾을 수 없는 경우(예: Duplicate Check 노드가 응답을 덮어씀), 
// '0. Load Data' 노드를 직접 참조하여 데이터를 가져오도록 시도합니다.
if (!expression) {
    try {
        const originalData = $("0. Load Data").first().json;
        expression = originalData.expression || originalData.word;
        url = originalData.url || originalData.source_url || url;
    } catch {
        // 직접 참조 실패 시 에러 메시지 생성을 위해 통과
    }
}

// 2. 최종 데이터 검증
if (!expression) {
    return [{
        json: {
            error: "No expression found in input data.",
            hint: "Check if the previous node (e.g. HTTP Request or IF) replaced the original data. This script tried to pull from '0. Load Data' but failed. Ensure the node names match.",
            received_data: source
        }
    }];
}

const output = [];

// 해당 표현에 대해 4개 국어 아이템을 생성 (Fan-out)
target_langs.forEach(lang => {
    output.push({
        json: {
            expression: expression,
            source_url: url,
            target_lang: lang,
            status: 'pending',
            group_id: expression, // 나중에 다시 합칠 때 사용할 키
            processed_at: new Date().toISOString()
        },
        pairedItem: { item: 0 } // 원본 아이템과의 연결 고리
    });
});

return output;
