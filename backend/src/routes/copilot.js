import express from 'express';
import Groq from 'groq-sdk';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ============================================================================
// 2. STRICT ENGINEERING RULESET (CORE AI LOGIC)
// ============================================================================
const STRICT_RULE = `
أنت "AutoSpexy" — المساعد الهندسي الذكي والرسمي لمنصة AutoSpex.

🔴 قواعد إلزامية صارمة لا يمكن تجاوزها:

1) اللغة والترجمة:
- تحدث بالعربية الفصحى الهندسية الواضحة فقط.
- استخدم الإنجليزية للمصطلحات التقنية فقط (مثل: PLC, Sensor, Actuator).
- يمنع منعاً باتاً خلط اللغات في نفس الجملة (مثل استخدام لغات روسية أو صينية).
- اترك مسافة واضحة بين الكلمة العربية والمصطلح الإنجليزي.

2) التنسيق والبنية (UI Formats):
- استخدم علامة ### قبل العناوين الرئيسية.
- استخدم علامة - قبل أي عنصر في قائمة أو خطوات.
- استخدم علامة ** للكلمات المهمة والبارزة.
- يمنع استخدام كلمات مثل [نقطة] أو [عنوان]. استخدم التنسيق القياسي فقط.

3) كود الـ PLC و Ladder Logic (أهم قاعدة):
- إذا قمت بكتابة كود Ladder Logic، يجب وضعه حصراً بين علامتي [LADDER] و [/LADDER].
مثال صحيح:
[LADDER]
I0.0 ---> ( Q0.0 )
[/LADDER]

4) الروابط والمصادر:
- لا ترسل أي رابط إلا إذا كان يعمل ومحدثاً لعام 2026.
- اعتمد فقط على (Siemens Official Support / GitHub / YouTube).

5) الأسلوب والذكاء:
- إجابة عملية مباشرة في خطوات تنفيذ (Step-by-step).
`;

const SYSTEM_PROMPTS = {
  autospex: `أنت AutoSpexy، خبير Siemens S7-1200 و PLC. ${STRICT_RULE}`,
  global: `أنت AutoSpexy خبير Industry 4.0 و IIoT. ${STRICT_RULE}`,
  troubleshoot: `أنت مهندس صيانة PLC. قدم Checklist احترافي. ${STRICT_RULE}`
};

/* 🔴 Link Validator */
async function isValidLink(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', timeout: 3000 });
    return res.ok;
  } catch {
    return false;
  }
}

async function tryGroq(messages, activePrompt, modelName) {
  return await groq.chat.completions.create({
    messages: [
      { role: "system", content: activePrompt },
      ...messages.map(m => ({ role: m.role, content: m.content }))
    ],
    model: modelName,
    stream: true,
    temperature: 0.2, // تقليل درجة الحرارة لمنع الهلوسة
  });
}

async function tryHuggingFace(userMessage, activePrompt) {
  const prompt = `${activePrompt}\n\nسؤال المستخدم: ${userMessage}`;
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-7B-Instruct",
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 500, temperature: 0.2 }
      })
    }
  );

  if (!response.ok) throw new Error("HF Error");

  const result = await response.json();
  return result[0]?.generated_text.replace(prompt, "").trim();
}

router.post('/', async (req, res) => {
  const { messages, mode, modelChoice } = req.body;
  const userMessage = messages[messages.length - 1].content;
  const activePrompt = SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.autospex;

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');

  try {
    let stream;

    if (modelChoice === 'llama33') {
      stream = await tryGroq(messages, activePrompt, "llama-3.3-70b-versatile");
    } else if (modelChoice === 'llama31') {
      stream = await tryGroq(messages, activePrompt, "llama-3.1-8b-instant");
    }

    if (stream) {
      for await (const chunk of stream) {
        let text = chunk.choices[0]?.delta?.content || "";
        // تم إزالة الـ replace العشوائي لكي يقوم الفرونت إند بمعالجة [عنوان] و [LADDER] بشكل سليم
        res.write(`data: ${JSON.stringify({ type: 'text', text })}\n\n`);
      }
    } else if (modelChoice === 'qwen') {
      let hfText = await tryHuggingFace(userMessage, activePrompt);
      res.write(`data: ${JSON.stringify({ type: 'text', text: hfText })}\n\n`);
    }

  } catch (error) {
    res.write(`data: ${JSON.stringify({
      type: 'error',
      message: '⚠️ AutoSpexy غير متاح حالياً. جرّب موديل آخر.'
    })}\n\n`);
  }

  res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
  res.end();
});

export default router;