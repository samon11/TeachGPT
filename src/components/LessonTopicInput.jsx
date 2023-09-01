import React, { useState } from 'react';
import '../styles/LessonTopicInput.css';

const LessonTopicInput = ({ onSend }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSend(value);
  }

  return (
    <form onSubmit={handleSubmit} className='topic-input-container'>
      <input 
        type="text" 
        className="lesson-topic-input" 
        placeholder="What do you want to learn today?" 
        value={value} 
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="topic-go-button">Go</button>
    </form>
  );
}

export default LessonTopicInput;