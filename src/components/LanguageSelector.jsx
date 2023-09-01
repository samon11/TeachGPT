import React from 'react';
import '../styles/LanguageSelector.css';

const LanguageSelector = ({ languageMode, setLanguageMode }) => {
  

  return (
    <select
      className="language-selector"
      onChange={(e) => setLanguageMode(e.target.value)}
      value={languageMode}
    >
      <option value="javascript">JavaScript</option>
      <option value="rust">Rust</option>
      <option value="csharp">C#</option>
      <option value="python">Python</option>
      <option value="golang">Go</option>
    </select>
  );
};

export default LanguageSelector;