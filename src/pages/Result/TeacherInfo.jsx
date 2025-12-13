import React from 'react';

const TeacherInfo = ({ teacherName, teacherLocation }) => {
  return (
    <div className="teacher-info">
      <h1>{teacherName} 선생님은 <strong>{teacherLocation}</strong> 교무실에 계세요.</h1>
    </div>
  );
};

export default TeacherInfo;