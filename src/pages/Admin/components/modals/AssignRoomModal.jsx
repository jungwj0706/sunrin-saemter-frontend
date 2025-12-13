import React, { useState, useEffect, memo } from 'react';

const AssignRoomModal = ({
  teacher,
  rooms,
  isOpen,
  onClose,
  onConfirm,
  loading
}) => {
  const [roomId, setRoomId] = useState(teacher?.roomId?.toString() || "0");

  useEffect(() => {
    setRoomId(teacher?.roomId?.toString() || "0");
  }, [teacher]);

  if (!isOpen) {
    return null;
  }
  
  const handleConfirm = () => {
    onConfirm(teacher, roomId);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>교무실 배정</h2>
          <p>{teacher?.name || teacher?.email} 선생님의 교무실을 배정하거나 변경합니다.</p>
        </div>
        <div className="modal-content">
          <div className="form-group">
            <label>교무실 선택</label>
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            >
              <option value="0">미배정</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id.toString()}>
                  {room.name} ({room.location})
                </option>
              ))}
            </select>
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
            {loading ? '배정 중...' : '배정하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(AssignRoomModal);