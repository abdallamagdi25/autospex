import { 
  PencilRuler, Cpu, Hammer, Zap, BrainCircuit, Rocket,
  Code, Radio
} from 'lucide-react';
import React from 'react';

const resources = {
  en: {
    brand: "AutoSpex",
    nav: {
      product: "Product",
      solutions: "Solutions",
      technology: "Technology",
      team: "The Team",
      journey: "Our Journey",
      hub: "Student Hub",
      contact: "Contact Sales",
      digitalTwin: "Digital Twin"
    },
    hero: {
      badge: "Redefining Engineering Education",
      title: "The Next Generation of Industrial Training.",
      subtitle: "AutoSpex bridges the gap between academic theory and Industry 4.0 reality.",
      primaryCTA: "Launch Digital Twin",
      secondaryCTA: "View Architecture"
    },
    metrics: {
      cost: "90% Cost Reduction",
      costDesc: "Compared to traditional imported industrial training stations.",
      access: "24/7 Virtual Access",
      accessDesc: "Students learn anywhere via the Web Digital Twin.",
      safety: "100% Safe Environment",
      safetyDesc: "AI Copilot prevents critical logic errors."
    },
    problemSolution: {
      title: "The Industry 4.0 Skills Gap",
      subtitle: "Traditional labs are expensive and static. AutoSpex provides a low-cost, smart alternative.",
      features: [
        { title: "Physical Kit", desc: "Real bottling line with Siemens S7-1200." },
        { title: "Digital Twin", desc: "Web 3D replica synced via IoT." },
        { title: "AI Copilot", desc: "Intelligent assistant for troubleshooting." }
      ]
    },
    architecture: {
      title: "System Architecture",
      subtitle: "Enterprise-grade technologies ensuring real-time synchronization.",
      layer1: "Hardware Layer",
      layer1Desc: "S7-1200, Sensors, Actuators.",
      layer2: "IoT Gateway",
      layer2Desc: "Python Snap7 & WebSockets.",
      layer3: "Cloud Platform",
      layer3Desc: "React.js & Node.js."
    },
    twinPage: {
      title: "Interactive Digital Twin",
      subtitle: "Live synchronization between hardware and 3D environment.",
      status: "Live Connection",
      componentsTitle: "System Controls",
      logTitle: "Live Logs"
    },
    journeyPage: {
      title: "The Journey to Execution",
      subtitle: "From a 3D concept in SolidWorks to a fully automated Industry 4.0 production line.",
      phases: [
        { title: "The Blueprint", desc: "Initial mechanical designs and 3D modeling of the bottling line chassis using SolidWorks.", icon: React.createElement(PencilRuler, { size: 24 }), date: "Oct 2025" },
        { title: "The Brains", desc: "Wiring the Siemens S7-1200 PLC, contactors, and establishing electrical safety protocols.", icon: React.createElement(Cpu, { size: 24 }), date: "Nov 2025" },
        { title: "Mechanical Assembly", desc: "Installing DC gear motors, pneumatic cylinders, and the custom conveyor system.", icon: React.createElement(Hammer, { size: 24 }), date: "Dec 2025" },
        { title: "IoT Integration", desc: "Developing the Python Snap7 gateway and real-time WebSockets communication.", icon: React.createElement(Zap, { size: 24 }), date: "Jan 2026" },
        { title: "AI & Software", desc: "Building the React frontend and training the AI Copilot on industrial logic.", icon: React.createElement(BrainCircuit, { size: 24 }), date: "Feb 2026" },
        { title: "Final Execution", desc: "Complete synchronization between the physical kit and the digital twin.", icon: React.createElement(Rocket, { size: 24 }), date: "March 2026" }
      ]
    },
    hubPage: {
      title: "Student Learning Hub",
      welcome: "Welcome back, Engineer",
      stats: {
        progress: "Course Progress",
        rank: "Global Rank",
        certificates: "Certificates"
      },
      modules: [
        { id: 1, title: "S7-1200 Wiring", status: "Completed", score: "95%", icon: React.createElement(Zap, { size: 20 }) },
        { id: 2, title: "Ladder Logic Basics", status: "In Progress", score: "60%", icon: React.createElement(Code, { size: 20 }) },
        { id: 3, title: "Sensor Calibration", status: "Locked", score: "--", icon: React.createElement(Radio, { size: 20 }) }
      ]
    },
    copilot: {
      title: "AutoSpex Copilot",
      placeholder: "Ask about S7-1200 logic...",
      welcome: "Hello! I am your AI assistant. How can I help you with the bottling line today?"
    },
    teamPage: {
      title: "The Engineering Minds",
      subtitle: "Meet the brilliant Mechatronics team (Class of 2026, BSTU) behind AutoSpex.",
      members: [
        { name: "Abdalla Magdy", role: "Team Leader & AI Integrator", bio: "Leading system architecture and hardware-software bridging.", img: "/team/abdalla.jpg" },
        { name: "Shahed El-Sayed", role: "Marketing Head & PLC Dev", bio: "Expert in S7-1200 logic and project positioning.", img: "/team/shahed.jpg" },
        // { name: "Ali Hossam", role: "Lead CAD Designer", bio: "Architected 3D models and mechanical stress simulations.", img: "/team/ali.jpg" },
        { name: "Yousef Emad", role: "Mechatronics Engineer", bio: "Focused on actuator integration and pneumatic systems.", img: "/team/yousef.jpg" },
        { name: "Ahmed Ali", role: "Software Developer", bio: "Built core components of the digital twin and web dashboard.", img: "/team/ahmed.jpg" },
        { name: "Islam Bakheet", role: "Electrical Engineer", bio: "Designed control panels and ensured safe power distribution.", img: "/team/islam.jpg" },
        { name: "El-Modather Glal", role: "Automation Specialist", bio: "Programmed HMI interfaces and industrial communication.", img: "/team/modather.jpg" },
        { name: "Fahd Hamdy", role: "QA & Testing", bio: "Rigorous testing of ladder logic and safety protocols.", img: "/team/fahd.jpg" },
        // { name: "Mohamed Adel", role: "R&D Engineer", bio: "Researched low-cost industrial alternatives for sensors.", img: "/team/adel.jpg" },
        // { name: "Mohamed Refai", role: "Automation Engineer", bio: "Specialized in conveyor synchronization and motor control.", img: "/team/refai.jpg" },
        { name: "Hatem Shappan", role: "Mechanical Engineer", bio: "Optimization of the bottling line chassis and assembly.", img: "/team/hatem.jpg" },
        { name: "Abdalla Sobhy", role: "Mechatronics Specialist", bio: "Integration of photoelectric sensors and feedback loops.", img: "/team/sobhy.jpg" }
      ]
    },
    footer: {
      desc: "Empowering universities to produce industry-ready automation engineers.",
      links: "Quick Links",
      legal: "Legal & Privacy",
      rights: "© 2026 AutoSpex. Built at BSTU."
    }
  },

  ar: {
    brand: "أوتوسبكس",
    nav: {
      product: "المنتج",
      solutions: "الحلول",
      technology: "التكنولوجيا",
      team: "الفريق",
      journey: "رحلتنا",
      hub: "بوابة الطالب",
      contact: "تواصل معنا",
      digitalTwin: "التوأم الرقمي"
    },
    hero: {
      badge: "إعادة ابتكار التعليم الهندسي",
      title: "الجيل القادم من التدريب الصناعي.",
      subtitle: "أوتوسبكس يسد الفجوة بين النظرية الأكاديمية وواقع الثورة الصناعية الرابعة.",
      primaryCTA: "شغل التوأم الرقمي",
      secondaryCTA: "هيكلة النظام"
    },
    metrics: {
      cost: "توفير 90% من التكلفة",
      costDesc: "مقارنة بمحطات التدريب الصناعية التقليدية المستوردة.",
      access: "وصول افتراضي 24/7",
      accessDesc: "يتعلم الطلاب من أي مكان عبر منصة التوأم الرقمي.",
      safety: "بيئة آمنة 100%",
      safetyDesc: "المساعد الذكي يمنع أخطاء البرمجة الحرجة."
    },
    problemSolution: {
      title: "فجوة مهارات الصناعة 4.0",
      subtitle: "المعامل التقليدية مكلفة وجامدة. أوتوسبكس يقدم بديلاً ذكياً واقتصادياً.",
      features: [
        { title: "النظام المادي", desc: "خط تعبئة حقيقي مع Siemens S7-1200." },
        { title: "التوأم الرقمي", desc: "نسخة 3D متزامنة عبر إنترنت الأشياء." },
        { title: "المساعد الذكي", desc: "مساعد AI لحل مشاكل البرمجة والتوصيل." }
      ]
    },
    architecture: {
      title: "هيكلة النظام التقنية",
      subtitle: "تقنيات متقدمة تضمن التزامن اللحظي بين الواقع والويب.",
      layer1: "طبقة الأجهزة",
      layer1Desc: "S7-1200، حساسات، ومشغلات.",
      layer2: "بوابة الاتصال",
      layer2Desc: "Snap7 وبروتوكول WebSockets.",
      layer3: "المنصة السحابية",
      layer3Desc: "React.js و Node.js."
    },
    twinPage: {
      title: "التوأم الرقمي التفاعلي",
      subtitle: "تزامن لحظي بين الجهاز الفعلي وبيئة المحاكاة 3D.",
      status: "متصل لحظياً",
      componentsTitle: "التحكم بالنظام",
      logTitle: "البيانات اللحظية"
    },
    journeyPage: {
      title: "رحلة الإنجاز",
      subtitle: "من تصميم CAD على SolidWorks إلى خط إنتاج يعمل بكامل طاقته وفق معايير الصناعة 4.0.",
      phases: [
        { title: "المخطط الميكانيكي", desc: "التصاميم الميكانيكية الأولية ونمذجة الهيكل ثلاثي الأبعاد باستخدام SolidWorks.", icon: React.createElement(PencilRuler, { size: 24 }), date: "أكتوبر 2025" },
        { title: "العقل المدبر", desc: "توصيل وحدة Siemens S7-1200 PLC، والكونتاكتورات، وضبط بروتوكولات السلامة الكهربائية.", icon: React.createElement(Cpu, { size: 24 }), date: "نوفمبر 2025" },
        { title: "التجميع الميكانيكي", desc: "تركيب محركات DC، الاسطوانات النيوماتيكية، وحزام النقل المصنع خصيصاً.", icon: React.createElement(Hammer, { size: 24 }), date: "ديسمبر 2025" },
        { title: "تكامل إنترنت الأشياء", desc: "تطوير بوابة Python Snap7 ونظام الاتصال اللحظي عبر WebSockets.", icon: React.createElement(Zap, { size: 24 }), date: "يناير 2026" },
        { title: "الذكاء الاصطناعي", desc: "بناء واجهة React وتدريب المساعد الذكي على المنطق الصناعي (Ladder Logic).", icon: React.createElement(BrainCircuit, { size: 24 }), date: "فبراير 2026" },
        { title: "التنفيذ النهائي", desc: "المزامنة الكاملة بين النظام المادي والتوأم الرقمي والتشغيل الفعلي.", icon: React.createElement(Rocket, { size: 24 }), date: "مارس 2026" }
      ]
    },
    hubPage: {
      title: "بوابة الطالب التعليمية",
      welcome: "مرحباً بك مجدداً، أيها المهندس",
      stats: {
        progress: "التقدم في الدورة",
        rank: "الترتيب العالمي",
        certificates: "الشهادات"
      },
      modules: [
        { id: 1, title: "توصيل S7-1200", status: "مكتمل", score: "95%", icon: React.createElement(Zap, { size: 20 }) },
        { id: 2, title: "أساسيات Ladder Logic", status: "قيد التنفيذ", score: "60%", icon: React.createElement(Code, { size: 20 }) },
        { id: 3, title: "معايرة الحساسات", status: "مغلق", score: "--", icon: React.createElement(Radio, { size: 20 }) }
      ]
    },
    copilot: {
      title: "مساعد أوتوسبكس",
      placeholder: "اسأل عن منطق S7-1200...",
      welcome: "أهلاً بك! أنا مساعدك الذكي. كيف يمكنني مساعدتك في تشغيل خط التعبئة اليوم؟"
    },
    teamPage: {
      title: "العقول الهندسية",
      subtitle: "تعرف على فريق الميكاترونكس المتميز (دفعة 2026، جامعة بني سويف التكنولوجية) الذي بنى نظام أوتوسبكس.",
      members: [
        { name: "عبدالله مجدي", role: "قائد الفريق ومسؤول الذكاء الاصطناعي", bio: "قيادة هندسة النظام وسد الفجوة بين الأجهزة والبرمجيات.", img: "/team/abdalla.jpg" },
        { name: "شهد السيد", role: "رئيسة التسويق ومطورة PLC", bio: "خبيرة في منطق S7-1200 وإدارة هوية المشروع.", img: "/team/shahed.jpg" },
        { name: "علي حسام", role: "كبير مصممي الـ CAD", bio: "تصميم النماذج المادية ومحاكاة الإجهاد الميكانيكي.", img: "/team/ali.jpg" },
        { name: "يوسف عماد", role: "مهندس ميكاترونكس", bio: "التركيز على دمج المشغلات وتحسين الأنظمة النيوماتيكية.", img: "/team/yousef.jpg" },
        { name: "أحمد علي", role: "مطور برمجيات", bio: "بناء المكونات الأساسية للتوأم الرقمي ولوحة الويب.", img: "/team/ahmed.jpg" },
        { name: "إسلام بخيت", role: "مهندس كهرباء", bio: "تصميم لوحات التحكم وضمان توزيع الطاقة الآمن.", img: "/team/islam.jpg" },
        { name: "المدثر جلال", role: "أخصائي أتمتة", bio: "برمجة شاشات HMI وبروتوكولات الاتصال الصناعي.", img: "/team/modather.jpg" },
        { name: "فهد حمدي", role: "مهندس جودة واختبار", bio: "اختبار دقيق لمنطق Ladder وبروتوكولات السلامة.", img: "/team/fahd.jpg" },
        { name: "محمد عادل", role: "مهندس بحث وتطوير", bio: "البحث عن بدائل صناعية منخفضة التكلفة للحساسات.", img: "/team/adel.jpg" },
        { name: "محمد رفاعي", role: "مهندس أتمتة", bio: "متخصص في مزامنة السيور والتحكم في المحركات.", img: "/team/refai.jpg" },
        { name: "حاتم شعبان", role: "مهندس ميكانيكا", bio: "تحسين هيكل خط التعبئة وعملية التجميع الميكانيكي.", img: "/team/hatem.jpg" },
        { name: "عبدالله صبحي", role: "أخصائي ميكاترونكس", bio: "دمج الحساسات الضوئية وحلقات التغذية الراجعة.", img: "/team/sobhy.jpg" }
      ]
    },
    footer: {
      desc: "نُمكّن الجامعات من تخريج مهندسي أتمتة جاهزين لسوق العمل.",
      links: "روابط سريعة",
      legal: "الشروط والخصوصية",
      rights: "© 2026 أوتوسبكس. صُنع في جامعة بني سويف التكنولوجية."
    }
  }
};

export default resources;