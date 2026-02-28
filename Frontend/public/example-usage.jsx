// Example Usage - How to use the API connection in your React components

import React, { useState } from 'react';
import { useAuth } from './auth-context.js';
import { 
  useWorkouts, 
  useUserProgress, 
  useCreateWorkout, 
  useSendContactMessage 
} from './hooks-api.js';

// Example 1: Login Component
function LoginComponent() {
  const { login, isLoading, error } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      // Redirect to dashboard or show success message
    } catch (err) {
      // Error is handled by the auth context
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

// Example 2: Workout Plans Component
function WorkoutPlansComponent() {
  const { data: workouts, loading, error, refetch } = useWorkouts();
  const { createWorkout, loading: creating } = useCreateWorkout();

  const handleCreateWorkout = async (workoutData) => {
    try {
      await createWorkout(workoutData);
      refetch(); // Refresh the workout list
    } catch (err) {
      console.error('Failed to create workout:', err);
    }
  };

  if (loading) return <div>Loading workouts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Workout Plans</h2>
      {workouts?.map(workout => (
        <div key={workout.id} className="workout-card">
          <h3>{workout.name}</h3>
          <p>{workout.description}</p>
          <p>Duration: {workout.duration} minutes</p>
        </div>
      ))}
      
      <button 
        onClick={() => handleCreateWorkout({
          name: 'New Workout',
          description: 'Sample workout',
          duration: 30
        })}
        disabled={creating}
      >
        {creating ? 'Creating...' : 'Add New Workout'}
      </button>
    </div>
  );
}

// Example 3: Progress Tracker Component
function ProgressTrackerComponent() {
  const { user } = useAuth();
  const { data: progress, loading, error } = useUserProgress(user?.id);

  if (loading) return <div>Loading progress...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Your Progress</h2>
      {progress?.map(entry => (
        <div key={entry.id} className="progress-entry">
          <p>Date: {new Date(entry.date).toLocaleDateString()}</p>
          <p>Weight: {entry.weight} kg</p>
          <p>Exercise: {entry.exercise}</p>
          <p>Reps: {entry.reps}</p>
        </div>
      ))}
    </div>
  );
}

// Example 4: Contact Form Component
function ContactFormComponent() {
  const { sendMessage, loading, error } = useSendContactMessage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendMessage(formData);
      setFormData({ name: '', email: '', message: '' });
      alert('Message sent successfully!');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      <textarea
        placeholder="Message"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

// Example 5: App.js setup with AuthProvider
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/workouts" element={<WorkoutPlansComponent />} />
          <Route path="/progress" element={<ProgressTrackerComponent />} />
          <Route path="/contact" element={<ContactFormComponent />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;