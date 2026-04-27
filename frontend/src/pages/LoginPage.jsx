import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjusted path if needed
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate  = useNavigate();

  const [form, setForm]         = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await login(form.email, form.password);
      // Firebase auth logic usually routes directly to hub
      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/hub');
      }
    } catch (err) {
      setError("فشل تسجيل الدخول. يرجى التحقق من بياناتك."); // Friendly Arabic error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 flex items-center justify-center px-4 py-12 font-sans">
      
      {/* Light Theme Background glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center space-x-3 rtl:space-x-reverse mb-6">
            <img src="/autospex-logo.png" alt="AutoSpex Logo" className="w-12 h-12 object-contain drop-shadow-sm" />
            <span className="text-3xl font-extrabold text-autospex-primary font-tech tracking-wide">AutoSpex</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">مرحباً بعودتك</h1>
          <p className="text-slate-600 font-medium">سجل الدخول للوصول إلى بيئة التدريب الخاصة بك</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">

          {error && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse bg-rose-50 border border-rose-200 text-rose-600 text-sm font-bold p-4 rounded-xl mb-6">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-right rtl">

            {/* Email */}
            <div>
              <label className="block text-slate-700 text-sm font-bold mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="eng@example.com"
                required
                dir="ltr"
                className="w-full bg-slate-50 border border-slate-200 focus:border-autospex-primary rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 text-sm font-tech focus:outline-none transition-colors shadow-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-700 text-sm font-bold mb-2">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  dir="ltr"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-autospex-primary rounded-xl px-4 py-3 pr-11 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none transition-colors shadow-sm text-left"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-autospex-primary transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-autospex-primary hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 rtl:space-x-reverse mt-4"
            >
              {loading
                ? <><Loader2 size={18} className="animate-spin" /><span>جاري تسجيل الدخول...</span></>
                : <span>تسجيل الدخول</span>
              }
            </button>
          </form>

          <div className="my-6 border-t border-slate-100" />

          <p className="text-center text-slate-600 text-sm font-medium">
            ليس لديك حساب؟{' '}
            <Link to="/register" className="text-autospex-primary hover:text-blue-700 font-bold transition-colors">
              إنشاء حساب جديد
            </Link>
          </p>
        </div>

        <p className="text-center text-slate-500 text-sm font-bold mt-6">
          <Link to="/" className="hover:text-autospex-primary transition-colors flex items-center justify-center">
            العودة إلى الرئيسية &rarr;
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;