# 프로젝트 컨텍스트 및 규칙 (Project Context & Rules)

**최종 수정일**: 2026-01-05

## 1. 프로젝트 개요 (Project Overview)

- **서비스명**: Prismola ("Prism" + "Hola")
- **목적**: 영어 표현을 여러 언어(한국어, 일본어, 스페인어)라는 "프리즘"을 통해 굴절시켜, 사용자가 모국어라는 렌즈로 이해하도록 돕는 영어 학습 블로그.
- **핵심 가치**:
  - **"3분 원어민 빙의 (The 3-Minute Native Upgrade)"**: 하나의 표현을 감성적 맥락, 뉘앙스 분석, 실제 대화를 통해 깊이 있게 학습.
  - **다국어 지원 (Multilingual Support)**: EN, KO, JA, ES 4개 국어 콘텐츠 생성 및 제공.
  - **자동 감지 (Auto-Detection)**: 사용자 브라우저 언어 자동 감지 및 맞춤형 콘텐츠 제공 (Fallback: EN).

---

## 2. 콘텐츠 전략: "3분 원어민 빙의" (Content Strategy)

사용자가 3분 안에 해당 표현을 완벽히 흡수할 수 있도록 코너를 구성합니다.

1.  **Hook Title**: 호기심을 자극하는 제목 (예: "아직도 I think만 쓰나요?").
2.  **Intro**: 독자가 공감할 수 있는 구체적인 상황 제시 ("미팅에서 내 의견이 묻히는 것 같나요?").
3.  **Hero Section**: 핵심 표현의 타이포그래피 + 감성 이미지 + 간단한 뜻.
4.  **Analysis**:
    - **Nuance**: 사전적 의미를 넘어선 뉘앙스 설명.
    - **Formality**: 격식 점수 및 사용 적절성 분석.
    - **Synonyms**: 유의어와 비교.
5.  **Dialogue**: 실제 사용 예시 대화문 (A/B 대화). **Audio(TTS) 필수 포함**.
6.  **Mission**: 독자가 당장 써먹을 수 있는 구체적인 액션 아이템.

---

## 3. 다국어 시스템 로직 (Multi-language System)

### One Source, Multi-lens
하나의 영어 표현을 입력받아, 4개 국어(EN, KO, JA, ES)로 각각 최적화된 콘텐츠를 생성합니다. 단순 번역이 아닌, '문화적 맥락'을 고려한 재가공(Transcreation)을 지향합니다.

### 데이터 구조 (JSONB)
확장성을 위해 Supabase의 `posts` 테이블 `content` 컬럼에 **JSONB** 포맷으로 저장합니다.

```json
{
  "en": { "title": "...", "intro": "..." },
  "ko": { "title": "...", "intro": "..." },
  "ja": { "title": "...", "intro": "..." },
  "es": { "title": "...", "intro": "..." }
}
```

### 언어 감지 (Auto-Detection)
- **우선순위**:
    1.  사용자 수동 선택 (Local Storage/Cookie)
    2.  브라우저 `Accept-Language` 헤더 / `navigator.language`
- **Fallback**: 매칭되는 언어가 없을 경우 **영어(EN)**를 기본으로 표시합니다.

---

## 4. 시스템 아키텍처 (System Architecture)

```mermaid
graph TD
    subgraph Input [Data Entry]
        Manager[Human Editor] -->|Add Expression| Sheets[Google Sheets]
    end

    subgraph Automation [n8n Workflow]
        Sheets -->|Fetch Row| n8n[n8n Orchestrator]
        n8n -->|Generate Content (4 Langs)| LLM[LLM (Content Generation)]
        n8n -->|Generate Audio| TTS[Edge TTS / OpenAI TTS]
        LLM -->|JSON Data| Supabase[Supabase DB]
        TTS -->|Upload .mp3| Storage[Supabase Storage]
    end

    subgraph Service [Next.js App]
        User[Visitor] -->|Visit| Middleware[Locale Detection]
        Middleware -->|Route| Page[Content Page]
        Page -->|Fetch JSONB| Supabase
        Supabase -->|Data| Page
    end
```

### TTS 전략
- **Edge TTS**: 초기 비용 절감을 위해 무료 사용. 준수한 품질.
- **OpenAI TTS**: 고품질 감정 표현이 필요할 때 사용 (비용 고려).
- 생성된 오디오 파일은 **Supabase Storage**에 영구 저장하여 반복 요청 비용을 제거합니다.

---

## 5. 기술 스택 (Tech Stack)

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS.
- **Database**: Supabase (PostgreSQL, `JSONB`).
- **Automation**: n8n (Self-hosted or Cloud).
- **Data Source**: Google Sheets.

---

## 6. 디렉토리 구조 (Directory Structure)

```
prismola/
├── app/                 # Next.js App Router Pages
├── docs/                # 프로젝트 문서 (Docs as Code)
│   ├── project_context.md   # [SSOT] 프로젝트 규칙, 아키텍처, 상태
│   ├── project_history.md   # 변경 이력 및 Q&A 로그
│   ├── features_list.md     # 상세 기능 및 콘텐츠 명세
│   ├── database_schema.md   # DB 스키마 및 JSON 구조 정의
│   ├── task.md              # 작업 목록
│   ├── walkthrough.md       # 구현 상세 워크스루
│   ├── git_convention.md    # 커밋 메시지 규칙
│   └── git_branch_strategy.md # 브랜치 전략
└── ...
```

---

## 7. 코딩 컨벤션 (Coding Conventions)

### General

- **언어**: TypeScript 엄수. `any` 사용 지양.
- **절대 경로**: `@/` alias 사용 (예: `import { createClient } from '@/lib/supabase/server'`).

### Naming Conventions

- **File Names**:
  - **Components (`components/`)**: `PascalCase` (예: `ExpressionCard.tsx`)
  - **Utilities & Logic (`lib/`)**: `kebab-case` (예: `ui-config.ts`, `expressions.ts`)
  - **Pages (`app/`)**: Next.js App Router 규칙 준수 (`page.tsx`, `layout.tsx` 등)
- **Export Style**:
  - **Components**: `export default function ComponentName` (Default Export)
  - **Utilities**: `export const functionName` (Named Export)

### Component Architecture

- **모듈화 및 재사용성 (Modularity)**: 독립적으로 구성 가능한 요소는 반드시 컴포넌트로 분리합니다. 함수와 유틸리티는 재사용성을 최우선으로 설계합니다.
- **관심사 분리 (Separation of Concerns)**:
  - **Presentational Component**: UI 렌더링에만 집중하며, 데이터는 `props`로 주입받습니다. 비즈니스 로직을 포함하지 않습니다.
  - **Container Component**: 데이터 페칭 및 비즈니스 로직을 처리하고, 결과를 Presentational 컴포넌트에 전달합니다.
- **독립성 (Independence)**: 컴포넌트는 외부 상태에 의존하지 않고 주입받은 `props`만으로 렌더링되어야 합니다.

---

## 8. 워크플로우 가이드라인 (Workflow Guidelines)

1.  **세션 시작 (Initialization)**: 작업 전 `docs/project_history.md`와 `docs/task.md`를 필독합니다.
2.  **문서화 (Documentation)**:
    - **Language**: 문서는 반드시 **한국어**로 작성합니다.
    - **Update**: 변경 사항 발생 시 `docs/` 내 관련 문서를 즉시 업데이트합니다.
    - **Rules**: `git_convention.md`와 `git_branch_strategy.md`를 준수합니다.
