-- Migration 005: Fix Database Permissions and RLS Policies
-- Author: Antigravity
-- Date: 2026-01-07

-- 1. Schema-level permissions
-- [Security Note] USAGE is the minimum privilege required to 'resolve' objects in the schema.
GRANT USAGE ON SCHEMA prismola TO anon;
GRANT USAGE ON SCHEMA prismola TO authenticated;
GRANT USAGE ON SCHEMA prismola TO service_role;
GRANT USAGE ON SCHEMA prismola TO postgres;

-- 2. Table-level permissions
-- [Security Note] anon and authenticated roles are strictly limited to SELECT (read-only).
-- n8n (service_role) needs ALL permissions to perform Upsert operations.
GRANT ALL ON TABLE prismola.posts TO service_role;
GRANT ALL ON TABLE prismola.posts TO postgres;

GRANT SELECT ON TABLE prismola.posts TO anon;
GRANT SELECT ON TABLE prismola.posts TO authenticated;

-- [Note] Service Role RLS Policy removed as it is redundant. 
-- The Supabase Service Role Key bypasses RLS by default.
