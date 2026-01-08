-- Migration 002: Extreme Mastery V3.0 Schema Expansion
-- Author: Antigravity
-- Date: 2026-01-06

-- 1. Add new columns to accommodate V3.0 content structure
ALTER TABLE prismola.posts 
ADD COLUMN IF NOT EXISTS summary JSONB,
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS audio_segments JSONB DEFAULT '[]';

-- 2. Add comments for documentation
COMMENT ON COLUMN prismola.posts.summary IS 'Multi-language brief summaries for UI list views';
COMMENT ON COLUMN prismola.posts.tags IS 'Searchable tags extracted from the content';
COMMENT ON COLUMN prismola.posts.audio_segments IS 'Array of role-based audio URLs and metadata [{role, url, text, index}]';

-- 3. Optimization: Add GIN index for full-text search and tag filtering
CREATE INDEX IF NOT EXISTS idx_posts_tags ON prismola.posts USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_posts_summary ON prismola.posts USING GIN (summary);

-- 4. Housekeeping: Update updated_at trigger if not already present
-- (Note: Standard Supabase setup often includes this, but we'll be explicit here if needed)
CREATE OR REPLACE FUNCTION prismola.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at') THEN
        CREATE TRIGGER set_updated_at
        BEFORE UPDATE ON prismola.posts
        FOR EACH ROW
        EXECUTE FUNCTION prismola.update_updated_at_column();
    END IF;
END $$;
