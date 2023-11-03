import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="sticky z-10 top-0 left-0 bg-blue-600 text-white font-semibold p-2 rounded-b-lg h-10 w-screen">
      <h1>TeachGPT</h1>
    </header>
  );
}

export default Header;