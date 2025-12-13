import React, { memo } from "react";
import {
  UsersIcon,
  PlusIcon,
  UserCheckIcon,
  EditIcon,
  TrashIcon,
} from "./icons";

const TeacherTab = ({
  newTeacher,
  setNewTeacher,
  onAddTeacher,
  teachers,
  loading,
  getRoomName,
  setModal,
  removeTeacher,
}) => {
  return (
    <div className="tab-content">
      <div className="card">
        <div className="card-header">
          <h2>새 선생님 추가</h2>
          <p>시스템에 새로운 선생님을 등록합니다.</p>
        </div>
        <div className="card-content">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="teacher-name">선생님 성함</label>
              <input
                id="teacher-name"
                type="text"
                placeholder="선생님 성함을 입력하세요"
                value={newTeacher.name}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="teacher-email">이메일 주소</label>
              <input
                id="teacher-email"
                type="email"
                placeholder="학교 이메일 계정(@sunrint.hs.kr)으로 연동해주세요"
                value={newTeacher.email}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, email: e.target.value })
                }
              />
            </div>
          </div>
          <button
            className="btn-primary"
            onClick={onAddTeacher}
            disabled={loading}
          >
            <PlusIcon />
            {loading ? "추가 중..." : "선생님 추가"}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>등록된 선생님 목록</h2>
          <p>현재 시스템에 등록된 선생님들을 관리합니다.</p>
        </div>
        <div className="card-content">
          <div className="teacher-list">
            {teachers.length === 0 ? (
              <div className="empty-state">
                <UsersIcon />
                <p>{loading ? "로딩 중..." : "등록된 선생님이 없습니다."}</p>
              </div>
            ) : (
              teachers.map((teacher, index) => (
                <div key={index} className="teacher-item">
                  <div className="teacher-info">
                    <div className="avatar">
                      <span>
                        {teacher.name
                          ? teacher.name.charAt(0)
                          : teacher.email.charAt(0)}
                      </span>
                    </div>
                    <div className="teacher-details">
                      <p className="teacher-name">
                        {teacher.name || "이름 없음"}
                      </p>
                      <p className="teacher-email">{teacher.email}</p>
                      <p className="teacher-room">
                        📍 {getRoomName(teacher.roomId)}
                      </p>
                    </div>
                  </div>
                  <div className="teacher-actions">
                    <button
                      className="btn-icon"
                      onClick={() =>
                        setModal({ type: "ASSIGN_ROOM", data: teacher })
                      }
                      disabled={loading}
                    >
                      <UserCheckIcon />
                    </button>
                    <button
                      className="btn-icon"
                      onClick={() =>
                        setModal({ type: "EDIT_TEACHER", data: teacher })
                      }
                      disabled={loading}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="btn-icon btn-danger"
                      onClick={() => removeTeacher(teacher.email)}
                      disabled={loading}
                    >
                      <TrashIcon />
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

export default memo(TeacherTab);
