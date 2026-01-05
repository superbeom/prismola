# 데이터베이스 스키마 (Database Schema)

**최종 수정일**: 2026-01-05

`Prismola` 프로젝트의 데이터베이스 설계 문서입니다. Supabase (PostgreSQL)를 사용합니다.

## 1. 테이블: `posts`

블로그 포스트 데이터를 저장하는 메인 테이블입니다. 다국어 콘텐츠를 하나의 행(Row)에서 관리하기 위해 `JSONB`를 적극 활용합니다.

| 컬럼명 (Column) | 타입 (Type) | 설명 (Description) |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key. 기본값 `gen_random_uuid()`. |
| `expression` | `text` | 핵심 영어 표현 (예: "Cold feet"). 검색 및 인덱싱 용도. |
| `content` | `jsonb` | **핵심**. 4개 국어 콘텐츠 데이터를 담는 JSON 객체. |
| `audio_url` | `text` | Supabase Storage에 저장된 오디오 파일 URL. |
| `image_url` | `text` | (Optional) 대표 이미지 URL. |
| `created_at` | `timestamptz` | 생성 일시. 기본값 `now()`. |
| `updated_at` | `timestamptz` | 수정 일시. |

## 2. JSONB 구조 (`content` 컬럼)

`content` 컬럼은 다음과 같은 계층 구조를 가집니다. 언어별 키(`en`, `ko`, `ja`, `es`) 아래에 해당 언어의 로컬라이즈된 콘텐츠가 들어갑니다.

### 스키마 예시

```json
{
  "en": {
    "title": "Stop saying 'I think'",
    "nuance": "Used when you want to sound more confident...",
    "intro": "Have you ever felt ignored in a meeting?",
    "dialogue": [
      { "speaker": "A", "text": "..." },
      { "speaker": "B", "text": "..." }
    ],
    "mission": "Try using this in your next email."
  },
  "ko": {
    "title": "아직도 'I think'만 쓰시나요?",
    "nuance": "더 자신감 있게 의견을 말하고 싶을 때...",
    "intro": "회의 시간에 내 의견이 묻히는 것 같나요?",
    "dialogue": [ ... ], // 영어 대화문은 동일하더라도 설명이 다를 수 있음
    "mission": "다음 이메일에 이렇게 써보세요."
  },
  "ja": {
    "title": "...",
    "nuance": "...",
    ...
  },
  "es": {
    "title": "...",
    "nuance": "...",
    ...
  }
}
```

## 3. 설계 의도 (Design Rationale)

### 왜 `JSONB`인가?
- **유연성 (Flexibility)**: n8n이 생성한 다국어 JSON 객체를 별도의 파싱이나 여러 테이블(`posts_ko`, `posts_en` 등)로 쪼개는 과정 없이 그대로 DB에 저장할 수 있습니다.
- **확장성 (Scalability)**: 추후 프랑스어(`fr`), 독일어(`de`) 등이 추가되더라도 DB 스키마 마이그레이션이 필요 없습니다. 단순히 JSON에 키 하나만 더 추가하면 됩니다.
- **성능**: PostgreSQL의 `JSONB`는 인덱싱을 지원하므로 쿼리 성능이 우수합니다. Next.js 클라이언트에서도 언어 키로 바로 접근하여 렌더링하기 편리합니다.

## 4. 참고 사항 (Notes)

- **Profiles 테이블**: 초기 기획에는 있었으나, 회원가입 기능이 `future_todos.md`로 이관되면서 현재 스키마에서는 제외되었습니다. 추후 인증 구현 시 추가될 예정입니다.
