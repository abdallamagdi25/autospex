import { Router } from 'express';
import { supabaseAdmin } from '../config/supabase.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();
// All admin routes require auth + admin role
router.use(authenticate, authorize('admin'));

// ── GET /api/admin/users ──────────────────────────────────────
router.get('/users', async (req, res) => {
  const { page = 1, limit = 20, role, search } = req.query;
  const offset = (page - 1) * limit;

  let query = supabaseAdmin
    .from('users')
    .select('id, email, full_name, role, is_active, university, created_at, last_login', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (role)   query = query.eq('role', role);
  if (search) query = query.ilike('full_name', `%${search}%`);

  const { data, error, count } = await query;
  if (error) return res.status(500).json({ error: 'Failed to fetch users.' });

  return res.json({ users: data, total: count });
});

// ── PATCH /api/admin/users/:id/role ──────────────────────────
router.patch('/users/:id/role', async (req, res) => {
  const { role } = req.body;
  const validRoles = ['student', 'instructor', 'admin'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: `Invalid role. Must be: ${validRoles.join(', ')}` });
  }

  const { error } = await supabaseAdmin.from('users').update({ role }).eq('id', req.params.id);
  if (error) return res.status(500).json({ error: 'Failed to update role.' });
  return res.json({ message: 'Role updated.' });
});

// ── PATCH /api/admin/users/:id/status ────────────────────────
router.patch('/users/:id/status', async (req, res) => {
  const { is_active } = req.body;
  const { error } = await supabaseAdmin
    .from('users')
    .update({ is_active })
    .eq('id', req.params.id);
  if (error) return res.status(500).json({ error: 'Failed to update status.' });
  return res.json({ message: `User ${is_active ? 'activated' : 'deactivated'}.` });
});

// ── GET /api/admin/analytics ──────────────────────────────────
router.get('/analytics', async (req, res) => {
  const [users, enrollments, copilotLogs] = await Promise.all([
    supabaseAdmin.from('users').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('enrollments').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('copilot_logs').select('total_tokens').gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
  ]);

  const totalTokensThisMonth = copilotLogs.data?.reduce((sum, l) => sum + (l.total_tokens || 0), 0) || 0;

  return res.json({
    totalUsers:            users.count || 0,
    totalEnrollments:      enrollments.count || 0,
    copilotMessagesMonth:  copilotLogs.data?.length || 0,
    tokensUsedMonth:       totalTokensThisMonth,
    estimatedCostUSD:      ((totalTokensThisMonth / 1_000_000) * 3).toFixed(4),
  });
});

export default router;