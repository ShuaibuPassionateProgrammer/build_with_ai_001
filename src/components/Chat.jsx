import React from 'react';

const Chat = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">AI Analysis</h2>
      
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-100 ml-6' : 'bg-gray-100 mr-6'}`}
          >
            <p className="text-sm font-semibold text-gray-600 mb-1">
              {message.role === 'user' ? 'You' : 'AI Assistant'}
            </p>
            <p className="text-gray-800">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;