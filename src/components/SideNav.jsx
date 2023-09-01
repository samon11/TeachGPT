import React, { useState } from 'react';
import '../styles/SideNav.css';

const SideNav = ({ chapters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside className={`side-nav ${isExpanded ? 'expanded' : ''}`}>
      <button onClick={() => setIsExpanded(!isExpanded)} className="toggle-nav-btn">
      🍔
      </button>
      {isExpanded && (
        <>
          <h2>Chapters</h2>
          <ul>
            {chapters.map(chapter => (
              <li key={chapter.id}>
                {chapter.name}
                <ul>
                  {chapter.lessons.map(lesson => (
                    <li key={lesson.id}>{lesson.name}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}

export default SideNav;
