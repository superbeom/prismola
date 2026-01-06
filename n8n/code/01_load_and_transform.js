// n8n Code Node: Load & Transform (Fan-out)
// Input: Raw JSON array from '0. Load Data'

const items = $input.all();
const target_langs = ['en', 'ko', 'ja', 'es'];

// API 사용량 조절을 위해 한 번 실행 시 단 하나의 표현(Expression)만 처리합니다.
if (items.length === 0) return [];

const firstItem = items[0].json;
const output = [];

// 첫 번째 표현에 대해서만 4개 국어 아이템을 생성 (Fan-out)
target_langs.forEach(lang => {
    output.push({
        json: {
            expression: firstItem.expression,
            source_url: firstItem.url || firstItem.source_url,
            target_lang: lang,
            status: 'pending',
            group_id: firstItem.expression, // 나중에 다시 합칠 때 사용할 키
            processed_at: new Date().toISOString()
        },
        pairedItem: { item: 0 } // 원본 아이템과의 연결 고리
    });
});

return output;
