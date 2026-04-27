import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import copilotRoutes from './routes/copilot.js';
// استيراد باقي الـ Routes الخاصة بك هنا (مثل auth, admin, courses)

dotenv.config();

const app = express();

// ── إعدادات الـ CORS (حاسمة لربط اللابتوب بـ Vercel) ──
app.use(cors({
  origin: [
    "https://autospex.online",            // الدومين الأساسي
    "https://autospex-ivory.vercel.app",  // رابط Vercel
    "http://localhost:5173"               // للتجربة المحلية
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

// ── الـ Routes ──
app.use('/api/copilot', copilotRoutes);
// app.use('/api/auth', authRoutes); // فعلها حسب ملفاتك

// ── Root Route للاختبار ──
app.get('/', (req, res) => {
  res.json({ 
    message: "AutoSpex Backend is LIVE on Abdalla's Laptop 🚀",
    status: "Healthy",
    ai_status: "Gemini & Groq Fallback Active"
  });
});

// ── تشغيل السيرفر ──
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ╔═══════════════════════════════════════════════════╗
  ║  🚀 AutoSpex Backend v2.0 - RUNNING LOCALLY       ║
  ╠═══════════════════════════════════════════════════╣
  ║  Port: ${PORT}                                       ║
  ║  Env:  ${process.env.NODE_ENV || 'development'}                ║
  ║  AI:   Gemini Hybrid System - Active              ║
  ╚═══════════════════════════════════════════════════╝
  `);
});