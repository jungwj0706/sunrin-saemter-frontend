import { useState, useCallback } from 'react';
import {
  getRooms,
  addRoom,
  deleteRoom,
  updateRoom,
} from '../../../utils/api';

export const useRooms = (initialState = []) => {
  const [rooms, setRooms] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRooms();
      setRooms(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddRoom = useCallback(async (roomData) => {
    if (!roomData.id || !roomData.name || !roomData.location || !roomData.description) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await addRoom(roomData);
      await fetchRooms(); // 목록 새로고침
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchRooms]);

  const handleRemoveRoom = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await deleteRoom(id);
      await fetchRooms(); // 목록 새로고침
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchRooms]);

  const handleUpdateRoom = useCallback(async (id, roomData) => {
    try {
      setLoading(true);
      setError(null);
      await updateRoom(id, roomData);
      await fetchRooms(); // 목록 새로고침
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchRooms]);
  
  const clearError = () => {
    setError(null);
  };

  return {
    rooms,
    loading,
    error,
    fetchRooms,
    addRoom: handleAddRoom,
    removeRoom: handleRemoveRoom,
    updateRoom: handleUpdateRoom,
    clearError,
  };
};
