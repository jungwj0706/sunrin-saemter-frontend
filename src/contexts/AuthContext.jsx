import React, { createContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 컴포넌트 마운트 시 로컬 스토리지에서 사용자 정보 복원
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        
        if (savedUser && savedToken) {
          const userData = JSON.parse(savedUser);
          
          // 토큰 만료 확인 (선택사항)
          const tokenPayload = JSON.parse(atob(savedToken.split('.')[1]));
          const isTokenExpired = tokenPayload.exp * 1000 < Date.now();
          
          if (!isTokenExpired) {
            setUser(userData);
          } else {
            // 토큰이 만료되었으면 로그아웃 처리
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // 오류가 발생하면 저장된 데이터 제거
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // 홈페이지로 리디렉트 (선택사항)
    window.location.href = '/';
  };

  // 사용자 정보 업데이트 함수
  const updateUser = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  // 토큰 가져오기 함수
  const getToken = () => {
    return localStorage.getItem('token');
  };

  // 인증된 API 요청을 위한 헤더 가져오기
  const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const login = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userData = {
        name: payload.name,  // 구글 계정명
        email: payload.sub,  // 이메일 주소
      };
      updateUser(userData);
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Failed to decode token or set user data:', error);
      logout();
    }
  };

  const value = {
    user,
    setUser: updateUser,
    login,
    logout,
    loading,
    getToken,
    getAuthHeaders,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;