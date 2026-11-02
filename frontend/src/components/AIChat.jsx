
import { useState, useRef, useEffect } from "react";
import { API_URL } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import "./AIChat.css";
function formatMessage(content) {
  const formatInline = (text) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }

      return part;
    });
  };

  return (
    <div className="ai-message-content" dir="auto">
      {content.split("\n").map((line, index) => {
        const text = line.trim();

        if (!text) return <div key={index} className="ai-empty-line" />;

        const heading = text.match(/^#{1,3}\s+(.+)/);
        const numbered = text.match(/^\d+[.)]\s+(.+)/);
        const bullet = text.match(/^[-*]\s+(.+)/);

        if (heading) {
          return (
            <h4 key={index}>
              {formatInline(heading[1])}
            </h4>
          );
        }

        if (numbered) {
          return (
            <p key={index} className="ai-list-item">
              {text.match(/^\d+[.)]/)[0]} {formatInline(numbered[1])}
            </p>
          );
        }

        if (bullet) {
          return (
            <p key={index} className="ai-list-item">
              • {formatInline(bullet[1])}
            </p>
          );
        }

        return <p key={index}>{formatInline(text)}</p>;
      })}
    </div>
  );
}
function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const { token } = useAuth();
  const { language, isArabic } = useLanguage();

  const content = {
    en: {
      title: "Bawsala AI",
      subtitle: "Your Jordan Travel Guide",
      welcome:
        "Hello! 👋 I'm your Bawsala travel assistant. Ask me anything about exploring Jordan!",
      placeholder: "Ask me about Jordan...",
      send: "Send",
      thinking: "Thinking...",
      error: "Sorry, something went wrong. Please try again.",
      greeting: "Hi! How can I help you explore Jordan today?"
    },
    ar: {
      title: "مساعد بوصلة",
      subtitle: "دليلك السياحي في الأردن",
      welcome:
        "أهلاً وسهلاً! 👋 أنا مساعد بوصلة السياحي. اسألني عن أي مكان أو تجربة سياحية في الأردن!",
      placeholder: "اسألني عن الأردن...",
      send: "إرسال",
      thinking: "جاري التفكير...",
      error: "عذراً، حدث خطأ. حاول مرة ثانية.",
      greeting: "أهلاً! كيف بقدر أساعدك تستكشف الأردن اليوم؟"
    }
  };

  const t = content[language] || content.en;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();

    const userMessage = message.trim();

    if (!userMessage || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage }
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          message: userMessage
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.error);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: error.message || t.error,
          isError: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-chat-container" dir={isArabic ? "rtl" : "ltr"}>

      {isOpen && (
        <section className="ai-chat-window">

          <header className="ai-chat-header">
            <div className="ai-chat-brand">
              <div className="ai-chat-avatar">✦</div>

              <div>
                <h3>{t.title}</h3>
                <span>{t.subtitle}</span>
              </div>
            </div>

            <button
              type="button"
              className="ai-chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div className="ai-chat-messages">

            {messages.length === 0 && (
              <div className="ai-chat-welcome">
                <div className="ai-welcome-icon">✦</div>
                <p>{t.welcome}</p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`ai-message ${
                  msg.role === "user"
                    ? "user-message"
                    : "assistant-message"
                } ${msg.isError ? "message-error" : ""}`}
              >
                {formatMessage(msg.content)}
              </div>
            ))}

            {loading && (
              <div className="ai-message assistant-message ai-loading">
                {t.thinking}
                <span> •••</span>
              </div>
            )}

            <div ref={messagesEndRef} />

          </div>

          <form className="ai-chat-form" onSubmit={handleSend}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.placeholder}
              disabled={loading}
            />

            <button
              type="submit"
              disabled={!message.trim() || loading}
            >
              {t.send}
            </button>
          </form>

        </section>
      )}

      <button
        type="button"
        className={`ai-chat-toggle ${isOpen ? "chat-open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open AI assistant"
      >
        {isOpen ? "×" : "✦"}
      </button>

    </div>
  );
}

export default AIChat;
