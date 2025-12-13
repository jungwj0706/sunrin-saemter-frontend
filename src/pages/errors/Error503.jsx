import React from 'react';
import '../../styles/error-pages.css';

function Error503() {
  return (
    <div className="error-page-container">
      <h1>503</h1>
      <p>서비스를 사용할 수 없습니다.</p>
      <p>현재 서버가 점검 중이거나 과부하 상태일 수 있습니다.</p>
      <a href="/" className="back-home-button">홈으로 돌아가기</a>
    </div>
  );
}

export default Error503;
