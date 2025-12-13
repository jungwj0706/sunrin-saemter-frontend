import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import logoIcon from "../../assets/logo/logo.svg";
import "../../styles/pages/admin.css";

import { useTeachers } from "./hooks/useTeachers";
import { useRooms } from "./hooks/useRooms";

import { UsersIcon, BuildingIcon } from "./components/icons";
import {
  EditTeacherModal,
  AssignRoomModal,
  EditRoomModal,
  ViewRoomTeachersModal,
} from "./components/modals";
import TeacherTab from "./components/TeacherTab";
import RoomTab from "./components/RoomTab";

const AdminPage = () => {
  const {
    teachers,
    loading: teachersLoading,
    error: teachersError,
    fetchTeachers,
    addTeacher,
    removeTeacher,
    updateTeacher,
    assignRoom,
    clearError: clearTeachersError,
  } = useTeachers([]);

  const {
    rooms,
    loading: roomsLoading,
    error: roomsError,
    fetchRooms,
    addRoom: handleAddRoom,
    removeRoom: handleRemoveRoom,
    updateRoom: handleUpdateRoom,
    clearError: clearRoomsError,
  } = useRooms([]);

  const loading = teachersLoading || roomsLoading;
  const error = teachersError || roomsError;

  const [activeTab, setActiveTab] = useState("teachers");
  const [newTeacher, setNewTeacher] = useState({ name: "", email: "" });
  const [newRoom, setNewRoom] = useState({
    id: "",
    name: "",
    location: "",
    description: "",
  });

  const [modal, setModal] = useState({ type: null, data: null });

  const closeModal = () => setModal({ type: null, data: null });

  const clearError = () => {
    if (teachersError) clearTeachersError();
    if (roomsError) clearRoomsError();
  };

  const onAddTeacher = () => {
    addTeacher(newTeacher.email).then(() => {
      setNewTeacher({ name: "", email: "" });
    });
  };

  const onAddRoom = () => {
    handleAddRoom(newRoom).then(() => {
      setNewRoom({ id: "", name: "", location: "", description: "" });
    });
  };

  const onUpdateTeacher = (teacherData) => {
    if (!teacherData) return;

    updateTeacher(teacherData.email, { name: teacherData.name }).then(() => {
      closeModal();
    });
  };

  const onUpdateRoom = (roomData) => {
    if (!roomData) return;

    const { id, ...data } = roomData;
    handleUpdateRoom(id, data).then(() => {
      closeModal();
    });
  };

  const onAssignRoom = (teacher, roomId) => {
    if (!teacher) return;

    const finalRoomId = roomId === "0" ? null : parseInt(roomId);

    assignRoom(teacher.email, finalRoomId).then(() => {
      closeModal();
    });
  };

  const getRoomName = useCallback(
    (roomId) => {
      if (!roomId) return "미배정";
      const room = rooms.find((r) => r.id === roomId);
      return room ? room.name : "미배정";
    },
    [rooms],
  );

  useEffect(() => {
    fetchTeachers();
    fetchRooms();
  }, [fetchTeachers, fetchRooms]);

  return (
    <div className="admin-container">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/">
              <img
                src={logoIcon}
                alt="Sunrin Saemter Logo"
                className="header-logo-icon"
              />
            </Link>
          </div>
          <div className="badge">Admin Dashboard</div>
        </div>
      </header>

      <main className="main-content">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={clearError}>×</button>
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <h3>총 선생님 수</h3>
              <UsersIcon />
            </div>
            <div className="stat-content">
              <div className="stat-number blue">{teachers.length}명</div>
              <p>현재 시스템에 등록된 선생님 수</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3>총 교무실 수</h3>
              <BuildingIcon />
            </div>
            <div className="stat-content">
              <div className="stat-number green">{rooms.length}개</div>
              <p>관리 중인 교무실 수</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3>시스템 상태</h3>
              <div className="status-dot"></div>
            </div>
            <div className="stat-content">
              <div className="stat-number green">
                {loading ? "로딩 중" : "정상"}
              </div>
              <p>
                {loading
                  ? "데이터를 불러오는 중..."
                  : "모든 서비스가 정상 작동 중"}
              </p>
            </div>
          </div>
        </div>

        <div className="tabs-container">
          <div className="tabs-list">
            <button
              className={`tab ${activeTab === "teachers" ? "active" : ""}`}
              onClick={() => setActiveTab("teachers")}
            >
              <UsersIcon />
              <span>선생님 관리</span>
            </button>
            <button
              className={`tab ${activeTab === "rooms" ? "active" : ""}`}
              onClick={() => setActiveTab("rooms")}
            >
              <BuildingIcon />
              <span>교무실 관리</span>
            </button>
          </div>

          {activeTab === "teachers" && (
            <TeacherTab
              newTeacher={newTeacher}
              setNewTeacher={setNewTeacher}
              onAddTeacher={onAddTeacher}
              teachers={teachers}
              loading={loading}
              getRoomName={getRoomName}
              setModal={setModal}
              removeTeacher={removeTeacher}
            />
          )}

          {activeTab === "rooms" && (
            <RoomTab
              newRoom={newRoom}
              setNewRoom={setNewRoom}
              onAddRoom={onAddRoom}
              rooms={rooms}
              loading={loading}
              setModal={setModal}
              handleRemoveRoom={handleRemoveRoom}
              teachers={teachers}
            />
          )}
        </div>
      </main>

      <EditTeacherModal
        isOpen={modal.type === "EDIT_TEACHER"}
        onClose={closeModal}
        onConfirm={onUpdateTeacher}
        teacher={modal.data}
        loading={loading}
      />

      <AssignRoomModal
        isOpen={modal.type === "ASSIGN_ROOM"}
        onClose={closeModal}
        onConfirm={onAssignRoom}
        teacher={modal.data}
        rooms={rooms}
        loading={loading}
      />

      <EditRoomModal
        isOpen={modal.type === "EDIT_ROOM"}
        onClose={closeModal}
        onConfirm={onUpdateRoom}
        room={modal.data}
        loading={loading}
      />

      <ViewRoomTeachersModal
        isOpen={modal.type === "VIEW_ROOM_TEACHERS"}
        onClose={closeModal}
        room={modal.data}
        teachers={teachers}
      />
    </div>
  );
};

export default AdminPage;
