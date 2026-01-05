# 작업 목록 (Tasks)

- [x] 브레인스토밍 & 아키텍처 설계
  - [x] 시스템 아키텍처 정의 (Google Sheets -> n8n -> Supabase -> Blog)
  - [x] 다국어 전략: 4개 국어(EN/KO/JA/ES) 생성 및 JSONB 저장
  - [x] UX 전략: 브라우저 언어 자동 감지 (Auto-detect)
- [ ] 프로젝트 셋업
  - [x] Next.js 프로젝트 초기화 (`prismola`)
  - [x] 문서화 및 컨텍스트 규칙 설정 (`docs/` & Workflows)
  - [ ] Supabase 프로젝트 생성 및 테이블(JSONB 적용) 설정
  - [ ] Google Sheets 데이터 소스 준비
- [ ] n8n 워크플로우 구현
  - [ ] Google Sheets 데이터 읽기
  - [ ] LLM: 4개 국어 콘텐츠(JSON 구조) 생성 프롬프트 작성
  - [ ] TTS: 영어 대화문 음성 생성
  - [ ] Supabase: JSON 데이터 및 미디어 업로드
- [ ] 블로그 프론트엔드 구현
  - [ ] 언어 감지 로직 (Locale Detection) 구현
  - [ ] 메인/상세 페이지 UI
  - [ ] 오디오 플레이어
