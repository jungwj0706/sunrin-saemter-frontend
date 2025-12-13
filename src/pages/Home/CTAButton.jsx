import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SearchBtn from '../../assets/icons/search_white.svg'; 
import Button from '../../components/ui/Button';
import AuthContext from '../../contexts/AuthContext';

function CTAButton() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/search');
    } else {
      Toast.fire({
        iconColor: "#fff",
        title: "학교 구글 계정으로 로그인 후 이용해주세요",
        color: "#fff",
        background: "#E74B3C",
      });
    }
  };

  return (
    <Button onClick={handleClick} className="cta-button">
      <span>선생님 찾기</span>
      <span className="search-icon">
        <img src={SearchBtn} alt="검색 아이콘" />
      </span>
    </Button>
  );
}

export default CTAButton;
