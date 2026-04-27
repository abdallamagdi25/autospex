import rateLimit from 'express-rate-limit';

// ── Global limiter — all routes ───────────────────────────────
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again in 15 minutes.' },
});

// ── Auth limiter — login/register (brute-force protection) ────
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // 10 attempts per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many auth attempts. Please wait 15 minutes.' },
  skipSuccessfulRequests: true, // only count failures
});

// ── AI Copilot limiter — per user (protect Anthropic credits) ─
export const copilotLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 50,                   // 50 messages per user per hour
  keyGenerator: (req) => req.user?.id || req.ip, // per-user, not per-IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Copilot limit reached (50 messages/hour). Upgrade your plan.' },
});

// ── Upload limiter ────────────────────────────────────────────
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  keyGenerator: (req) => req.user?.id || req.ip,
  message: { error: 'Upload limit reached (20 uploads/hour).' },
});