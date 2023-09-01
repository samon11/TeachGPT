import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <p>&copy; {new Date().getFullYear()} LearnGPT. All rights reserved.</p>
    </footer>
  );
}

export default Footer;