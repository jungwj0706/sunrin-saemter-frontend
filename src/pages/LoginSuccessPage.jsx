import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function LoginSuccessPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // URL에서 token 파라미터 가져옴
    const token = searchParams.get('token');
    
    if (token) {
      // 토큰 존재하면 login 함수 호출해서 상태 업데이트
      login(token);
      // 로그인 성공 후 메인 페이지로 이동
      navigate('/');
      console.log("로그인성공?!?!?!");
    } else {
      // 토큰 없으면 에러 페이지로 이동
      console.error("로그인 실패: 토큰이 없습니다.");
      navigate('/login-error');
    }
  }, [login, navigate, searchParams]);

  return (
    <div>
      <h1>로그인 성공</h1>
      <p>로그인 처리가 완료되었습니다. 잠시 후 메인 페이지로 이동합니다.</p>
    </div>
  );
}

export default LoginSuccessPage;