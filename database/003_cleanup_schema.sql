-- Migration 003: Cleanup Legacy Columns
-- Author: Antigravity
-- Date: 2026-01-06

-- Remove legacy columns that are no longer needed in Extreme Mastery V3.0
ALTER TABLE prismola.posts 
DROP COLUMN IF EXISTS audio_url,
DROP COLUMN IF EXISTS image_url;

-- Update comments to reflect the current state
COMMENT ON TABLE prismola.posts IS 'Main table for posts with multi-language content and role-based audio segments';
