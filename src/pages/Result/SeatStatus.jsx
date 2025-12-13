import React from 'react';

const SeatStatus = ({ isPresent, teacherName, description }) => {
  // 테스트용으로 일단 이렇게 해놓음. 나중에는 관리자가 드래그 앤 드롭으로 교무실 좌석 배치도 만들게 할 거임
  const seatLayout = [
    ['김민기', '장광재', teacherName],
    ['이수영', '', '이한규'],
    ['김태헌', '박지혜', '김은']
  ];

  return (
    <div className="seat-grid-container">
      <div className="seat-grid">
        {seatLayout.flat().map((seat, index) => (
          <div 
            key={index} 
            className={`seat ${seat === teacherName ? 'current-teacher' : seat === '' ? 'empty' : ''}`}
          >
            {seat || ''}
          </div>
        ))}
      </div>

      <div className="status-container">
        <h2 className="status-header">{teacherName} 선생님</h2>
        <div className="status-info">
          <div className="status-bullet">
            <span className={`status-text ${isPresent ? 'status-present' : 'status-absent'}`}>
              자리 비움 상태: {isPresent ? '현재 자리에 계세요' : '현재 자리를 비우셨어요'}
            </span>
          </div>
          {description && (
            <div className="status-bullet">
              <span className="status-text">
                {description}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatStatus;