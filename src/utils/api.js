const BASE_URL = "/api/admin";

/**
 * API 요청 처리하는 범용 클라이언트 함수
 * @param {string} endpoint - API 엔드포인트
 * @param {object} [options={}] - fetch 요청에 대한 옵션 (method, body 등)
 * @returns {Promise<any>} - API 응답 데이터
 * @throws {Error} - API 요청 실패 시 에러
 */

const apiClient = async (endpoint, options = {}) => {
  const { method = "GET", body, ...customConfig } = options;

  const headers = { "Content-Type": "application/json" };

  const config = {
    method,
    headers,
    ...customConfig,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.detail?.[0]?.msg ||
        response.statusText ||
        "API 요청에 실패했습니다.";
      throw new Error(errorMessage);
    }

    if (
      response.status === 204 ||
      response.headers.get("content-length") === "0"
    ) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("API Client Error:", error);
    throw error;
  }
};

/**
 * 모든 선생님 목록 가져옴
 * @returns {Promise<Array>}
 */
export const getTeachers = () => {
  return apiClient("/teacher");
};

/**
 * 새 선생님 추가
 * @param {string} email - 추가할 선생님의 이메일
 * @returns {Promise<any>}
 */
export const addTeacher = (email) => {
  return apiClient(`/teacher?user_email=${encodeURIComponent(email)}`, {
    method: "POST",
  });
};

/**
 * 선생님 삭제
 * @param {string} email - 삭제할 선생님의 이메일
 * @returns {Promise<any>}
 */
export const deleteTeacher = (email) => {
  return apiClient(`/teacher?user_email=${encodeURIComponent(email)}`, {
    method: "DELETE",
  });
};

/**
 * 선생님 정보 수정
 * @param {string} email - 수정할 선생님의 이메일
 * @param {object} data - 수정할 정보 { name }
 * @returns {Promise<any>}
 */
// TODO: 선생님 정보 수정을 위한 PUT /teacher/{user_email} 엔드포인트 구현
export const updateTeacher = (email, data) => {
  return apiClient(`/teacher/${email}`, {
    method: "PUT",
    body: data,
  });
};

/**
 * 선생님을 교무실에 배정
 * @param {string} email - 배정할 선생님의 이메일
 * @param {number | null} roomId - 배정할 교무실 ID (null은 미배정임)
 * @returns {Promise<any>}
 */
// TODO: 교무실 배정을 위한 POST /teacher/assign-room 엔드포인트 구현
export const assignRoomToTeacher = (email, roomId) => {
  return apiClient("/teacher/assign-room", {
    method: "POST",
    body: {
      user_email: email,
      room_id: roomId,
    },
  });
};

/**
 * 모든 교무실 목록을 가져옴
 * @returns {Promise<Array>}
 */
export const getRooms = () => {
  return apiClient("/room");
};

/**
 * 새 교무실 추가
 * @param {object} roomData - { id, name, location, description }
 * @returns {Promise<any>}
 */
export const addRoom = (roomData) => {
  const params = new URLSearchParams(roomData);
  return apiClient(`/room?${params.toString()}`, {
    method: "POST",
  });
};

/**
 * 교무실 삭제
 * @param {number} id - 삭제할 교무실 ID
 * @returns {Promise<any>}
 */
// TODO: 교무실 삭제를 위한 DELETE /room/{id} 엔드포인트 구현
export const deleteRoom = (id) => {
  return apiClient(`/room/${id}`, {
    method: "DELETE",
  });
};

/**
 * 교무실 정보 수정
 * @param {number} id - 수정할 교무실 ID
 * @param {object} roomData - 수정할 정보 { name, location, description }
 * @returns {Promise<any>}
 */
export const updateRoom = (id, roomData) => {
  const params = new URLSearchParams(roomData);
  return apiClient(`/room/${id}?${params.toString()}`, {
    method: "PUT",
  });
};
