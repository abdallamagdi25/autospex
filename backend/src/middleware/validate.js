import { z } from 'zod';

// ── Wrap a Zod schema into Express middleware ─────────────────
export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    const errors = err.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return res.status(422).json({ error: 'Validation failed.', errors });
  }
};

// ── Auth Schemas ──────────────────────────────────────────────
export const registerSchema = z.object({
  body: z.object({
    full_name: z.string().min(2).max(100),
    email:     z.string().email(),
    password:  z.string()
                .min(8, 'Password must be at least 8 characters')
                .regex(/[A-Z]/, 'Must contain an uppercase letter')
                .regex(/[0-9]/, 'Must contain a number'),
    university: z.string().min(2).max(100).optional(),
    student_id: z.string().max(50).optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email:    z.string().email(),
    password: z.string().min(1),
  }),
});

// ── Course Schemas ────────────────────────────────────────────
export const createCourseSchema = z.object({
  body: z.object({
    title:       z.string().min(3).max(200),
    description: z.string().min(10).max(2000),
    level:       z.enum(['beginner', 'intermediate', 'advanced']),
    language:    z.enum(['en', 'ar']).default('en'),
    tags:        z.array(z.string()).optional(),
  }),
});

// ── Copilot Schema ────────────────────────────────────────────
export const copilotSchema = z.object({
  body: z.object({
    messages: z.array(
      z.object({
        role:    z.enum(['user', 'assistant', 'model']), // <-- FIX: Added 'model'
        content: z.string().min(1).max(4000),
      })
    ).min(1).max(50), // cap conversation history at 50 messages
  }),
});