import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import fetch from 'node-fetch'; // تأكد من تثبيته npm install node-fetch
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// ── إعداد المحركات ──
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const groq  = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `
أنت المساعد الهندسي الذكي الخاص بمنصة "AutoSpex". 
خبير في الأتمتة الصناعية، برمجة Siemens S7-1200، و TIA Portal. 
أجب باختصار هندسي دقيق، واستخدم لغة المستخدم (عربي/إنجليزي).
إذا سُئلت عن شيء غير هندسي، اعتذر بلباقة وأخبر المستخدم أنك متخصص في AutoSpex فقط.
`;

// ── 1. محرك Google Gemini (الأساسي) ──
async function tryGemini(messages) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash", 
    systemInstruction: SYSTEM_PROMPT 
  });

  // تنظيف التاريخ لضمان البدء بـ user
  let history = [];
  let foundFirstUser = false;
  for (const m of messages.slice(0, -1)) {
    if (m.role === 'user') foundFirstUser = true;
    if (foundFirstUser) {
      history.push({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      });
    }
  }

  const chat = model.startChat({ history });
  const result = await chat.sendMessageStream(messages[messages.length - 1].content);
  return result.stream;
}

// ── 2. محرك Groq Llama 3.3 (البديل الأول) ──
async function tryGroq(messages) {
  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map(m => ({ role: m.role, content: m.content }))
    ],
    model: "llama-3.3-70b-versatile",
    stream: true,
  });
  return completion;
}

// ── 3. محرك Hugging Face Qwen (البديل الأخير) ──
async function tryHuggingFace(userMessage) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct",
    {
      headers: { 
        Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ inputs: userMessage }),
    }
  );
  const result = await response.json();
  // ملاحظة: Hugging Face API العادي لا يدعم الـ Streaming بسهولة كالآخرين، سنرسله كقطعة واحدة
  return result[0]?.generated_text || "عذراً، جميع المحركات مشغولة حالياً.";
}

// ── المسار الرئيسي ──
router.post('/', async (req, res) => {
  const { messages } = req.body;
  const userMessage = messages[messages.length - 1].content;

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    console.log("🚀 Attempting Gemini...");
    const stream = await tryGemini(messages);
    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify({ type: 'text', text: chunk.text() })}\n\n`);
    }
  } catch (geminiError) {
    console.error("⚠️ Gemini Limit Reached, switching to Groq...");
    
    try {
      const groqStream = await tryGroq(messages);
      for await (const chunk of groqStream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) res.write(`data: ${JSON.stringify({ type: 'text', text: content })}\n\n`);
      }
    } catch (groqError) {
      console.error("❌ Groq Failed, using Hugging Face Static Backup...");
      
      try {
        const hfText = await tryHuggingFace(userMessage);
        res.write(`data: ${JSON.stringify({ type: 'text', text: hfText })}\n\n`);
      } catch (hfError) {
        res.write(`data: ${JSON.stringify({ type: 'error', message: 'All systems are down. Please check your API keys.' })}\n\n`);
      }
    }
  }

  res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
  res.end();
});

export default router;