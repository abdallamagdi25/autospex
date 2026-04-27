import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Github, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // السر هنا في السطر التالي: pb-32 للموبايل (لتجنب الشريط السفلي)، و md:pb-8 للكمبيوتر
    <footer className="bg-white border-t border-slate-200 pt-16 pb-32 md:pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6 text-center md:text-right rtl:md:text-right">
            <Link to="/" className="flex items-center justify-center md:justify-start space-x-3 rtl:space-x-reverse">
              <img src="/autospex-logo.png" alt="AutoSpex Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
              <span className="text-2xl font-extrabold text-autospex-primary font-tech tracking-wide">AutoSpex</span>
            </Link>
            <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              منصة تعليمية متكاملة تسد الفجوة بين النظرية الأكاديمية والتطبيق الصناعي من خلال التوائم الرقمية والذكاء الاصطناعي. صُممت بأيدي مهندسين لخدمة المهندسين.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-4 rtl:space-x-reverse">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-autospex-primary hover:text-white transition-all shadow-sm">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-autospex-primary hover:text-white transition-all shadow-sm">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-autospex-primary hover:text-white transition-all shadow-sm">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 text-center sm:text-right rtl:sm:text-right">
            
            {/* Column 1 */}
            <div className="space-y-5">
              <h4 className="text-slate-900 font-extrabold text-base">المنصة</h4>
              <ul className="space-y-3">
                <li><Link to="/digital-twin" className="text-slate-500 hover:text-autospex-primary font-bold text-sm transition-colors">التوأم الرقمي</Link></li>
                <li><Link to="/courses" className="text-slate-500 hover:text-autospex-primary font-bold text-sm transition-colors">الدورات التدريبية</Link></li>
                <li><Link to="/hub" className="text-slate-500 hover:text-autospex-primary font-bold text-sm transition-colors">بوابة الطالب</Link></li>
                <li><Link to="/register" className="text-slate-500 hover:text-autospex-primary font-bold text-sm transition-colors">إنشاء حساب مجاني</Link></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-5">
              <h4 className="text-slate-900 font-extrabold text-base">مشروعنا</h4>
              <ul className="space-y-3">
                <li><Link to="/journey" className="text-slate-500 hover:text-autospex-primary font-bold text-sm transition-colors">قصة النجاح</Link></li>
                <li><Link to="/team" className="text-slate-500 hover:text-autospex-primary font-bold text-sm transition-colors">فريق المهندسين</Link></li>
                <li><a href="#" className="text-slate-500 hover:text-autospex-primary font-bold text-sm transition-colors">الملف التعريفي (Pitch Deck)</a></li>
                <li><a href="#" className="text-slate-500 hover:text-autospex-primary font-bold text-sm transition-colors">المعرض والمعسكرات</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="col-span-2 sm:col-span-1 space-y-5">
              <h4 className="text-slate-900 font-extrabold text-base">تواصل معنا</h4>
              <ul className="space-y-4">
                <li className="flex items-start justify-center sm:justify-start space-x-3 rtl:space-x-reverse">
                  <MapPin size={18} className="text-autospex-primary shrink-0 mt-0.5" />
                  <span className="text-slate-500 font-bold text-sm leading-relaxed">جامعة بني سويف التكنولوجية (BSTU)، مصر</span>
                </li>
                <li className="flex items-center justify-center sm:justify-start space-x-3 rtl:space-x-reverse">
                  <Mail size={18} className="text-autospex-primary shrink-0" />
                  <span className="text-slate-500 font-bold text-sm font-tech">contact@autospex.tech</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm font-bold text-center md:text-left">
            © {currentYear} <span className="font-tech text-slate-500">AutoSpex</span>. مشروع تخرج دفعة 2026. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse text-sm font-bold text-slate-400">
            <a href="#" className="hover:text-autospex-primary transition-colors">سياسة الخصوصية</a>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <a href="#" className="hover:text-autospex-primary transition-colors">شروط الاستخدام</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;