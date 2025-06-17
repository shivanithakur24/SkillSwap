import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io('http://localhost:5000');

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  return (
    <motion.div
      className="container py-4"
      style={{ minHeight: '100vh', backgroundColor: '#0d0d0d', color: 'white' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-center mb-4 text-warning">SkillSwap Chat Room</h2>

      <div className="bg-dark rounded p-4 mb-4" style={{ height: '400px', overflowY: 'auto' }}>
        {chat.map((msg, index) => (
          <div key={index} className="text-light mb-2">
            <span className="badge bg-warning me-2">User</span> {msg}
          </div>
        ))}
      </div>

      <div className="d-flex gap-2">
        <input
          className="form-control bg-dark text-white"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <motion.button
          className="btn btn-warning"
          whileHover={{ scale: 1.1 }}
          onClick={sendMessage}
        >
          Send
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ChatBox;
