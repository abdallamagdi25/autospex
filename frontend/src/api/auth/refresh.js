import { supabaseAdmin } from '../../lib/supabase.js';
import { generateTokens, verifyRefreshToken } from '../../lib/jwt.js';
import { cors, authenticate } from '../../lib/helpers.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  // POST /api/auth/refresh
  if (req.method === 'POST') {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) return res.status(400).json({ error: 'Refresh token required.' });

      const decoded = verifyRefreshToken(refreshToken);

      const { data: stored, error } = await supabaseAdmin
        .from('refresh_tokens').select('id, user_id, expires_at').eq('token', refreshToken).single();

      if (error || !stored) return res.status(401).json({ error: 'Invalid refresh token.' });
      if (new Date(stored.expires_at) < new Date()) {
        await supabaseAdmin.from('refresh_tokens').delete().eq('id', stored.id);
        return res.status(401).json({ error: 'Refresh token expired. Please login again.' });
      }

      await supabaseAdmin.from('refresh_tokens').delete().eq('id', stored.id);

      const { data: user } = await supabaseAdmin
        .from('users').select('id, email, full_name, role, is_active').eq('id', stored.user_id).single();

      if (!user?.is_active) return res.status(403).json({ error: 'Account deactivated.' });

      const tokens = generateTokens({ userId: user.id, role: user.role });

      await supabaseAdmin.from('refresh_tokens').insert({
        user_id: user.id, token: tokens.refreshToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      return res.json({ ...tokens });
    } catch (err) {
      return res.status(401).json({ error: 'Token refresh failed.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
