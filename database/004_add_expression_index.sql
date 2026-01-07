-- Migration 004: Add Index for Expression Search
-- Author: Antigravity
-- Date: 2026-01-07

-- 핵심 영어 표현(expression) 검색 성능을 위한 B-Tree 인덱스 추가
-- 사용자가 블로그에서 특정 표현을 검색할 때 인덱스를 통해 즉각적인 결과를 제공합니다.
CREATE INDEX IF NOT EXISTS idx_posts_expression ON prismola.posts (expression);

-- 인덱스에 대한 설명 추가
COMMENT ON INDEX prismola.idx_posts_expression IS 'Index for fast lookup and searching of English expressions';
