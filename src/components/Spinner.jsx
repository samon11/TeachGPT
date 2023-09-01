import React from 'react';
import '../styles/Spinner.css';

const Spinner = ({size}) => {
  return <div className="spinner" style={{height: size, width: size}}></div>;
}

export default Spinner;
