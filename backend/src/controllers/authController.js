import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '../config/supabase.js';
import { generateTokens, verifyRefreshToken } from '../utils/jwt.js';

// ── POST /api/auth/register ───────────────────────────────────
export const register = async (req, res) => {
  try {
    const { full_name, email, password, university, student_id } = req.body;

    // Check if email already exists
    const { data: existing } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 12);

    // Insert user (role defaults to 'student' in DB)
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .insert({
        full_name,
        email: email.toLowerCase(),
        password_hash,
        university: university || null,
        student_id: student_id || null,
        role: 'student',
        is_active: true,
      })
      .select('id, email, full_name, role')
      .single();

    if (error) throw error;

    const tokens = generateTokens({ userId: user.id, role: user.role });

    // Store refresh token in DB
    await supabaseAdmin.from('refresh_tokens').insert({
      user_id: user.id,
      token:   tokens.refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return res.status(201).json({
      message: 'Account created successfully.',
      user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role },
      ...tokens,
    });
  } catch (err) {
    console.error('[register]', err);
    return res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
};

// ── POST /api/auth/login ──────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, full_name, role, is_active, password_hash')
      .eq('email', email.toLowerCase())
      .single();

    // Generic message — never reveal if email exists
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    if (!user.is_active) {
      return res.status(403).json({ error: 'Account deactivated. Contact support.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const tokens = generateTokens({ userId: user.id, role: user.role });

    // Store refresh token
    await supabaseAdmin.from('refresh_tokens').insert({
      user_id:    user.id,
      token:      tokens.refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // Update last login
    await supabaseAdmin
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    return res.json({
      message: 'Login successful.',
      user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role },
      ...tokens,
    });
  } catch (err) {
    console.error('[login]', err);
    return res.status(500).json({ error: 'Login failed. Please try again.' });
  }
};

// ── POST /api/auth/refresh ────────────────────────────────────
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token required.' });
    }

    // Verify signature
    const decoded = verifyRefreshToken(refreshToken);

    // Check token exists in DB (rotation — each token used only once)
    const { data: stored, error } = await supabaseAdmin
      .from('refresh_tokens')
      .select('id, user_id, expires_at')
      .eq('token', refreshToken)
      .single();

    if (error || !stored) {
      return res.status(401).json({ error: 'Invalid or already used refresh token.' });
    }

    if (new Date(stored.expires_at) < new Date()) {
      await supabaseAdmin.from('refresh_tokens').delete().eq('id', stored.id);
      return res.status(401).json({ error: 'Refresh token expired. Please login again.' });
    }

    // Delete used token (rotation)
    await supabaseAdmin.from('refresh_tokens').delete().eq('id', stored.id);

    // Get fresh user data
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('id, email, full_name, role, is_active')
      .eq('id', stored.user_id)
      .single();

    if (!user?.is_active) {
      return res.status(403).json({ error: 'Account deactivated.' });
    }

    const tokens = generateTokens({ userId: user.id, role: user.role });

    // Store new refresh token
    await supabaseAdmin.from('refresh_tokens').insert({
      user_id:    user.id,
      token:      tokens.refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return res.json({ ...tokens });
  } catch (err) {
    console.error('[refresh]', err);
    return res.status(401).json({ error: 'Token refresh failed.' });
  }
};

// ── POST /api/auth/logout ─────────────────────────────────────
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      await supabaseAdmin
        .from('refresh_tokens')
        .delete()
        .eq('token', refreshToken);
    }
    return res.json({ message: 'Logged out successfully.' });
  } catch (err) {
    console.error('[logout]', err);
    return res.status(500).json({ error: 'Logout failed.' });
  }
};

// ── GET /api/auth/me ──────────────────────────────────────────
export const getMe = async (req, res) => {
  try {
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('id, email, full_name, role, university, student_id, avatar_url, created_at, last_login')
      .eq('id', req.user.id)
      .single();

    return res.json({ user });
  } catch (err) {
    console.error('[getMe]', err);
    return res.status(500).json({ error: 'Failed to fetch user.' });
  }
};