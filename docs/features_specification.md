# Prismola: Extreme Mastery Card Feature Specification (V3.0)

본 문서는 Prismola n8n 워크플로우를 통해 구현된 고품질 다국어 학습 콘텐츠 생성 엔진의 상세 기능과 설계 원칙을 기록합니다. 이 시스템은 유료 구독($20/mo) 가치를 제공하기 위해 단순 정보를 넘어선 '언어학적 컨설팅' 수준의 콘텐츠를 생성하도록 설계되었습니다.

---

## 💎 핵심 기능 (Core Features)

### 1. 1% 마이크로 뉘앙스 분석 (Micro-Nuance Engine)
- **개요**: 화자의 심리 상태를 정밀 분석하여 자신감 수치(0-100%), 반어법 여부, 감정적 무게감을 3~5문장으로 서술합니다.
- **가치**: 사전 상으로는 동일한 뜻을 가진 표현들 사이의 미세한 '맛'의 차이를 원어민 수준으로 구별할 수 있게 합니다.

### 2. 소셜 지능 맵 (Social Intelligence Map)
- **개요**: 표현의 격식 수준(1-10점)과 함께, 비즈니스 치명도(Career-killer) 및 사회적 유대감 형성(Social-bonder) 관점에서의 사용 지침을 제공합니다.
- **가치**: 학습자가 상황에 맞지 않는 표현을 사용하여 겪을 수 있는 사회적 결례를 방지하고, 세련된 커뮤니케이션을 가능하게 합니다.

### 3. 고난도 IQ 퀴즈 (Extreme Vibe Quiz)
- **개요**: 문법적으로는 완벽하지만 상황에 맞지 않는 "Socially Awkward" 오답을 포함한 3단계 변별력을 갖춘 퀴즈를 생성합니다.
- **순수 영문 옵션 (Strict Purity)**: 퀴즈의 보기(Options) 필드에는 오직 순수 영문 표현만 포함하며, 타겟 언어 설명이나 괄호를 엄격히 배제하여 데이터의 정합성을 보장합니다.
- **일상 회화 중심 (Daily-Life First)**: 모든 시나리오와 대화문은 비즈니스 상황을 넘어 친구, 가족, 여행, 사교 모임 등 다채로운 일상 맥락을 우선적으로 반영합니다.
- **가치**: 단순 문법 테스트를 넘어, 상황에 발맞춘 '사회적 적절성(Social Appropriateness)'을 테스트하고 교정합니다. 모든 오답의 근거는 별도의 'Social Calibration Feedback' 필드에 상세히 기록됩니다.

### 4. 고해상도 AI 성우 (AI Voice/TTS)
- **모델**: `canopylabs/orpheus-v1-english`
- **개요**: 생성된 대화문을 원어민 수준의 자연스러운 음성으로 변환하여 제공합니다. 브라켓 명령어(`[cheerful]`, `[whisper]` 등)를 통한 세밀한 감정 연기가 가능합니다.
- **가치**: 시각적 학습을 넘어 청각적 뉘앙스(Intonation, Stress)를 함께 체득하게 하여 학습 효과를 극대화합니다.

---

## 🛠️ 기술적 구현 (Technical Implementation)

### 1. Extreme Prompting ([02_construct_llm_prompt.js](file:///Users/jamesbond/Documents/prismola/n8n/code/02_construct_llm_prompt.js))
- **Persona**: 'Master Linguistic Coach' 페르소나를 부여하여 응답의 전문성을 강제합니다.
- **Hallucination Guard**: 비문(Broken English)이나 검증되지 않은 조언을 원천 차단하는 네거티브 지침을 내장했습니다.
- **Single-Language Principle**: 타겟 언어의 순수성을 유지하면서 원 영문 표현만 자연스럽게 노출하도록 제어합니다.

### 2. Premium Aggregator ([04_merge_languages.js](file:///Users/jamesbond/Documents/prismola/n8n/code/04_merge_languages.js))
- **High-Capacity Merging**: 병합 과정에서 방대한 텍스트 데이터(심리 분석, 뉘앙스 등)가 유실되지 않도록 전용 스키마 맵핑 로직을 구현했습니다.
- **Unified Tags & Summary**: 4개 국어에서 추출된 태그를 통합하고 UI 최적화용 요약문을 자동 생성합니다.

---

## 📈 비즈니스 가치 (Subscription Value)
- **대체 불가능성**: 무료 번역기나 일반적인 AI 채팅으로는 얻을 수 없는 '언어학자의 통찰'을 제공합니다.
- **신뢰도**: 모든 조언에 대한 문법적/상황적 정확성을 이중 지침으로 검토하여 학습자의 신뢰를 확보합니다.
- **경험의 확장**: 단순 학습을 넘어 원어민의 사회적 감각과 문화적 DNA를 체득하는 경험을 선사합니다.
