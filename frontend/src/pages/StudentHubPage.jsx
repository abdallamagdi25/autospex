import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Activity, Target, Award, BookOpen, ShieldAlert, ChevronRight, 
  Lightbulb, Zap, Users, Server, TrendingUp, CheckCircle2, Play,
  Briefcase, GraduationCap, Settings
} from 'lucide-react';

// ─── MOCK DATA FOR DEMO PURPOSES ───
const STUDENT_PATH = [
  { id: 1, title: 'توصيل هاردوير', tech: 'S7-1200', status: 'مكتمل', score: '100%', state: 'completed', icon: <Zap size={18} /> },
  { id: 2, title: 'أساسيات', tech: 'Ladder Logic', status: 'قيد التقدم', score: '60%', state: 'progress', icon: <Activity size={18} /> },
  { id: 3, title: 'برمجة متقدمة', tech: 'Timers & Counters', status: 'مغلق', score: '0%', state: 'locked', icon: <ShieldAlert size={18} /> },
];

const INSTRUCTOR_ACTIVITY = [
  { student: 'أحمد محمد', action: 'أكمل الوحدة الأولى', time: 'منذ ساعتين' },
  { student: 'يوسف عماد', action: 'طرح سؤالاً في المساعد الذكي', time: 'منذ 3 ساعات' },
  { student: 'علي حسام', action: 'حقق 100% في التقييم النهائي', time: 'منذ 5 ساعات' },
];

export default function HubPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Route protection fallback
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  // Determine Dashboard Type based on Firestore data
  const role = user.role || 'student'; // 'student', 'instructor', 'admin'
  const eduLevel = user.education_level || 'Year 3'; // 'Graduate', 'Year 1', etc.

  // ═════════ 1. ADMIN DASHBOARD ═════════
  if (role === 'admin') {
    return (
      <main className="pt-24 md:pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">
        <Header user={user} title="لوحة تحكم الإدارة" subtitle="نظرة عامة على أداء المنصة" badge="ADMIN" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="المستخدمين النشطين" value="1,248" icon={<Users />} color="text-blue-600" bg="bg-blue-50" />
          <StatCard title="صحة النظام (Twin)" value="99.9%" icon={<Server />} color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard title="الشهادات المصدرة" value="342" icon={<Award />} color="text-amber-600" bg="bg-amber-50" />
          <StatCard title="معدل النمو" value="+14%" icon={<TrendingUp />} color="text-violet-600" bg="bg-violet-50" />
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-extrabold text-slate-900">أحدث التسجيلات</h3>
            <button className="text-sm font-bold text-autospex-primary">إدارة المستخدمين</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right rtl">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500 text-sm">
                  <th className="pb-3 font-bold">الاسم</th>
                  <th className="pb-3 font-bold">الجامعة</th>
                  <th className="pb-3 font-bold">الدور</th>
                  <th className="pb-3 font-bold">تاريخ الانضمام</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {/* Mock Row */}
                <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-4 text-slate-900 font-bold">عبدالله مجدي</td>
                  <td className="py-4 text-slate-600 font-tech">BSTU</td>
                  <td className="py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold">Student</span></td>
                  <td className="py-4 text-slate-500">اليوم</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    );
  }

  // ═════════ 2. INSTRUCTOR DASHBOARD ═════════
  if (role === 'instructor') {
    return (
      <main className="pt-24 md:pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">
        <Header user={user} title="بوابة المحاضر" subtitle="متابعة أداء الطلاب والتقييمات" badge="INSTRUCTOR" />
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard title="إجمالي الطلاب" value="156" icon={<Users />} color="text-autospex-primary" bg="bg-blue-50" />
          <StatCard title="متوسط الإنجاز" value="42%" icon={<Activity />} color="text-amber-600" bg="bg-amber-50" />
          <StatCard title="تقييمات معلقة" value="8" icon={<CheckCircle2 />} color="text-rose-600" bg="bg-rose-50" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-900 mb-6">النشاط الأخير للطلاب</h3>
            <div className="space-y-4">
              {INSTRUCTOR_ACTIVITY.map((act, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-900">{act.student}</p>
                    <p className="text-xs text-slate-500 mt-1">{act.action}</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Digital Twin Quick Monitor */}
          <div className="bg-slate-900 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                <h3 className="text-lg font-extrabold">مراقبة التوأم الرقمي</h3>
              </div>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                يوجد حالياً <span className="text-white font-bold">12 طالباً</span> يستخدمون التوأم الرقمي للتدريب على خط الإنتاج.
              </p>
              <button onClick={() => navigate('/digital-twin')} className="w-full py-3.5 bg-autospex-primary hover:bg-blue-600 rounded-xl font-bold transition-all">
                دخول وضع المراقبة (Spectator)
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ═════════ 3. STUDENT & GRADUATE DASHBOARD ═════════
  // Determines if we should show Job Prep features instead of basic courses
  const isGraduate = eduLevel === 'Graduate';

  return (
    <main className="pt-24 md:pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">
      <Header 
        user={user} 
        title={isGraduate ? "بوابة الخريجين" : "بوابة الطالب التعليمية"} 
        subtitle={`مرحباً بك مجدداً، ${isGraduate ? 'المهندس' : 'الطالب'} `} 
        badge={isGraduate ? "ALUMNI" : "STUDENT"} 
      />

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard title="نقاط الخبرة (XP)" value={user.xp || "250"} icon={<Zap />} color="text-amber-500" bg="bg-amber-50" />
        <StatCard title="التقدم العام" value="68%" icon={<Activity />} color="text-blue-600" bg="bg-blue-50" />
        <StatCard title="الشهادات المعتمدة" value={isGraduate ? "3" : "0"} icon={<Award />} color="text-emerald-600" bg="bg-emerald-50" />
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: Learning Path / Job Prep */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center">
              {isGraduate ? <Briefcase className="mr-3 rtl:ml-3 text-autospex-primary" size={24}/> : <BookOpen className="mr-3 rtl:ml-3 text-autospex-primary" size={24}/>}
              {isGraduate ? 'التأهيل لسوق العمل' : 'مسار التعلم الحالي'}
            </h3>
            <button className="text-autospex-primary font-bold text-sm hover:text-blue-700 transition-colors">عرض الكل</button>
          </div>
          
          <div className="space-y-4">
            {(isGraduate ? [
              { id: 1, title: 'اجتياز المقابلات التقنية', tech: 'PLC & SCADA', status: 'متاح', score: '-', state: 'progress', icon: <Target size={18} /> },
              { id: 2, title: 'مشروع التخرج المتقدم', tech: 'Digital Twin', status: 'مكتمل', score: 'A+', state: 'completed', icon: <GraduationCap size={18} /> }
            ] : STUDENT_PATH).map((m) => (
              <div key={m.id} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-white hover:shadow-md hover:border-blue-100 transition-all group cursor-pointer">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className={`p-3 rounded-xl shadow-sm ${m.state === 'completed' ? 'bg-emerald-100 text-emerald-600' : m.state === 'locked' ? 'bg-slate-200 text-slate-500' : 'bg-blue-100 text-autospex-primary'}`}>
                    {m.icon}
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900 group-hover:text-autospex-primary transition-colors text-base">
                      {m.title} <span className="tech-term text-sm text-slate-500 group-hover:text-autospex-primary">{m.tech}</span>
                    </p>
                    <p className="text-xs font-bold mt-1 text-slate-500">{m.status}</p>
                  </div>
                </div>
                <div className="text-right rtl:text-left flex flex-col items-end">
                  <p className="text-sm font-extrabold text-slate-700 font-tech mb-1">{m.score}</p>
                  {m.state === 'locked' ? <ShieldAlert size={16} className="text-slate-400" /> : <ChevronRight size={18} className="text-autospex-primary rtl:rotate-180 group-hover:-translate-x-1 transition-transform" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Course / AI CTA */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Resume Learning Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden group cursor-pointer hover:border-autospex-primary transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-extrabold rounded-lg uppercase tracking-wider mb-4 inline-block">متابعة التعلم</span>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">إتقان S7-1200</h3>
            <p className="text-slate-600 text-sm font-medium mb-6">الوحدة 2: برمجة السلم المنطقي للسيور الناقلة.</p>
            <div className="flex items-center justify-between">
              <div className="w-full bg-slate-100 h-2 rounded-full mr-4 rtl:ml-4 rtl:mr-0 overflow-hidden">
                <div className="bg-autospex-primary h-full rounded-full" style={{ width: '68%' }}></div>
              </div>
              <button className="w-10 h-10 shrink-0 bg-autospex-primary text-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Play size={16} className="ml-1 rtl:mr-1 rtl:ml-0" />
              </button>
            </div>
          </div>

          {/* Digital Twin AI Card */}
          <div className="bg-autospex-primary rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="relative z-10">
              <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md mb-6 shadow-inner">
                <Lightbulb className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3 leading-tight">التدريب العملي</h3>
              <p className="text-blue-50 font-medium leading-relaxed mb-6 text-sm">
                انتقل إلى المصنع الافتراضي الآن. جرب أكوادك بأمان بمساعدة المساعد الذكي.
              </p>
              <button onClick={() => navigate('/digital-twin')} className="w-full py-3.5 bg-white hover:bg-slate-50 text-autospex-primary rounded-xl font-extrabold transition-all shadow-lg">
                تشغيل التوأم الرقمي
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

// ─── REUSABLE UI COMPONENTS ───

const Header = ({ user, title, subtitle, badge }) => (
  <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white p-6 md:p-8 border border-slate-200 rounded-3xl shadow-sm">
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{title}</h2>
      <p className="text-slate-600 font-medium text-lg">
        {subtitle} <span className="text-autospex-primary font-bold font-tech">{user?.name?.split(' ')[0] || user?.full_name?.split(' ')[0] || ''}</span>
      </p>
      {user?.university && (
        <p className="text-slate-500 text-sm mt-3 font-tech font-semibold flex items-center bg-slate-50 w-fit px-3 py-1.5 rounded-lg border border-slate-100">
          {user.university}
        </p>
      )}
    </div>
    <div className="flex items-center space-x-3 rtl:space-x-reverse">
      <div className="flex items-center space-x-3 rtl:space-x-reverse bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl">
        <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm text-2xl">
          {user?.avatar || '👨‍💻'}
        </div>
        <div>
          <p className="text-slate-900 text-sm font-bold leading-none mb-1.5">{user?.name || user?.full_name || 'Engineer'}</p>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-autospex-light font-tech bg-blue-50 px-2 py-0.5 rounded-md">
            {badge}
          </span>
        </div>
      </div>
      <button className="p-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-700 rounded-2xl transition-all shadow-sm">
        <Settings size={20} />
      </button>
    </div>
  </div>
);

const StatCard = ({ title, value, icon, color, bg }) => (
  <div className="bg-white border border-slate-200 p-6 rounded-3xl flex items-center space-x-5 rtl:space-x-reverse shadow-sm">
    <div className={`p-4 ${bg} rounded-2xl ${color}`}>{icon}</div>
    <div>
      <p className="text-slate-500 font-bold text-xs mb-1 uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-extrabold text-slate-900 font-tech">{value}</p>
    </div>
  </div>
);