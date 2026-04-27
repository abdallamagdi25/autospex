import { supabaseAdmin } from '../../lib/supabase.js';
import { cors, authenticate } from '../../lib/helpers.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  // POST /api/auth/logout
  if (req.method === 'POST') {
    try {
      const { refreshToken } = req.body;
      if (refreshToken) {
        await supabaseAdmin.from('refresh_tokens').delete().eq('token', refreshToken);
      }
      return res.json({ message: 'Logged out successfully.' });
    } catch (err) {
      return res.status(500).json({ error: 'Logout failed.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
