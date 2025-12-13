import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import "./styles/globals.css";
import "./styles/theme.css";
import "./styles/animations.css";
import "./styles/error-pages.css";

import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Result from "./pages/Result/Result";
import Admin from "./pages/Admin/Admin";
import Error403 from "./pages/errors/Error403";
import Error404 from "./pages/errors/Error404";
import Error418 from "./pages/errors/Error418";
import Error500 from "./pages/errors/Error500";
import Error503 from "./pages/errors/Error503";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import LoginSuccess from "./components/LoginSuccess";
import AuthCallback from "./pages/AuthCallback";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  return (
    <AuthProvider>
      {!isAdminPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/result" element={<Result />} />
        <Route path="/admin" element={<Admin />} />

        {/* 로그인 관련 라우트 */}
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route
          path="/login-error"
          element={
            <div style={{ padding: "20px", textAlign: "center" }}>
              <h2>로그인 실패</h2>
              <p>로그인 과정에서 오류가 발생했습니다.</p>
              <button onClick={() => (window.location.href = "/")}>
                홈으로 돌아가기
              </button>
            </div>
          }
        />

        {/* 테스트용 에러 페이지 라우트 */}
        <Route path="/error/403" element={<Error403 />} />
        <Route path="/error/418" element={<Error418 />} />
        <Route path="/error/500" element={<Error500 />} />
        <Route path="/error/503" element={<Error503 />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
      {!isAdminPage && <Footer />}
    </AuthProvider>
  );
}

export default App;
