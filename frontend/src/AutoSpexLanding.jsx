import React, { useState, useEffect } from 'react';
import { 
  Globe, Cpu, Users, ArrowRight, BrainCircuit, Activity, 
  Settings, ChevronRight, ChevronDown, BarChart3, ShieldAlert, MessageSquare, 
  Database, Power, Play, BookOpen, GraduationCap, CheckCircle2,
  Clock, Award, Menu, X, Facebook, Twitter, Linkedin, Github, 
  Layout, Blocks, Zap, Code, Target, Factory, Home, Image as ImageIcon,
  Map, UserCircle2, Server, TrendingDown, ShieldCheck, Microchip
} from 'lucide-react';

// ============================================================================
// 📂 FOLDER: src/data/
// 📄 FILE: translations.js
// ============================================================================
const resources = {
  en: {
    brand: "AutoSpex",
    nav: { 
      product: "Product",
      solutions: "Solutions",
      technology: "Technology",
      team: "Team",
      contact: "Contact Sales"
    },
    hero: { 
      badge: "Redefining Engineering Education",
      title: "The Next Generation of Industrial Training.",
      subtitle: "AutoSpex bridges the gap between academic theory and Industry 4.0 reality. A highly scalable, cost-effective S7-1200 PLC training ecosystem powered by AI and Digital Twins.",
      primaryCTA: "Request a Demo",
      secondaryCTA: "View Architecture"
    },
    metrics: {
      cost: "90% Cost Reduction",
      costDesc: "Compared to traditional imported industrial training stations.",
      access: "24/7 Virtual Access",
      accessDesc: "Students learn anywhere via the Web Digital Twin.",
      safety: "100% Safe Environment",
      safetyDesc: "AI Copilot prevents critical logic errors before physical execution."
    },
    problemSolution: {
      title: "The Industry 4.0 Skills Gap",
      subtitle: "Traditional university labs are expensive to scale, easily damaged, and rely on outdated paper manuals. AutoSpex introduces a hybrid learning paradigm.",
      features: [
        { title: "Physical Kit", desc: "A robust, low-cost automated bottling line driven by a real Siemens S7-1200 PLC.", icon: <Microchip size={24}/> },
        { title: "Digital Twin", desc: "A web-based 3D replica that syncs with physical hardware via IoT for remote practice.", icon: <Layout size={24}/> },
        { title: "AI Copilot", desc: "An intelligent assistant trained on Siemens manuals to guide students through troubleshooting.", icon: <BrainCircuit size={24}/> }
      ]
    },
    architecture: {
      title: "System Architecture",
      subtitle: "Built with enterprise-grade technologies to ensure seamless real-time synchronization.",
      layer1: "Hardware Layer",
      layer1Desc: "Siemens S7-1200, Capacitive Sensors, Pneumatic Actuators, DC Conveyors.",
      layer2: "IoT Gateway",
      layer2Desc: "Python Snap7 interface communicating via secure WebSockets.",
      layer3: "Cloud Platform",
      layer3Desc: "React.js frontend, Node.js backend, and LLM-powered AI integration."
    },
    footer: { 
      desc: "Empowering universities to produce industry-ready automation engineers.", 
      links: "Quick Links", legal: "Legal & Privacy", rights: "© 2026 AutoSpex. Built at BSTU." 
    }
  },
  ar: {
    brand: "أوتوسبكس",
    nav: { 
      product: "المنتج",
      solutions: "الحلول",
      technology: "التكنولوجيا",
      team: "الفريق",
      contact: "تواصل معنا"
    },
    hero: { 
      badge: "إعادة ابتكار التعليم الهندسي",
      title: "الجيل القادم من التدريب الصناعي.",
      subtitle: "أوتوسبكس يسد الفجوة بين النظرية الأكاديمية وواقع الثورة الصناعية الرابعة. نظام تدريب شامل واقتصادي يعتمد على PLC S7-1200 ومُعزز بالذكاء الاصطناعي والتوأم الرقمي.",
      primaryCTA: "طلب عرض توضيحي",
      secondaryCTA: "هيكلة النظام"
    },
    metrics: {
      cost: "توفير 90% من التكلفة",
      costDesc: "مقارنة بمحطات التدريب الصناعية التقليدية المستوردة.",
      access: "وصول افتراضي 24/7",
      accessDesc: "يتعلم الطلاب من أي مكان عبر منصة التوأم الرقمي.",
      safety: "بيئة آمنة 100%",
      safetyDesc: "المساعد الذكي يمنع أخطاء البرمجة الحرجة قبل التنفيذ الفعلي."
    },
    problemSolution: {
      title: "فجوة مهارات الصناعة 4.0",
      subtitle: "المعامل الجامعية التقليدية باهظة الثمن، عُرضة للتلف، وتعتمد على كتيبات ورقية قديمة. أوتوسبكس يقدم نموذجاً تعليمياً هجيناً لحل هذه المشكلة.",
      features: [
        { title: "النظام المادي (Hardware)", desc: "خط إنتاج وتعبئة صلب ومنخفض التكلفة يعمل بوحدة Siemens S7-1200 حقيقية.", icon: <Microchip size={24}/> },
        { title: "التوأم الرقمي (Digital Twin)", desc: "محاكاة 3D على الويب تتزامن مع النظام الفعلي عبر إنترنت الأشياء للتدريب عن بعد.", icon: <Layout size={24}/> },
        { title: "المساعد الذكي (AI Copilot)", desc: "مساعد ذكي مدرب على كتيبات سيمنز لتوجيه الطلاب خطوة بخطوة في حل الأعطال.", icon: <BrainCircuit size={24}/> }
      ]
    },
    architecture: {
      title: "هيكلة النظام التقنية",
      subtitle: "مبني باستخدام تقنيات بمستوى الشركات الكبرى لضمان المزامنة اللحظية.",
      layer1: "طبقة الأجهزة (Hardware)",
      layer1Desc: "Siemens S7-1200، حساسات سعوية، مشغلات نيوماتيك، سيور نقل DC.",
      layer2: "بوابة الاتصال (IoT Gateway)",
      layer2Desc: "واجهة Python Snap7 تتواصل عبر بروتوكول WebSockets آمن.",
      layer3: "المنصة السحابية (Cloud)",
      layer3Desc: "واجهة React.js، خادم Node.js، ونظام ذكاء اصطناعي مدمج (LLM)."
    },
    footer: { 
      desc: "نُمكّن الجامعات من تخريج مهندسي أتمتة جاهزين لسوق العمل.", 
      links: "روابط سريعة", legal: "الشروط والخصوصية", rights: "© 2026 أوتوسبكس. صُنع في جامعة بني سويف التكنولوجية." 
    }
  }
};


// ============================================================================
// 📂 FOLDER: src/components/ui/
// 📄 FILE: CorporateCard.jsx
// ============================================================================
const CorporateCard = ({ children, className = "" }) => (
  <div className={`bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl transition-all hover:bg-slate-900/60 hover:border-slate-700 ${className}`}>
    {children}
  </div>
);

// ============================================================================
// 📂 FOLDER: src/components/sections/
// 📄 FILE: Navbar.jsx
// ============================================================================
const Navbar = ({ lang, toggleLang, t, isRTL }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ==========================================
          DESKTOP NAVBAR (Hidden on Mobile)
      ========================================== */}
      <nav className={`hidden md:block fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 overflow-hidden">
                <img src="/1.png" alt="Logo" className="w-full h-full object-contain p-0.5 bg-white/10" onError={(e) => { e.target.style.display='none'; }} />
              </div>
              <span className="text-2xl font-bold text-white tracking-wide">{t.brand}</span>
            </div>

            <div className="flex items-center space-x-8 rtl:space-x-reverse">
              <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{t.nav.product}</button>
              <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{t.nav.solutions}</button>
              <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{t.nav.technology}</button>
              <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{t.nav.team}</button>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button onClick={toggleLang} className="flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium px-2">
                <Globe size={16} className="mr-1 rtl:ml-1" /> {lang === 'en' ? 'AR' : 'EN'}
              </button>
              <button className="text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 px-5 py-2.5 rounded-xl transition-all shadow-lg">
                {t.nav.contact}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ==========================================
          MOBILE TOP BAR
      ========================================== */}
      <div className="md:hidden fixed top-0 w-full z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 h-16 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
           <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 overflow-hidden">
             <img src="/1.png" alt="Logo" className="w-full h-full object-contain p-0.5 bg-white/10" onError={(e) => { e.target.style.display='none'; }} />
           </div>
           <span className="text-xl font-bold text-white">{t.brand}</span>
        </div>
        <button onClick={toggleLang} className="text-slate-400 text-xs font-bold bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800 flex items-center">
           <Globe size={14} className="mr-1 rtl:ml-1" /> {lang === 'en' ? 'AR' : 'EN'}
        </button>
      </div>

      {/* ==========================================
          MODERN MOBILE BOTTOM DOCK
      ========================================== */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
         <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-700/50 p-2 rounded-full flex justify-between items-center shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
            
            <button className="flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              <Home size={22} className="mb-1" />
              <span className="text-[10px] font-bold">Home</span>
            </button>

            <button className="flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all text-slate-400 hover:text-white">
              <Layout size={22} />
            </button>

            <button onClick={() => setIsMobileMenuOpen(true)} className="flex flex-col items-center justify-center w-14 h-14 rounded-full text-slate-400 hover:text-white transition-colors">
              <Menu size={24} />
            </button>

         </div>
      </div>

      {/* ==========================================
          MOBILE EXPANDED MENU (BOTTOM SHEET)
      ========================================== */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] flex flex-col justify-end">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
           <div className="bg-slate-900 border-t border-slate-800 rounded-t-3xl relative z-10 p-6 animate-in slide-in-from-bottom-full duration-300">
              <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-6"></div>
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold text-lg">Menu</h3>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                {['product', 'solutions', 'technology', 'team'].map((key) => (
                  <button key={key} onClick={() => setIsMobileMenuOpen(false)} className="w-full text-left rtl:text-right p-4 rounded-xl border border-slate-800/50 bg-slate-800/30 text-slate-300 font-medium hover:bg-slate-800/80 transition-colors flex justify-between items-center">
                    {t.nav[key]}
                    <ChevronRight size={16} className="text-slate-500 rtl:rotate-180" />
                  </button>
                ))}
              </div>

              <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 transition-all">
                {t.nav.contact}
              </button>
           </div>
        </div>
      )}
    </>
  );
};

// ============================================================================
// 📂 FOLDER: src/pages/
// 📄 FILE: HomePage.jsx (The Investor Pitch)
// ============================================================================
const HomePage = ({ t, isRTL }) => {
  return (
    <main className="relative z-10 pb-20 md:pb-0 pt-16 md:pt-0">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] opacity-50"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold tracking-wide mb-8">
            <SparklesIcon className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-blue-400" />
            {t.hero.badge}
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-5xl mx-auto mb-6">
            {t.hero.title}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-10">
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-blue-500/25">
              {t.hero.primaryCTA} <ChevronRight className="ml-2 rtl:mr-2 rtl:ml-0" size={20} />
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-slate-800/80 text-white border border-slate-700 hover:bg-slate-700 rounded-xl font-bold transition-all">
              {t.hero.secondaryCTA}
            </button>
          </div>
        </div>
      </section>

      {/* 2. KEY METRICS (INVESTOR FOCUS) */}
      <section className="py-12 border-y border-slate-800/50 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x rtl:divide-x-reverse divide-slate-800">
            <div className="py-4 px-6">
              <TrendingDown className="w-8 h-8 mx-auto text-emerald-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">{t.metrics.cost}</h3>
              <p className="text-slate-400 text-sm">{t.metrics.costDesc}</p>
            </div>
            <div className="py-4 px-6">
              <Globe className="w-8 h-8 mx-auto text-blue-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">{t.metrics.access}</h3>
              <p className="text-slate-400 text-sm">{t.metrics.accessDesc}</p>
            </div>
            <div className="py-4 px-6">
              <ShieldCheck className="w-8 h-8 mx-auto text-purple-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">{t.metrics.safety}</h3>
              <p className="text-slate-400 text-sm">{t.metrics.safetyDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM & SOLUTION (THE HYBRID APPROACH) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.problemSolution.title}</h2>
          <p className="text-slate-400 text-lg">{t.problemSolution.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.problemSolution.features.map((feat, idx) => (
            <CorporateCard key={idx} className="flex flex-col">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
                idx === 0 ? 'bg-amber-500/10 text-amber-500' : 
                idx === 1 ? 'bg-blue-500/10 text-blue-500' : 'bg-purple-500/10 text-purple-500'
              }`}>
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
            </CorporateCard>
          ))}
        </div>
      </section>

      {/* 4. TECHNICAL ARCHITECTURE (FOR PROFESSORS) */}
      <section className="py-24 bg-slate-900/30 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual Representation of Stack */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full"></div>
              <div className="relative flex flex-col space-y-4">
                
                {/* Cloud/Web Layer */}
                <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl shadow-xl flex items-center transform transition hover:-translate-y-1">
                  <div className="bg-blue-500/20 p-3 rounded-xl mr-4 rtl:ml-4 rtl:mr-0 text-blue-400"><Globe size={28}/></div>
                  <div>
                    <h4 className="text-white font-bold">{t.architecture.layer3}</h4>
                    <p className="text-slate-400 text-sm mt-1">{t.architecture.layer3Desc}</p>
                  </div>
                </div>

                {/* Connection Lines */}
                <div className="flex justify-center"><Activity className="text-slate-600 animate-pulse" size={24}/></div>

                {/* Gateway Layer */}
                <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl shadow-xl flex items-center transform transition hover:-translate-y-1">
                  <div className="bg-emerald-500/20 p-3 rounded-xl mr-4 rtl:ml-4 rtl:mr-0 text-emerald-400"><Server size={28}/></div>
                  <div>
                    <h4 className="text-white font-bold">{t.architecture.layer2}</h4>
                    <p className="text-slate-400 text-sm mt-1">{t.architecture.layer2Desc}</p>
                  </div>
                </div>

                {/* Connection Lines */}
                <div className="flex justify-center"><Activity className="text-slate-600 animate-pulse" size={24}/></div>

                {/* Hardware Layer */}
                <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl shadow-xl flex items-center transform transition hover:-translate-y-1">
                  <div className="bg-amber-500/20 p-3 rounded-xl mr-4 rtl:ml-4 rtl:mr-0 text-amber-400"><Cpu size={28}/></div>
                  <div>
                    <h4 className="text-white font-bold">{t.architecture.layer1}</h4>
                    <p className="text-slate-400 text-sm mt-1">{t.architecture.layer1Desc}</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.architecture.title}</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {t.architecture.subtitle}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="text-blue-500 mt-1 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" size={20}/>
                  <span className="text-slate-300">Bi-directional WebSockets for <strong className="text-white">sub-50ms latency</strong>.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-blue-500 mt-1 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" size={20}/>
                  <span className="text-slate-300">Scalable cloud database to track <strong className="text-white">thousands of students</strong>.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-blue-500 mt-1 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" size={20}/>
                  <span className="text-slate-300">RAG-based AI model fine-tuned on <strong className="text-white">industrial logic manuals</strong>.</span>
                </li>
              </ul>
              <button className="mt-10 flex items-center text-blue-400 hover:text-blue-300 font-bold transition-colors">
                Read the Whitepaper <ArrowRight className="ml-2 rtl:mr-2 rtl:ml-0" size={18}/>
              </button>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

// ============================================================================
// 📂 FOLDER: src/components/sections/
// 📄 FILE: Footer.jsx
// ============================================================================
const Footer = ({ t, isRTL }) => (
  <footer className="bg-slate-950 border-t border-slate-900 relative z-10 pt-20 pb-28 md:pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center overflow-hidden">
              <img src="/1.png" alt="Logo" className="w-full h-full object-contain p-0.5 bg-white/10" onError={(e) => { e.target.style.display='none'; }} />
            </div>
            <span className="text-xl font-bold text-white">{t.brand}</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">{t.footer.desc}</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">{t.footer.links}</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">{t.nav.product}</a></li>
            <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">{t.nav.technology}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">{t.footer.legal}</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center">
        <p className="text-slate-500 text-sm mb-4 md:mb-0">{t.footer.rights}</p>
        <div className="flex space-x-4 rtl:space-x-reverse">
          <Github className="text-slate-500 hover:text-white cursor-pointer" size={20}/>
          <Linkedin className="text-slate-500 hover:text-white cursor-pointer" size={20}/>
        </div>
      </div>
    </div>
  </footer>
);

// Simple Icon component used in Hero
const SparklesIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </svg>
);


// ============================================================================
// 📂 FOLDER: src/
// 📄 FILE: App.jsx (Main Entry Component)
// ============================================================================
export default function AutoSpexLanding() {
  const [lang, setLang] = useState('en');
  
  const t = resources[lang];
  const isRTL = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');

  return (
    <div className={`min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-blue-500/30 flex flex-col ${isRTL ? 'font-arabic' : 'font-sans'}`}>
      
      {/* Background Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
      </div>

      <Navbar lang={lang} toggleLang={toggleLang} t={t} isRTL={isRTL} />
      
      <HomePage t={t} isRTL={isRTL} />

      <Footer t={t} isRTL={isRTL} />

    </div>
  );
}