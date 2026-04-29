import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Trash2, Crosshair, Globe, Wrench, Copy, Share2, Check, ChevronDown, Layout, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.png';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// ── نافذة معاينة Ladder Logic ──
const LadderVisualizer = ({ code }) => (
  <div className="my-4 bg-slate-50 border border-blue-200 rounded-xl p-4 shadow-inner" dir="ltr">
    <div className="flex items-center justify-between mb-3 border-b border-blue-100 pb-2">
      <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest flex items-center">
        <Layout size={12} className="mr-1" /> Ladder Logic View
      </span>
    </div>
    <div className="space-y-3 font-mono text-[11px] font-bold text-slate-800">
      {code.split('\n').filter(l => l.trim()).map((line, i) => (
        <div key={i} className="flex items-center group">
          <div className="h-[2px] w-6 bg-blue-300" />
          <div className="px-3 py-1 border-2 border-blue-400 rounded-md bg-white shadow-sm whitespace-pre">{line}</div>
          <div className="h-[2px] flex-1 bg-blue-300 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-blue-400 rounded-full bg-white" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── معالج النصوص والروابط ──
const parseInlineText = (text, isAssistant) => {
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(https?:\/\/[^\s]+\)|https?:\/\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]+)/g);
  return parts.map((part, idx) => {
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} className={`font-black ${isAssistant ? 'text-blue-800' : 'text-blue-100'}`}>{part.slice(2, -2)}</strong>;
    }
    const mdLinkMatch = part.match(/^\[(.*?)\]\((https?:\/\/[^\s]+)\)$/);
    if (mdLinkMatch) {
      return (
        <a key={idx} href={mdLinkMatch[2]} target="_blank" rel="noopener noreferrer" dir="ltr" className="inline-flex items-center text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md text-[11px] hover:bg-blue-100 hover:shadow-sm mx-1 border border-blue-200 transition-all font-tech font-bold">
          <ExternalLink size={10} className="mr-1" /> {mdLinkMatch[1]}
        </a>
      );
    }
    if (part.match(/^https?:\/\//)) {
      const cleanUrl = part.replace(/[.,:;)\]]+$/, '');
      let domain = 'زيارة الرابط';
      try { domain = new URL(cleanUrl).hostname.replace('www.', ''); } catch(e) {}
      return (
        <a key={idx} href={cleanUrl} target="_blank" rel="noopener noreferrer" dir="ltr" className="inline-flex items-center text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md text-[11px] hover:bg-blue-100 hover:shadow-sm mx-1 border border-blue-200 transition-all font-tech font-bold">
          <ExternalLink size={10} className="mr-1" /> {domain}
        </a>
      );
    }
    return <span key={idx}>{part}</span>;
  });
};

// 🔴 تم إرجاع الحماية الذكية (Anti-Crash) لمنع التجميد اللي حصل في Vercel 🔴
const CleanUIContent = ({ content, isAssistant }) => {
  // 1. لو كود اللادر اكتمل
  if (/\[LADDER\][\s\S]*?\[\/LADDER\]/i.test(content)) {
    const parts = content.split(/\[LADDER\]([\s\S]*?)\[\/LADDER\]/gi);
    return parts.map((p, i) => i % 2 === 1 ? <LadderVisualizer key={i} code={p} /> : <CleanUIContent key={i} content={p} isAssistant={isAssistant} />);
  }
  
  // 2. لو كود اللادر لسه بيتكتب (الحماية اللي بتمنع الـ Out of Memory)
  if (/\[LADDER\]/i.test(content)) {
    const parts = content.split(/\[LADDER\]/i);
    return (
      <>
        <CleanUIContent content={parts[0]} isAssistant={isAssistant} />
        <LadderVisualizer code={parts.slice(1).join('[LADDER]')} />
      </>
    );
  }

  // 3. لو كود برمجي عادي اكتمل
  if (/```[\s\S]*?```/.test(content)) {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((p, i) => {
      if (p.startsWith('```')) {
        const codeBody = p.replace(/```[a-z]*\n?/i, '').replace(/```$/, '').trim();
        return <pre key={i} className="my-3 bg-[#0f172a] text-emerald-400 p-3 rounded-xl text-xs overflow-x-auto shadow-md" dir="ltr"><code>{codeBody}</code></pre>;
      }
      return <CleanUIContent key={i} content={p} isAssistant={isAssistant} />;
    });
  }

  // 4. لو كود برمجي عادي لسه بيتكتب
  if (content.includes('```')) {
    const parts = content.split('```');
    const codeBody = parts.slice(1).join('```').replace(/^[a-z]*\n?/i, '');
    return (
      <>
        <CleanUIContent content={parts[0]} isAssistant={isAssistant} />
        <pre className="my-3 bg-[#0f172a] text-emerald-400 p-3 rounded-xl text-xs overflow-x-auto shadow-md" dir="ltr"><code>{codeBody}</code></pre>
      </>
    );
  }

  const lines = content.split('\n');
  return (
    <div className={`space-y-1.5 text-[13px] leading-relaxed ${isAssistant ? 'text-slate-700' : 'text-white'}`}>
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-1" />;
        if (trimmed.match(/^(###|##|#)\s*/)) {
          const cleanText = trimmed.replace(/^(###|##|#)\s*/, '');
          return <h3 key={i} className="text-blue-800 font-black text-[14px] mt-4 mb-1 border-b border-blue-100 pb-1 inline-block">{parseInlineText(cleanText, isAssistant)}</h3>;
        }
        if (trimmed.match(/^([-*])\s+/)) {
          const cleanText = trimmed.replace(/^([-*])\s+/, '');
          return (
            <div key={i} className="flex items-start space-x-2 rtl:space-x-reverse my-1">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0 shadow-sm" />
              <p className="flex-1 font-semibold">{parseInlineText(cleanText, isAssistant)}</p>
            </div>
          );
        }
        return <p key={i} className="font-semibold">{parseInlineText(trimmed, isAssistant)}</p>;
      })}
    </div>
  );
};

const MessageBubble = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  const isError = message.isError;
  const [copied, setCopied] = useState(false);

  const handleRichCopy = async () => {
    try {
      let htmlContent = message.content
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/### (.*?)\n/g, '<h3 style="color:#1e40af;">$1</h3>')
        .replace(/[-*] (.*?)\n/g, '<li>$1</li>')
        .replace(/\n/g, '<br>');
      const blobHtml = new Blob([`<div dir="rtl" style="font-family: Arial, sans-serif; font-size: 14px;">${htmlContent}</div>`], { type: 'text/html' });
      const blobText = new Blob([message.content], { type: 'text/plain' });
      await navigator.clipboard.write([new ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobText })]);
    } catch (err) {
      navigator.clipboard.writeText(message.content);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'} mb-6 group w-full`}>
      <div className={`flex ${isAssistant ? 'flex-row' : 'flex-row-reverse'} items-end w-full max-w-full`}>
        {isAssistant && (
          <div className="w-8 h-8 mr-2 shrink-0 flex items-center justify-center animate-pulse drop-shadow-md mb-1">
            <img src={logoImg} alt="AutoSpexy" className="w-full h-full object-contain" />
          </div>
        )}
        <div className={`relative max-w-[85%] p-4 shadow-sm transition-all duration-300 ${
          isError ? 'bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl rounded-tr-none' :
          isAssistant ? 'bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-md' :
          'bg-blue-600 text-white rounded-2xl rounded-tr-none shadow-blue-500/30'
        }`}>
          <CleanUIContent content={message.content} isAssistant={isAssistant} />
          {message.isStreaming && (
            <div className="flex space-x-1.5 mt-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
        </div>
      </div>
      {isAssistant && !message.isStreaming && !isError && (
        <div className="flex items-center mt-2 ml-10 space-x-4 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={handleRichCopy} className="flex items-center text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors">
            {copied ? <Check size={12} className="mr-1 text-emerald-600" /> : <Copy size={12} className="mr-1" />} نسخ (تصدير)
          </button>
          <button onClick={() => navigator.share?.({text: message.content})} className="flex items-center text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors">
            <Share2 size={12} className="mr-1" /> مشاركة
          </button>
        </div>
      )}
    </div>
  );
};

const AICopilotSidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([{ role: 'assistant', content: `مرحباً مهندس **${user?.full_name?.split(' ')[0] || 'عبد الله'}**! أنا **AutoSpexy** 🤖، جاهز لدعم مشروعك.` }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('autospex');
  const [selectedModel, setSelectedModel] = useState('llama33');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bootState, setBootState] = useState('idle');

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const models = {
    llama33: { name: 'AutoSpexy MAX', icon: '🚀', desc: 'الأقوى والأذكى' },
    llama31: { name: 'AutoSpexy FAST', icon: '⚡', desc: 'استجابة لحظية' },
    qwen: { name: 'AutoSpexy CODER', icon: '💻', desc: 'خبير الأكواد' }
  };

  useEffect(() => {
    if (isOpen && bootState === 'idle') setBootState('booting');
  }, [isOpen]);

  useEffect(() => {
    if (bootState === 'booting') {
      const timer = setTimeout(() => setBootState('done'), 2000);
      return () => clearTimeout(timer);
    }
  }, [bootState]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (isOpen && !isLoading && bootState === 'done') inputRef.current?.focus();
  }, [messages, isOpen, isLoading, bootState]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userText = input;
    setInput('');
    if(inputRef.current) inputRef.current.style.height = 'auto'; 
    setIsLoading(true);
    const newMsgs = [...messages, { role: 'user', content: userText }];
    setMessages(newMsgs);

    const streamingId = Date.now();
    setMessages(prev => [...prev, { id: streamingId, role: 'assistant', content: '', isStreaming: true }]);

    try {
      const res = await fetch(`${BACKEND_URL}/api/copilot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs, mode, modelChoice: selectedModel }),
      });
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      let buffer = '';
      let lastUpdate = Date.now(); // 🔴 لضبط سرعة الريندر ومنع كراش المتصفح

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; 

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const dataStr = line.slice(6).trim();
          if (!dataStr) continue;
          
          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.type === 'text') {
              acc += parsed.text;
              // 🔴 Throttling: تحديث الشاشة كل 50 مللي ثانية فقط لتقليل الضغط على الـ RAM
              if (Date.now() - lastUpdate > 50) {
                setMessages(prev => prev.map(m => m.id === streamingId ? { ...m, content: acc } : m));
                lastUpdate = Date.now();
              }
            }
            if (parsed.type === 'done') {
              setMessages(prev => prev.map(m => m.id === streamingId ? { ...m, content: acc, isStreaming: false } : m));
            }
            if (parsed.type === 'error') throw new Error(parsed.message);
          } catch (err) {}
        }
      }
      // تحديث نهائي عشان نضمن إن مفيش حروف وقعت
      setMessages(prev => prev.map(m => m.id === streamingId ? { ...m, content: acc, isStreaming: false } : m));
    } catch (e) {
      setMessages(prev => prev.map(m => m.id === streamingId ? { ...m, content: 'عذراً، حدث خطأ في الاتصال بالسيرفر.', isError: true, isStreaming: false } : m));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fixed bottom-24 md:bottom-10 left-4 md:left-6 z-[100] w-14 h-14 flex items-center justify-center hover:scale-110 transition-transform group outline-none bg-transparent border-none">
          <img src={logoImg} alt="AutoSpexy" className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(37,99,235,0.4)] animate-pulse" />
          <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
        </button>
      )}

      <div className={`fixed inset-y-0 left-0 z-[110] w-full max-w-sm bg-slate-50 shadow-2xl flex flex-col transform transition-transform duration-500 ease-in-out border-r border-slate-200 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-slate-50 transition-all duration-700 ease-in-out ${bootState === 'booting' ? 'opacity-100 z-[200]' : 'opacity-0 -z-10 pointer-events-none'}`}>
          <div className="relative flex items-center justify-center">
            <div className="absolute w-36 h-36 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
            <div className="absolute w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-ping" />
            <img src={logoImg} alt="AutoSpexy AI" className="w-20 h-20 object-contain relative z-10 drop-shadow-2xl animate-bounce" />
          </div>
          <div className="mt-8 flex flex-col items-center">
            <h2 className="text-blue-800 font-black text-sm tracking-[0.4em] uppercase font-tech">AutoSpexy OS</h2>
            <div className="flex items-center mt-3 space-x-2 rtl:space-x-reverse">
              <Loader2 size={12} className="text-blue-500 animate-spin" />
              <p className="text-blue-500 text-[9px] font-black uppercase tracking-widest">Initializing AI Core...</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-b border-slate-200 shadow-sm relative z-20">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-12 h-12 flex items-center justify-center drop-shadow-md">
                <img src={logoImg} alt="AutoSpex" className="w-full h-full object-contain" />
              </div>
              <div className="relative">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex flex-col text-left group outline-none">
                  <h3 className="text-[12px] font-black tracking-[0.1em] text-blue-700 uppercase">AutoSpexy AI</h3>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <span className="text-[10px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{models[selectedModel].name}</span>
                    <ChevronDown size={12} className={`text-slate-400 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                {isMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                    <div className="absolute top-full left-0 mt-3 w-52 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                      <div className="p-2 bg-slate-50 text-[9px] font-bold text-slate-400 uppercase tracking-wider">اختر قوة المعالجة</div>
                      {Object.entries(models).map(([key, m]) => (
                        <button key={key} onClick={() => { setSelectedModel(key); setIsMenuOpen(false); }} className={`w-full p-4 text-left hover:bg-blue-50 transition-all border-b border-slate-50 last:border-0 ${selectedModel === key ? 'bg-blue-50 border-l-4 border-blue-600' : ''}`}>
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <span className="text-xl">{m.icon}</span>
                            <div>
                              <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{m.name}</p>
                              <p className="text-[9px] text-slate-500 font-medium">{m.desc}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button onClick={() => setMessages([{ role: 'assistant', content: 'تم تصفير الذاكرة.' }])} className="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-50"><Trash2 size={18}/></button>
              <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-slate-800 transition-colors rounded-lg hover:bg-slate-100"><X size={22} /></button>
            </div>
          </div>
          <div className="flex mt-4 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {[{ id: 'autospex', icon: <Crosshair size={14}/>, label: 'Project' }, { id: 'global', icon: <Globe size={14}/>, label: 'Industry' }, { id: 'troubleshoot', icon: <Wrench size={14}/>, label: 'Fix' }].map(m => (
              <button key={m.id} onClick={() => setMode(m.id)} className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-[10px] font-bold transition-all ${mode === m.id ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                {m.icon} <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 space-y-2">
          {messages.map((m, i) => <MessageBubble key={m.id || i} message={m} />)}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={e => { e.preventDefault(); sendMessage(); }} className="p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <div className="relative flex items-end bg-slate-100 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-blue-500/20 border border-transparent focus-within:border-blue-200 transition-all">
            <textarea
              ref={inputRef} value={input} onChange={handleInputChange}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="تحدث مع AutoSpexy..."
              rows={1} disabled={isLoading || bootState === 'booting'}
              className="flex-1 bg-transparent border-none focus:ring-0 text-[13px] py-3 px-3 text-slate-800 placeholder:text-slate-400 font-semibold resize-none min-h-[44px] max-h-[120px] overflow-y-auto outline-none"
            />
            <button type="submit" disabled={!input.trim() || isLoading || bootState === 'booting'} className={`p-3 rounded-xl ml-1 rtl:mr-1 shrink-0 transition-all ${input.trim() && !isLoading ? 'bg-blue-600 text-white shadow-md hover:-translate-y-0.5' : 'bg-slate-200 text-slate-400'}`}>
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="rtl:-scale-x-100" />}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AICopilotSidebar;