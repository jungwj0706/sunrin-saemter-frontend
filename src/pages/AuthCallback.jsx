import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    
    if (accessToken) {
      login(accessToken);
      navigate('/');
    } else {
      console.error("로그인에 실패했습니다. 토큰이 없습니다.");
      navigate('/login-error');
    }
  }, [navigate, searchParams, login]);

  return (
    <div>
      <p>로그인 처리 중...</p>
    </div>
  );
}

export default AuthCallback;
