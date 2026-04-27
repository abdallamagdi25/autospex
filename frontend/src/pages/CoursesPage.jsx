import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen, Play, FileText, HelpCircle, Calendar, Radio,
  Clock, Users, Lock, CheckCircle2,
  Cpu, Zap, Globe, Bot, Layers, Filter, Search,
  Award, Bell
} from 'lucide-react';

// ── Course Data ───────────────────────────────────────────────
const COURSES = [
  {
    id: 1, title: 'إتقان S7-1200 و TIA Portal',
    description: 'تعلم برمجة متحكمات سيمنز من الصفر حتى الاحتراف. يتضمن ربط الإشارات وخرائط الذاكرة مع نظام AutoSpex الفعلي.',
    icon: <Cpu size={24} />,
    color: 'from-blue-600 to-cyan-500', bg: 'bg-blue-50', border: 'border-blue-100', iconColor: 'text-blue-600',
    level: 'مبتدئ', levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    duration: '8س 30د', students: 142, lessons: 24, progress: 68, enrolled: true,
    modules: [
      { title: <span className="tech-term">CPU Config & Hardware</span>, lessons: 4, done: true },
      { title: <span className="tech-term">I/O Mapping & Wiring</span>, lessons: 5, done: true },
      { title: <span className="tech-term">Data Blocks & Memory</span>, lessons: 4, done: false },
      { title: <span className="tech-term">TIA Portal Programming</span>, lessons: 6, done: false },
    ]
  },
  {
    id: 2, title: 'برمجة السلم المنطقي (Ladder Logic)',
    description: 'تعمق في برمجة IEC 61131-3. تعلم المؤقتات، العدادات، والتحكم الفعلي بخطوط سير الإنتاج والتعبئة.',
    icon: <Layers size={24} />,
    color: 'from-violet-600 to-purple-500', bg: 'bg-violet-50', border: 'border-violet-100', iconColor: 'text-violet-600',
    level: 'متوسط', levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
    duration: '6س 15د', students: 98, lessons: 18, progress: 0, enrolled: false,
    modules: [
      { title: <span className="tech-term">LAD Basics & Contacts</span>, lessons: 3, done: false },
      { title: <span className="tech-term">Timers TON/TOF/TP</span>, lessons: 4, done: false },
      { title: <span className="tech-term">Counters & Comparators</span>, lessons: 3, done: false },
    ]
  },
  {
    id: 3, title: 'بوابة الـ IoT باستخدام Python Snap7',
    description: 'اربط بايثون بمتحكم سيمنز عبر الإيثرنت. ابني خادم WebSocket لمزامنة البيانات وعرضها بالزمن الفعلي.',
    icon: <Zap size={24} />,
    color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', border: 'border-amber-100', iconColor: 'text-amber-600',
    level: 'متقدم', levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
    duration: '5س 45د', students: 67, lessons: 15, progress: 0, enrolled: false,
    modules: [
      { title: <span className="tech-term">Snap7 Connection Setup</span>, lessons: 3, done: false },
      { title: <span className="tech-term">Async WebSocket Server</span>, lessons: 3, done: false },
    ]
  },
  {
    id: 4, title: 'أساسيات الثورة الصناعية الرابعة',
    description: 'اكتشف مفاهيم Industry 4.0: إنترنت الأشياء الصناعي، التوائم الرقمية، وبنية منصة AutoSpex.',
    icon: <Globe size={24} />,
    color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50', border: 'border-emerald-100', iconColor: 'text-emerald-600',
    level: 'مبتدئ', levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    duration: '4س 20د', students: 210, lessons: 12, progress: 100, enrolled: true,
    modules: [
      { title: <span className="tech-term">What is Industry 4.0?</span>, lessons: 2, done: true },
      { title: <span className="tech-term">IIoT & Protocols</span>, lessons: 3, done: true },
      { title: <span className="tech-term">Digital Twin Concept</span>, lessons: 3, done: true },
    ]
  },
  {
    id: 5, title: 'الذكاء الاصطناعي والأتمتة',
    description: 'تعرف على دور النماذج اللغوية (LLMs) وصيانة التنبؤية في تغيير وجه التصنيع الحديث.',
    icon: <Bot size={24} />,
    color: 'from-rose-500 to-pink-500', bg: 'bg-rose-50', border: 'border-rose-100', iconColor: 'text-rose-600',
    level: 'متوسط', levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
    duration: '3س 50د', students: 183, lessons: 10, progress: 30, enrolled: true,
    modules: [
      { title: <span className="tech-term">AI in Manufacturing</span>, lessons: 2, done: true },
      { title: <span className="tech-term">Predictive Maintenance</span>, lessons: 2, done: false },
    ]
  },
];

const EVENTS = [
  { id: 1, type: 'مباشر', title: 'جلسة أسئلة: استكشاف أخطاء S7-1200', date: 'Mar 15, 2026', time: '6:00 PM Cairo', host: 'Eng. Abdalla Magdy', registered: true, color: 'border-rose-200 bg-rose-50', badge: 'bg-rose-100 text-rose-600' },
  { id: 2, type: 'ندوة', title: 'التوائم الرقمية في الصناعة المصرية', date: 'Mar 22, 2026', time: '5:00 PM Cairo', host: 'AutoSpex Team', registered: false, color: 'border-blue-200 bg-blue-50', badge: 'bg-blue-100 text-blue-600' },
];

const CourseCard = ({ course, onClick }) => (
  <div onClick={() => onClick(course)} className={`bg-white border ${course.border} rounded-3xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 group hover:-translate-y-1`}>
    <div className="flex items-start justify-between mb-5">
      <div className={`p-3 ${course.bg} border ${course.border} rounded-2xl ${course.iconColor}`}>{course.icon}</div>
      <span className={`px-3 py-1 text-[11px] font-bold uppercase border rounded-full ${course.levelColor}`}>{course.level}</span>
    </div>
    <h3 className="text-slate-900 font-bold text-lg mb-2 group-hover:text-autospex-primary transition-colors leading-snug">{course.title}</h3>
    <p className="text-slate-600 text-sm font-medium leading-relaxed mb-5 line-clamp-2">{course.description}</p>
    <div className="flex items-center space-x-4 rtl:space-x-reverse text-slate-500 font-tech text-xs font-bold mb-5">
      <span className="flex items-center space-x-1 rtl:space-x-reverse"><Clock size={14} /><span>{course.duration}</span></span>
      <span className="flex items-center space-x-1 rtl:space-x-reverse"><BookOpen size={14} /><span>{course.lessons} lessons</span></span>
    </div>
    {course.enrolled ? (
      <div>
        <div className="flex justify-between font-tech text-xs font-bold mb-2">
          <span className="text-slate-500">Progress</span>
          <span className={`${course.progress === 100 ? 'text-emerald-600' : 'text-autospex-primary'}`}>{course.progress}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full bg-gradient-to-r ${course.color} transition-all`} style={{ width: `${course.progress}%` }} />
        </div>
      </div>
    ) : (
      <button className={`w-full py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r ${course.color} text-white shadow-md opacity-90 group-hover:opacity-100 transition-opacity`}>
        سجل مجاناً
      </button>
    )}
  </div>
);

const CoursesPage = ({ t }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('courses');

  const filters = [
    { id: 'all', label: 'كل الدورات' }, { id: 'enrolled', label: 'دوراتي' },
    { id: 'مبتدئ', label: 'مبتدئ' }, { id: 'متوسط', label: 'متوسط' }, { id: 'متقدم', label: 'متقدم' },
  ];

  const filtered = COURSES.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' ? true : filter === 'enrolled' ? c.enrolled : c.level === filter;
    return matchSearch && matchFilter;
  });

  const enrolledCount = COURSES.filter(c => c.enrolled).length;
  const completedCount = COURSES.filter(c => c.progress === 100).length;
  const totalProgress = Math.round(COURSES.filter(c => c.enrolled).reduce((a, c) => a + c.progress, 0) / enrolledCount) || 0;

  return (
    <main className="pt-24 md:pt-32 pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen relative z-10">

      {/* Header */}
      <div className="mb-10 text-center md:text-right">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">مركز التعلم</h1>
        <p className="text-slate-600 font-medium text-lg">احترف الأتمتة الصناعية — من توصيل الأسلاك إلى أنظمة الذكاء الاصطناعي.</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 text-center">
          <p className="text-2xl sm:text-3xl font-extrabold text-autospex-primary">{enrolledCount}</p>
          <p className="text-slate-500 font-bold text-xs mt-1">الدورات المسجلة</p>
        </div>
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 text-center">
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-500">{completedCount}</p>
          <p className="text-slate-500 font-bold text-xs mt-1">المكتملة</p>
        </div>
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 text-center">
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-500 font-tech">{totalProgress}%</p>
          <p className="text-slate-500 font-bold text-xs mt-1">متوسط الإنجاز</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-3 rtl:space-x-reverse mb-6 overflow-x-auto pb-1">
        {[
          { id: 'courses', label: 'الدورات التعليمية', icon: <BookOpen size={18} /> },
          { id: 'events', label: 'البث المباشر والأحداث', icon: <Radio size={18} /> },
        ].map(tab => (
          <button
            key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 rtl:space-x-reverse px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id ? 'bg-autospex-primary text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.icon}<span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── COURSES TAB ── */}
      {activeTab === 'courses' && (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث في الدورات..."
                className="w-full bg-white border border-slate-200 focus:border-autospex-primary rounded-xl pr-12 pl-4 py-3 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors shadow-sm"
              />
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse overflow-x-auto pb-2 scrollbar-hide">
              <Filter size={16} className="text-slate-400 shrink-0 mx-2" />
              {filters.map(f => (
                <button
                  key={f.id} onClick={() => setFilter(f.id)}
                  className={`shrink-0 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    filter === f.id ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(course => <CourseCard key={course.id} course={course} onClick={(c) => navigate(`/courses/${c.id}`)} />)}
            {filtered.length === 0 && (
              <div className="col-span-3 text-center py-20 bg-white border border-slate-200 rounded-3xl">
                <BookOpen size={48} className="mx-auto mb-4 text-slate-300" />
                <p className="text-slate-600 font-bold">لا توجد دورات تطابق بحثك.</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── EVENTS TAB ── */}
      {activeTab === 'events' && (
        <div className="space-y-4 w-full max-w-3xl">
          {EVENTS.map(ev => (
            <div key={ev.id} className={`bg-white border ${ev.color} rounded-3xl p-6 shadow-sm`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${ev.badge}`}>{ev.type}</span>
                  {ev.registered && <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-emerald-100 text-emerald-700">مسجل</span>}
                </div>
                <div className="flex items-center space-x-1 rtl:space-x-reverse text-slate-500 font-tech text-xs font-bold">
                  <Calendar size={14} /><span>{ev.date}</span>
                </div>
              </div>
              <h3 className="text-slate-900 font-bold text-lg mb-2">{ev.title}</h3>
              <p className="text-slate-600 font-medium text-sm mb-6">
                تقديم <span className="text-slate-900 font-bold font-tech">{ev.host}</span> • <span className="font-tech">{ev.time}</span>
              </p>
              <div className="flex items-center justify-end">
                {ev.registered ? (
                  <button className="flex items-center space-x-2 rtl:space-x-reverse px-5 py-2.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl text-sm font-bold">
                    <Bell size={16} /><span>تم تعيين التنبيه</span>
                  </button>
                ) : (
                  <button className="px-6 py-2.5 bg-autospex-primary hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors shadow-md">
                    حجز مقعد مجاني
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default CoursesPage;