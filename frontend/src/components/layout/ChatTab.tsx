// src/components/layout/ChatTab.tsx
import React, { useState } from 'react';
import type { PDF } from '../../types';
import PdfViewer from './PdfViewer';

interface ChatTabProps {
  selectedPdf: PDF | null;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const ChatTab: React.FC<ChatTabProps> = ({ selectedPdf }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
    };

    setMessages([...messages, newMessage]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, text: `Bot response to: "${newMessage.text}"`, sender: 'bot' },
      ]);
    }, 500);
  };

  return (
    <div className="flex h-full">
      {/* Chat area */}
      <div className="flex-1 flex flex-col border-r border-gray-200">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`p-2 rounded max-w-xs ${
                msg.sender === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="w-1/3 bg-gray-50 p-4 overflow-auto">
        {selectedPdf ? (
          <div>
            <h3 className="text-lg font-semibold mb-2">{selectedPdf.name}</h3>
            <div className="h-[600px]">
              <PdfViewer pdfFile={selectedPdf} />
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No PDF selected</p>
        )}
      </div>
    </div>
  );
};

export default ChatTab;