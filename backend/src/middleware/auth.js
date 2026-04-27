import { verifyAccessToken } from '../utils/jwt.js';
import { supabaseAdmin } from '../config/supabase.js';

// ── Authenticate: verify JWT and attach user to req ───────────
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    // Fetch fresh user from DB (catches deactivated accounts mid-session)
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, role, is_active, full_name')
      .eq('id', decoded.userId)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'User not found.' });
    }
    if (!user.is_active) {
      return res.status(403).json({ error: 'Account deactivated. Contact admin.' });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired. Please refresh.' });
    }
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

// ── Authorize: role-based guard ───────────────────────────────
// Usage: authorize('admin') or authorize('admin', 'instructor')
export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return res.status(403).json({
      error: `Access denied. Required role: ${roles.join(' or ')}.`,
    });
  }
  next();
};