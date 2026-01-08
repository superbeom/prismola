# 프로젝트 히스토리 & Q&A 로그

> **참고**: 최신 항목이 상단에 위치합니다.

## [2026-01-08] Prismola 프리미엄 2.0 (V5.1) 구조적 혁신 완료
- **액션**: 월 $20 구독 가치에 걸맞은 '입체적 맥락 컨설팅' 프롬프트 엔진 완성.
    - **포맷팅 최적화**: 영어 표현 필드의 전체 대문자(All Caps) 사용을 금지하고, 문맥에 따른 자연스러운 케이싱 규칙 적용.
    - **보편적 오류 분석**: 'Fatal Mistake' 모듈을 비원어민 전체를 대상으로 하는 언어 심리학적 분석으로 확장.
- **액션**: n8n 프리미엄 데이터 파이프라인 정렬.
    - `04_merge_languages.js`: V5.0 신규 필드(Hook, Vibe Scale, Scene 등) 병합 로직 고도화.
    - `05_prepare_tts_request.js`: `scene_simulation` 기반 다중 역할(A, B) TTS 생성 경로 최적화.
- **결과**: 데이터 품질 레벨 `prismola_premium_v5` 적용 및 TTS 누락 이슈 완전 해결.

## [2026-01-07] n8n 워크플로우 최적화 및 중복 방지 (Dedup Engine)
- **액션**: 'Extreme Mastery' 생성 비용 절감을 위한 중복 체크 로직 도입.
    - `006_enforce_unique_expression.sql`: `expression` 컬럼에 `UNIQUE` 제약 조건 추가하여 DB 수준 중복 원천 차단.
    - `n8n_workflow_guide.md`: `0.5단계: Duplicate Check` 섹션 추가하여 n8n 노드 구성 가이드 제공. (HTTP Request + IF 조합)
- **효과**: 이미 존재하는 표현에 대해 LLM 호출 및 TTS 생성을 건너뜀으로써 API 사용량 약 100% 절감 (중복건 기준).

## [2026-01-07] n8n 데이터 파이프라인 완성
- **액션**: n8n 'Extreme Mastery' 워크플로우의 데이터 정합성 문제 완결.
    - 오디오 세그먼트와 메타데이터의 완벽한 병합 로직(06~08 코드 노드) 구현.
    - 바이너리 레퍼런스 보존 로직 적용으로 오디오 유실 및 0바이트 업로드 문제 원천 해결.
- **액션**: 데이터베이스 인프라 최적화 및 보안 권한 정립.
    - `004_add_expression_index.sql`: `expression` 컬럼 B-Tree 인덱스 추가로 검색 및 접근 속도 향상.
    - `005_fix_permissions.sql`: `prismola` 스키마에 대한 `anon`, `authenticated` 권한 및 RLS 정책 수정.

## [2026-01-06] 데이터베이스 스키마 고도화 및 레거시 정리 (Extreme Mastery V3.0)
- **액션**: 'Extreme Mastery V3.0' 대응을 위한 DB 스키마 확장 및 최적화 완료.
    - `002_extreme_mastery_schema.sql`: `summary`, `tags`, `audio_segments` 신규 컬럼 및 GIN 인덱스 추가.
    - `003_cleanup_schema.sql`: 레거시 컬럼(`audio_url`, `image_url`) 완전 제거.
    - `updated_at` 자동 업데이트 트리거를 통한 정밀한 데이터 관리 기여.

## [2026-01-06] n8n 워크플로우 v3.0 (Extreme Mastery) 완성
- **액션**: 'Extreme Mastery' 수준의 심층 언어 분석 콘텐츠 생성을 위한 n8n 코드 노드(01~05) 고도화.
    - `01_load_and_transform.js`: 4개 국어 병렬 처리를 위한 Fan-out 구축.
    - `02_construct_llm_prompt.js`: 심리학, 사회 지능, 뉘앙스 매핑을 포함한 고품질 프롬프트 설계.
    - `04_merge_languages.js`: 분산된 데이터를 유실 없이 프리미엄 DB 레코드로 병합.
- **액션**: Groq Orpheus 모델 기반 다중 목소리(Multi-Voice) TTS 구현.
    - `05_prepare_tts_request.js`: 대화문 역할(A, B)에 따라 Hannah & Troy 목소리 자동 할당.
- **문서**: `n8n_workflow_guide.md` (완전판 가이드) 및 `features_specification.md` (카드 세부 명세) 작성.
- **파일**: `n8n_workflow_template.json` 워크플로우 템플릿 배포 및 보안 검토 완료.

---

## [2026-01-05] 네이버 블로그 스크래퍼 및 데이터 도구 구현
- **액션**: 블로그 영어 표현 수집을 위한 파이썬 도구 개발.
    - `scraper/scrape_expressions.py`: 네이버 블로그 크롤링 및 타이틀 정제.
    - `scraper/export_n8n_data.py`: 수집된 데이터를 n8n(JSON) 및 Google Sheets(CSV) 포맷으로 변환.
- **액션**: 스크래퍼 사용 가이드 문서화.
    - `docs/scraper_usage.md`: 설치, 설정(Target ID), 실행, 문제 해결 방법 상세 기술.
    - 개인정보 보호를 위해 타겟 블로그 ID를 `YOUR_BLOG_ID`로 변환하고 안전 장치 추가.
- **데이터**: `n8n_code_input.json` (500+ expressions) 데이터 정제 완료 (Double space -> `vs` 변환 등).

---

## [2026-01-05] Supabase 스키마 설정 및 초기화
- **액션**: `prismola` 스키마 기반 Supabase 설정 완료.
    - `database/001_init_schema.sql` 생성: `posts` 테이블(JSONB) 포함.
    - **변경**: `profiles` 테이블(회원 기능)은 `future_todos.md`로 이관하고 초기 스키마에서 제외.
- **액션**: Next.js 연동 설정.
    - `lib/supabase/` 클라이언트(Server/Browser) 구현.
    - `middleware.ts`: 인증 로직 주석 처리(공개 접근 허용).
    - 모듈 에러 해결(`@supabase/ssr` 등 재설치).

---

## [2026-01-05] Supabase 멀티 프로젝트 전략 도입 및 문서화 완성
- **전략 업그레이드**: Supabase 전략을 "단일 계정 멀티 스키마(`prismola` schema)" 방식으로 고도화.
    - `supabase_strategy.md` 업데이트: Schema Isolation, Service Isolation (`profiles` table) 전략 정의.
- **워크플로우 확장**:
    - `update_docs` 워크플로우 생성 (`.agent/workflows/update_docs.md`).
    - `agent_workflows.md` 가이드 문서 생성.
- **문서 현행화**: `update_docs` 워크플로우가 참조하는 모든 문서(`future_todos.md`, `feature_ideas.md` 등)를 생성하여 정합성 확보.

---

## [2026-01-05] 에이전트 워크플로우 생성
- **액션**: `.agent/workflows` 폴더에 생산성 향상 워크플로우 추가.
    - `restore_context.md`: 프로젝트 컨텍스트 파일 일괄 로드.
    - `generate_commit.md`: Git 컨벤션에 따른 커밋 메시지 스크립트(`commit_msg.sh`) 생성.
- **액션**: `.gitignore`에 `commit_msg.sh` 추가.

---

## [2026-01-05] 문서화 구조 고도화 (v2)
- **액션**: `project_context.md` 구조를 `example_context.md` 스타일로 전면 개편.
    - Mermaid 아키텍처 다이어그램 추가.
    - 코딩 컨벤션 및 네이밍 규칙 상세화.
    - `Workflow Guidelines`에 `git_convention.md`와 `git_branch_strategy.md` 참조 추가.
- **액션**: `docs/features_list.md` 및 `docs/database_schema.md` 생성하여 기획 상세 내용 분리.
- **액션**: `docs/conversation_history.md` 및 `docs/brainstorm.md` 내용을 통합 후 삭제.

---

## [2026-01-05] 문서화 구조 설정
- **액션**: `docs` 폴더 생성 및 `task.md` 초기화.
- **액션**: 일관된 컨텍스트 관리를 위해 `project_context.md`, `project_history.md`, `walkthrough.md` 생성.
- **액션**: 모든 문서를 한국어로 번역 및 언어 규칙 업데이트.

---

## [2026-01-05] 프로젝트 착수 및 초기 설계 (Initial Setup & Brainstorming)

### 1. 프로젝트 목표 (Initiation)
- **목표**: Next.js (Frontend) + n8n (Automation) + Supabase (Database) 조합의 영어 교육 블로그 구축.
- **컨셉**: "3분 원어민 빙의" (The 3-Minute Native Upgrade). 사용자가 짧은 시간 안에 표현의 뉘앙스를 체득하고 실제 대화에 적용하도록 유도.

### 2. 아키텍처 및 기술 결정 (Decision Log)
- **데이터 소스**: Google Sheets (비개발자도 관리 용이).
- **데이터베이스**: Supabase.
    - **Schema 전략**: `JSONB` 컬럼을 사용하여 하나의 Row에 EN, KO, JA, ES 4개 국어 데이터를 통합 저장. 스키마 변경 없이 언어 확장이 가능한 유연한 구조 채택.
- **자동화 (n8n)**:
    - Flow: Google Sheets -> LLM (Content Generation) -> TTS (Audio) -> Supabase.
    - **TTS**: Edge TTS (무료/초기) 또는 OpenAI TTS (고품질/확장) 사용.

### 3. 브랜딩 (Branding)
- **서비스명**: **Prismola**
    - **의미**: Prism (투영/굴절) + Hola (인사). 언어라는 프리즘을 통해 다채롭게 영어를 이해하고 즐겁게 소통한다는 의미.
    - 탈락 후보: Prism English, Spectrum English, Root English, Lingo Flow.
