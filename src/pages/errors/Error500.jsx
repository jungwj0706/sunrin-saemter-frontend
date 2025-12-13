import React from 'react';
import '../../styles/error-pages.css';

function Error500() {
  return (
    <div className="error-page-container">
      <h1>500</h1>
      <p>서버에 오류가 발생했습니다.</p>
      <p>문제가 계속되면 관리자에게 문의해주세요.</p>
      <a href="/" className="back-home-button">홈으로 돌아가기</a>
    </div>
  );
}

export default Error500;
