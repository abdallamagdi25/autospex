import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Html } from '@react-three/drei';
import { Layout, Cpu, ShieldCheck, Zap, Layers, Server, Activity } from 'lucide-react';
import AutospexMachine from '../components/AutospexMachine';

const DigitalTwinPage = () => {
  return (
    <main className="pt-24 md:pt-32 pb-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen font-sans relative z-10 select-none">
      
      {/* Enterprise Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
            <div className="p-2 bg-white text-blue-600 rounded-xl border border-slate-200 shadow-sm">
              <Layout size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">منصة التوأم الرقمي</h2>
              <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-widest">AutoSpex Industrial Hub</p>
            </div>
          </div>
        </div>
        
        {/* System Status Badges */}
        <div className="mt-4 md:mt-0 flex items-center space-x-3 rtl:space-x-reverse">
          <div className="flex items-center bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm">
            <Server size={16} className="text-slate-400 mr-2 rtl:ml-2 rtl:mr-0" />
            <span className="text-slate-600 font-bold text-xs">WebGL Render: <span className="text-emerald-600">OPTIMAL</span></span>
          </div>
          <div className="flex items-center bg-blue-50 border border-blue-100 px-4 py-2 rounded-xl shadow-sm">
            <ShieldCheck size={16} className="text-blue-600 mr-2 rtl:ml-2 rtl:mr-0" />
            <span className="text-blue-700 font-bold text-xs">CAD Sync: V1.0</span>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid lg:grid-cols-12 gap-8 flex-grow items-stretch">

        {/* 3D Canvas Viewport */}
        <div className="lg:col-span-8 bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden relative min-h-[600px] flex flex-col group">
          <Canvas shadows camera={{ position: [5, 4, 7], fov: 45 }}>
            <Suspense fallback={
              <Html center>
                <div className="flex flex-col items-center justify-center space-y-3 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-slate-100">
                  <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs font-bold text-slate-600 tracking-widest">LOADING 3D ENGINE...</span>
                </div>
              </Html>
            }>
              <Stage environment="city" intensity={0.6} contactShadow={{ opacity: 0.15, blur: 2 }}>
                <AutospexMachine />
              </Stage>
            </Suspense>
            <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2.1} />
          </Canvas>

          {/* Floating Canvas Overlay */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-20">
            <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-sm text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Interactive 3D Viewer
            </div>
            <div className="flex items-center space-x-1.5 rtl:space-x-reverse bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Render</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          
          {/* Tech Specs Card */}
          <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl p-7 flex-grow">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6 border-b border-slate-100 pb-4">
              <div className="p-1.5 bg-slate-50 rounded-lg">
                <Layers size={20} className="text-slate-700" />
              </div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">مواصفات الآلة</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { title: "هيكل الألومنيوم", desc: "قطاعات ألومنيوم صناعية معيارية عالية التحمل." },
                { title: "وحدة التحكم", desc: "لوحة تحكم مزودة بـ PLC نوع Siemens S7-1200." },
                { title: "المحركات", desc: "محرك DC بجهد 12V لتشغيل السير الناقل بدقة." },
                { title: "النيوماتيك", desc: "مكابس هواء وصمامات (Solenoid Valves 220 VAC)." },
              ].map((spec, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="mt-1 mr-3 rtl:ml-3 rtl:mr-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{spec.title}</h4>
                    <p className="text-xs font-medium text-slate-500 mt-0.5 leading-relaxed">{spec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium "Coming Soon" Teaser */}
          <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-7 shadow-2xl shadow-blue-900/20 relative overflow-hidden text-white">
            <div className="absolute -right-8 -top-8 opacity-10 pointer-events-none">
              <Cpu size={120} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest border border-white/10">
                  المرحلة القادمة
                </span>
                <span className="flex items-center text-blue-200 text-xs font-bold">
                  <Activity size={14} className="mr-1 rtl:ml-1" /> قيد التطوير
                </span>
              </div>
              
              <h3 className="text-xl font-black mb-2 text-white">الاتصال اللحظي بالـ PLC</h3>
              <p className="text-sm font-medium text-blue-100/90 leading-relaxed mb-5">
                نعمل حالياً على دمج تقنية <span className="font-mono bg-blue-800/50 px-1 py-0.5 rounded text-xs border border-blue-400/30">WebSockets</span>. قريباً ستتمكن من رؤية هذا المجسم يتحرك بشكل متزامن تماماً مع الحركات الميكانيكية للآلة الحقيقية.
              </p>

              <div className="w-full bg-blue-950/50 rounded-xl h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-400 to-emerald-400 w-2/3 h-full rounded-full"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default DigitalTwinPage;