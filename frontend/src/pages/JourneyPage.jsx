import { ArrowDown, Cpu, Layers, Trophy, Target, Lightbulb, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const TIMELINE = [
  {
    icon: <Lightbulb size={24} />, color: 'bg-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600',
    date: 'أكتوبر 2025',
    title: 'تحديد المشكلة',
    desc: 'لاحظنا فجوة ضخمة بين التعليم الأكاديمي والواقع الصناعي. الأجهزة باهظة الثمن، والمناهج تعتمد على الورق. قررنا بناء نظام تدريب متكامل لحل هذه المشكلة كجزء من مشروع تخرجنا في جامعة بني سويف التكنولوجية.'
  },
  {
    icon: <Cpu size={24} />, color: 'bg-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600',
    date: 'يناير 2026',
    title: 'بناء العتاد المادي (Hardware)',
    desc: 'قمنا بتصميم وتصنيع خط إنتاج تعبئة وتغليف حقيقي. اعتمدنا على حساسات تقارب سعوية (Capacitive Proximity Sensors) ومحركات هوائية، وتم التحكم في النظام بالكامل باستخدام متحكم <span class="tech-term">Siemens S7-1200</span>.'
  },
  {
    icon: <Layers size={24} />, color: 'bg-cyan-500', bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-600',
    date: 'فبراير - مارس 2026',
    title: 'التوأم الرقمي والمساعد الذكي',
    desc: 'قمنا بتطوير منصة الويب وربطها بالمتحكم الفعلي. أنشأنا توأماً رقمياً ثلاثي الأبعاد متزامناً لحظياً عبر <span class="tech-term">WebSockets</span>. ودمجنا نموذج <span class="tech-term">Llama 3.3 70B</span> كمساعد ذكي لتوجيه الطلاب في استكشاف الأخطاء الهندسية.'
  },
  {
    icon: <Trophy size={24} />, color: 'bg-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600',
    date: 'أبريل 2026',
    title: 'الاعتراف والتميز',
    desc: 'شاركنا في اليوم الافتتاحي لمسابقة <span class="tech-term">Made In Egypt 2026</span>، وحصد فريق AutoSpex المركز الأول في مسابقة الشركات الناشئة في Creativa Hub Beni-Suef.'
  },
  {
    icon: <Rocket size={24} />, color: 'bg-violet-500', bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600',
    date: 'المستقبل (يونيو 2026 وما بعده)',
    title: 'من مشروع تخرج إلى شركة ناشئة',
    desc: 'مع اقتراب التخرج، نهدف إلى تحويل AutoSpex إلى منصة SaaS قابلة للتطوير، لتوفير بيئة تدريب صناعي ذكية ومنخفضة التكلفة للجامعات والمعاهد التقنية في جميع أنحاء مصر.'
  }
];

const JourneyPage = () => {
  return (
    <main className="pt-24 md:pt-32 pb-24 bg-slate-50 min-h-screen">
      
      {/* ── HERO SECTION ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 relative z-10">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 border border-blue-100 rounded-2xl mb-6 shadow-sm">
          <Target size={32} className="text-autospex-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
          من فكرة جامعية إلى <br/>
          <span className="text-autospex-primary">ثورة في التدريب الصناعي</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
          رحلة فريق <span className="font-tech font-bold text-slate-800">AutoSpex</span> المكون من 12 مهندساً لبناء أول بيئة تدريب صناعي هجينة متكاملة في مصر.
        </p>
      </section>

      {/* ── TIMELINE SECTION ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* The central/left vertical line */}
        <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-1 bg-slate-200 rounded-full transform md:-translate-x-1/2 hidden sm:block"></div>

        <div className="space-y-12 md:space-y-24">
          {TIMELINE.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                
                {/* Timeline Node (Icon) */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 border-white bg-white shadow-md z-10 flex items-center justify-center hidden sm:flex">
                  <div className={`w-8 h-8 rounded-full ${item.color} text-white flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                </div>

                {/* Content Card (Alternates left/right on desktop, right side on mobile) */}
                <div className={`w-full sm:pl-20 md:pl-0 md:w-5/12 ${isEven ? 'md:pr-12 md:text-left rtl:md:text-right' : 'md:order-last md:pl-12'}`}>
                  <div className={`bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 group-hover:-translate-y-1 relative`}>
                    {/* Decorative Top Accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 ${item.color} rounded-t-3xl opacity-80`}></div>
                    
                    <span className={`inline-block px-3 py-1 text-xs font-extrabold rounded-lg mb-4 font-tech ${item.bg} ${item.text} border ${item.border}`}>
                      {item.date}
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-3">{item.title}</h3>
                    {/* dangerouslySetInnerHTML allows the <span class="tech-term"> to render correctly */}
                    <p className="text-slate-600 font-medium leading-relaxed text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                  </div>
                </div>

                {/* Empty Space for the other side (Desktop only) */}
                <div className="hidden md:block md:w-5/12"></div>

              </div>
            );
          })}
        </div>

        {/* Timeline End Indicator */}
        <div className="flex justify-center mt-12 md:mt-24 relative z-10 hidden sm:flex">
          <div className="w-12 h-12 bg-slate-100 rounded-full border-4 border-white shadow-md flex items-center justify-center text-slate-400 animate-bounce">
            <ArrowDown size={20} />
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-24">
        <div className="bg-autospex-primary rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-5 pointer-events-none" style={{backgroundImage:'radial-gradient(circle at center, white 10%, transparent 20%)', backgroundSize:'30px 30px'}}></div>
          <h2 className="relative z-10 text-3xl md:text-4xl font-extrabold text-white mb-6">كن جزءاً من مستقبل التدريب</h2>
          <p className="relative z-10 text-blue-100 font-medium text-lg mb-10 max-w-2xl mx-auto">
            انضم إلى المئات من المهندسين والطلاب الذين يستخدمون منصة AutoSpex للتدريب العملي في بيئة آمنة ومدعومة بالذكاء الاصطناعي.
          </p>
          <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/courses" className="px-8 py-4 bg-white text-autospex-primary rounded-2xl font-extrabold shadow-lg hover:scale-105 transition-transform text-lg">
              ابدأ التعلم مجاناً
            </Link>
            <Link to="/team" className="px-8 py-4 bg-blue-700/50 border border-blue-500/50 text-white rounded-2xl font-extrabold hover:bg-blue-700 transition-colors text-lg">
              تعرف على الفريق
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};

export default JourneyPage;