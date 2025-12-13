import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/layout/footer.css';
import logoIcon from '../../assets/logo/logo.svg';

function Footer() {
  return (
    <footer className="main-footer">
        <div className="footer-logo-section">
          <Link to="/"> 
            <img src={logoIcon} alt="Sunrin Saemter Logo" className="footer-logo-icon" />
          </Link>
          <p>선생님의 교무실 위치와 자리 비움 여부를 쉽고 빠르게 확인하세요.</p>
        </div>

        <div className="footer-links-section">
          <div className="footer-links-group">
            <h3>서비스</h3>
            <ul>
              <li><a href="/notice">공지사항</a></li>
              <li><a href="/faq">자주 묻는 질문</a></li>
              <li><a href="/search">선생님 찾기</a></li>
            </ul>
          </div>
          <div className="footer-links-group">
            <h3>정책</h3>
            <ul>
              <li><a href="/terms">서비스 이용약관</a></li>
              <li><a href="/privacy">개인정보 처리방침</a></li>
            </ul>
          </div>
          <div className="footer-links-group">
            <h3>문의</h3>
            <ul>
              <li><a href="/about">팀 Four-Dwarfts 소개</a></li>
              <li><a href="/contact">문의하기</a></li>
            </ul>
          </div>
        </div>

      <div className="footer-bottom">
        <p>© 2025 Team Four-Dwarfts. All rights reserved.<br />Provides comfort as well as <span className="emoji">🫶</span> to Sunrin students.</p>
      </div>
    </footer>
  );
}

export default Footer;