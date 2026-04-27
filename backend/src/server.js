import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import copilotRoutes from './routes/copilot.js';

dotenv.config();

const app = express();

// ── 1. إعدادات الـ CORS القاطعة (تسمح بكل شيء لضمان العمل) ──
app.use(cors({
  origin: '*', // السماح لجميع النطاقات (Vercel، الموبايل، أي مكان)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// ── 2. معالج الـ Pre-flight (ضروري جداً لرسائل OPTIONS) ──
app.options('*', cors());

// ── 3. الـ Middleware اليدوي (The Hammer) - لضمان وجود الهيدرز في كل رد ──
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  
  // لو الطلب نوعه OPTIONS (الطلب التمهيدي)، رد فوراً بـ 200
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// ── 4. الـ Routes ──
app.use('/api/copilot', copilotRoutes);

// ── 5. Root Route للاختبار ──
app.get('/', (req, res) => {
  res.json({ 
    message: "AutoSpex Backend is LIVE on Abdalla's Laptop 🚀",
    status: "Healthy",
    ai_status: "Gemini & Groq Fallback Active"
  });
});

// ── 6. تشغيل السيرفر ──
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ╔═══════════════════════════════════════════════════╗
  ║   🚀 AutoSpex Backend v2.1 - ULTIMATE FIX         ║
  ╠═══════════════════════════════════════════════════╣
  ║   Port: ${PORT}                                     ║
  ║   Env:  ${process.env.NODE_ENV || 'development'}           ║
  ║   CORS: Open (*) - Presentation Ready             ║
  ╚═══════════════════════════════════════════════════╝
  `);
});



// سطر لمراقبة أي طلب يدخل السيرفر
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] 📥 Incoming ${req.method} request to: ${req.url}`);
  next();
});