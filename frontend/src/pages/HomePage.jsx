import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // تأكد أن هذا المسار صحيح في مشروعك
import { 
  ChevronRight, Cpu, Layers, Bot, ArrowRight, BookOpen, 
  Users, Award, CheckCircle2, Zap, Globe, Play, Quote, Shield 
} from 'lucide-react';

// تم رفع المكون للأعلى لتجنب أي أخطاء في الـ Rendering
const TrophyIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

const HomePage = () => {
  const { user } = useAuth();

  return (
    <main className="relative z-10 pb-20 md:pb-0 bg-slate-50 overflow-hidden">

      {/* ── 1. HERO SECTION ── */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col items-center justify-center min-h-[90vh]">
        {/* Ambient Background Glows */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-autospex-light/15 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage:'linear-gradient(rgba(0,0,0,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.8) 1px,transparent 1px)',backgroundSize:'40px 40px'}} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Winner Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-50 border border-amber-200 shadow-sm text-amber-700 text-sm font-extrabold mb-8 animate-fade-in-up">
            <TrophyIcon className="mr-2 rtl:ml-2 rtl:mr-0 text-amber-500" />
            المركز الأول - مسابقة الشركات الناشئة Creativa Hub 2026
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.15]">
            <span className="block mb-2">ثورة التدريب في</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-autospex-primary to-blue-400 pb-4">
              الصناعة الذكية 4.0
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto mb-10">
            أول منصة تعليمية هجينة في مصر. ندمج خطوط الإنتاج الحقيقية مع <span className="tech-term font-extrabold text-autospex-primary">Web-Hosted Digital Twins</span> ومساعد ذكاء اصطناعي لتمكين التكنولوجيين والمهندسين من احتراف الأتمتة.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <Link to={user ? "/hub" : "/register"} className="w-full sm:w-auto group flex items-center justify-center px-8 py-4 bg-autospex-primary hover:bg-blue-700 text-white rounded-2xl font-extrabold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              {user ? 'العودة للوحة التحكم' : 'ابدأ التعلم مجاناً'}
              <ChevronRight className="ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 group-hover:-translate-x-1 transition-transform" size={20} />
            </Link>
            <Link to="/digital-twin" className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-autospex-primary/30 rounded-2xl font-extrabold transition-all">
              <Play size={20} className="mr-2 rtl:ml-2 rtl:mr-0 text-autospex-primary" />
              استكشف التوأم الرقمي
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm text-slate-500 font-bold">
            <span className="flex items-center"><Shield size={18} className="text-emerald-500 mr-2 rtl:ml-2"/> بيئة تدريب آمنة 100%</span>
            <span className="hidden md:block w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
            <span className="flex items-center"><Zap size={18} className="text-amber-500 mr-2 rtl:ml-2"/> تزامن لحظي (Real-time)</span>
            <span className="hidden md:block w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
            <span className="flex items-center"><Globe size={18} className="text-blue-500 mr-2 rtl:ml-2"/> وصول من أي متصفح</span>
          </div>
        </div>
      </section>

      {/* ── 2. PLATFORM PREVIEW (MOCKUP MACBOOK/DASHBOARD) ── */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-20 mb-32">
        <div className="rounded-2xl md:rounded-[2rem] border-[8px] border-slate-800/10 bg-slate-900 p-2 shadow-2xl overflow-hidden relative group">
          <div className="absolute top-4 left-4 flex space-x-2 rtl:space-x-reverse z-20">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          </div>
          <div className="aspect-video bg-slate-800 rounded-xl md:rounded-2xl overflow-hidden relative flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-80"></div>
             <div className="text-center z-10">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 group-hover:scale-110 group-hover:bg-autospex-primary transition-all cursor-pointer shadow-2xl">
                  <Play size={36} className="text-white ml-2 rtl:mr-2 rtl:ml-0" />
                </div>
                <p className="text-slate-300 font-bold tracking-widest uppercase text-sm">شاهد المنصة في العمل</p>
             </div>
          </div>
        </div>
      </section>

      {/* ── 3. STATISTICS SECTION ── */}
      <section className="py-16 border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-extrabold text-autospex-primary font-tech mb-2">12</p>
              <p className="text-slate-600 font-bold text-sm">تكنولوجي ومهندس قاموا بالبناء</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-extrabold text-autospex-primary font-tech mb-2">100<span className="text-2xl">%</span></p>
              <p className="text-slate-600 font-bold text-sm">محاكاة للواقع الصناعي</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-extrabold text-autospex-primary font-tech mb-2">&lt; 50<span className="text-2xl">ms</span></p>
              <p className="text-slate-600 font-bold text-sm">زمن استجابة التوأم الرقمي</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-extrabold text-autospex-primary font-tech mb-2">24/7</p>
              <p className="text-slate-600 font-bold text-sm">توفر المساعد الذكي (AI)</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CORE PILLARS (DEEP DIVE) ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-autospex-primary text-sm font-extrabold tracking-widest mb-3 uppercase">البنية التحتية</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">نظام هجين لا مثيل له</h2>
          <p className="text-slate-600 font-medium text-lg leading-relaxed">
            تم تصميم المنصة لتجمع بين قوة العتاد المادي ومرونة السحابة، لتقديم تجربة تدريبية خالية من المخاطر وبتكلفة منخفضة جداً للجامعات.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Cpu size={32}/>, title: 'العتاد الفعلي والمستشعرات', tag: 'Hardware', color: 'text-emerald-600', bg: 'bg-emerald-50',
              desc: 'خط إنتاج مصغر حقيقي مزود بمحركات هوائية وحساسات تقارب سعوية (Capacitive Proximity) دقيقة، يتحكم فيها Siemens S7-1200.',
              features: ['Siemens S7-1200 PLC', 'Capacitive Sensors', 'Pneumatic Actuators'],
            },
            {
              icon: <Layers size={32}/>, title: 'التوأم الرقمي السحابي', tag: 'Web 3D', color: 'text-autospex-primary', bg: 'bg-blue-50',
              desc: 'بدلاً من دمج المحاكاة في الهاردوير، قمنا ببناء توأم رقمي 3D مستضاف بالكامل على الويب، مما يسمح للطلاب بالتدريب من منازلهم.',
              features: ['Three.js 3D Rendering', 'Snap7 Python Bridge', 'Real-time WebSockets'],
            },
            {
              icon: <Bot size={32}/>, title: 'المساعد الهندسي الذكي', tag: 'AI Copilot', color: 'text-violet-600', bg: 'bg-violet-50',
              desc: 'نموذج ذكاء اصطناعي قوي مدمج في الواجهة، يفهم الأكواد ويساعد الطلاب في كتابة Ladder Logic وتحليل الأخطاء فوراً.',
              features: ['Llama 3.3 70B Model', 'Ladder Logic Debugging', 'Context-Aware Chat'],
            },
          ].map((c,i) => (
            <div key={i} className="bg-white border border-slate-200 shadow-sm rounded-[2rem] p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-32 h-32 ${c.bg} rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500`}></div>
              
              <div className="flex items-center justify-between mb-8">
                <div className={`w-16 h-16 rounded-2xl ${c.bg} ${c.color} flex items-center justify-center shadow-inner`}>
                  {c.icon}
                </div>
                <span className="px-4 py-1.5 rounded-full text-xs font-extrabold uppercase font-tech bg-slate-100 text-slate-500">{c.tag}</span>
              </div>
              
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{c.title}</h3>
              <p className="text-slate-600 font-medium text-base leading-relaxed mb-8 h-24">{c.desc}</p>
              
              <div className="space-y-3 pt-6 border-t border-slate-100">
                {c.features.map((f, idx) => (
                  <div key={idx} className="flex items-center space-x-3 rtl:space-x-reverse text-sm font-extrabold text-slate-700 font-tech">
                    <CheckCircle2 size={18} className={`${c.color} shrink-0`} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. TESTIMONIALS ── */}
      <section className="py-24 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">ماذا يقولون عنا؟</h2>
            <p className="text-slate-600 font-medium">آراء المهندسين وأعضاء هيئة التدريس الذين جربوا المنصة.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "القدرة على برمجة الـ PLC من المنزل ورؤية التوأم الرقمي يتحرك أمامي في المتصفح غيرت طريقة فهمي لمادة التحكم الصناعي تماماً.",
                name: "أحمد علي",
                role: "طالب هندسة ميكاترونكس",
                avatar: "👨‍🎓"
              },
              {
                text: "مشكلة المعامل الجامعية هي التكلفة وخوف الطلاب من إتلاف المعدات. هذه المنصة توفر بيئة آمنة 100% للتجربة والخطأ قبل التطبيق الفعلي.",
                name: "د. إبراهيم محمود",
                role: "أستاذ الأتمتة الصناعية",
                avatar: "👨‍🏫"
              },
              {
                text: "المساعد الذكي (AI Copilot) وفر عليّ ساعات من البحث عن أخطاء التوصيل وبرمجة الـ Ladder. كأن معي مهندس خبير يوجهني خطوة بخطوة.",
                name: "سارة مجدي",
                role: "مهندسة تكنولوجية",
                avatar: "👩‍🔧"
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative">
                <Quote className="absolute top-6 left-6 text-slate-100" size={60} />
                <p className="text-slate-700 font-medium leading-relaxed mb-8 relative z-10 text-sm md:text-base">"{t.text}"</p>
                <div className="flex items-center space-x-4 rtl:space-x-reverse relative z-10">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-2xl border border-blue-100">{t.avatar}</div>
                  <div>
                    <p className="font-extrabold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs font-bold text-autospex-primary mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FINAL CTA BANNER ── */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-autospex-primary to-blue-700 rounded-[3rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
          
          <div className="relative z-10">
            <Award size={48} className="text-yellow-300 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              جاهز للارتقاء بمهاراتك الهندسية؟
            </h2>
            <p className="text-blue-100 font-medium text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              انضم إلى المنصة المتطورة المصممة خصيصاً لطلاب وخريجي الجامعات التكنولوجية. أنشئ حسابك المجاني اليوم.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="group flex items-center justify-center px-10 py-5 bg-white text-autospex-primary hover:bg-slate-50 rounded-2xl font-extrabold transition-all shadow-xl hover:scale-105 text-lg">
                إنشاء حساب مهندس مجاني 
                <ArrowRight className="ml-3 rtl:mr-3 rtl:ml-0 rtl:rotate-180 group-hover:-translate-x-1 transition-transform" size={20} />
              </Link>
            </div>
            <p className="text-blue-200 text-xs font-bold mt-6">لا يتطلب بطاقة ائتمانية. وصول فوري للتوأم الرقمي.</p>
          </div>
        </div>
      </section>

    </main>
  );
};

export default HomePage;