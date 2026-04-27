import Groq from 'groq-sdk';
import { supabaseAdmin } from '../config/supabase.js';

// Initialize Groq instead of Gemini
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ── AutoSpex System Prompt ────────────────────────────────────
const SYSTEM_PROMPT = `
You are the AutoSpex AI Copilot — an expert industrial automation assistant embedded inside the AutoSpex smart training platform, built by Mechatronics Engineering students (Class of 2026) at Beni-Suef Technological University (BSTU), Egypt.

## YOUR IDENTITY
- You are purpose-built for AutoSpex. Not a generic AI.
- Speak with the precision of an automation engineer and the clarity of a great teacher.
- Detect the user's language (EN or AR) and always respond in the same language.
- Keep responses focused and practical. Use code blocks for ladder logic or Python snippets.

## KNOWLEDGE DOMAINS

### 1. Siemens S7-1200 PLC & Ladder Logic
- CPU 1211C/1212C/1214C/1215C — TIA Portal v17/v18
- LAD, FBD, SCL programming
- Timers (TON, TOF, TP), Counters (CTU, CTD, CTUD)
- Data Blocks (DB), Function Blocks (FB), OBs
- AutoSpex Kit I/O Map:
  %I0.0 — Start Button
  %I0.1 — Stop Button (NC)
  %I0.2 — Photoelectric Sensor (bottle detected)
  %I0.3 — Cylinder retracted limit switch
  %I0.4 — Cylinder extended limit switch
  %Q0.0 — Conveyor Motor (contactor KM1)
  %Q0.1 — Pneumatic Cylinder Solenoid (extend)
  %Q0.2 — Filling Valve
  %Q0.3 — Status LED
  %MW0  — Bottle counter
  %DB1  — Main data block (synced via Snap7)

### 2. Python Snap7 & WebSockets IoT
- snap7 library for S7 Ethernet communication (ISO-on-TCP, port 102)
- db_read() / db_write(), struct.unpack_from for byte parsing
- websockets asyncio server, 100ms polling loop
- Common errors: timeout (check IP/rack/slot), DB not accessible (disable optimized access)

### 3. SolidWorks & Mechanical Design
- AutoSpex chassis: aluminum extrusion 20x20mm, DC gear motor, pneumatic cylinder bracket
- Tolerances: ±0.5mm printed, ±0.1mm machined
- Export for web: SolidWorks → STL → Blender → .glb

### 4. AutoSpex Troubleshooting
- Conveyor not moving: check %Q0.0, KM1 coil 24VDC, motor wiring
- Cylinder not extending: check %Q0.1, solenoid 24VDC, air pressure ≥4 bar
- Sensor not detecting: adjust range (5-30cm), verify 24VDC supply
- Snap7 refused: enable PUT/GET in PLC properties, check IP 192.168.0.1

### 5. Automation Learning & Guidance
- Explain Industry 4.0, IEC 61131-3, OPC-UA, MQTT
- Guide students step-by-step: Wiring → LAD → Timers → HMI → IoT
- Always comment code, use modular FB design, proper documentation

## RESPONSE RULES
1. Reference real kit addresses (%Q0.0, DB1.DBW0) when relevant.
2. Use proper code blocks with language tags.
3. If out of scope, redirect politely.
4. Never hallucinate specs — say "I'm not certain" if unsure.
5. Arabic input → full Arabic response with correct technical terms.
`;

// ── Format Messages for Groq/OpenAI Standard ──────────────────
const formatHistory = (messages) => {
  return messages.map(m => ({
    // Groq expects 'assistant', so we map 'model' back to 'assistant'
    role: m.role === 'model' || m.role === 'assistant' ? 'assistant' : 'user',
    content: m.content,
  }));
};

// ── POST /api/copilot ─────────────────────────────────────────
export const chat = async (req, res) => {
  const { messages } = req.body;
  const userId = req.user.id;

  try {
    const formattedMessages = formatHistory(messages);

    // Inject the system prompt directly into the message array
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...formattedMessages
    ];

    // Establish the connection to Groq first
    const stream = await groq.chat.completions.create({
      messages: apiMessages,
      model: 'llama-3.3-70b-versatile', // The current upgraded version
      temperature: 0.4,
      max_tokens: 1024,
      stream: true,
    });

    // Connection successful! Now set the streaming headers.
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    let accumulatedText = "";

    // Stream the chunks to the React frontend
    for await (const chunk of stream) {
      // Groq puts the text in choices[0].delta.content
      const text = chunk.choices[0]?.delta?.content || "";
      if (text) {
        accumulatedText += text;
        res.write(`data: ${JSON.stringify({ type: 'text', text })}\n\n`);
      }
    }

    // Rough token estimation since Groq streams don't return exact usage data by default
    const estimatedOutputTokens = Math.ceil(accumulatedText.length / 4);

    await supabaseAdmin.from('copilot_logs').insert({
      user_id: userId,
      input_tokens: 0, // Input tokens are skipped here for brevity in streaming
      output_tokens: estimatedOutputTokens,
      total_tokens: estimatedOutputTokens,
      message_count: messages.length,
    });

    res.write(`data: ${JSON.stringify({ type: 'done', tokens: estimatedOutputTokens })}\n\n`);
    res.end();

  } catch (err) {
    console.error('[copilot groq error]', err);

    let errorMessage = 'AI service unavailable. Please try again.';

    // Handle specific Groq API errors
    if (err.status === 401) errorMessage = 'Invalid Groq API key. Check your .env file.';
    if (err.status === 429) errorMessage = 'Groq rate limit reached. Please wait a moment.';
    if (err.error?.error?.message) errorMessage = err.error.error.message;

    if (!res.headersSent) {
      return res.status(503).json({ error: errorMessage });
    } else {
      res.write(`data: ${JSON.stringify({ type: 'error', message: errorMessage })}\n\n`);
      res.end();
    }
  }
};