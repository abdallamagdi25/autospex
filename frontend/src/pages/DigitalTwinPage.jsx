import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box as Box3D, Cylinder as Cylinder3D, Sphere } from '@react-three/drei';
import { Rotate3d, Radio } from 'lucide-react';

// ── 3D Bottling Line Model ──────────────────────────────────
const Machine3DModel = ({ systemState }) => {
  const motorRef = useRef();
  const cylinderRef = useRef();
  const bottleRef = useRef();

  useFrame((state, delta) => {
    if (systemState.motorRunning && motorRef.current)
      motorRef.current.rotation.x += delta * 5;

    if (cylinderRef.current) {
      const tZ = systemState.cylinderExtended ? 1.2 : 0;
      cylinderRef.current.position.z += (tZ - cylinderRef.current.position.z) * 0.1;
    }

    if (systemState.motorRunning && bottleRef.current) {
      bottleRef.current.position.x += delta * 2;
      if (bottleRef.current.position.x > 3) bottleRef.current.position.x = -3;
    }
  });

  return (
    <group position={[0, -1, 0]}>
      {/* Conveyor Base */}
      <Box3D args={[8, 0.5, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#cbd5e1" /> {/* Lighter industrial gray */}
      </Box3D>
      {/* DC Motor */}
      <Cylinder3D ref={motorRef} args={[0.6, 0.6, 1.5]} position={[-4, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color={systemState.motorRunning ? "#0066FF" : "#94a3b8"} />
      </Cylinder3D>
      {/* Sensor Mount */}
      <Box3D args={[0.5, 2, 0.5]} position={[-1, 1.25, -1]}>
        <meshStandardMaterial color="#64748b" />
      </Box3D>
      {/* Photoelectric Sensor LED */}
      <Sphere args={[0.1, 16, 16]} position={[-1, 2, -0.7]}>
        <meshStandardMaterial
          color={systemState.sensorActive ? "#10b981" : "#ef4444"}
          emissive={systemState.sensorActive ? "#10b981" : "#ef4444"}
          emissiveIntensity={1.5}
        />
      </Sphere>
      {/* Filling Station */}
      <Box3D args={[1, 1, 1.5]} position={[2, 0.75, -1]}>
        <meshStandardMaterial color="#475569" />
      </Box3D>
      {/* Pneumatic Cylinder */}
      <Cylinder3D ref={cylinderRef} args={[0.2, 0.2, 2]} position={[2, 0.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#f1f5f9" metalness={0.9} roughness={0.1} />
      </Cylinder3D>
      {/* Bottle */}
      <Cylinder3D ref={bottleRef} args={[0.3, 0.3, 1]} position={[-3, 0.75, 0]}>
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.4} />
      </Cylinder3D>
    </group>
  );
};

// ── Page ───────────────────────────────────────────────────
const DigitalTwinPage = ({ t }) => {
  const [sys, setSys] = useState({ motorRunning: true, cylinderExtended: false, sensorActive: true });
  const [logs, setLogs] = useState(["[SYSTEM] WebSockets Connected via Snap7", "[PLC] DB1 Synced with S7-1200"]);

  const toggleMotor = () => {
    setSys(p => ({ ...p, motorRunning: !p.motorRunning }));
    setLogs(l => [...l.slice(-4), `[${new Date().toLocaleTimeString()}] Motor ${!sys.motorRunning ? 'ON' : 'OFF'}`]);
  };

  const toggleCylinder = () => {
    setSys(p => ({ ...p, cylinderExtended: !p.cylinderExtended }));
    setLogs(l => [...l.slice(-4), `[${new Date().toLocaleTimeString()}] Cylinder ${!sys.cylinderExtended ? 'EXTENDED' : 'RETRACTED'}`]);
  };

  return (
    <main className="pt-24 md:pt-32 pb-20 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen flex flex-col relative z-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
            <div className="p-2 bg-blue-50 text-autospex-primary rounded-lg border border-blue-100">
              <Rotate3d size={28} />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">التوأم الرقمي</h2>
          </div>
          <p className="text-slate-600 font-medium max-w-2xl">
            مراقبة وتحكم بالزمن الفعلي لخط الإنتاج عبر <span className="tech-term text-autospex-primary text-sm">WebSockets</span>.
          </p>
        </div>
        
        {/* Live Status Badge */}
        <div className="mt-4 md:mt-0 flex items-center bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full shadow-sm">
          <span className="relative flex h-3 w-3 mr-3 rtl:ml-3 rtl:mr-0">
            <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-700 font-bold text-sm font-tech tracking-wide">LIVE SYNC</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-6 flex-grow">

        {/* 3D Canvas */}
        <div className="lg:col-span-8 bg-slate-100 border border-slate-200 shadow-inner rounded-3xl overflow-hidden relative min-h-[500px]">
          <Canvas camera={{ position: [5, 5, 8], fov: 50 }}>
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <spotLight position={[-10, 10, -10]} angle={0.3} intensity={1} castShadow />
            <Machine3DModel systemState={sys} />
            <OrbitControls makeDefault enablePan={false} maxPolarAngle={Math.PI / 2.1} />
          </Canvas>
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-xs font-bold text-slate-600">
            Three.js Render Engine
          </div>
        </div>

        {/* Controls Sidebar */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          <div className="bg-white border border-slate-200 shadow-sm rounded-3xl flex-grow flex flex-col p-6">
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center mb-6">
              <Radio size={20} className="mr-2 rtl:ml-2 text-autospex-primary" />
              لوحة التحكم
            </h3>
            
            <div className="space-y-4">
              {/* Motor Control */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-800 font-bold">محرك السير <span className="tech-term text-xs text-slate-500">(DC Motor)</span></span>
                  <span className={`text-xs px-2 py-1 rounded font-tech font-bold ${sys.motorRunning ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                    {sys.motorRunning ? 'RUNNING' : 'STOPPED'}
                  </span>
                </div>
                <button
                  onClick={toggleMotor}
                  className={`w-full py-2.5 rounded-lg font-bold flex items-center justify-center transition-all ${sys.motorRunning ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
                >
                  {sys.motorRunning ? 'إيقاف المحرك' : 'تشغيل المحرك'}
                </button>
              </div>

              {/* Cylinder Control */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-800 font-bold">المكبس الهوائي <span className="tech-term text-xs text-slate-500">(Cylinder)</span></span>
                  <span className={`text-xs px-2 py-1 rounded font-tech font-bold ${sys.cylinderExtended ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'}`}>
                    {sys.cylinderExtended ? 'EXTENDED' : 'RETRACTED'}
                  </span>
                </div>
                <button
                  onClick={toggleCylinder}
                  className={`w-full py-2.5 rounded-lg font-bold border transition-all ${sys.cylinderExtended ? 'border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'}`}
                >
                  {sys.cylinderExtended ? 'سحب المكبس' : 'دفع المكبس'}
                </button>
              </div>
            </div>
          </div>

          {/* Live Terminal Log */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl h-48 flex flex-col p-0 overflow-hidden shadow-lg">
            <div className="bg-slate-950 py-2.5 px-4 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <div className="w-2 h-2 rounded-full bg-autospex-primary mr-2 rtl:ml-2 rtl:mr-0 animate-pulse"></div>
              سجل النظام اللحظي (Terminal)
            </div>
            <div className="flex-1 p-4 font-tech text-xs overflow-y-auto space-y-2">
              {logs.map((l, i) => (
                <div key={i} className={l.includes('SYSTEM') ? 'text-emerald-400' : 'text-autospex-light'}>
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DigitalTwinPage;