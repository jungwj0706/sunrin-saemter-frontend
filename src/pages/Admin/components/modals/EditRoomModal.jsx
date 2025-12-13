import React, { useState, useEffect, memo } from "react";

const EditRoomModal = ({ room, isOpen, onClose, onConfirm, loading }) => {
  const [roomData, setRoomData] = useState(room);

  useEffect(() => {
    setRoomData(room);
  }, [room]);

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm(roomData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>교무실 정보 수정</h2>
          <p>교무실의 정보를 수정합니다.</p>
        </div>
        <div className="modal-content">
          <div className="form-group">
            <label>교무실 ID</label>
            <input
              name="id"
              type="number"
              value={roomData?.id || ""}
              disabled // 아이디는 고유 식별자이기에 수정 불가능하게 처리
            />
          </div>
          <div className="form-group">
            <label>교무실 이름</label>
            <input
              name="name"
              type="text"
              value={roomData?.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>위치</label>
            <input
              name="location"
              type="text"
              value={roomData?.location || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>설명</label>
            <input
              name="description"
              type="text"
              value={roomData?.description || ""}
              onChange={handleChange}
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

export default memo(EditRoomModal);
