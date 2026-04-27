-- ================================================================
-- AutoSpex — Supabase PostgreSQL Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── USERS ────────────────────────────────────────────────────
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name     TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
  is_active     BOOLEAN NOT NULL DEFAULT true,
  university    TEXT,
  student_id    TEXT,
  avatar_url    TEXT,
  last_login    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── REFRESH TOKENS ───────────────────────────────────────────
CREATE TABLE refresh_tokens (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token      TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_refresh_tokens_user   ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token  ON refresh_tokens(token);

-- ── COURSES ──────────────────────────────────────────────────
CREATE TABLE courses (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL,
  description     TEXT NOT NULL,
  level           TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  language        TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'ar')),
  tags            TEXT[] DEFAULT '{}',
  thumbnail_url   TEXT,
  instructor_id   UUID REFERENCES users(id) ON DELETE SET NULL,
  is_published    BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── MODULES (chapters inside a course) ───────────────────────
CREATE TABLE modules (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  order_index INT  NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_modules_course ON modules(course_id);

-- ── LESSONS ──────────────────────────────────────────────────
CREATE TABLE lessons (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id        UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title            TEXT NOT NULL,
  type             TEXT NOT NULL CHECK (type IN ('video', 'document', 'quiz', 'lab')),
  video_url        TEXT,   -- Cloudinary URL
  document_url     TEXT,   -- Cloudinary URL
  content_text     TEXT,   -- Rich text / markdown
  duration_seconds INT DEFAULT 0,
  order_index      INT NOT NULL DEFAULT 0,
  is_free          BOOLEAN DEFAULT false,  -- preview without enrollment
  created_at       TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_lessons_module ON lessons(module_id);

-- ── ENROLLMENTS ───────────────────────────────────────────────
CREATE TABLE enrollments (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  progress    INT DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);
CREATE INDEX idx_enrollments_user   ON enrollments(user_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);

-- ── LESSON PROGRESS ───────────────────────────────────────────
CREATE TABLE lesson_progress (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id    UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  course_id    UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  completed    BOOLEAN DEFAULT false,
  viewed_at    TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, lesson_id)
);

-- ── COPILOT LOGS (usage tracking & billing awareness) ────────
CREATE TABLE copilot_logs (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  input_tokens   INT DEFAULT 0,
  output_tokens  INT DEFAULT 0,
  total_tokens   INT DEFAULT 0,
  message_count  INT DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_copilot_logs_user ON copilot_logs(user_id);

-- ── CERTIFICATES ──────────────────────────────────────────────
CREATE TABLE certificates (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  issued_at   TIMESTAMPTZ DEFAULT NOW(),
  cert_url    TEXT,
  UNIQUE(user_id, course_id)
);

-- ── ROW LEVEL SECURITY (RLS) ──────────────────────────────────
ALTER TABLE users           ENABLE ROW LEVEL SECURITY;
ALTER TABLE refresh_tokens  ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses         ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments     ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE copilot_logs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates    ENABLE ROW LEVEL SECURITY;

-- Users can only read their own data
CREATE POLICY "users_own_data" ON users
  FOR ALL USING (id = auth.uid());

-- Enrollments: users see only their own
CREATE POLICY "enrollments_own" ON enrollments
  FOR ALL USING (user_id = auth.uid());

-- Lesson progress: users see only their own
CREATE POLICY "progress_own" ON lesson_progress
  FOR ALL USING (user_id = auth.uid());

-- Courses: published courses are readable by all authenticated users
CREATE POLICY "courses_public_read" ON courses
  FOR SELECT USING (is_published = true);

-- ── AUTO-UPDATE updated_at ────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated   BEFORE UPDATE ON users   FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_courses_updated BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at();