import { useState, useCallback } from 'react';
import {
  getTeachers,
  addTeacher,
  deleteTeacher,
  updateTeacher,
  assignRoomToTeacher,
} from '../../../utils/api';

export const useTeachers = (initialState = []) => {
  const [teachers, setTeachers] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeachers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTeachers();
      setTeachers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddTeacher = useCallback(async (email) => {
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await addTeacher(email);
      await fetchTeachers(); // 목록 새로고침
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchTeachers]);

  const handleRemoveTeacher = useCallback(async (email) => {
    try {
      setLoading(true);
      setError(null);
      await deleteTeacher(email);
      await fetchTeachers(); // 목록 새로고침
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchTeachers]);

  const handleUpdateTeacher = useCallback(async (email, data) => {
    try {
      setLoading(true);
      setError(null);
      await updateTeacher(email, data);
      await fetchTeachers(); // 목록 새로고침
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchTeachers]);

  const handleAssignRoom = useCallback(async (email, roomId) => {
    try {
      setLoading(true);
      setError(null);
      await assignRoomToTeacher(email, roomId);
      await fetchTeachers(); // 목록 새로고침
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchTeachers]);
  
  const clearError = () => {
    setError(null);
  };

  return {
    teachers,
    loading,
    error,
    fetchTeachers,
    addTeacher: handleAddTeacher,
    removeTeacher: handleRemoveTeacher,
    updateTeacher: handleUpdateTeacher,
    assignRoom: handleAssignRoom,
    clearError,
  };
};
