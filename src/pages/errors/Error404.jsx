import React from 'react';
import '../../styles/error-pages.css';

function Error404() {
  return (
    <div className="error-page-container">
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <p>요청하신 페이지가 존재하지 않거나, 다른 주소로 이동되었을 수 있습니다.</p>
      <a href="/" className="back-home-button">홈으로 돌아가기</a>
    </div>
  );
}

export default Error404;