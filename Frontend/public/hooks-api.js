// Custom React Hooks for API calls - Simplifies data fetching in components
import { useState, useEffect, useCallback } from 'react';
import apiService from './api-service.js';

// Generic hook for API calls
export function useApi(apiCall, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for workout plans
export function useWorkouts() {
  return useApi(() => apiService.getAllWorkouts());
}

// Hook for user workouts
export function useUserWorkouts(userId) {
  return useApi(
    () => userId ? apiService.getUserWorkouts(userId) : Promise.resolve([]),
    [userId]
  );
}

// Hook for single workout
export function useWorkout(workoutId) {
  return useApi(
    () => workoutId ? apiService.getWorkoutById(workoutId) : Promise.resolve(null),
    [workoutId]
  );
}

// Hook for user progress
export function useUserProgress(userId) {
  return useApi(
    () => userId ? apiService.getUserProgress(userId) : Promise.resolve([]),
    [userId]
  );
}

// Hook for gym information
export function useGymInfo() {
  return useApi(() => apiService.getGymInfo());
}

// Hook for gym tours
export function useGymTours() {
  return useApi(() => apiService.getGymTours());
}

// Hook for blog articles
export function useBlogArticles() {
  return useApi(() => apiService.getAllArticles());
}

// Hook for single blog article
export function useBlogArticle(articleId) {
  return useApi(
    () => articleId ? apiService.getArticle(articleId) : Promise.resolve(null),
    [articleId]
  );
}

// Hook for mutations (POST, PUT, DELETE operations)
export function useMutation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (apiCall) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { mutate, loading, error };
}

// Specific mutation hooks
export function useCreateWorkout() {
  const { mutate, loading, error } = useMutation();
  
  const createWorkout = useCallback((workoutData) => {
    return mutate(() => apiService.createWorkout(workoutData));
  }, [mutate]);

  return { createWorkout, loading, error };
}

export function useUpdateWorkout() {
  const { mutate, loading, error } = useMutation();
  
  const updateWorkout = useCallback((id, workoutData) => {
    return mutate(() => apiService.updateWorkout(id, workoutData));
  }, [mutate]);

  return { updateWorkout, loading, error };
}

export function useDeleteWorkout() {
  const { mutate, loading, error } = useMutation();
  
  const deleteWorkout = useCallback((id) => {
    return mutate(() => apiService.deleteWorkout(id));
  }, [mutate]);

  return { deleteWorkout, loading, error };
}

export function useAddProgress() {
  const { mutate, loading, error } = useMutation();
  
  const addProgress = useCallback((progressData) => {
    return mutate(() => apiService.addProgress(progressData));
  }, [mutate]);

  return { addProgress, loading, error };
}

export function useBookTour() {
  const { mutate, loading, error } = useMutation();
  
  const bookTour = useCallback((tourData) => {
    return mutate(() => apiService.bookGymTour(tourData));
  }, [mutate]);

  return { bookTour, loading, error };
}

export function useSendContactMessage() {
  const { mutate, loading, error } = useMutation();
  
  const sendMessage = useCallback((messageData) => {
    return mutate(() => apiService.sendContactMessage(messageData));
  }, [mutate]);

  return { sendMessage, loading, error };
}