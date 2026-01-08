-- Migration 006: Add Unique Constraint to Expression
-- Author: Antigravity
-- Date: 2026-01-07

-- 기존 중복 데이터가 있을 경우를 대비해 인덱스를 유니크하게 변경하기 전 정리가 필요할 수 있습니다.
-- 여기서는 유니크 제약 조건을 추가하여 DB 수준에서도 중복을 방지합니다.

-- 1. 기존 인덱스 삭제 (중복 방지용이 아니었으므로)
DROP INDEX IF EXISTS prismola.idx_posts_expression;

-- 2. 유니크 제약 조건 추가
ALTER TABLE prismola.posts ADD CONSTRAINT unique_expression UNIQUE (expression);

-- 3. 유니크 인덱스 자동 생성됨
COMMENT ON CONSTRAINT unique_expression ON prismola.posts IS 'Enforces uniqueness of English expressions to prevent duplicates';
