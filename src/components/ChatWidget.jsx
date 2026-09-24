import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';



const WHATSAPP_NUMBER = '2348030700143';
const EMAIL = 'ajikep@yahoo.com';


const KNOWLEDGE_BASE = [
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'fee', 'fees', 'rate'],
    reply:
      "Pricing depends on your country, format (1-on-1 or small group) and how many lessons per month. Our Pricing page has a plan builder that shows your exact monthly cost — no hidden fees. Would you like me to send you the link?",
  },
  {
    keywords: ['book', 'booking', 'consultation', 'consult', 'schedule', 'appointment'],
    reply:
      "You can book a free 15-minute consultation from the Book a Consultation page. We'll discuss your child's goals, answer questions, and recommend the right tutor — no commitment. Ready to book, or want me to explain what happens next?",
  },
  {
    keywords: ['free', 'trial', 'try', 'sample'],
    reply:
      "Yes! Every family starts with a free 15-minute consultation. It's a chance to discuss goals and see if we're a good fit — no payment required. Shall I help you book it?",
  },
  {
    keywords: ['subject', 'subjects', 'math', 'maths', 'english', 'science', 'biology', 'chemistry', 'physics', 'french'],
    reply:
      "We teach Mathematics, English, Biology, Chemistry, Physics, French, exam prep and study skills — for primary, secondary and pre-university students. Which subject are you interested in?",
  },
  {
    keywords: ['tutor', 'teacher', 'qualification', 'qualified', 'vetted', 'experience'],
    reply:
      "Every tutor holds a relevant degree or teaching qualification in their subject and has prior tutoring or classroom experience. They also go through a background check and a trial lesson before being matched with students.",
  },
  {
    keywords: ['online', 'in person', 'location', 'where', 'country', 'timezone', 'time zone'],
    reply:
      "All lessons are online — live one-to-one sessions with an interactive whiteboard and shared materials. We teach students in 12+ countries and schedule lessons around your local time zone.",
  },
  {
    keywords: ['cancel', 'reschedule', 'miss', 'missed', 'postpone'],
    reply:
      "Lessons cancelled with at least 24 hours' notice are rescheduled free. Short-notice cancellations count against the monthly allocation. Need help rescheduling a specific lesson?",
  },
  {
    keywords: ['payment', 'pay', 'card', 'transfer', 'refund'],
    reply:
      "We accept card and bank transfer. Payment is monthly, due at the start of each billing period. No sign-up fees, no long-term contracts — pause or cancel any time.",
  },
  {
    keywords: ['contact', 'email', 'phone', 'whatsapp', 'speak', 'human', 'agent'],
    reply:
      `The fastest way to reach a human is WhatsApp (+${WHATSAPP_NUMBER}) — we usually reply within minutes during business hours. You can also email ${EMAIL}.`,
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    reply:
      "Hi! 👋 I'm here to help with questions about lessons, pricing, tutors or booking. What would you like to know?",
  },
  {
    keywords: ['thank', 'thanks', 'cheers'],
    reply:
      "You're welcome! Anything else I can help with? If you'd like to speak to a person, WhatsApp is the fastest way.",
  },
];

const FALLBACK_REPLY =
  "I'm not sure I have the answer to that one. The fastest way to get help is WhatsApp we usually reply within minutes during business hours. Would you like me to open WhatsApp, or would you prefer to send us a message?";

const QUICK_REPLIES = [
  { label: '💷 Pricing', text: 'How much do lessons cost?' },
  { label: '📅 Book a consultation', text: 'How do I book a consultation?' },
  { label: '📚 Subjects', text: 'What subjects do you teach?' },
  { label: '💬 Talk to a human', text: 'I want to speak to a human' },
];

/* ---------- Bot logic ---------- */

function matchReply(question) {
  const q = question.toLowerCase();
  for (const entry of KNOWLEDGE_BASE) {
    if (entry.keywords.some((kw) => q.includes(kw))) {
      return entry.reply;
    }
  }
  return null;
}

/* ---------- Widget ---------- */

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const panelRef = useRef(null);
  const buttonRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Seed the first greeting when the panel first opens
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'bot',
          text: "Hi there I'm Ajike the a+ Academy assistant. Ask me anything about lessons, pricing, subjects or booking or pick a quick option below.",
          time: Date.now(),
        },
      ]);
    }
  }, [open, messages.length]);

  // Auto-scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus the input when opening
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Escape closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Click outside closes
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const toggle = () => {
    setOpen((o) => !o);
    if (!hasBeenOpened) setHasBeenOpened(true);
  };

  const pushMessage = (sender, text) => {
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random()}`, sender, text, time: Date.now() },
    ]);
  };

  const sendQuestion = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    pushMessage('user', trimmed);
    setDraft('');
    setIsTyping(true);

    // Simulate a short "typing" delay for a natural feel
    setTimeout(() => {
      const reply = matchReply(trimmed) || FALLBACK_REPLY;
      setIsTyping(false);
      pushMessage('bot', reply);
    }, 500 + Math.random() * 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendQuestion(draft);
  };

  const handleQuickReply = (text) => {
    sendQuestion(text);
  };

  return (
    <>
      {/* ---------- Launcher ---------- */}
      <button
        ref={buttonRef}
        type="button"
        className={
          'chat-launcher' +
          (open ? ' chat-launcher--open' : '') +
          (hasBeenOpened ? ' chat-launcher--seen' : '')
        }
        onClick={toggle}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        aria-controls="chat-panel"
      >
        <span className="chat-launcher-icon" aria-hidden="true">
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          )}
        </span>
        {!hasBeenOpened && <span className="chat-launcher-dot" aria-hidden="true" />}
      </button>

      {/* ---------- Panel ---------- */}
      <div
        id="chat-panel"
        ref={panelRef}
        className={'chat-panel' + (open ? ' chat-panel--open' : '')}
        role="dialog"
        aria-label="Chat with a+ Academy"
        aria-hidden={!open}
      >
        {/* Header */}
        <header className="chat-panel-header">
          <div className="chat-panel-avatar" aria-hidden="true">a+</div>
          <div className="chat-panel-heading">
            <strong>Ajike</strong>
            <span>
              <span className="chat-panel-status-dot" aria-hidden="true" />
              Usually replies instantly
            </span>
          </div>
        </header>

        {/* Messages */}
        <div className="chat-thread" role="log" aria-live="polite">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`chat-bubble chat-bubble--${m.sender}`}
            >
              <p className="chat-bubble-text">{m.text}</p>
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble chat-bubble--bot chat-bubble--typing">
              <span className="chat-typing-dot" />
              <span className="chat-typing-dot" />
              <span className="chat-typing-dot" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies — only shown on the very first message */}
        {messages.length === 1 && !isTyping && (
          <div className="chat-quick-replies">
            {QUICK_REPLIES.map((qr) => (
              <button
                key={qr.label}
                type="button"
                className="chat-quick-reply"
                onClick={() => handleQuickReply(qr.text)}
              >
                {qr.label}
              </button>
            ))}
          </div>
        )}

        {/* Composer */}
        <form className="chat-composer" onSubmit={handleSubmit}>
          <label htmlFor="chat-input" className="visually-hidden">
            Type your question
          </label>
          <input
            id="chat-input"
            ref={inputRef}
            type="text"
            className="chat-input"
            placeholder="Type your question…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoComplete="off"
            maxLength={500}
          />
          <button
            type="submit"
            className="chat-send"
            disabled={!draft.trim()}
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </form>

        {/* Footer with human escalation */}
        <div className="chat-panel-footer">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-panel-footer-link"
          >
            Continue on WhatsApp
          </a>
          <span aria-hidden="true">·</span>
          <Link
            to="/contact"
            className="chat-panel-footer-link"
            onClick={() => setOpen(false)}
          >
            Contact form
          </Link>
        </div>
      </div>
    </>
  );
}