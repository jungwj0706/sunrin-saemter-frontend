import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/search.css";
import SearchBtn from '../../assets/icons/search_black.svg?react';

function Search() {
  const [teacherName, setTeacherName] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (teacherName.trim() !== "") {
      navigate(`/result?email=${encodeURIComponent(teacherName.trim())}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <div className="wrapper">
        <h1 className="title">선생님 성함 검색</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="선생님 성함을 입력하세요."
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>
            <SearchBtn />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;