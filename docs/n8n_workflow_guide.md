# n8n 워크플로우 가이드 (n8n Workflow Guide)

이 문서는 Prismola의 핵심 엔진인 'Extreme Mastery Card' 워크플로우의 단계별 설정법과 운영 및 관리 방법을 상세히 안내합니다.

---

## 📥 워크플로우 임포트 가이드 (How to Import)

가장 최신의 프리미엄 워크플로우를 n8n에 적용하려면 아래 단계를 따르세요.

1. **JSON 파일 준비**: 아래 경로에 있는 최신 템플릿 파일을 확인합니다.
   - `n8n/workflows/n8n_workflow_template.json`
2. **n8n 접속**: 본인의 n8n 인스턴스에 로그인합니다.
3. **새 워크플로우 생성**: 왼쪽 메뉴에서 `Workflows` -> `+ Workflow`를 클릭합니다.
4. **가져오기 (Import)**:
   - 화면 우측 상단의 점 세 개(`...`) 메뉴를 클릭합니다.
   - **`Import from File`**을 선택하고 본 프로젝트의 JSON 파일을 선택합니다.
   - 또는, JSON 파일의 전체 내용을 복사한 뒤 n8n 캔버스(Canvas) 위에서 `Ctrl + V` (Mac: `Cmd + V`)를 눌러 바로 붙여넣을 수도 있습니다.
5. **자격 증명(Credentials) 연결**:
   - `HTTP Request` 노드를 클릭하여 본인의 Groq API 키가 설정된 자격 증명을 연결합니다.

---

## 💾 워크플로우 템플릿 다운로드 (Download)

최신 버전의 워크플로우 파일 경로는 다음과 같습니다.

> **파일 경로**: `/n8n/workflows/n8n_workflow_template.json`

---

## 1. 디렉토리 구조 (Directory Structure)

워크플로우 로직은 아래와 같이 체계적으로 관리됩니다.

### 📂 `n8n/code/` (핵심 로직 노드)
- **[01_load_and_transform.js]**: 입력 데이터를 4개 국어로 분화(Fan-out).
- **[02_construct_llm_prompt.js]**: 'Extreme Mastery' 수준의 고품질 분석 프롬프트 생성기.
- **[03_parse_llm_response.js]**: LLM 응답에서 JSON 데이터를 안전하게 파싱.
- **[04_merge_languages.js]**: 다국어 데이터를 하나로 통합하여 프리미엄 DB 레코드 생성.
- **[05_prepare_tts_request.js]**: 대화문 역할(A, B)별 멀티 보이스 TTS 생성을 위한 분리 로직.

---

## 🏗️ 전체 워크플로우 아키텍처

1. **[Phase 1] 데이터 로드 및 언어별 분화**: 영문 표현을 가져와 4개 국어로 분할합니다.
2. **[Phase 2] 고급 콘텐츠 생성 (LLM)**: Groq API를 통해 심층 언어 분석 데이터를 생성합니다.
3. **[Phase 3] 언어 통합 및 병합**: 분산된 4개 국어 데이터를 하나의 프리미엄 카드로 합칩니다.
4. **[Phase 4] 다중 목소리 TTS 생성**: 대화문 역할(A, B)에 맞춰 원어민 음성을 생성합니다.

---

## 🛠️ 노드별 세부 설정

### 1단계: 로드 및 변환 (Load & Transform)
- **노드**: Code Node
- **스크립트**: `01_load_and_transform.js`
- **역할**: 입력된 표현 하나를 언어별(`en`, `ko`, `ja`, `es`)로 4개로 복제(Fan-out)하여 병렬 처리를 준비합니다.

### 2단계: 프롬프트 구성 및 LLM 호출 (Generation)
- **노드**: Code Node (`02`) -> HTTP Request
- **HTTP Request 설정**:
  - **Method**: `POST`
  - **URL**: `https://api.groq.com/openai/v1/chat/completions`
  - **Body**: `{{ $json.payload }}` (수식 모드 활성화 필수)

### 3단계: 응답 파싱 및 국어 병합 (Parse & Merge)
- **노드**: Code Node (`03`) -> Aggregate -> Code Node (`04`)
- **스크립트 1**: `03_parse_llm_response.js` (JSON 추출)
- **Aggregate 설정**: `expression` 필드를 기준으로 그룹화하여 4개 국어를 다시 하나로 묶습니다.
- **스크립트 2**: `04_merge_languages.js`

### 4단계: 다중 목소리 TTS (Multi-Voice TTS)
이 단계는 대화문의 역할(Role)에 따라 목소리를 분리하여 생성합니다.

- **노드**: Code Node -> HTTP Request
- **스크립트**: `05_prepare_tts_request.js`
  - **역할**: 대화문 라인별로 아이템을 쪼개고(Fan-out), **A(Hannah)**와 **B(Troy)** 목소리를 할당합니다.
- **HTTP Request 설정 (매우 중요)**:
  - **Method**: `POST`
  - **URL**: `{{ $json.tts_endpoint }}` (수식 `fx` 모드 사용)
  - **Authentication**: `Header Auth` (`Authorization: Bearer YOUR_GROQ_API_KEY`)
  - **Specify Body**: `Using Fields Below`
  - **Parameters**: 
    - `model`: `{{ $json.tts_model }}`
    - `input`: `{{ $json.tts_input }}`
    - `voice`: `{{ $json.tts_voice }}`
    - `response_format`: `{{ $json.tts_format }}`
  - **Response Format**: **`Binary`** (반드시 바이너리로 설정해야 함)

---

## 3. 사용 방법 (Usage)

### 🚀 시나리오 실행 순서
1. **데이터 준비**: Google Sheets 등의 입력 노드에 `expression` 필드를 추가합니다.
2. **워크플로우 트리거**: n8n 워크플로우를 실행(Execute Workflow)합니다.
3. **중간 모니터링**: `Aggregate` 노드에서 4개 국어 데이터가 정상 결합되는지 확인합니다.
4. **결과물 확인**: 최종 생성된 JSON과 역할별 오디오 파일(`.wav`)을 확인합니다.

---

## 4. 참고 사항 (Notes)

- **API 할당량**: Groq API Rate Limit 방지를 위해 `01` 노드는 현재 회당 1개 표현만 처리하도록 설정되어 있습니다.
- **보이스 페르소나**: **Hannah** (지적인 여성), **Troy** (차분한 남성)가 기본이며, `05` 스크립트에서 변경 가능합니다.
- **TTS 약관**: 처음 사용 시 [Groq Playground](https://console.groq.com/playground?model=canopylabs%2Forpheus-v1-english)에서 약관에 동의해야 합니다.

---

## 💡 주요 트러블슈팅 팁

### 1. Orpheus TTS 약관 동의
- Groq의 Orpheus V1 모델을 처음 사용할 경우 [Groq Playground](https://console.groq.com/playground?model=canopylabs%2Forpheus-v1-english)에 접속하여 약관에 `Accept`를 한 번 클릭해야 합니다.

### 2. TTS 지원 목소리
- 현재 지원 목록: `autumn`, `diana`, `hannah`, `austin`, `daniel`, `troy`
- 스크립트(`05`)에서 `tts_voice` 기본값을 `hannah`로 설정해 두었으며 필요시 변경 가능합니다.
