import React, { useState, useEffect } from 'react';
import { Globe, Cpu, BookOpen, Users, ArrowRight, Brain, Settings, Wifi, CheckCircle, Menu, X, ChevronRight } from 'lucide-react';

// --- Translations / 번역 / ترجمة ---
const translations = {
  ko: {
    nav: { home: "홈", vision: "비전", solution: "솔루션", features: "기능", team: "팀", contact: "문의" },
    hero: {
      title: "AutoSpex",
      subtitle: "스마트 산업 교육의 미래",
      desc: "AI 기반 웹 학습 플랫폼을 갖춘 자동 병 충전 교육 키트. 이론과 실제 산업 현장의 기술 격차를 해소합니다.",
      cta: "더 알아보기"
    },
    problem: {
      title: "엔지니어링 교육의 과제",
      p1_title: "기술 격차",
      p1_desc: "학문적 이론과 실제 공장 기술 간의 단절.",
      p2_title: "높은 비용",
      p2_desc: "수입 장비의 높은 비용으로 인한 실습 기회 부족.",
      p3_title: "오래된 도구",
      p3_desc: "Industry 4.0 표준에 맞지 않는 정적인 종이 매뉴얼."
    },
    solution: {
      tag: "우리의 솔루션",
      title: "하이브리드 학습 생태계",
      desc: "저비용 자동화 키트와 디지털 플랫폼을 결합하여 완벽한 교육 경험을 제공합니다.",
      cards: [
        { title: "물리적 키트", desc: "실제 PLC 및 센서 교육을 위한 산업용 병 충전 라인." },
        { title: "디지털 플랫폼", desc: "종이 매뉴얼을 대체하는 웹 기반 대화형 커리큘럼." },
        { title: "스마트 지원", desc: "배선, 코딩 및 문제 해결을 안내하는 통합 AI 시스템." }
      ]
    },
    stats: {
      s1: "산업 등급 사양",
      s2: "AI 통합",
      s3: "비용 효율적"
    },
    features: {
      title: "시스템 사양 및 기술",
      f1: "산업용 PLC 제어 (Ladder Logic)",
      f2: "공압 실린더 및 솔레노이드 밸브",
      f3: "고토크 DC 모터 컨베이어",
      f4: "정밀 용량성 센서 (금속/비금속)",
      f5: "AI 챗봇 어시스턴트",
      f6: "웹 기반 시뮬레이션"
    },
    team: {
      title: "우리 팀",
      subtitle: "베니수에프 기술대학교 메카트로닉스 2026",
      leader: "팀 리더",
      members: "팀원",
      supervisors: "지도 교수진: Dr. Soha Nabil & Eng. Sara Shaban"
    },
    footer: {
      rights: "© 2026 AutoSpex. All rights reserved.",
      location: "Beni-Suef Technological University"
    }
  },
  en: {
    nav: { home: "Home", vision: "Vision", solution: "Solution", features: "Features", team: "Team", contact: "Contact" },
    hero: {
      title: "AutoSpex",
      subtitle: "The Future of Smart Industrial Training",
      desc: "Automated Bottle Filling Training Kit with AI-Powered Web Learning Platform. Bridging the gap between theory and Industry 4.0.",
      cta: "Explore System"
    },
    problem: {
      title: "The Challenge",
      p1_title: "The Skills Gap",
      p1_desc: "Disconnect between academic theory and practical factory skills.",
      p2_title: "High Cost Barriers",
      p2_desc: "Imported equipment is too expensive for widespread student use.",
      p3_title: "Outdated Tools",
      p3_desc: "Static manuals fail to prepare students for modern industry standards."
    },
    solution: {
      tag: "Our Solution",
      title: "A Hybrid Ecosystem",
      desc: "Bridging the gap with a fully automated, low-cost training kit and smart platform.",
      cards: [
        { title: "Physical Kit", desc: "Real industrial bottling line for practical PLC training." },
        { title: "Digital Platform", desc: "Interactive web curriculum replacing paper manuals." },
        { title: "Smart Support", desc: "Integrated AI to guide students through troubleshooting." }
      ]
    },
    stats: {
      s1: "Industrial Specs",
      s2: "AI Integrated",
      s3: "Cost Effective"
    },
    features: {
      title: "Technical Specifications",
      f1: "Industrial PLC Integration (Ladder Logic)",
      f2: "Pneumatic Cylinders & Valves",
      f3: "High-Torque DC Gear Motors",
      f4: "Precision Capacitive Sensors",
      f5: "AI Chatbot Assistant",
      f6: "Web-Based Simulation"
    },
    team: {
      title: "Meet The Team",
      subtitle: "Mechatronics Graduation Project 2026 - BSTU",
      leader: "Team Leader",
      members: "Team Members",
      supervisors: "Supervised by: Dr. Soha Nabil & Eng. Sara Shaban"
    },
    footer: {
      rights: "© 2026 AutoSpex. All rights reserved.",
      location: "Beni-Suef Technological University"
    }
  },
  ar: {
    nav: { home: "الرئيسية", vision: "الرؤية", solution: "الحل", features: "المميزات", team: "الفريق", contact: "تواصل معنا" },
    hero: {
      title: "AutoSpex",
      subtitle: "مستقبل التدريب الصناعي الذكي",
      desc: "نموذج تدريبي لملء الزجاجات مع منصة تعليمية مدعومة بالذكاء الاصطناعي. نسد الفجوة بين النظرية وتطبيقات الثورة الصناعية الرابعة.",
      cta: "اكتشف النظام"
    },
    problem: {
      title: "تحديات التعليم الهندسي",
      p1_title: "فجوة المهارات",
      p1_desc: "انفصال بين النظرية الأكاديمية ومهارات المصانع العملية.",
      p2_title: "التكلفة العالية",
      p2_desc: "معدات التدريب المستوردة باهظة الثمن مما يحد من توفرها.",
      p3_title: "أدوات قديمة",
      p3_desc: "الكتيبات الورقية التقليدية لا تواكب معايير الصناعة الحديثة."
    },
    solution: {
      tag: "الحل المقترح",
      title: "نظام تعليمي هجين",
      desc: "سد الفجوة من خلال مجموعة تدريب آلية بالكامل ومنخفضة التكلفة.",
      cards: [
        { title: "الجهاز الفعلي", desc: "خط إنتاج حقيقي لتدريب عملي على الـ PLC والحساسات." },
        { title: "المنصة الرقمية", desc: "منهج تفاعلي عبر الويب بدلاً من الكتيبات الورقية." },
        { title: "دعم ذكي", desc: "نظام AI متكامل لتوجيه الطلاب في التوصيل والبرمجة." }
      ]
    },
    stats: {
      s1: "مواصفات صناعية",
      s2: "دعم الذكاء الاصطناعي",
      s3: "تكلفة اقتصادية"
    },
    features: {
      title: "المواصفات التقنية",
      f1: "تحكم PLC صناعي كامل (Ladder Logic)",
      f2: "اسطوانات وصمامات نيوماتيك",
      f3: "محركات DC ذات عزم دوران عالي",
      f4: "حساسات سعوية دقيقة (Capacitive)",
      f5: "مساعد ذكي (Chatbot)",
      f6: "محاكاة عبر الويب"
    },
    team: {
      title: "فريق العمل",
      subtitle: "مشروع تخرج ميكاترونكس 2026 - جامعة بني سويف التكنولوجية",
      leader: "قائد الفريق",
      members: "أعضاء الفريق",
      supervisors: "إشراف: د. سها نبيل & م. سارة شعبان"
    },
    footer: {
      rights: "© 2026 AutoSpex. جميع الحقوق محفوظة.",
      location: "جامعة بني سويف التكنولوجية"
    }
  }
};

const TeamMember = ({ name, role, icon }) => (
  <div className="flex items-center space-x-3 rtl:space-x-reverse bg-white p-3 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
      {icon || <Users size={18} />}
    </div>
    <div>
      <p className="font-semibold text-slate-800 text-sm">{name}</p>
      {role && <p className="text-xs text-slate-500">{role}</p>}
    </div>
  </div>
);

export default function AutoSpexLanding() {
  const [lang, setLang] = useState('ko'); // Default Korean
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const t = translations[lang];
  const isRTL = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  const toggleLang = () => {
    if (lang === 'ko') setLang('en');
    else if (lang === 'en') setLang('ar');
    else setLang('ko');
  };

  const getLangLabel = () => {
    if (lang === 'ko') return 'English';
    if (lang === 'en') return 'العربية';
    return '한국어';
  };

  return (
    <div className={`min-h-screen bg-slate-50 font-sans ${isRTL ? 'font-arabic' : 'font-sans'}`}>
      
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Area */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              {/* تعديل اللوجو:
                  قم بتغيير "1.png" إلى رابط الصورة الخاصة بك أو مسار الملف الجديد.
                  مثال: src="/images/my-logo.png" أو رابط مباشر https://...
              */}
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center overflow-hidden">
                 <img 
                   src="1.png"  // <--- ضع رابط اللوجو هنا
                   alt="Logo" 
                   className="w-full h-full object-contain" 
                   onError={(e) => e.target.style.display='none'} 
                 />
                 <Cpu className="text-white w-6 h-6 absolute opacity-0 hover:opacity-100" /> {/* Fallback icon if img hidden */}
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
                AutoSpex
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              <a href="#vision" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">{t.nav.vision}</a>
              <a href="#solution" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">{t.nav.solution}</a>
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">{t.nav.features}</a>
              <a href="#team" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">{t.nav.team}</a>
              
              <button 
                onClick={toggleLang}
                className="flex items-center space-x-2 rtl:space-x-reverse bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full transition-all text-sm font-semibold text-slate-700"
              >
                <Globe size={16} />
                <span>{getLangLabel()}</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#vision" className="block py-3 text-slate-600 border-b border-slate-50">{t.nav.vision}</a>
              <a href="#solution" className="block py-3 text-slate-600 border-b border-slate-50">{t.nav.solution}</a>
              <a href="#features" className="block py-3 text-slate-600 border-b border-slate-50">{t.nav.features}</a>
              <a href="#team" className="block py-3 text-slate-600 border-b border-slate-50">{t.nav.team}</a>
              <button onClick={toggleLang} className="flex items-center mt-4 text-blue-600 font-semibold">
                <Globe size={18} className="mr-2 rtl:ml-2" /> {getLangLabel()}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 -skew-x-12 transform origin-top-right -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
                BSTU Project 2026
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                {t.hero.title} <br />
                <span className="text-blue-600">{t.hero.subtitle}</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                {t.hero.desc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all hover:-translate-y-1">
                  {t.hero.cta} <ArrowRight className="ml-2 rtl:mr-2 rtl:ml-0" size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200">
                <div className="text-center md:text-left rtl:text-right">
                  <div className="font-bold text-2xl text-slate-900">IoT</div>
                  <div className="text-xs text-slate-500 uppercase">{t.stats.s1}</div>
                </div>
                <div className="text-center md:text-left rtl:text-right">
                  <div className="font-bold text-2xl text-slate-900">AI</div>
                  <div className="text-xs text-slate-500 uppercase">{t.stats.s2}</div>
                </div>
                <div className="text-center md:text-left rtl:text-right">
                  <div className="font-bold text-2xl text-slate-900">$$$</div>
                  <div className="text-xs text-slate-500 uppercase">{t.stats.s3}</div>
                </div>
              </div>
            </div>
            
            {/* Hero Image / Placeholder */}
            <div className="relative">
              <div className="bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-3xl p-1 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-[20px] overflow-hidden h-80 md:h-[500px] flex items-center justify-center relative">
                    {/* تعديل الصورة الرئيسية للمنتج:
                        قم بتغيير "2.png" إلى رابط صورة المشروع أو الجهاز.
                    */}
                    <img 
                      src="2.png" // <--- ضع رابط صورة الجهاز الرئيسية هنا
                      alt="AutoSpex Machine" 
                      className="w-full h-full object-cover" 
                    />
                    
                    {/* Overlay if image fails loading */}
                    <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center text-slate-400 -z-10">
                        <Cpu size={64} />
                        <span className="mt-4 font-mono text-sm">Product Image (2.png)</span>
                    </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full blur-2xl opacity-20" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="vision" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.problem.title}</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t.problem.p1_title, desc: t.problem.p1_desc, icon: <Brain size={32} /> },
              { title: t.problem.p2_title, desc: t.problem.p2_desc, icon: <Settings size={32} /> },
              { title: t.problem.p3_title, desc: t.problem.p3_desc, icon: <BookOpen size={32} /> },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-shadow group">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-cyan-400 font-bold uppercase tracking-wider mb-2">{t.solution.tag}</div>
              <h2 className="text-4xl font-bold mb-6">{t.solution.title}</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                {t.solution.desc}
              </p>
              
              <div className="space-y-6">
                {t.solution.cards.map((card, idx) => (
                  <div key={idx} className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                       <CheckCircle size={18} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white">{card.title}</h4>
                      <p className="text-slate-400">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
               {/* This simulates the 'Platform' screenshot or schematic from PPT */}
               <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-2xl">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6 border-b border-slate-700 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="text-xs text-slate-500 ml-4">AutoSpex AI Dashboard</div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm text-slate-300">
                      <span>PLC Status:</span>
                      <span className="text-green-400 font-mono">ONLINE</span>
                    </div>
                    <div className="h-32 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-700">
                      <span className="text-cyan-500 animate-pulse font-mono">Analyzing Ladder Logic...</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="h-20 bg-slate-700/50 rounded flex flex-col items-center justify-center p-2">
                          <span className="text-xs text-slate-400 mb-1">Bottles Processed</span>
                          <span className="text-2xl font-bold">1,240</span>
                       </div>
                       <div className="h-20 bg-slate-700/50 rounded flex flex-col items-center justify-center p-2">
                          <span className="text-xs text-slate-400 mb-1">Efficiency</span>
                          <span className="text-2xl font-bold text-green-400">98%</span>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Specs */}
      <section id="features" className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">{t.features.title}</h2>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600 flex items-start space-x-4 rtl:space-x-reverse">
                <Cpu className="text-blue-600 flex-shrink-0" />
                <span className="font-medium text-slate-800">{t.features.f1}</span>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-cyan-500 flex items-start space-x-4 rtl:space-x-reverse">
                <Settings className="text-cyan-500 flex-shrink-0" />
                <span className="font-medium text-slate-800">{t.features.f2}</span>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-500 flex items-start space-x-4 rtl:space-x-reverse">
                <Settings className="text-indigo-500 flex-shrink-0" />
                <span className="font-medium text-slate-800">{t.features.f3}</span>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500 flex items-start space-x-4 rtl:space-x-reverse">
                <Wifi className="text-orange-500 flex-shrink-0" />
                <span className="font-medium text-slate-800">{t.features.f4}</span>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500 flex items-start space-x-4 rtl:space-x-reverse">
                <Brain className="text-purple-500 flex-shrink-0" />
                <span className="font-medium text-slate-800">{t.features.f5}</span>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 flex items-start space-x-4 rtl:space-x-reverse">
                <Globe className="text-green-500 flex-shrink-0" />
                <span className="font-medium text-slate-800">{t.features.f6}</span>
             </div>
           </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-slate-900">{t.team.title}</h2>
             <p className="text-slate-500 mt-2">{t.team.subtitle}</p>
             <div className="inline-block mt-4 px-4 py-2 bg-blue-50 rounded-lg text-blue-700 font-semibold border border-blue-100">
               {t.team.supervisors}
             </div>
           </div>

           <div className="grid md:grid-cols-4 gap-6">
              {/* Leaders and Key Roles */}
              <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                 <TeamMember name="Abdalla Magdy" role={t.team.leader} icon={<Users />} />
                 <TeamMember name="Shahed El-Sayed" role="Marketing Head & PLC" />
                 <TeamMember name="Ali Hossam" role="CAD Design" />
              </div>

              {/* Rest of the team - Dense Grid */}
              <div className="md:col-span-4">
                <h3 className="text-lg font-semibold text-slate-700 mb-4 px-2">{t.team.members}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <TeamMember name="Yousef Emad" />
                  <TeamMember name="Ahmed Ali" />
                  <TeamMember name="Islam Bakheet" />
                  <TeamMember name="El-Modather Glal" />
                  <TeamMember name="Fahd Hamdy" />
                  <TeamMember name="Mohamed Adel" />
                  <TeamMember name="Mohamed Refai" />
                  <TeamMember name="Hatem Shappan" />
                  <TeamMember name="Abdalla Sobhy" />
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
             <div>
                <span className="text-2xl font-bold text-white block mb-2">AutoSpex</span>
                <p>{t.footer.location}</p>
             </div>
             <div className="md:text-right rtl:text-left">
                <p>{t.footer.rights}</p>
                <div className="mt-4 flex space-x-4 md:justify-end rtl:justify-start">
                   {/* تعديل روابط السوشيال ميديا:
                      استبدل الرمز # بالرابط الخاص بصفحتكم.
                      مثال: href="https://facebook.com/AutoSpex"
                   */}
                   
                   {/* رابط فيسبوك أو لينكد إن */}
                   <a href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center text-white">
                      {/* يمكنك تغيير الأيقونة هنا أو وضع حرف F مثلاً */}
                      <span className="font-bold text-xs">FB</span> 
                   </a>

                   {/* رابط يوتيوب أو غيره */}
                   <a href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-800 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center text-white">
                      <span className="font-bold text-xs">YT</span>
                   </a>
                </div>
             </div>
          </div>
        </div>
      </footer>

    </div>
  );
}