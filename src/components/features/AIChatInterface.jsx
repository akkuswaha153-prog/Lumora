import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, AlertCircle } from 'lucide-react';
import { aiService } from '../../services/aiService';
import { storageService } from '../../services/storageService';
import { SAFETY_DISCLAIMER } from '../../utils/constants';
import LoadingSkeleton from '../common/LoadingSkeleton';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';

const AIChatInterface = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const scrollRef = useRef(null);

  // Auto-scroll to response
  useEffect(() => {
    if (response || isLoading) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [response, isLoading]);

  const handleReflect = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // 1. Safety Check
    if (!aiService.isSafeQuery(input)) {
      setError("This topic seems sensitive. For your safety, I cannot provide guidance on this. Please consult a professional.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      // 2. Local Save (User Input)
      await storageService.saveReflection(input, 'user');
      
      // 3. AI Fetch
      const aiResult = await aiService.generateReflection(input);
      
      // 4. Local Save (AI Result)
      await storageService.saveReflection(aiResult, 'ai');
      
      setResponse(aiResult);
      setInput('');
    } catch (err) {
      setError(err.message || "Failed to connect. Check your internet.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-interface">
      {/* Disclaimer (Mandatory) */}
      <div className="safety-note">
        <AlertCircle size={14} />
        <span>{SAFETY_DISCLAIMER.AI_GEN}</span>
      </div>

      <div className="reflection-area">
        {isLoading && <LoadingSkeleton />}
        
        {response && (
          <GlassCard className="ai-response-card">
            <div className="ai-badge">
              <Sparkles size={16} />
              <span>AI Insight</span>
            </div>
            <div className="markdown-content">
              {/* Note: In production, wrap this with 'marked' for proper formatting */}
              {response}
            </div>
          </GlassCard>
        )}

        {error && (
          <div className="error-toast">
            <AlertCircle size={18} />
            <p>{error}</p>
          </div>
        )}
        
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleReflect} className="input-container">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's on your mind? (e.g., 'How can I stay focused today?')"
          rows="3"
          aria-label="Reflection Input"
        />
        <Button 
          type="submit" 
          disabled={!input.trim() || isLoading}
          isLoading={isLoading}
        >
          <Send size={18} />
          <span>Reflect</span>
        </Button>
      </form>

      <style jsx>{`
        .chat-interface {
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 16px;
        }
        .safety-note {
          font-size: 0.7rem;
          color: #94a3b8;
          display: flex;
          gap: 6px;
          justify-content: center;
          padding: 0 10px;
          text-align: center;
        }
        .reflection-area {
          flex: 1;
          overflow-y: auto;
          padding: 10px 0;
        }
        .ai-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #818cf8;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .markdown-content {
          line-height: 1.6;
          color: #f1f5f9;
          white-space: pre-wrap;
        }
        .input-container {
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        textarea {
          background: transparent;
          border: none;
          color: white;
          resize: none;
          outline: none;
          padding: 8px;
          font-size: 1rem;
          font-family: inherit;
        }
        .error-toast {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #f87171;
          padding: 12px;
          border-radius: 16px;
          display: flex;
          gap: 10px;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default AIChatInterface;
