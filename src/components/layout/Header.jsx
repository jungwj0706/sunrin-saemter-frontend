import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../pages/useAuth";
import Button from "../ui/Button";
import "../../styles/layout/header.css";
import logoIcon from "../../assets/logo/logo.svg";
import google from "../../assets/icons/google.png";

function Header() {
  const { user, logout } = useAuth();
  const backendUrl =
    import.meta.env.VITE_API_URL || "https://sunrinsaemter.pixelhize.xyz";

  const handleLoginClick = () => {
    window.location.href = `${backendUrl}/api/login`;
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/">
          <img
            src={logoIcon}
            alt="Sunrin Saemter Logo"
            className="header-logo-icon"
          />
        </Link>
      </div>
      <div className="header-right">
        {user ? (
          <>
            <span className="user-name">{user.name}</span>
            <Button onClick={logout} className="logout-button">
              로그아웃
            </Button>
          </>
        ) : (
          <Button onClick={handleLoginClick} className="login-button">
            <img src={google} className="google-icon" />
            <span className="login-text">학교 구글 계정으로 로그인하기</span>
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
