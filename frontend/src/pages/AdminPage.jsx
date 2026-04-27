import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  Users, BookOpen, BarChart3, Upload, LogOut,
  ShieldCheck, Search, ChevronDown, MoreVertical,
  TrendingUp, Cpu, Activity, AlertCircle, Check,
  X, RefreshCw, UserCheck, UserX, Crown, GraduationCap,
  FileVideo, FileText, Plus, Eye, EyeOff, Loader2,
  Zap, Database, DollarSign
} from 'lucide-react';

const BACKEND = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// ── API helper ────────────────────────────────────────────────
const api = async (path, token, opts = {}) => {
  const t = token || localStorage.getItem('accessToken');
  const res = await fetch(`${BACKEND}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${t}`,
      ...opts.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
};

// ── Stat Card ─────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-start space-x-4">
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-white mt-0.5">{value ?? '—'}</p>
      {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
    </div>
  </div>
);

// ── Role Badge ────────────────────────────────────────────────
const RoleBadge = ({ role }) => {
  const colors = {
    admin:      'bg-rose-500/20 text-rose-400 border-rose-500/30',
    instructor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    student:    'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${colors[role] || colors.student}`}>
      {role}
    </span>
  );
};

// ── Toast ─────────────────────────────────────────────────────
const Toast = ({ message, type, onClose }) => (
  <div className={`fixed bottom-6 right-6 z-[200] flex items-center space-x-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-medium animate-in slide-in-from-bottom-4 duration-300 ${
    type === 'success'
      ? 'bg-emerald-950 border-emerald-500/30 text-emerald-300'
      : 'bg-rose-950 border-rose-500/30 text-rose-300'
  }`}>
    {type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
    <span>{message}</span>
    <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100"><X size={14} /></button>
  </div>
);

// ════════════════════════════════════════════════════════════════
// MAIN ADMIN PAGE
// ════════════════════════════════════════════════════════════════
const AdminPage = () => {
  const { user, token, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab]               = useState('analytics');
  const [analytics, setAnalytics]   = useState(null);
  const [users, setUsers]           = useState([]);
  const [courses, setCourses]       = useState([]);
  const [loading, setLoading]       = useState(false);
  const [search, setSearch]         = useState('');
  const [toast, setToast]           = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading]   = useState(false);

  // ── Guard: admin only ───────────────────────────────────────
  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
    if (!authLoading && user && user.role !== 'admin') navigate('/hub');
  }, [user, authLoading]);

  // ── Load data on tab change ─────────────────────────────────
  useEffect(() => {
    if (!user || user.role !== 'admin') return;
    if (tab === 'analytics') loadAnalytics();
    if (tab === 'users')     loadUsers();
    if (tab === 'courses')   loadCourses();
  }, [tab, user]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const data = await api('/api/admin/analytics', token);
      setAnalytics(data);
    } catch (err) {
      showToast(err.message, 'error');
    } finally { setLoading(false); }
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await api('/api/admin/users', token);
      setUsers(data.users || []);
    } catch (err) {
      showToast(err.message, 'error');
    } finally { setLoading(false); }
  };

  const loadCourses = async () => {
    setLoading(true);
    try {
      const data = await api('/api/courses', token);
      setCourses(data.courses || []);
    } catch (err) {
      showToast(err.message, 'error');
    } finally { setLoading(false); }
  };

  const updateUserRole = async (userId, role) => {
    try {
      await api(`/api/admin/users/${userId}/role`, token, {
        method: 'PATCH',
        body: JSON.stringify({ role }),
      });
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
      showToast(`Role updated to ${role}`);
    } catch (err) { showToast(err.message, 'error'); }
  };

  const toggleUserStatus = async (userId, is_active) => {
    try {
      await api(`/api/admin/users/${userId}/status`, token, {
        method: 'PATCH',
        body: JSON.stringify({ is_active }),
      });
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_active } : u));
      showToast(`User ${is_active ? 'activated' : 'deactivated'}`);
    } catch (err) { showToast(err.message, 'error'); }
  };

  const handleUpload = async (type) => {
    if (!uploadFile) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append(type, uploadFile);
      const res = await fetch(`${BACKEND}/api/courses/upload/${type}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast(`${type} uploaded successfully!`);
      setUploadFile(null);
    } catch (err) {
      showToast(err.message, 'error');
    } finally { setUploading(false); }
  };

  const filteredUsers = users.filter(u =>
    u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users',     label: 'Users',     icon: Users     },
    { id: 'courses',   label: 'Courses',   icon: BookOpen  },
    { id: 'upload',    label: 'Upload',    icon: Upload    },
  ];

  // Show spinner while auth is being verified
  if (authLoading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  // Don't render anything if not admin
  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-28 pb-16">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-rose-500/20 border border-rose-500/30 rounded-xl flex items-center justify-center">
              <ShieldCheck size={20} className="text-rose-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-slate-500 text-sm">Logged in as <span className="text-rose-400 font-medium">{user?.email}</span></p>
            </div>
          </div>
          <button
            onClick={async () => { await logout(); navigate('/login'); }}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-900 border border-slate-800 hover:border-rose-500/50 hover:text-rose-400 text-slate-400 rounded-xl transition-all text-sm"
          >
            <LogOut size={15} /> <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex space-x-2 bg-slate-900/50 border border-slate-800 p-1.5 rounded-2xl w-fit">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                tab === t.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <t.icon size={15} />
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── ANALYTICS TAB ── */}
        {tab === 'analytics' && (
          <div className="space-y-8">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin text-blue-500" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard icon={Users}    label="Total Users"      value={analytics?.totalUsers}           color="bg-blue-600"    />
                  <StatCard icon={BookOpen} label="Enrollments"      value={analytics?.totalEnrollments}     color="bg-emerald-600" />
                  <StatCard icon={Zap}      label="AI Messages / mo" value={analytics?.copilotMessagesMonth} color="bg-amber-600"   />
                  <StatCard icon={Database} label="Tokens Used / mo" value={analytics?.tokensUsedMonth?.toLocaleString()} sub={`~$${analytics?.estimatedCostUSD} est.`} color="bg-purple-600" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-white font-bold mb-4 flex items-center space-x-2">
                      <Activity size={16} className="text-blue-400" /><span>System Status</span>
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Backend API',    status: true },
                        { label: 'Supabase DB',    status: true },
                        { label: 'Groq AI',        status: true },
                        { label: 'Cloudinary CDN', status: true },
                      ].map(s => (
                        <div key={s.label} className="flex items-center justify-between">
                          <span className="text-slate-400 text-sm">{s.label}</span>
                          <div className="flex items-center space-x-1.5">
                            <span className={`w-2 h-2 rounded-full ${s.status ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                            <span className={`text-xs font-medium ${s.status ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {s.status ? 'Operational' : 'Down'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-white font-bold mb-4 flex items-center space-x-2">
                      <TrendingUp size={16} className="text-emerald-400" /><span>Quick Stats</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400 text-sm">Avg enrollments/user</span>
                        <span className="text-white font-bold text-sm">
                          {analytics?.totalUsers > 0
                            ? (analytics.totalEnrollments / analytics.totalUsers).toFixed(1)
                            : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 text-sm">AI messages this month</span>
                        <span className="text-white font-bold text-sm">{analytics?.copilotMessagesMonth || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 text-sm">Estimated AI cost</span>
                        <span className="text-emerald-400 font-bold text-sm">${analytics?.estimatedCostUSD || '0.00'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 text-sm">Model</span>
                        <span className="text-amber-400 font-bold text-sm">llama-3.3-70b</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={loadAnalytics}
                  className="flex items-center space-x-2 text-slate-400 hover:text-white text-sm transition-colors"
                >
                  <RefreshCw size={14} /> <span>Refresh</span>
                </button>
              </>
            )}
          </div>
        )}

        {/* ── USERS TAB ── */}
        {tab === 'users' && (
          <div className="space-y-6">
            <div className="relative max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin text-blue-500" />
              </div>
            ) : (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left text-slate-500 text-xs font-bold uppercase tracking-wider px-6 py-4">User</th>
                      <th className="text-left text-slate-500 text-xs font-bold uppercase tracking-wider px-6 py-4 hidden md:table-cell">University</th>
                      <th className="text-left text-slate-500 text-xs font-bold uppercase tracking-wider px-6 py-4">Role</th>
                      <th className="text-left text-slate-500 text-xs font-bold uppercase tracking-wider px-6 py-4">Status</th>
                      <th className="text-left text-slate-500 text-xs font-bold uppercase tracking-wider px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {filteredUsers.length === 0 ? (
                      <tr><td colSpan={5} className="text-center text-slate-600 py-12">No users found</td></tr>
                    ) : filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                              <span className="text-white text-xs font-bold">{u.full_name?.charAt(0).toUpperCase()}</span>
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium">{u.full_name}</p>
                              <p className="text-slate-500 text-xs">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className="text-slate-400 text-sm">{u.university || '—'}</span>
                        </td>
                        <td className="px-6 py-4"><RoleBadge role={u.role} /></td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center space-x-1.5 text-xs font-medium ${u.is_active ? 'text-emerald-400' : 'text-slate-500'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${u.is_active ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                            <span>{u.is_active ? 'Active' : 'Inactive'}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <select
                              value={u.role}
                              onChange={e => updateUserRole(u.id, e.target.value)}
                              disabled={u.id === user?.id}
                              className="bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-lg px-2 py-1.5 focus:outline-none disabled:opacity-40"
                            >
                              <option value="student">Student</option>
                              <option value="instructor">Instructor</option>
                              <option value="admin">Admin</option>
                            </select>
                            <button
                              onClick={() => toggleUserStatus(u.id, !u.is_active)}
                              disabled={u.id === user?.id}
                              className={`p-1.5 rounded-lg transition-colors disabled:opacity-40 ${
                                u.is_active
                                  ? 'text-rose-400 hover:bg-rose-500/10'
                                  : 'text-emerald-400 hover:bg-emerald-500/10'
                              }`}
                              title={u.is_active ? 'Deactivate' : 'Activate'}
                            >
                              {u.is_active ? <UserX size={15} /> : <UserCheck size={15} />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── COURSES TAB ── */}
        {tab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-slate-400 text-sm">{courses.length} courses total</p>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors">
                <Plus size={15} /> <span>New Course</span>
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin text-blue-500" />
              </div>
            ) : courses.length === 0 ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center">
                <BookOpen size={40} className="text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500">No courses yet. Create your first course.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map(c => (
                  <div key={c.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
                    {c.thumbnail_url
                      ? <img src={c.thumbnail_url} alt={c.title} className="w-full h-32 object-cover rounded-xl mb-4" />
                      : <div className="w-full h-32 bg-slate-800 rounded-xl mb-4 flex items-center justify-center"><BookOpen size={32} className="text-slate-700" /></div>
                    }
                    <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">{c.title}</h3>
                    <p className="text-slate-500 text-xs mb-3 line-clamp-2">{c.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full border ${
                          c.level === 'beginner'     ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                          c.level === 'intermediate' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                          'bg-rose-500/20 text-rose-400 border-rose-500/30'
                        }`}>{c.level}</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full border bg-slate-800 text-slate-400 border-slate-700">{c.language}</span>
                      </div>
                      <span className={`flex items-center space-x-1 text-xs ${c.is_published ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {c.is_published ? <Eye size={12} /> : <EyeOff size={12} />}
                        <span>{c.is_published ? 'Live' : 'Draft'}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── UPLOAD TAB ── */}
        {tab === 'upload' && (
          <div className="max-w-xl space-y-6">
            <p className="text-slate-400 text-sm">Upload course content directly to Cloudinary CDN.</p>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-xl"><FileVideo size={20} className="text-blue-400" /></div>
                <div>
                  <h3 className="text-white font-bold text-sm">Video Upload</h3>
                  <p className="text-slate-500 text-xs">MP4, MOV, AVI — max 500MB</p>
                </div>
              </div>
              <label className="block w-full border-2 border-dashed border-slate-700 hover:border-blue-500/50 rounded-xl p-8 text-center cursor-pointer transition-colors group">
                <input type="file" accept="video/*" className="hidden" onChange={e => setUploadFile(e.target.files[0])} />
                <Upload size={24} className="text-slate-600 group-hover:text-blue-400 mx-auto mb-2 transition-colors" />
                <p className="text-slate-500 text-sm">{uploadFile ? uploadFile.name : 'Click to select video file'}</p>
              </label>
              {uploadFile && (
                <button
                  onClick={() => handleUpload('video')}
                  disabled={uploading}
                  className="mt-4 w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl font-medium text-sm flex items-center justify-center space-x-2 transition-colors"
                >
                  {uploading ? <><Loader2 size={16} className="animate-spin" /><span>Uploading...</span></> : <><Upload size={16} /><span>Upload Video</span></>}
                </button>
              )}
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-amber-500/10 rounded-xl"><FileText size={20} className="text-amber-400" /></div>
                <div>
                  <h3 className="text-white font-bold text-sm">Document Upload</h3>
                  <p className="text-slate-500 text-xs">PDF, DOCX, PPTX — max 50MB</p>
                </div>
              </div>
              <label className="block w-full border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-xl p-8 text-center cursor-pointer transition-colors group">
                <input type="file" accept=".pdf,.docx,.pptx,.xlsx" className="hidden" onChange={e => setUploadFile(e.target.files[0])} />
                <Upload size={24} className="text-slate-600 group-hover:text-amber-400 mx-auto mb-2 transition-colors" />
                <p className="text-slate-500 text-sm">{uploadFile ? uploadFile.name : 'Click to select document'}</p>
              </label>
              {uploadFile && (
                <button
                  onClick={() => handleUpload('document')}
                  disabled={uploading}
                  className="mt-4 w-full py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white rounded-xl font-medium text-sm flex items-center justify-center space-x-2 transition-colors"
                >
                  {uploading ? <><Loader2 size={16} className="animate-spin" /><span>Uploading...</span></> : <><Upload size={16} /><span>Upload Document</span></>}
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AdminPage;