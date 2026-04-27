import { supabaseAdmin } from '../../lib/supabase.js';
import { cors, authenticate } from '../../lib/helpers.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' });

  const user = await authenticate(req, res);
  if (!user) return;

  try {
    const { data } = await supabaseAdmin
      .from('users')
      .select('id, email, full_name, role, university, student_id, avatar_url, created_at, last_login')
      .eq('id', user.id)
      .single();

    return res.json({ user: data });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch user.' });
  }
}
