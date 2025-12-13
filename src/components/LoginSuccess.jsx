import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../pages/useAuth';

function LoginSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const token = searchParams.get('token');
        
        if (!token) {
          setError('토큰이 없습니다.');
          setLoading(false);
          return;
        }

        // JWT 토큰에서 사용자 정보 추출
        const payload = JSON.parse(atob(token.split('.')[1]));
        const email = payload.sub;
        const name = payload.name;
        
        // 사용자 정보 설정
        const userData = {
          email: email,
          name: name,
          token: token
        };
        
        // 로컬 스토리지에 토큰 저장
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // 컨텍스트에 사용자 설정
        setUser(userData);
        
        setLoading(false);
        
        // 메인 페이지로 이동
        setTimeout(() => {
          navigate('/');
        }, 1000);
        
      } catch (err) {
        console.error('로그인 처리 중 오류:', err);
        setError('로그인 처리 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    handleLogin();
  }, []); // 의존성 배열에서 setUser와 navigate 제거

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <div>로그인 처리 중...</div>
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          잠시만 기다려주세요.
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
        <button onClick={() => navigate('/login')}>
          다시 로그인하기
        </button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <div>로그인 성공! 메인 페이지로 이동 중...</div>
    </div>
  );
}

export default LoginSuccess;