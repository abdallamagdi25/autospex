import { Users, Linkedin, UserCircle2 } from 'lucide-react';

const TEAM_MEMBERS = [
  { name: 'Abdalla Magdy', role: 'CEO & Lead Web Developer', desc: 'Team Leader & Systems Architect' },
  { name: 'Shahed El-Sayed', role: 'COO & Project Coordinator', desc: 'Marketing Head & Operations' },
  { name: 'Ali Hossam', role: 'CTo & Lead Program Developer', desc: 'CAD Design & Core Logic' },
  { name: 'Ahmed Ali', role: 'PLC & Automation Engineer', desc: 'Industrial Control Systems' },
  { name: 'Abdalla Sobhy', role: 'PLC & Automation Engineer', desc: 'Industrial Control Systems' },
  { name: 'Islam Bakheet', role: 'Electro-Pneumatics Engineer', desc: 'PLC & Automation' },
  { name: 'Yousef Emad', role: 'Electro-Pneumatics Engineer', desc: 'Pneumatic Actuation Systems' },
  { name: 'El-Modather Glal', role: 'PLC & Automation Engineer', desc: 'Control Logic Integration' },
  { name: 'Fahd Hamdy', role: 'Mechanical Design Engineer', desc: 'Structure & Conveyor Assembly' },
  { name: 'Mohamed Adel', role: 'Circuit Design & Power Systems', desc: 'Electrical Infrastructure' },
  { name: 'Mohamed Refai', role: 'Tech Researcher', desc: 'R&D and Technical Analysis' },
  { name: 'Hatem Shappan', role: 'Tech Researcher', desc: 'R&D and Technical Analysis' },
];

const TeamPage = () => (
  <main className="pt-24 md:pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen relative z-10">

    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <div className="inline-flex items-center justify-center p-3 bg-blue-50 border border-blue-100 rounded-2xl mb-6 shadow-sm">
        <Users size={32} className="text-autospex-primary" />
      </div>
      <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">المهندسون خلف <span className="font-tech text-autospex-primary">AutoSpex</span></h2>
      <p className="text-lg text-slate-600 font-medium leading-relaxed">
        تعرف على الفريق المكون من 12 مهندساً من جامعة بني سويف التكنولوجية، الذين قاموا بتصميم وبناء هذا المشروع بالكامل من الصفر.
      </p>
    </div>

    {/* Team Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {TEAM_MEMBERS.map((m, i) => (
        <div
          key={i}
          className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
        >
          <div className="flex flex-col items-center text-center flex-grow">
            {/* Avatar */}
            <div className="relative mb-5">
              <div className="absolute inset-0 bg-autospex-primary blur-xl opacity-0 group-hover:opacity-20 rounded-full transition-opacity"></div>
              <div className="w-24 h-24 rounded-full border border-slate-200 group-hover:border-autospex-light overflow-hidden relative z-10 bg-slate-50 flex items-center justify-center transition-colors shadow-sm">
                <UserCircle2 size={40} className="text-slate-300" />
              </div>
            </div>

            {/* Info */}
            <h3 className="text-lg font-bold text-slate-900 font-tech mb-1 leading-tight">{m.name}</h3>
            <p className="text-autospex-primary text-xs font-bold mb-3 uppercase tracking-wider font-tech">{m.role}</p>
            <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6">{m.desc}</p>

            {/* Socials */}
            <div className="flex space-x-3 rtl:space-x-reverse mt-auto pt-4 border-t border-slate-100 w-full justify-center">
              <Linkedin size={18} className="text-slate-400 hover:text-blue-600 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </main>
);

export default TeamPage;