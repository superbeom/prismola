# Future Todos (Technical Debt & Improvements)

이 문서는 당장 구현하지 않지만 추후 개선이 필요하거나 기술 부채로 남겨둔 항목들을 관리합니다.

## Next Phase (다음 단계)

- [ ] **Next.js 프론트엔드 연결**: 워크플로우가 성공적으로 실행되어 DB에 데이터가 쌓이면, 생성된 `JSONB` 데이터와 오디오 파일을 사용자 앱에서 우아하게 렌더링하는 과정이 기다리고 있습니다.
- [ ] **Extreme IQ Quiz UI 구현**: 프리미엄 2.0에서 생성되는 퀴즈 데이터를 활용해 인터랙티브한 퀴즈 컴포넌트 개발.
- [ ] `profiles` 테이블 생성 및 회원가입/로그인 구현 (Service Isolation Strategy 적용)

## Technical Debt (기술 부채)

- [ ] (예시) `any` 타입 제거 및 엄격한 타입 정의 적용
- [ ] (예시) 중복되는 유틸리티 함수 리팩토링
