import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowRight, Clock, Users, BookOpen, Play, FileText,
  HelpCircle, CheckCircle2, Lock, Award, ChevronDown,
  ChevronUp, Cpu, Layers, Globe, Bot, Zap, Shield
} from 'lucide-react';

// Data translated and enhanced with .tech-term
const COURSES = [
  {
    id:1, color:'blue', icon:<Cpu size={48}/>,
    title:'إتقان S7-1200 و TIA Portal',
    subtitle:'دليلك الشامل لمتحكمات سيمنز: من توصيل الأسلاك الأساسية إلى البرمجة المتقدمة وربط التوأم الرقمي بخط الإنتاج.',
    level:'مبتدئ', language:'عربي / إنجليزي', duration:'8س 30د', students:142, progress:68, enrolled:true,
    price:'مجانـاً',
    includes:['8.5 ساعات من الفيديو', '24 درساً تفاعلياً', 'ملفات ومخططات PDF', 'شهادة إتمام الدورة'],
    outcomes:[
      <>إعداد وحدة المعالجة المركزية داخل <span className="tech-term text-sm">TIA Portal</span></>,
      'توصيل المداخل والمخارج (I/O) بالحساسات والمحركات',
      <>كتابة <span className="tech-term text-sm">Ladder Logic</span> للتحكم في السير الناقل</>,
      <>استخدام <span className="tech-term text-sm">Data Blocks</span> و <span className="tech-term text-sm">Function Blocks</span> بفاعلية</>,
      <>ربط الـ PLC بـ Python باستخدام مكتبة <span className="tech-term text-sm">Snap7</span></>,
      'اكتشاف أخطاء التشغيل وإصلاحها'
    ],
    modules:[
      {title: <><span className="tech-term">CPU Config & Hardware</span></>, lessons:[
        {title:'مقدمة عن هاردوير S7-1200', type:'video', dur:'12:30', free:true},
        {title:'تثبيت وإعداد بيئة TIA Portal',  type:'video', dur:'18:45', free:true},
        {title:'خطوات إعداد المعالج (CPU)',    type:'video', dur:'22:10', free:false},
        {title:'دليل الهاردوير الشامل (PDF)',         type:'pdf',   dur:null,    free:false},
      ]},
      {title: <><span className="tech-term">I/O Mapping & Wiring</span></>, lessons:[
        {title:'عنونة المداخل والمخارج الرقمية',      type:'video', dur:'15:20', free:false},
        {title:'مخطط توصيل منصة AutoSpex', type:'pdf',   dur:null,    free:false},
        {title:'توصيل وبرمجة الحساس السعوي',           type:'video', dur:'25:30', free:false},
      ]},
    ],
  },
  // Fallback for demo purposes (you can copy the rest of your courses here following this structure)
];

const TICON = { video:<Play size={14}/>, pdf:<FileText size={14}/>, text:<BookOpen size={14}/>, quiz:<HelpCircle size={14}/> };
const TCOLOR = { video:'bg-blue-50 text-blue-600', pdf:'bg-amber-50 text-amber-600', text:'bg-slate-100 text-slate-600', quiz:'bg-violet-50 text-violet-600' };

const Mod = ({ mod, enrolled, idx }) => {
  const [open, setOpen] = useState(idx === 0);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden mb-3 bg-white shadow-sm hover:shadow-md transition-shadow">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-slate-50 transition-colors text-right">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold font-tech text-sm shrink-0">
            {String(idx+1).padStart(2,'0')}
          </div>
          <span className="text-slate-900 font-extrabold text-base">{mod.title}</span>
        </div>
        <div className="flex items-center space-x-4 rtl:space-x-reverse shrink-0">
          <span className="text-slate-500 text-xs font-bold font-tech hidden sm:block bg-slate-100 px-3 py-1 rounded-lg">{mod.lessons.length} LESSONS</span>
          {open ? <ChevronUp size={20} className="text-autospex-primary"/> : <ChevronDown size={20} className="text-slate-400"/>}
        </div>
      </button>
      {open && (
        <div className="divide-y divide-slate-100 bg-slate-50/50">
          {mod.lessons.map((l, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-white transition-colors cursor-pointer group">
              <div className="flex items-center space-x-4 rtl:space-x-reverse min-w-0">
                {enrolled || l.free
                  ? <div className={`p-2 rounded-lg shrink-0 ${TCOLOR[l.type]}`}>{TICON[l.type]}</div>
                  : <div className="p-2 rounded-lg bg-slate-200 text-slate-500 shrink-0"><Lock size={14}/></div>
                }
                <span className={`text-sm font-bold truncate transition-colors ${enrolled || l.free ? 'text-slate-700 group-hover:text-autospex-primary' : 'text-slate-500'}`}>
                  {l.title}
                </span>
                {l.free && !enrolled && (
                  <span className="shrink-0 px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-extrabold rounded-md uppercase font-tech">Free Preview</span>
                )}
              </div>
              {l.dur && <span className="text-slate-500 text-xs font-bold font-tech shrink-0 bg-white border border-slate-200 px-2 py-1 rounded-md">{l.dur}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Safe fallback to course 1 if ID isn't found in this truncated demo array
  const course = COURSES.find(c => c.id === Number(id)) || COURSES[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-32"> {/* pb-32 for the floating bottom bar */}

      {/* ── CINEMATIC SPLIT HERO ── */}
      <div className="bg-white border-b border-slate-200 pt-24 pb-16 px-4 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-autospex-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <button onClick={() => navigate('/courses')}
            className="flex items-center space-x-2 rtl:space-x-reverse text-slate-500 hover:text-autospex-primary text-sm font-bold mb-8 transition-colors w-fit bg-slate-50 px-4 py-2 rounded-xl">
            <ArrowRight size={16}/>
            <span>العودة إلى الدورات</span>
          </button>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Text Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap gap-3">
                <span className={`px-4 py-1.5 bg-autospex-primary text-white text-xs font-extrabold rounded-lg shadow-sm`}>{course.level}</span>
                <span className="px-4 py-1.5 bg-slate-100 text-slate-600 text-xs font-extrabold rounded-lg border border-slate-200">{course.language}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.2]">{course.title}</h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">{course.subtitle}</p>
              
              <div className="flex flex-wrap gap-6 text-sm text-slate-700 font-bold pt-4">
                <span className="flex items-center space-x-2 rtl:space-x-reverse bg-slate-50 px-4 py-2 rounded-xl border border-slate-100"><Clock size={18} className="text-autospex-primary"/><span className="font-tech">{course.duration}</span></span>
                <span className="flex items-center space-x-2 rtl:space-x-reverse bg-slate-50 px-4 py-2 rounded-xl border border-slate-100"><BookOpen size={18} className="text-autospex-primary"/><span className="font-tech">24 Lessons</span></span>
                <span className="flex items-center space-x-2 rtl:space-x-reverse bg-slate-50 px-4 py-2 rounded-xl border border-slate-100"><Users size={18} className="text-autospex-primary"/><span className="font-tech">{course.students} Students</span></span>
              </div>
            </div>

            {/* Cinematic Video Player */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative group cursor-pointer border-4 border-white">
                <img src="/api/placeholder/800/450" alt="Course Preview" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"/>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-autospex-primary transition-colors duration-300 shadow-xl border border-white/30">
                    <Play size={32} className="text-white ml-2"/>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-xs font-bold font-tech">Preview</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* ── LEFT: MAIN CONTENT ── */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* What you'll learn */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center">
                <Award className="mr-3 rtl:ml-3 text-autospex-primary" size={28}/> ماذا ستتعلم في هذه الدورة؟
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {course.outcomes.map((o, i) => (
                  <div key={i} className="flex items-start space-x-3 rtl:space-x-reverse bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5"/>
                    <span className="text-slate-700 font-bold text-sm leading-relaxed">{o}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course content Accordion */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900">المحتوى التعليمي</h2>
                <span className="text-autospex-primary font-bold bg-blue-50 px-4 py-1.5 rounded-lg font-tech text-sm">2 Modules</span>
              </div>
              {course.modules.map((mod, i) => (
                <Mod key={i} mod={mod} enrolled={course.enrolled} idx={i}/>
              ))}
            </div>
          </div>

          {/* ── RIGHT: COURSE INCLUDES ── */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white border border-slate-200 shadow-sm rounded-3xl p-8">
              <h3 className="text-xl font-extrabold text-slate-900 mb-6">تتضمن هذه الدورة</h3>
              <div className="space-y-4">
                {[
                  [<Play size={20}/>, course.includes[0]],
                  [<BookOpen size={20}/>, course.includes[1]],
                  [<FileText size={20}/>, course.includes[2]],
                  [<Shield size={20}/>, 'وصول مدى الحياة'],
                  [<Award size={20}/>, course.includes[3]],
                ].map(([icon, text], i) => (
                  <div key={i} className="flex items-center space-x-4 rtl:space-x-reverse text-slate-700 font-bold text-sm bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-autospex-primary shrink-0 bg-white p-2 rounded-lg shadow-sm border border-slate-100">{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FLOATING ENROLLMENT BAR ── */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4 rtl:space-x-reverse hidden sm:flex">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 shadow-sm text-autospex-primary">
              {course.icon}
            </div>
            <div>
              <p className="font-extrabold text-slate-900">{course.title}</p>
              <p className="text-sm font-bold text-emerald-600">{course.price}</p>
            </div>
          </div>
          
          <div className="w-full sm:w-auto flex items-center gap-4">
            {course.enrolled ? (
               <div className="flex items-center w-full sm:w-auto gap-6">
                 <div className="hidden md:block w-48">
                    <div className="flex justify-between text-xs font-bold font-tech mb-1 text-slate-500"><span>Progress</span><span className="text-autospex-primary">{course.progress}%</span></div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-autospex-primary" style={{width:`${course.progress}%`}}/></div>
                 </div>
                 <button className="w-full sm:w-auto px-10 py-3.5 bg-autospex-primary hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                   {course.progress > 0 ? 'متابعة التعلم' : 'ابدأ الدورة الآن'}
                 </button>
               </div>
            ) : (
              <button className="w-full sm:w-auto px-10 py-3.5 bg-autospex-primary hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                سجل في الدورة مجاناً
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}