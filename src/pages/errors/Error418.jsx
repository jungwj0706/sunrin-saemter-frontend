import React from 'react';
import '../../styles/error-pages.css';

function Error418() {
  return (
    <div className="error-page-container">
      <h1>418</h1>
      <p>I’m a teapot! ☕️</p>
      <a href="/" className="back-home-button">홈으로 돌아가기</a>
    </div>
  );
}

export default Error418;
