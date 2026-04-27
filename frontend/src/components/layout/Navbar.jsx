import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Menu, X, LayoutDashboard, BookOpen, Cpu, 
  LogOut, User, Bell, Search, ChevronDown, 
  Settings, MessageSquare, Box, Infinity, Award
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformDropdown, setPlatformDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // 1. تأثير الزجاج عند النزول + إغلاق القوائم المنسدلة عند النقر بالخارج
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPlatformDropdown(false);
        setProfileDropdown(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 2. الحل الجذري لتعارض الـ Bottom Navbar مع الـ Footer
  // يقوم بإضافة مساحة فارغة أسفل الموقع برمجياً للموبايل فقط
  useEffect(() => {
    if (user && window.innerWidth < 768) {
      document.body.style.paddingBottom = '5rem'; // 80px space for bottom nav
    } else {
      document.body.style.paddingBottom = '0px';
    }
    return () => { document.body.style.paddingBottom = '0px'; };
  }, [user, location.pathname]);

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
    setProfileDropdown(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;
  const linkBaseClass = "font-bold text-sm transition-colors duration-200 flex items-center";

  return (
    <>
      {/* ═════════ TOP NAVBAR ═════════ */}
      <nav ref={dropdownRef} className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* ── Logo (دائماً يوجه للرئيسية) ── */}
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse group shrink-0">
              <img src="/autospex-logo.png" alt="AutoSpex" className="w-10 h-10 object-contain transition-transform group-hover:scale-105" />
              <span className="text-2xl font-extrabold text-autospex-primary font-tech tracking-wide hidden sm:block">AutoSpex</span>
            </Link>

            {/* ── Desktop Links (Rich Context) ── */}
            <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              {user ? (
                // 🔹 LOGGED IN MENU 🔹
                <>
                  <Link to="/hub" className={`${linkBaseClass} ${isActive('/hub') ? 'text-autospex-primary' : 'text-slate-600 hover:text-autospex-primary'}`}>لوحة التحكم</Link>
                  <Link to="/courses" className={`${linkBaseClass} ${isActive('/courses') ? 'text-autospex-primary' : 'text-slate-600 hover:text-autospex-primary'}`}>الأكاديمية</Link>
                  <Link to="/projects" className={`${linkBaseClass} ${isActive('/projects') ? 'text-autospex-primary' : 'text-slate-600 hover:text-autospex-primary'}`}>مشاريعي</Link>
                  <Link to="/community" className={`${linkBaseClass} ${isActive('/community') ? 'text-autospex-primary' : 'text-slate-600 hover:text-autospex-primary'}`}>المجتمع</Link>
                </>
              ) : (
                // 🔹 GUEST MENU (With Rich Dropdown) 🔹
                <>
                  <Link to="/" className={`${linkBaseClass} ${isActive('/') ? 'text-autospex-primary' : 'text-slate-600 hover:text-autospex-primary'}`}>الرئيسية</Link>
                  
                  {/* Rich Dropdown Trigger */}
                  <div className="relative">
                    <button 
                      onClick={() => setPlatformDropdown(!platformDropdown)}
                      className={`${linkBaseClass} text-slate-600 hover:text-autospex-primary focus:outline-none`}
                    >
                      المنصة <ChevronDown size={14} className={`ml-1 rtl:mr-1 rtl:ml-0 transition-transform ${platformDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Rich Dropdown Panel */}
                    {platformDropdown && (
                      <div className="absolute top-full right-1/2 translate-x-1/2 rtl:translate-x-0 rtl:left-0 rtl:right-auto mt-6 w-screen max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 grid grid-cols-2 gap-6 animate-fade-in-up before:content-[''] before:absolute before:-top-3 before:left-8 before:border-8 before:border-transparent before:border-b-white">
                        <Link to="/digital-twin" className="group" onClick={() => setPlatformDropdown(false)}>
                          <div className="w-10 h-10 bg-blue-50 text-autospex-primary rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><Cpu size={20}/></div>
                          <h4 className="font-extrabold text-slate-900 text-sm mb-1 group-hover:text-autospex-primary transition-colors">التوأم الرقمي</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">محاكاة 3D لخطوط الإنتاج والمصانع.</p>
                        </Link>
                        <Link to="/hardware" className="group" onClick={() => setPlatformDropdown(false)}>
                          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><Box size={20}/></div>
                          <h4 className="font-extrabold text-slate-900 text-sm mb-1 group-hover:text-autospex-primary transition-colors">الحقائب التدريبية</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">هاردوير متكامل للتدريب المباشر.</p>
                        </Link>
                        <Link to="/ai-copilot" className="group" onClick={() => setPlatformDropdown(false)}>
                          <div className="w-10 h-10 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><Infinity size={20}/></div>
                          <h4 className="font-extrabold text-slate-900 text-sm mb-1 group-hover:text-autospex-primary transition-colors">المساعد الذكي (AI)</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">اكتشاف الأخطاء وبرمجة الـ PLC.</p>
                        </Link>
                        <Link to="/courses" className="group" onClick={() => setPlatformDropdown(false)}>
                          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><Award size={20}/></div>
                          <h4 className="font-extrabold text-slate-900 text-sm mb-1 group-hover:text-autospex-primary transition-colors">الدورات والشهادات</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">مناهج صناعية معتمدة مهنياً.</p>
                        </Link>
                      </div>
                    )}
                  </div>
                  <Link to="/journey" className={`${linkBaseClass} ${isActive('/journey') ? 'text-autospex-primary' : 'text-slate-600 hover:text-autospex-primary'}`}>قصتنا</Link>
                </>
              )}
            </div>

            {/* ── Desktop Utilities & Profile ── */}
            <div className="hidden md:flex items-center space-x-5 rtl:space-x-reverse">
              {user ? (
                <>
                  <button className="text-slate-400 hover:text-autospex-primary transition-colors"><Search size={20}/></button>
                  <button className="text-slate-400 hover:text-autospex-primary transition-colors relative">
                    <Bell size={20}/>
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
                  </button>
                  <div className="w-px h-6 bg-slate-200"></div>
                  
                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button onClick={() => setProfileDropdown(!profileDropdown)} className="flex items-center space-x-2 rtl:space-x-reverse bg-slate-50 border border-slate-200 py-1.5 pl-2 pr-3 rtl:pr-2 rtl:pl-3 rounded-2xl hover:border-autospex-primary transition-colors focus:outline-none">
                      <span className="text-xl bg-white w-8 h-8 flex items-center justify-center rounded-xl shadow-sm border border-slate-100">{user.avatar || '👨‍💻'}</span>
                      <ChevronDown size={14} className="text-slate-400" />
                    </button>

                    {profileDropdown && (
                      <div className="absolute top-full left-0 rtl:right-0 rtl:left-auto mt-4 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 animate-fade-in-up">
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="text-sm font-extrabold text-slate-900 truncate">{user.name || user.full_name}</p>
                          <p className="text-xs font-bold text-slate-500 font-tech truncate">{user.email}</p>
                        </div>
                        <div className="py-2">
                          <Link to="/settings" onClick={() => setProfileDropdown(false)} className="flex items-center px-4 py-2 text-sm font-bold text-slate-600 hover:text-autospex-primary hover:bg-slate-50 transition-colors"><Settings size={16} className="mr-3 rtl:ml-3"/> إعدادات الحساب</Link>
                          <Link to="/certificates" onClick={() => setProfileDropdown(false)} className="flex items-center px-4 py-2 text-sm font-bold text-slate-600 hover:text-autospex-primary hover:bg-slate-50 transition-colors"><Award size={16} className="mr-3 rtl:ml-3"/> شهاداتي</Link>
                        </div>
                        <div className="py-2 border-t border-slate-100">
                          <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors"><LogOut size={16} className="mr-3 rtl:ml-3"/> تسجيل الخروج</button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-slate-600 hover:text-autospex-primary font-extrabold text-sm px-4 py-2 transition-colors">تسجيل الدخول</Link>
                  <Link to="/register" className="bg-autospex-primary hover:bg-blue-700 text-white font-extrabold text-sm px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">حساب جديد</Link>
                </>
              )}
            </div>

            {/* ── Mobile Hamburger & Quick Utilities ── */}
            <div className="md:hidden flex items-center space-x-4 rtl:space-x-reverse">
              {user && (
                <button className="text-slate-400 relative p-2">
                  <Bell size={22}/>
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
                </button>
              )}
              <button className="p-2 text-slate-600 bg-slate-50 rounded-xl border border-slate-200" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ═════════ MOBILE MENU (OVERLAY FOR ALL USERS) ═════════ */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-white/95 backdrop-blur-xl pt-28 px-6 md:hidden overflow-y-auto pb-24">
          <div className="flex flex-col space-y-6">
            {!user && (
              <>
                <Link to="/" onClick={()=>setMobileMenuOpen(false)} className="text-2xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">الرئيسية</Link>
                <div className="space-y-4 border-b border-slate-100 pb-4">
                  <p className="text-sm font-extrabold text-slate-400 uppercase tracking-widest">المنصة</p>
                  <Link to="/digital-twin" onClick={()=>setMobileMenuOpen(false)} className="block text-xl font-bold text-slate-700">التوأم الرقمي</Link>
                  <Link to="/hardware" onClick={()=>setMobileMenuOpen(false)} className="block text-xl font-bold text-slate-700">الحقائب التدريبية</Link>
                  <Link to="/courses" onClick={()=>setMobileMenuOpen(false)} className="block text-xl font-bold text-slate-700">الأكاديمية</Link>
                </div>
                <Link to="/journey" onClick={()=>setMobileMenuOpen(false)} className="text-2xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">قصة المشروع</Link>
                
                <div className="pt-4 flex flex-col space-y-4">
                  <Link to="/login" onClick={()=>setMobileMenuOpen(false)} className="w-full py-4 text-center text-slate-600 font-extrabold border border-slate-200 rounded-2xl bg-white shadow-sm">تسجيل الدخول</Link>
                  <Link to="/register" onClick={()=>setMobileMenuOpen(false)} className="w-full py-4 text-center text-white bg-autospex-primary font-extrabold rounded-2xl shadow-lg">إنشاء حساب مجاني</Link>
                </div>
              </>
            )}
            
            {user && (
              <>
                <div className="flex items-center space-x-4 rtl:space-x-reverse bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4">
                  <span className="text-3xl bg-white w-14 h-14 flex items-center justify-center rounded-2xl shadow-sm">{user.avatar || '👨‍💻'}</span>
                  <div>
                    <p className="font-extrabold text-slate-900">{user.name || user.full_name}</p>
                    <p className="text-xs font-bold text-slate-500">{user.email}</p>
                  </div>
                </div>
                <Link to="/settings" onClick={()=>setMobileMenuOpen(false)} className="flex items-center text-xl font-bold text-slate-700 py-2"><Settings size={22} className="mr-4 rtl:ml-4 text-slate-400"/> الإعدادات</Link>
                <Link to="/certificates" onClick={()=>setMobileMenuOpen(false)} className="flex items-center text-xl font-bold text-slate-700 py-2"><Award size={22} className="mr-4 rtl:ml-4 text-slate-400"/> شهاداتي</Link>
                <div className="border-t border-slate-100 my-4"></div>
                <button onClick={handleLogout} className="flex items-center text-xl font-extrabold text-rose-500 py-2 w-full text-right"><LogOut size={22} className="mr-4 rtl:ml-4 text-rose-400"/> تسجيل الخروج</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ═════════ SMART BOTTOM NAVBAR (MOBILE LOGGED-IN ONLY) ═════════ */}
      {user && (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-20px_40px_rgba(0,0,0,0.05)] z-[100] pb-[env(safe-area-inset-bottom)]">
          <div className="flex justify-between items-end h-16 px-2">
            
            <Link to="/hub" className={`flex flex-col items-center justify-center w-[20%] h-full pb-2 space-y-1 transition-colors ${isActive('/hub') ? 'text-autospex-primary' : 'text-slate-400 hover:text-slate-600'}`}>
              <LayoutDashboard size={24} className={isActive('/hub') ? 'fill-blue-50/50' : ''} />
              <span className="text-[10px] font-extrabold">اللوحة</span>
            </Link>

            <Link to="/courses" className={`flex flex-col items-center justify-center w-[20%] h-full pb-2 space-y-1 transition-colors ${isActive('/courses') ? 'text-autospex-primary' : 'text-slate-400 hover:text-slate-600'}`}>
              <BookOpen size={24} className={isActive('/courses') ? 'fill-blue-50/50' : ''} />
              <span className="text-[10px] font-extrabold">الدورات</span>
            </Link>

            {/* ── Central Floating Action Button (FAB) ── */}
            <Link to="/digital-twin" className="relative -top-6 flex flex-col items-center justify-center w-[20%] group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-autospex-primary to-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/40 border-[6px] border-white/90 backdrop-blur-sm group-hover:scale-105 transition-transform">
                <Cpu size={28} />
              </div>
              <span className="text-[10px] font-extrabold text-autospex-primary mt-1 whitespace-nowrap">التوأم الرقمي</span>
            </Link>

            <Link to="/community" className={`flex flex-col items-center justify-center w-[20%] h-full pb-2 space-y-1 transition-colors ${isActive('/community') ? 'text-autospex-primary' : 'text-slate-400 hover:text-slate-600'}`}>
              <MessageSquare size={24} className={isActive('/community') ? 'fill-blue-50/50' : ''} />
              <span className="text-[10px] font-extrabold">المجتمع</span>
            </Link>

            <button onClick={() => setMobileMenuOpen(true)} className={`flex flex-col items-center justify-center w-[20%] h-full pb-2 space-y-1 transition-colors ${mobileMenuOpen ? 'text-autospex-primary' : 'text-slate-400 hover:text-slate-600'}`}>
              <User size={24} className={mobileMenuOpen ? 'fill-blue-50/50' : ''} />
              <span className="text-[10px] font-extrabold">حسابي</span>
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;