import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '../../lib/supabase.js';
import { generateTokens } from '../../lib/jwt.js';
import { cors } from '../../lib/helpers.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required.' });

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, full_name, role, is_active, password_hash')
      .eq('email', email.toLowerCase())
      .single();

    if (error || !user) return res.status(401).json({ error: 'Invalid email or password.' });
    if (!user.is_active) return res.status(403).json({ error: 'Account deactivated. Contact support.' });

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) return res.status(401).json({ error: 'Invalid email or password.' });

    const tokens = generateTokens({ userId: user.id, role: user.role });

    await supabaseAdmin.from('refresh_tokens').insert({
      user_id: user.id, token: tokens.refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await supabaseAdmin.from('users').update({ last_login: new Date().toISOString() }).eq('id', user.id);

    return res.json({
      message: 'Login successful.',
      user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role },
      ...tokens,
    });
  } catch (err) {
    console.error('[login]', err);
    return res.status(500).json({ error: 'Login failed. Please try again.' });
  }
}
