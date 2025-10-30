import React, { useState, useRef, useEffect } from 'react';
import { getSkillBuddyResponse } from '../services/geminiService';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const SkillBuddy: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'Hello! I am your SkillBuddy. How can I help you accelerate your career today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !user) return;
    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponseText = await getSkillBuddyResponse(input, user);
      const aiMessage: Message = { text: aiResponseText, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('SkillBuddy Error:', error);
      const errorMessage: Message = { text: 'Sorry, I am having trouble connecting. Please try again later.', sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const quickPrompts = [
    "Suggest a course for me",
    "Find jobs for my skills",
    "Give me a career tip"
  ];
  
  if (!user) return null;

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="fixed top-1/2 -translate-y-1/2 right-0 bg-primary/80 backdrop-blur-sm text-white py-4 px-2 rounded-l-lg cursor-pointer hover:bg-primary transition-colors z-40 shadow-glow-primary"
        aria-label="Open SkillBuddy"
      >
        <div className="flex items-center gap-2 [writing-mode:vertical-rl] tracking-wider">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            <span className="font-semibold">SkillBuddy</span>
        </div>
      </div>

      <div className={`fixed inset-0 bg-black/60 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>

      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l-2 border-primary/50 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         <div className="p-4 border-b border-zinc-700 flex justify-between items-center bg-surface/80 backdrop-blur-sm">
            <div>
                <h3 className="text-xl font-bold text-primary-light">SkillBuddy</h3>
                <p className="text-sm text-text-muted">Your personal career assistant</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-white">&times;</button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-zinc-700 text-text'}`}>
                 <div className="prose prose-sm prose-invert" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}></div>
                </div>
            </div>
            ))}
            {isLoading && (
            <div className="flex justify-start mb-4">
                <div className="bg-zinc-700 text-text rounded-lg p-2 shadow">
                <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-text-muted rounded-full animate-pulse"></span>
                    <span className="w-2 h-2 bg-text-muted rounded-full animate-pulse [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-text-muted rounded-full animate-pulse [animation-delay:0.4s]"></span>
                </div>
                </div>
            </div>
            )}
            <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-zinc-700 bg-surface/80 backdrop-blur-sm">
            <div className="flex flex-wrap gap-2 mb-2">
            {quickPrompts.map(prompt => (
                <button 
                key={prompt}
                onClick={() => { setInput(prompt); }}
                className="text-xs bg-zinc-700 hover:bg-primary text-text px-2 py-1 rounded-full transition-colors"
                >
                {prompt}
                </button>
            ))}
            </div>
            <div className="flex">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 p-2 bg-background border border-zinc-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
                disabled={isLoading}
            />
            <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-primary text-white p-2 rounded-r-md hover:bg-primary-dark disabled:bg-gray-600 flex items-center justify-center w-12"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
            </button>
            </div>
        </div>
        </div>
    </>
  );
};

export default SkillBuddy;