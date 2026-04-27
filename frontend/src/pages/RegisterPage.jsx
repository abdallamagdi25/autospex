import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, 
  ChevronDown, CheckSquare, Trophy, Zap, ArrowRight, ArrowLeft 
} from 'lucide-react';

const AVATARS = ['👨‍💻', '👩‍💻', '👷‍♂️', '👷‍♀️', '🤖', '⚡', '🚀', '🎓'];

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate     = useNavigate();

  const [step, setStep] = useState(1);
  const [xp, setXp] = useState(0);

  const [form, setForm] = useState({
    // Step 1: Core
    full_name:          '',
    email:              '',
    phone:              '',
    password:           '',
    confirm:            '',
    terms_accepted:     false,
    privacy_accepted:   false,
    
    // Step 2: Gamified Profile
    avatar:             '👨‍💻',
    university:         '',
    custom_university:  '',
    major:              '',
    custom_major:       '',
    academic_level:     '',
    
    // The Poll
    primary_goal:       '',
    learning_style:     '',
  });

  const [showPass, setShowPass]         = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');

  const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]{3,50}$/;
  const phoneRegex = /^01[0125][0-9]{8}$/; 
  
  const checks = {
    length:    form.password.length >= 8,
    uppercase: /[A-Z]/.test(form.password),
    number:    /[0-9]/.test(form.password),
    match:     form.password === form.confirm && form.confirm !== '',
  };
  const allChecksPassed = Object.values(checks).every(Boolean);

  // Gamification: Calculate XP dynamically
  useEffect(() => {
    let newXp = 0;
    if (form.university) newXp += 50;
    if (form.major) newXp += 50;
    if (form.academic_level) newXp += 50;
    if (form.primary_goal) newXp += 100; // Bonus for the poll
    if (form.learning_style) newXp += 100; // Bonus for the poll
    setXp(newXp);
  }, [form.university, form.major, form.academic_level, form.primary_goal, form.learning_style]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setError('');
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!nameRegex.test(form.full_name.trim())) {
      setError("يرجى إدخال اسم صحيح (حروف فقط)."); return;
    }
    if (!phoneRegex.test(form.phone)) {
      setError("يرجى إدخال رقم هاتف مصري صحيح (11 رقم)."); return;
    }
    if (!form.terms_accepted || !form.privacy_accepted) {
      setError("يرجى الموافقة على شروط الاستخدام وسياسة الخصوصية."); return;
    }
    if (!allChecksPassed) { 
      setError('يرجى التأكد من استيفاء شروط كلمة المرور.'); return; 
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate custom manual typing
    if (form.university === 'Other' && !form.custom_university.trim()) {
      setError("يرجى كتابة اسم الجامعة."); return;
    }
    if (form.major === 'Other' && !form.custom_major.trim()) {
      setError("يرجى كتابة التخصص الهندسي."); return;
    }

    setLoading(true);
    setError('');
    
    try {
      await register(form.email, form.password, form);
      navigate('/hub');
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء إنشاء الحساب.");
    } finally {
      setLoading(false);
    }
  };

  const Check = ({ ok, label }) => (
    <div className={`flex items-center space-x-2 rtl:space-x-reverse text-[11px] font-bold ${ok ? 'text-emerald-600' : 'text-slate-400'}`}>
      <CheckCircle2 size={13} className={ok ? 'text-emerald-500' : 'text-slate-300'} />
      <span>{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center px-4 py-12 font-sans relative overflow-hidden">
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-autospex-light/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center space-x-3 rtl:space-x-reverse mb-4 group">
            <img src="/autospex-logo.png" alt="AutoSpex Logo" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />
            <span className="text-2xl font-extrabold text-autospex-primary font-tech tracking-wide">AutoSpex</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            {step === 1 ? 'إنشاء حساب مهندس' : 'أكمل ملفك التعريفي'}
          </h1>
          <p className="text-slate-600 font-medium">
            {step === 1 ? 'الخطوة 1 من 2: البيانات الأساسية' : 'الخطوة 2 من 2: التخصيص والمكافآت'}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl transition-all duration-500">
          
          {error && (
            <div className="flex items-center space-x-3 rtl:space-x-reverse bg-rose-50 border border-rose-200 text-rose-600 text-sm font-bold p-4 rounded-xl mb-6">
              <AlertCircle size={20} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* ═════════ STEP 1: CORE INFO ═════════ */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6 text-right rtl animate-fade-in-up">
              
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
                <input type="text" name="full_name" value={form.full_name} onChange={handleChange} placeholder="الاسم الرباعي" required className="w-full bg-white border border-slate-200 focus:border-autospex-primary rounded-xl px-4 py-3 text-sm focus:outline-none transition-all shadow-sm" />
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="engineer@example.com" required dir="ltr" className="w-full bg-white border border-slate-200 focus:border-autospex-primary rounded-xl px-4 py-3 text-sm focus:outline-none shadow-sm text-left" />
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="رقم الهاتف (مثال: 01012345678)" required dir="ltr" className="w-full bg-white border border-slate-200 focus:border-autospex-primary rounded-xl px-4 py-3 text-sm focus:outline-none shadow-sm text-left font-tech" />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input type={showPass ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="كلمة المرور" required dir="ltr" className="w-full bg-white border border-slate-200 focus:border-autospex-primary rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none shadow-sm text-left" />
                    <button type="button" onClick={() => setShowPass(p=>!p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{showPass ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
                  </div>
                  <div className="relative">
                    <input type={showConfirm ? 'text' : 'password'} name="confirm" value={form.confirm} onChange={handleChange} placeholder="تأكيد المرور" required dir="ltr" className={`w-full bg-white border rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none shadow-sm text-left ${form.confirm ? checks.match ? 'border-emerald-400' : 'border-rose-400' : 'border-slate-200'}`} />
                    <button type="button" onClick={() => setShowConfirm(p=>!p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{showConfirm ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
                  </div>
                </div>
                {form.password && (
                  <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-xl border border-slate-100 mt-2">
                    <Check ok={checks.length} label="8 أحرف للأمان" />
                    <Check ok={checks.uppercase} label="حرف كبير (A-Z)" />
                    <Check ok={checks.number} label="يحتوي على أرقام" />
                    <Check ok={checks.match} label="متطابقتان" />
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-start space-x-3 rtl:space-x-reverse cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input type="checkbox" name="terms_accepted" checked={form.terms_accepted} onChange={handleChange} className="peer sr-only" />
                    <div className="w-5 h-5 border-2 border-slate-300 rounded peer-checked:bg-autospex-primary transition-colors"></div>
                    <CheckSquare size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-slate-600 text-sm font-medium">أوافق على <a href="#" className="text-autospex-primary hover:underline">شروط الاستخدام</a>.</span>
                </label>
                <label className="flex items-start space-x-3 rtl:space-x-reverse cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input type="checkbox" name="privacy_accepted" checked={form.privacy_accepted} onChange={handleChange} className="peer sr-only" />
                    <div className="w-5 h-5 border-2 border-slate-300 rounded peer-checked:bg-autospex-primary transition-colors"></div>
                    <CheckSquare size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-slate-600 text-sm font-medium">أوافق على <a href="#" className="text-autospex-primary hover:underline">سياسة الخصوصية</a>.</span>
                </label>
              </div>

              <button type="submit" disabled={!allChecksPassed || !form.terms_accepted || !form.privacy_accepted} className="w-full py-4 bg-autospex-primary hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 rtl:space-x-reverse mt-8">
                <span>المتابعة إلى الخطوة الأخيرة</span>
                <ArrowLeft size={18} />
              </button>
            </form>
          )}

          {/* ═════════ STEP 2: GAMIFIED ONBOARDING ═════════ */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6 text-right rtl animate-fade-in-up">
              
              {/* Gamification Banner */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white flex items-center justify-between shadow-md mb-6">
                <div>
                  <h3 className="font-extrabold text-lg flex items-center"><Trophy size={20} className="mr-2 rtl:ml-2 text-yellow-200"/> اجمع نقاط AutoSpex!</h3>
                  <p className="text-amber-100 text-sm mt-1">أكمل البيانات الاختيارية للحصول على مكافآت ونقاط خبرة (XP).</p>
                </div>
                <div className="bg-black/20 px-4 py-2 rounded-xl text-center backdrop-blur-sm border border-white/20">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-200">الرصيد</p>
                  <p className="text-2xl font-extrabold font-tech flex items-center justify-center"><Zap size={18} className="mr-1 text-yellow-300 fill-yellow-300"/> {xp}</p>
                </div>
              </div>

              {/* AVATAR */}
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="flex flex-wrap justify-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  {AVATARS.map((emoji, idx) => (
                    <button key={idx} type="button" onClick={() => setForm(p=>({...p, avatar: emoji}))}
                      className={`w-12 h-12 text-2xl flex items-center justify-center rounded-full transition-all ${form.avatar === emoji ? 'bg-autospex-primary shadow-lg scale-110' : 'bg-white border hover:bg-slate-100'}`}>
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* ACADEMIC DATA (With "Other" Logic) */}
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
                <p className="text-xs font-extrabold text-autospex-primary uppercase tracking-wider">الملف الأكاديمي (+150 XP)</p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <select name="university" value={form.university} onChange={handleChange} className="w-full appearance-none bg-white border border-slate-200 focus:border-autospex-primary rounded-xl px-4 py-3 text-sm focus:outline-none shadow-sm cursor-pointer text-slate-700">
                      <option value="" disabled>اختر جامعتك...</option>
                      <option value="Beni-Suef Technological University">جامعة بني سويف التكنولوجية</option>
                      <option value="Cairo University">جامعة القاهرة</option>
                      <option value="Other">أخرى (كتابة يدوية)</option>
                    </select>
                    <ChevronDown size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                  {/* The Manual Input for University */}
                  {form.university === 'Other' && (
                    <input type="text" name="custom_university" value={form.custom_university} onChange={handleChange} placeholder="اكتب اسم الجامعة..." className="w-full bg-white border border-slate-200 focus:border-autospex-primary rounded-xl px-4 py-3 text-sm focus:outline-none shadow-sm" required />
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <select name="major" value={form.major} onChange={handleChange} className="w-full appearance-none bg-white border border-slate-200 focus:border-autospex-primary rounded-xl px-4 py-3 text-sm focus:outline-none shadow-sm cursor-pointer text-slate-700">
                      <option value="" disabled>التخصص الهندسي...</option>
                      <option value="Mechatronics">ميكاترونكس</option>
                      <option value="Electrical">كهرباء / تحكم</option>
                      <option value="Other">تخصص آخر (كتابة يدوية)</option>
                    </select>
                    <ChevronDown size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                  {/* The Manual Input for Major */}
                  {form.major === 'Other' && (
                    <input type="text" name="custom_major" value={form.custom_major} onChange={handleChange} placeholder="اكتب التخصص..." className="w-full bg-white border border-slate-200 focus:border-autospex-primary rounded-xl px-4 py-3 text-sm focus:outline-none shadow-sm" required />
                  )}
                </div>

                <div className="relative">
                  <select name="academic_level" value={form.academic_level} onChange={handleChange} className="w-full appearance-none bg-white border border-slate-200 focus:border-autospex-primary rounded-xl px-4 py-3 text-sm focus:outline-none shadow-sm cursor-pointer text-slate-700">
                    <option value="" disabled>المرحلة الدراسية...</option>
                    <option value="Student">طالب</option>
                    <option value="Graduate">خريج</option>
                    <option value="Instructor">عضو هيئة تدريس</option>
                  </select>
                  <ChevronDown size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* THE POLL */}
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
                <p className="text-xs font-extrabold text-autospex-primary uppercase tracking-wider">استطلاع التخصيص (+200 XP)</p>
                <div className="relative">
                  <select name="primary_goal" value={form.primary_goal} onChange={handleChange} className="w-full appearance-none bg-white border border-slate-200 focus:border-autospex-primary rounded-xl px-4 py-3 text-sm focus:outline-none shadow-sm cursor-pointer text-slate-700">
                    <option value="" disabled>ما هو هدفك الأساسي من المنصة؟ (اختياري)</option>
                    <option value="Job Prep">الاستعداد لسوق العمل والمقابلات</option>
                    <option value="Project">العمل على مشروع تخرج / كورس</option>
                    <option value="Upskill">تعلم مهارة جديدة (PLC, SCADA)</option>
                  </select>
                  <ChevronDown size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select name="learning_style" value={form.learning_style} onChange={handleChange} className="w-full appearance-none bg-white border border-slate-200 focus:border-autospex-primary rounded-xl px-4 py-3 text-sm focus:outline-none shadow-sm cursor-pointer text-slate-700">
                    <option value="" disabled>كيف تفضل التعلم؟ (اختياري)</option>
                    <option value="Visual">التجارب العملية والتوأم الرقمي</option>
                    <option value="Text">الفيديوهات والشرح النظري</option>
                    <option value="Hybrid">مزيج بين النظري والعملي</option>
                  </select>
                  <ChevronDown size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setStep(1)} className="w-1/3 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-extrabold rounded-xl transition-all">
                  رجوع
                </button>
                <button type="submit" disabled={loading} className="w-2/3 py-4 bg-autospex-primary hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 rtl:space-x-reverse">
                  {loading ? <Loader2 size={20} className="animate-spin" /> : <span>إنشاء الحساب وبدء التعلم</span>}
                </button>
              </div>
              <p className="text-center text-slate-400 text-xs font-bold mt-4 cursor-pointer hover:text-slate-600" onClick={handleSubmit}>
                تخطي الاستبيان وإكمال التسجيل
              </p>
            </form>
          )}

        </div>
        <p className="text-center text-slate-500 text-sm font-bold mt-8">
          <Link to="/" className="hover:text-autospex-primary transition-colors flex items-center justify-center">العودة للرئيسية</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;