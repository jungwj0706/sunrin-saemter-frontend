import React, { memo } from "react";
import {
  BuildingIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  UsersIcon,
} from "./icons";

const RoomTab = ({
  newRoom,
  setNewRoom,
  onAddRoom,
  rooms,
  loading,
  setModal,
  handleRemoveRoom,
  teachers,
}) => {
  return (
    <div className="tab-content">
      <div className="card">
        <div className="card-header">
          <h2>새 교무실 추가</h2>
          <p>새로운 교무실을 시스템에 등록합니다.</p>
        </div>
        <div className="card-content">
          <div className="form-grid-4">
            <div className="form-group">
              <label htmlFor="room-id">교무실 ID</label>
              <input
                id="room-id"
                type="number"
                placeholder="교무실 ID를 입력하세요 (교무실을 구분할 특정한 값)"
                value={newRoom.id}
                onChange={(e) => setNewRoom({ ...newRoom, id: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="room-name">교무실 이름</label>
              <input
                id="room-name"
                type="text"
                placeholder="교무실 이름을 입력하세요"
                value={newRoom.name}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="room-location">위치</label>
              <input
                id="room-location"
                type="text"
                placeholder="교무실 위치를 입력하세요 (m호관 n층)"
                value={newRoom.location}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, location: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="room-description">설명</label>
              <input
                id="room-description"
                type="text"
                placeholder="교무실에 대한 간단한 설명을 입력하세요"
                value={newRoom.description}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, description: e.target.value })
                }
              />
            </div>
          </div>
          <button
            className="btn-primary"
            onClick={onAddRoom}
            disabled={loading}
          >
            <PlusIcon />
            {loading ? "추가 중..." : "교무실 추가"}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>교무실 목록</h2>
          <p>등록된 교무실들을 관리합니다.</p>
        </div>
        <div className="card-content">
          <div className="rooms-grid">
            {rooms.length === 0 ? (
              <div className="empty-state">
                <BuildingIcon />
                <p>{loading ? "로딩 중..." : "등록된 교무실이 없습니다."}</p>
              </div>
            ) : (
              rooms.map((room) => (
                <div key={room.id} className="room-card">
                  <div className="room-header">
                    <h3>
                      {room.name} (ID: {room.id})
                    </h3>
                    <div className="room-actions">
                      <button
                        className="btn-icon"
                        onClick={() =>
                          setModal({ type: "EDIT_ROOM", data: room })
                        }
                        disabled={loading}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="btn-icon btn-danger"
                        onClick={() => handleRemoveRoom(room.id)}
                        disabled={loading}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                  <div className="room-content">
                    <div className="room-location">
                      <BuildingIcon />
                      {room.location}
                    </div>
                    <p className="room-description">{room.description}</p>
                    <button
                      className="room-teachers-btn"
                      onClick={() =>
                        setModal({ type: "VIEW_ROOM_TEACHERS", data: room })
                      }
                    >
                      <UsersIcon />
                      {teachers.filter((t) => t.roomId === room.id).length}명
                      배정됨
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(RoomTab);
