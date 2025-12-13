import React from 'react';
import '../../styles/error-pages.css';

function Error403() {
  return (
    <div className="error-page-container">
      <h1>403</h1>
      <p>접근이 거부되었습니다.</p>
      <p>이 페이지에 접근할 권한이 없습니다.</p>
      <a href="/" className="back-home-button">홈으로 돌아가기</a>
    </div>
  );
}

export default Error403;
