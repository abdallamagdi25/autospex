import { supabaseAdmin } from '../config/supabase.js';
import cloudinary from '../config/cloudinary.js';

// ── GET /api/courses ──────────────────────────────────────────
export const getCourses = async (req, res) => {
  try {
    const { language, level, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('courses')
      .select('id, title, description, level, language, thumbnail_url, tags, created_at, instructor:users(full_name, avatar_url)', { count: 'exact' })
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (language) query = query.eq('language', language);
    if (level)    query = query.eq('level', level);

    const { data, error, count } = await query;
    if (error) throw error;

    return res.json({ courses: data, total: count, page: +page, limit: +limit });
  } catch (err) {
    console.error('[getCourses]', err);
    return res.status(500).json({ error: 'Failed to fetch courses.' });
  }
};

// ── GET /api/courses/:id ──────────────────────────────────────
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: course, error } = await supabaseAdmin
      .from('courses')
      .select(`
        *,
        instructor:users(id, full_name, avatar_url),
        modules(id, title, order_index,
          lessons(id, title, type, duration_seconds, order_index, is_free)
        )
      `)
      .eq('id', id)
      .eq('is_published', true)
      .single();

    if (error || !course) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    // Check if user is enrolled
    const { data: enrollment } = await supabaseAdmin
      .from('enrollments')
      .select('id, enrolled_at')
      .eq('user_id', req.user.id)
      .eq('course_id', id)
      .single();

    return res.json({ course, isEnrolled: !!enrollment });
  } catch (err) {
    console.error('[getCourseById]', err);
    return res.status(500).json({ error: 'Failed to fetch course.' });
  }
};

// ── POST /api/courses (admin/instructor only) ─────────────────
export const createCourse = async (req, res) => {
  try {
    const { title, description, level, language, tags } = req.body;

    const { data: course, error } = await supabaseAdmin
      .from('courses')
      .insert({
        title,
        description,
        level,
        language:       language || 'en',
        tags:           tags || [],
        instructor_id:  req.user.id,
        is_published:   false,
        thumbnail_url:  req.file?.path || null,
      })
      .select()
      .single();

    if (error) throw error;
    return res.status(201).json({ message: 'Course created.', course });
  } catch (err) {
    console.error('[createCourse]', err);
    return res.status(500).json({ error: 'Failed to create course.' });
  }
};

// ── POST /api/courses/:id/enroll ──────────────────────────────
export const enrollCourse = async (req, res) => {
  try {
    const { id: courseId } = req.params;
    const userId = req.user.id;

    // Check course exists
    const { data: course } = await supabaseAdmin
      .from('courses')
      .select('id, title')
      .eq('id', courseId)
      .eq('is_published', true)
      .single();

    if (!course) return res.status(404).json({ error: 'Course not found.' });

    // Check already enrolled
    const { data: existing } = await supabaseAdmin
      .from('enrollments')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();

    if (existing) return res.status(409).json({ error: 'Already enrolled.' });

    await supabaseAdmin.from('enrollments').insert({ user_id: userId, course_id: courseId });

    return res.status(201).json({ message: `Enrolled in "${course.title}" successfully.` });
  } catch (err) {
    console.error('[enrollCourse]', err);
    return res.status(500).json({ error: 'Enrollment failed.' });
  }
};

// ── GET /api/courses/:courseId/lessons/:lessonId ──────────────
export const getLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const userId = req.user.id;

    // Verify enrollment (unless lesson is free)
    const { data: lesson } = await supabaseAdmin
      .from('lessons')
      .select('*, module:modules(course_id)')
      .eq('id', lessonId)
      .single();

    if (!lesson || lesson.module.course_id !== courseId) {
      return res.status(404).json({ error: 'Lesson not found.' });
    }

    if (!lesson.is_free) {
      const { data: enrollment } = await supabaseAdmin
        .from('enrollments')
        .select('id')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .single();

      if (!enrollment) {
        return res.status(403).json({ error: 'Enroll in this course to access the lesson.' });
      }
    }

    // Mark lesson as viewed
    await supabaseAdmin.from('lesson_progress').upsert({
      user_id:     userId,
      lesson_id:   lessonId,
      course_id:   courseId,
      viewed_at:   new Date().toISOString(),
    }, { onConflict: 'user_id,lesson_id' });

    return res.json({ lesson });
  } catch (err) {
    console.error('[getLesson]', err);
    return res.status(500).json({ error: 'Failed to fetch lesson.' });
  }
};

// ── POST /api/courses/:courseId/lessons/:lessonId/complete ────
export const completeLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const userId = req.user.id;

    await supabaseAdmin.from('lesson_progress').upsert({
      user_id:      userId,
      lesson_id:    lessonId,
      course_id:    courseId,
      completed:    true,
      completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,lesson_id' });

    // Recalculate overall course progress
    const { count: totalLessons } = await supabaseAdmin
      .from('lessons')
      .select('id', { count: 'exact' })
      .eq('module.course_id', courseId);

    const { count: completedLessons } = await supabaseAdmin
      .from('lesson_progress')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .eq('completed', true);

    const progress = totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

    await supabaseAdmin.from('enrollments').update({ progress }).match({ user_id: userId, course_id: courseId });

    return res.json({ message: 'Lesson completed.', progress });
  } catch (err) {
    console.error('[completeLesson]', err);
    return res.status(500).json({ error: 'Failed to mark lesson complete.' });
  }
};

// ── POST /api/admin/upload/video (admin/instructor only) ──────
export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });
    return res.json({
      message:   'Video uploaded successfully.',
      url:       req.file.path,
      public_id: req.file.filename,
    });
  } catch (err) {
    console.error('[uploadVideo]', err);
    return res.status(500).json({ error: 'Upload failed.' });
  }
};