import Groq from 'groq-sdk';
import { supabaseAdmin } from '../../lib/supabase.js';
import { cors, authenticate } from '../../lib/helpers.js';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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
- snap7 library for S7 Ethernet communication
- db_read() / db_write(), struct.unpack_from for byte parsing
- websockets asyncio server, 100ms polling loop

### 3. AutoSpex Troubleshooting
- Conveyor not moving: check %Q0.0, KM1 coil 24VDC, motor wiring
- Cylinder not extending: check %Q0.1, solenoid 24VDC, air pressure ≥4 bar
- Sensor not detecting: adjust range (5-30cm), verify 24VDC supply
- Snap7 refused: enable PUT/GET in PLC properties, check IP 192.168.0.1

## RESPONSE RULES
1. Reference real kit addresses (%Q0.0, DB1.DBW0) when relevant.
2. Use proper code blocks with language tags.
3. Arabic input → full Arabic response with correct technical terms.
`;

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  const user = await authenticate(req, res);
  if (!user) return;

  const { messages } = req.body;
  if (!messages?.length) return res.status(400).json({ error: 'Messages required.' });

  // SSE headers for streaming
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  try {
    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.role, content: m.content })),
      ],
      max_tokens: 1024,
      temperature: 0.4,
      stream: true,
    });

    let totalTokens = 0;

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || '';
      if (text) {
        res.write(`data: ${JSON.stringify({ type: 'text', text })}\n\n`);
      }
      if (chunk.x_groq?.usage) {
        totalTokens = chunk.x_groq.usage.total_tokens || 0;
      }
    }

    // Log to Supabase
    await supabaseAdmin.from('copilot_logs').insert({
      user_id:       user.id,
      total_tokens:  totalTokens,
      message_count: messages.length,
    });

    res.write(`data: ${JSON.stringify({ type: 'done', tokens: totalTokens })}\n\n`);
    res.end();

  } catch (err) {
    console.error('[copilot]', err);
    res.write(`data: ${JSON.stringify({ type: 'error', message: 'AI service unavailable.' })}\n\n`);
    res.end();
  }
}
