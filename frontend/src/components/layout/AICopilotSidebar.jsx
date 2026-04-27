import { useState, useRef, useEffect } from 'react';
import { BrainCircuit, X, Send, Sparkles, Loader2, AlertCircle, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const SUGGESTED_AR = [
  "كيف أوصّل S7-1200 بمحرك السير؟",
  "أرني كود Ladder Logic لاكتشاف الزجاجة",
  "لماذا يرفض Snap7 الاتصال عبر الإيثرنت؟",
  "اشرح لي الفرق بين Global DB و Instance DB",
];

// ── Format text with code blocks ─────────────────────────────
const FormattedContent = ({ content }) => {
  const parts = content.split(/(```[\s\S]*?```)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('```')) {
          const lines    = part.slice(3).split('\n');
          const lang     = lines[0].trim();
          const codeBody = lines.slice(1).join('\n').replace(/```$/, '').trimEnd();
          return (
            <div key={i} className="my-3 rounded-xl overflow-hidden border border-slate-800 shadow-md" dir="ltr">
              {lang && (
                <div className="bg-slate-800 px-4 py-1.5 text-[11px] font-bold text-slate-300 uppercase tracking-wider font-tech flex items-center">
                  <span className="w-2 h-2 rounded-full bg-autospex-light mr-2"></span>
                  {lang}
                </div>
              )}
              <pre className="bg-slate-900 p-4 text-xs text-emerald-400 overflow-x-auto whitespace-pre-wrap break-all font-tech leading-relaxed">
                <code>{codeBody}</code>
              </pre>
            </div>
          );
        }
        return <span key={i} className="whitespace-pre-wrap break-words leading-relaxed">{part}</span>;
      })}
    </>
  );
};

// ── Message Bubble ─────────────────────────────────────────────
const MessageBubble = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  const isError     = message.isError;

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`w-full max-w-[88%] p-4 rounded-2xl text-sm overflow-hidden shadow-sm ${
        isError
          ? 'bg-rose-50 border border-rose-200 text-rose-700 rounded-tr-none'
          : isAssistant
          ? 'bg-white border border-slate-200 text-slate-800 rounded-tr-none' 
          : 'bg-autospex-primary text-white rounded-tl-none' 
      }`}>
        {isError && <AlertCircle size={16} className="inline ml-1.5 mb-0.5" />}
        <FormattedContent content={message.content} />
        {message.isStreaming && (
          <span className="inline-block w-1.5 h-4 bg-autospex-light mx-1 animate-pulse rounded-sm align-middle" />
        )}
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────
const AICopilotSidebar = ({ isOpen, setIsOpen, t }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `مرحباً مهندس ${user?.full_name?.split(' ')[0] || user?.name?.split(' ')[0] || ''}! أنا المساعد الذكي الخاص بـ AutoSpex. كيف يمكنني مساعدتك في مشروعك اليوم؟` }
  ]);
  const [input, setInput]     = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || isLoading) return;

    setInput('');
    setIsLoading(true);

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);

    const streamingId = Date.now();
    setMessages(prev => [
      ...prev,
      { id: streamingId, role: 'assistant', content: '', isStreaming: true }
    ]);

    try {
      const res = await fetch(`${BACKEND_URL}/api/copilot`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error(`Server error`);

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const parsed = JSON.parse(line.slice(6));
            if (parsed.type === 'text') {
              accumulated += parsed.text;
              setMessages(prev => prev.map(m => m.id === streamingId ? { ...m, content: accumulated, isStreaming: true } : m));
            }
            if (parsed.type === 'done') {
              setMessages(prev => prev.map(m => m.id === streamingId ? { ...m, isStreaming: false } : m));
            }
            if (parsed.type === 'error') throw new Error(parsed.message);
          } catch (_) { }
        }
      }
    } catch (err) {
      setMessages(prev => prev.map(m => m.id === streamingId ? { ...m, content: `عذراً، حدث خطأ في الاتصال: ${err.message}`, isStreaming: false, isError: true } : m));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          /* Z-Index مرتفع جداً والزر مرفوع لتجنب تداخل شريط التنقل السفلي في الموبايل */
          className={`fixed bottom-28 md:bottom-10 left-4 md:left-6 z-[90] w-14 h-14 bg-autospex-primary rounded-full flex items-center justify-center shadow-xl shadow-blue-500/30 hover:scale-110 transition-transform`}
          title="فتح المساعد الذكي"
        >
          <BrainCircuit className="text-white" size={26} />
          <span className="absolute inset-0 rounded-full bg-autospex-light animate-ping opacity-30" />
        </button>
      )}

      {/* Sidebar Panel */}
      {/* Z-[110] للتأكد من ظهوره فوق كل شيء حتى شريط التنقل السفلي */}
      <div className={`fixed inset-y-0 left-0 z-[110] w-full max-w-sm bg-slate-50 border-r border-slate-200 shadow-2xl flex flex-col transform transition-transform duration-500 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>

        {/* Header */}
        <div className="shrink-0 p-5 border-b border-slate-200 bg-white flex justify-between items-center shadow-sm relative z-10">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
              <Sparkles className="text-autospex-primary" size={20} />
            </div>
            <div>
              <h3 className="text-slate-900 font-extrabold text-base">المساعد الهندسي (AI)</h3>
              <div className="flex items-center space-x-1.5 rtl:space-x-reverse mt-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-slate-500 text-[10px] font-bold font-tech uppercase tracking-wider">Llama 3.3 • Live</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button onClick={() => setMessages([{ role: 'assistant', content: 'تم مسح المحادثة. كيف يمكنني مساعدتك؟' }])} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
              <Trash2 size={18} />
            </button>
            <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-50 pb-safe">
          {messages.map((m, i) => <MessageBubble key={m.id || i} message={m} />)}

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="space-y-2 pt-4">
              <p className="text-slate-400 text-[11px] uppercase font-extrabold tracking-wider px-1">اقتراحات للبدء</p>
              {SUGGESTED_AR.map((s, i) => (
                <button
                  key={i} onClick={() => sendMessage(s)}
                  className="w-full text-right text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:border-autospex-primary hover:text-autospex-primary p-3.5 rounded-2xl transition-all shadow-sm hover:shadow-md"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Loading State */}
          {isLoading && messages[messages.length - 1]?.content === '' && (
            <div className="flex justify-start mb-4">
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl rounded-tr-none px-5 py-3.5 flex items-center space-x-3 rtl:space-x-reverse">
                <Loader2 size={16} className="text-autospex-primary animate-spin" />
                <span className="text-slate-500 text-xs font-bold">جاري تحليل الكود...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="shrink-0 p-4 border-t border-slate-200 bg-white pb-safe">
          <div className="relative">
            <textarea
              ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="اسأل عن الأكواد، التوصيلات، أو التوأم الرقمي..."
              rows={1} disabled={isLoading}
              className="w-full bg-slate-50 border border-slate-200 focus:border-autospex-primary focus:ring-2 focus:ring-blue-500/20 rounded-2xl py-3.5 px-4 pl-12 text-sm text-slate-900 placeholder:text-slate-400 transition-all resize-none shadow-inner"
              style={{ minHeight: '52px', maxHeight: '120px' }}
            />
            <button
              type="submit" disabled={isLoading || !input.trim()}
              className={`absolute top-1/2 -translate-y-1/2 left-3 p-2 rounded-xl transition-all ${
                input.trim() && !isLoading ? 'bg-autospex-primary text-white shadow-md hover:bg-blue-700 hover:scale-105' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send size={16} className="rtl:-scale-x-100" />
            </button>
          </div>
          <p className="text-slate-400 text-[10px] font-medium text-center mt-3 font-tech">
            Enter to send • Shift+Enter for new line
          </p>
        </form>
      </div>
    </>
  );
};

export default AICopilotSidebar;