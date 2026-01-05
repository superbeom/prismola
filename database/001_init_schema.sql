-- Create a dedicated schema for Prismola
CREATE SCHEMA IF NOT EXISTS prismola;

-- Grant usage on schema to authenticated and anon roles
GRANT USAGE ON SCHEMA prismola TO postgres, anon, authenticated, service_role;

-- Posts Table (Content)
CREATE TABLE IF NOT EXISTS prismola.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expression TEXT NOT NULL,
  content JSONB NOT NULL, -- { "en": {...}, "ko": {...}, "ja": {...}, "es": {...} }
  audio_url TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE prismola.posts ENABLE ROW LEVEL SECURITY;

-- Policies for Posts
-- Public access for reading posts (Blog is public)
CREATE POLICY "Public can view posts" 
ON prismola.posts FOR SELECT 
TO anon, authenticated
USING (true);

-- Service Role (n8n, admin) has full access
-- Explicit definition isn't always strictly necessary as service_role usually bypasses RLS, 
-- but it's good practice to be aware. Default is usually NO ACCESS if not defined, 
-- but service_role key bypasses RLS.
