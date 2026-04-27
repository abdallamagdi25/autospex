import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '../../lib/supabase.js';
import { generateTokens } from '../../lib/jwt.js';
import { cors } from '../../lib/helpers.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  try {
    const { full_name, email, password, university, student_id } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ error: 'full_name, email, and password are required.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    const { data: existing } = await supabaseAdmin
      .from('users').select('id').eq('email', email.toLowerCase()).single();

    if (existing) return res.status(409).json({ error: 'Email already registered.' });

    const password_hash = await bcrypt.hash(password, 12);

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .insert({ full_name, email: email.toLowerCase(), password_hash, university: university || null, student_id: student_id || null, role: 'student', is_active: true })
      .select('id, email, full_name, role')
      .single();

    if (error) throw error;

    const tokens = generateTokens({ userId: user.id, role: user.role });

    await supabaseAdmin.from('refresh_tokens').insert({
      user_id: user.id, token: tokens.refreshToken,
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
}
