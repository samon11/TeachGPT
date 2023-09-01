import React, { useState } from 'react';
import '../styles/ChatUserInput.css';

const ChatUserInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Check if the pressed key is Enter and shift key is not pressed
      e.preventDefault(); // Prevent the default action (newline in this case)
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={handleKeyPress}
        placeholder="Ask a question..."
        className="chat-input"
      />
      <button onClick={handleSend} className="send-button">Send</button>
    </div>
  );
}

export default ChatUserInput;