import React, { memo } from 'react';
import { UsersIcon } from '../icons';

const ViewRoomTeachersModal = ({ room, teachers, isOpen, onClose }) => {
  if (!isOpen || !room) {
    return null;
  }

  const teachersInRoom = teachers.filter(t => t.roomId === room.id);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{room.name} 배정된 선생님</h2>
          <p>{room.location}에 배정된 선생님 목록입니다.</p>
        </div>
        <div className="modal-content">
          <div className="teacher-list">
            {teachersInRoom.length > 0 ? (
              teachersInRoom.map((teacher, index) => (
                <div key={index} className="teacher-item-simple">
                  <div className="avatar">
                    <span>{teacher.name ? teacher.name.charAt(0) : teacher.email.charAt(0)}</span>
                  </div>
                  <div className="teacher-details">
                    <p className="teacher-name">{teacher.name || '이름 없음'}</p>
                    <p className="teacher-email">{teacher.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <UsersIcon />
                <p>배정된 선생님이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ViewRoomTeachersModal);