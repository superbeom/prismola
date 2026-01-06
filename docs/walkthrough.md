# 프로젝트 워크스루 (Project Walkthroughs)

> **참고**: 최신 버전/워크스루가 상단에 위치합니다.

---

## v3.0.0: 'Extreme Mastery' n8n 워크플로우 고도화
**날짜**: 2026-01-06

### 목표
유료 서비스급($20 value) 고품질 언어 분석 콘텐츠 자동 생성 및 다중 보이스 TTS 시스템을 구축합니다.

### 수행 단계
1.  **Extreme Mastery 엔진 구축**:
    - **Fan-out 구조**: 하나의 표현을 4개 국어(en, ko, ja, es)로 분화하여 Groq API 병렬 처리.
    - **심층 프롬프트 (02_code)**: 비언어적 뉘앙스, 사회적 지능(Etiquette), 유의어 대비 맵 포함.
    - **통합 병합 (04_code)**: 분산된 4개 국어 데이터를 단일 JSONB 레코드로 완벽하게 머지.
2.  **Multi-Voice TTS 통합**:
    - **역할 분파 (05_code)**: 대화문을 문장 단위로 쪼개고 화자(A/B)별 목소리 할당.
    - **고음질 생성**: Groq Orpheus 모델을 활용하여 Hannah(여성) & Troy(남성) 음성 생성.
3.  **관리 체계 수립**:
    - `n8n/code/` 폴더 내에 로직 문서화.
    - `n8n_workflow_guide.md` 마스터 가이드 배포.

## v0.2.0: Supabase 데이터베이스 통합
**날짜**: 2026-01-05

### 목표
다국어 콘텐츠 데이터를 저장하고 관리하기 위한 Supabase 데이터베이스 스키마와 관리 포인트를 설정합니다.

### 수행 단계
1.  **스키마 설정 (`database/001_init_schema.sql`)**:
    - **멀티 스키마 전략**: 메인 스키마와 분리된 `prismola` 스키마 생성.
    - **테이블 구조**: `posts` 테이블에 `JSONB` 컬럼을 적용하여 다국어 데이터를 유연하게 저장하도록 설계.
    - **보안 (RLS)**: `anon` (익명 사용자)에게 읽기 권한을 허용하여 공개 블로그 형태 지원. 쓰기 권한은 `service_role`로 제한.
    - *참고*: 회원 관리(`profiles`) 테이블은 초기 요구사항에서 제외되어 `future_todos.md`로 연기됨.
2.  **Next.js 클라이언트 연동**:
    - **패키지 설치**: `@supabase/ssr`, `@supabase/supabase-js`.
    - **클라이언트 유틸리티**: `lib/supabase/` 내에 `createBrowserSupabase` (Browser), `createServerSupabase` (Server) 구현.
    - **미들웨어 (`middleware.ts`)**: 초기 단계에서는 인증 검증 로직을 비활성화하여 세션 리프레시만 수행하도록 설정.

---

## v0.1.2: 에이전트 워크플로우 통합
**날짜**: 2026-01-05

### 목표
반복적인 작업(컨텍스트 로드, 커밋 메시지 작성)을 자동화하여 개발 효율성과 일관성을 유지합니다.

### 수행 단계
1.  **워크플로우 생성**:
    - `.agent/workflows/restore_context.md`: `docs/` 내의 주요 컨텍스트 파일을 IDE에 로드하는 스크립트.
    - `.agent/workflows/generate_commit.md`: 변경 사항(`git diff`)을 분석하여 컨벤션에 맞는 커밋 메시지(`commit_msg.sh`)를 생성하는 스크립트.
2.  **설정 업데이트**: `commit_msg.sh`가 실수로 커밋되지 않도록 `.gitignore`에 추가.

---

## v0.1.1: 컨텍스트 구조 고도화 (Refactoring Context)
**날짜**: 2026-01-05

### 목표
프로젝트의 컨텍스트 문서를 체계적인 예시(`System Architecture`, `Workflow Guidelines` 등)에 맞춰 재구성하고, 새로 추가된 Git 규칙과 브랜치 전략을 통합합니다.

### 수행 단계
1.  **구조 개편**: `project_context.md`를 예시 포맷에 맞춰 재작성.
    - Mermaid 다이어그램으로 시스템 아키텍처 시각화.
    - 디렉토리 구조 트리 (`tree`) 형식으로 표현.
2.  **규칙 통합**: 사용자가 추가한 `git_convention.md`, `git_branch_strategy.md` 파일을 워크플로우 가이드라인에 연결.
3.  **검증**: 참조 링크 및 한국어 작성 여부 확인.

---

## v0.1.0: 문서화 및 컨텍스트 설정
**날짜**: 2026-01-05

### 목표
미래의 AI 에이전트와 인간 개발자를 위해 일관성을 보장하는 견고한 문서화 구조를 수립합니다.

### 수행 단계
1.  **디렉토리 생성**: 프로젝트 루트에 `docs/` 생성.
2.  **파일 초기화**:
    - `task.md`: 활성 작업 추적.
    - `brainstorm.md`: 설계 및 아키텍처 결정 사항.
    - `conversation_history.md`: 제약 사항 및 논의 내용 요약.
    - `project_context.md`: 규칙 및 아키텍처에 대한 단일 진실 공급원(SSOT).
    - `project_history.md`: 변경 사항의 연대기적 로그.
    - `walkthrough.md`: 본 파일, 구현 단계 문서화.
3.  **마이그레이션**: 에이전트 메모리의 관련 내용을 이 파일들로 복사.
4.  **현지화**: 사용자의 요청에 따라 모든 문서를 한국어로 번역 및 표준화.

### 검증
- `ls -l docs` 로 파일 존재 확인.
- 파일 내용이 논의된 아키텍처 및 한국어 규칙과 일치하는지 확인.

---
