import React from 'react';

const Chat = ({ messages }) => {
  if (!messages || messages.length === 0) return null;
  
  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-600 text-white">
        <h2 className="text-lg font-semibold">AI Chat</h2>
      </div>
      
      <div className="p-4 max-h-[400px] overflow-y-auto chat-messages">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-4 p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-100 ml-auto max-w-[80%]' : 'bg-gray-100 mr-auto max-w-[80%]'}`}
          >
            <p className="text-sm font-semibold mb-1">
              {message.role === 'user' ? 'You' : 'AI Assistant'}
            </p>
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;