# 기능 명세서 (Features List)

**최종 수정일**: 2026-01-08

이 문서는 `Prismola` 서비스의 핵심 기능과 콘텐츠 전략을 정의합니다.

## 1. 다국어 콘텐츠 시스템 (Multilingual Content System)

### 핵심 컨셉
- **One Source, Multi-lens**: 하나의 영어 표현을 기반으로 4개 국어(EN, KO, JA, ES) 콘텐츠를 생성.
- **Prism Effect**: 각 언어권 사용자의 문화적 맥락에 맞춰 설명을 재가공("굴절").
- **Premium 2.0 (V5.1)**: $20/월 구독 가치를 증명하는 입체적 맥락 컨설팅 콘텐츠 생산.

### 지원 언어
- **영어 (EN)**: 기본(Default). 전 세계 사용자 대상.
- **한국어 (KO)**: 한국어 화자 대상.
- **일본어 (JA)**: 일본어 화자 대상.
- **스페인어 (ES)**: 스페인어 화자 대상.

### 자동 언어 감지 (Auto-Detection UX)
- **로직**: 사용자 브라우저의 `Accept-Language` 헤더 또는 `navigator.language` 감지.
    - `ko-*` → 한국어 콘텐츠
    - `ja-*` → 일본어 콘텐츠
    - `es-*` → 스페인어 콘텐츠
    - 그 외 → 영어 콘텐츠 (Fallback)
- **수동 오버라이드**: 푸터(Footer) 등을 통해 언어 변경 가능.

---

## 2. 블로그 포맷: 프리미엄 2.0 (The 3-Minute Native Upgrade)

사용자가 3분 안에 해당 표현을 완벽히 흡수할 수 있도록 설계된 몰입형 포맷입니다.

| 섹션 (Section) | 내 용 (Description) |
| :--- | :--- |
| **1. The Hook** | 국가별 문화적 맥락을 고려한 전략적 헤드라인. |
| **2. Fatal Mistake** | 비원어민이 흔히 저지르는 직역의 함정과 논리적 오류 심층 분석. |
| **3. Vibe Scale** | 1~10 수치로 표현의 감정적 에너지와 세기 시각화. |
| **4. Nuance Analysis** | 화자의 심리와 사회적 관계를 고려한 미세 뉘앙스 엔지니어링. |
| **5. Mirror & Shadow** | 표현이 역효과를 내는 상황과 대안 표현(Antonym Vibe) 분석. |
| **6. Strategic Hierarchy** | 유의어들을 격식도와 자신감 지수에 따라 지도화(Mapping). |
| **7. Scene Simulation** | 영화적 기법의 상황 묘사와 3단계 전술적 대화 (A-B-A) + **Audio(TTS)**. |
| **8. Today's Mission** | 오늘 바로 실천할 수 있는 구체적인 행동 미션. |
| **9. Extreme IQ Quiz** | 상황 판단력과 소셜 IQ를 테스트하는 실전 퀴즈와 피드백. |

---

## 3. 오디오/TTS 시스템 (Audio & TTS)

- **목표**: 자연스러운 원어민 발음 제공.
- **기술 스택**:
    - **Edge TTS**: 무료, 준수한 품질. (초기 단계)
    - **OpenAI TTS**: 고품질, 감정 표현 우수. (고도화 단계)
- **제공 범위**: 'Dialogue' 섹션의 전체 대화문 및 핵심 표현.
- **저장소**: n8n이 생성한 오디오 파일을 **Supabase Storage**에 저장 후 서빙.
