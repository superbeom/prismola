# Python Scraper 사용법 (Scraper Usage Guide)

이 문서는 `scraper/` 디렉토리에 있는 Python 스크립트와 가상환경을 설정하고, 영어 표현 수집 스크래퍼를 실행하는 방법을 설명합니다.

## 1. 사전 준비 (Prerequisites)

- Python 3.8 이상 설치 권장
- `pip` 패키지 매니저

## 2. 환경 설정 (Setup)

권장 방식은 `venv` 가상환경을 사용하여 의존성을 격리하는 것입니다.

### 2.1. 가상환경 생성 및 패키지 설치

프로젝트 루트 디렉토리(`./prismola`)에서 다음 명령어들을 순차적으로 실행하십시오.

```bash
# 1. 가상환경 생성 (최초 1회)
python3 -m venv venv

# 2. 가상환경 활성화
# Mac/Limit/Unix:
source venv/bin/activate
# Windows:
# venv\Scripts\activate

# 3. 의존성 패키지 설치
pip install -r scraper/requirements.txt
```

## 3. 스크래퍼 실행 (Running the Scraper)

### 3.1. 타겟 블로그 설정 (Configuration)
스크립트를 실행하기 전에, 수집하려는 네이버 블로그 ID를 설정해야 합니다.
1. `scraper/scrape_expressions.py` 파일을 엽니다.
2. 하단 `if __name__ == "__main__":` 블록에서 `blog_id` 변수를 찾습니다.
3. `"YOUR_BLOG_ID"`를 실제 블로그 ID(예: `"vamos"`)로 변경합니다.

```python
# scraper/scrape_expressions.py
if __name__ == "__main__":
    # TODO: Replace with your target blog ID
    blog_id = "vamos"  # <-- 여기에 실제 ID 입력
    ...
```

### 3.2. 실행 명령어
`scrape_expressions.py` 스크립트는 설정된 블로그(예: `YOUR_BLOG_ID`)에서 영어 표현을 추출하여 `scraper/output/scraped_data.json`에 저장합니다.

```bash
# 가상환경이 활성화된 상태에서 실행
python scraper/scrape_expressions.py
```

### 실행 결과
- `Starting scraper for YOUR_BLOG_ID...` 메시지와 함께 스크랩 진행 상황이 출력됩니다.
- 완료 시: `Saved to .../scraper/output/scraped_data.json`

## 4. 데이터 가공 및 내보내기 (Data Export)

수집된 원본 데이터(`scraped_data.json`)를 n8n이나 Google Sheets에서 사용하기 편리한 형태로 변환합니다.

```bash
python scraper/export_n8n_data.py
```

### 생성되는 파일
1.  **`scraper/output/n8n_code_input.json`**:
    - **용도**: n8n 'Code 노드'에 직접 붙여넣거나 로드하여 사용할 수 있는 JSON 데이터입니다.
    - **특징**: 불필요한 필드를 제거하고 `expression`과 `url`만 깔끔하게 정리되어 있습니다.
2.  **`scraper/output/expressions.csv`**:
    - **용도**: Google Sheets에 '가져오기(Import)' 하거나 백업용으로 사용합니다.
    - **특징**: `expression`, `source_url`, `status` 컬럼을 포함하여 시트 연동에 최적화되어 있습니다.

## 5. 문제 해결 (Troubleshooting)

- **`zsh: command not found`**: 스크립트 파일명만 입력하면 실행되지 않습니다. 반드시 앞에 `python` 명령어를 붙여주세요 (예: `python scraper/scrape_expressions.py`).

- **`ModuleNotFoundError`**: 가상환경이 활성화되었는지(`source venv/bin/activate`) 확인하고, `pip install`이 정상적으로 완료되었는지 확인하십시오.
- **경로 에러**: 스크립트는 자신의 위치 내 `output/` 폴더를 자동으로 생성합니다. 스크립트 파일 위치를 임의로 옮기지 마십시오.

- **`Error: Please set a valid 'blog_id'`**: `scraper/scrape_expressions.py` 파일의 `blog_id` 변수가 아직 기본값(`YOUR_BLOG_ID`)으로 설정되어 있습니다. 3.1절을 참고하여 실제 블로그 ID로 변경하십시오.
