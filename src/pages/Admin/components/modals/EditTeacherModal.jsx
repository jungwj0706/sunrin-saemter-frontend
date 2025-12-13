import React, { useState, useEffect, memo } from "react";

const EditTeacherModal = ({ teacher, isOpen, onClose, onConfirm, loading }) => {
  const [teacherData, setTeacherData] = useState(teacher);

  useEffect(() => {
    setTeacherData(teacher);
  }, [teacher]);

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm(teacherData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>선생님 정보 수정</h2>
          <p>선생님의 정보를 수정합니다.</p>
        </div>
        <div className="modal-content">
          <div className="form-group">
            <label>이름</label>
            <input
              name="name"
              type="text"
              value={teacherData?.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>이메일</label>
            <input
              name="email"
              type="email"
              value={teacherData?.email || ""}
              disabled // 이메일은 고유 식별자이기에 수정 불가능하게 처리
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            취소
          </button>
          <button
            className="btn-primary"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "수정 중..." : "수정하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(EditTeacherModal);
