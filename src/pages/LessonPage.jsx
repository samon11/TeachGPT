import React, { useEffect, useState, useRef } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import ChatUserInput from '../components/ChatUserInput';
import ReactMarkdown from 'react-markdown';
import Header from '../components/Header';

import '../styles/LessonPage.css';
import { askCodeQuestion, ask_gpt, codeExercisePrompt, getCodeLesson } from '../utils/gpt-utils';
import Spinner from '../components/Spinner';
import LessonTopicInput from '../components/LessonTopicInput';
import LanguageSelector from '../components/LanguageSelector';

const LessonPage = () => {
  const [code, setCode] = useState('');
  const [lesson, setLesson] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [lessonTopic, setLessonTopic] = useState('');
  const [languageMode, setLanguageMode] = useState('javascript');
  const messagesEndRef = useRef(null);

  async function fetchCodeExercise(topic, language) {
    const prompt = codeExercisePrompt("Michael", language, topic);
    const response = await ask_gpt([prompt]);
    const exercise = response.data.choices[0].message.content;
    setCode(exercise);
  }

  async function fetchLessonMaterial(topic, language) {
    setThinking(true);
    const material = await getCodeLesson(topic, language)
    setLesson(material);
    setThinking(false);
  }

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (lessonTopic) {
      setCode('');
      setChatHistory([]);
      setLesson('Thinking...');
      fetchLessonMaterial(lessonTopic, languageMode);
      fetchCodeExercise(lessonTopic, languageMode);
    }
  }, [lessonTopic, languageMode]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory])

  const handleSendMessage = (message) => {
    const userMessage = {
      role: 'user',
      content: message
    };

    setChatHistory([...chatHistory, userMessage]);

    setThinking(true);
    askCodeQuestion(message, chatHistory.concat({ role: 'assistant', content: lesson }))
      .then((response) => {
        const aiMessage = {
          role: 'assistant',
          content: response
        }
        setChatHistory([...chatHistory, userMessage, aiMessage]);
        setThinking(false);
      })
      .catch(err => {
        console.error(err);
        setThinking(false);
      });
  };

  const handleTopicSubmit = (value) => {
    setLessonTopic(value);
  }

  return (
    <div className="editor-container">
      <Header />
      <div className="chat-pane">
        <h2>Lesson</h2>
        <LanguageSelector languageMode={languageMode} setLanguageMode={setLanguageMode} />
        <LessonTopicInput onSend={handleTopicSubmit} />
        <div className="chat-messages-container">
          {lesson &&
            <div key={-1} className="chat-message">
              <ReactMarkdown children={lesson} />
            </div>
          }
          {chatHistory.map((chat, i) => (
            <div key={i} className="chat-message" style={{ backgroundColor: chat.role === 'user' ? "#f5f5f5" : "#ffffff" }}>
              <p><strong>{chat.role.toUpperCase()}:</strong></p> <ReactMarkdown className='no-select' children={chat.content} />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {thinking ? <Spinner size={40} /> : <ChatUserInput onSendMessage={handleSendMessage} />}
      </div>
      <div className="code-pane" style={{ overflow: 'hidden' }}>
        <h2>Exercise</h2>
        <AceEditor
          setOptions={{
            useWorker: false
          }}
          mode={languageMode}
          theme="monokai"
          value={code}
          onChange={setCode}
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          width='100%'
          height="calc(100vh - 40px)"
          enableLiveAutocompletion
          enableBasicAutocompletion
        />
      </div>
    </div>
  );
}

export default LessonPage;