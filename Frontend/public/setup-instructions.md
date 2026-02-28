# FitnessSharks Frontend-Backend Connection Setup

## Overview
This setup provides a complete connection between your React frontend and Node.js backend. The files created include API configuration, service layer, authentication context, and custom hooks.

## Files Created

1. **api-config.js** - Configuration file with all API endpoints and settings
2. **api-service.js** - Service layer that handles all API calls to your backend
3. **auth-context.js** - React Context for managing authentication state
4. **hooks-api.js** - Custom React hooks for easy data fetching
5. **example-usage.jsx** - Examples of how to use the API in your components

## Installation Steps

### 1. Move Files to Correct Location
Move all the created files from the `public` folder to your `src` folder:
```bash
# Navigate to your project root (E:\NSBM\DFA\Group Assignment\Frontend)
cd ..
# Move files from public to src
move public\api-config.js src\
move public\api-service.js src\
move public\auth-context.js src\
move public\hooks-api.js src\
move public\example-usage.jsx src\
```

### 2. Update Your Backend URL
Edit `src/api-config.js` and update the BASE_URL to match your backend:
```javascript
BASE_URL: 'http://localhost:5000/api', // Change this to your backend URL
```

### 3. Install Required Dependencies
```bash
npm install axios  # Optional: if you prefer axios over fetch
```

### 4. Update Your App.js
Wrap your app with the AuthProvider:
```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth-context';
import Navigation from './components/Navigation';
// ... other imports

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            {/* Your routes */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
```

## Backend Requirements

Your backend should have the following endpoints:

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password

### Workout Endpoints
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get specific workout
- `POST /api/workouts` - Create new workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout
- `GET /api/workouts/user/:userId` - Get user's workouts

### Progress Endpoints
- `GET /api/progress/user/:userId` - Get user progress
- `POST /api/progress` - Add progress entry
- `PUT /api/progress/:id` - Update progress entry

### Gym Endpoints
- `GET /api/gym/info` - Get gym information
- `GET /api/gym/tours` - Get available tours
- `POST /api/gym/book-tour` - Book a tour

### Blog Endpoints
- `GET /api/blog/articles` - Get all articles
- `GET /api/blog/articles/:id` - Get specific article

### Contact Endpoints
- `POST /api/contact/send` - Send contact message

## Usage Examples

### 1. Using Authentication
```jsx
import { useAuth } from './auth-context';

function LoginPage() {
  const { login, isLoading, error } = useAuth();
  
  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      // Redirect to dashboard
    } catch (err) {
      // Handle error
    }
  };
}
```

### 2. Fetching Data
```jsx
import { useWorkouts } from './hooks-api';

function WorkoutsPage() {
  const { data: workouts, loading, error } = useWorkouts();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {workouts.map(workout => (
        <div key={workout.id}>{workout.name}</div>
      ))}
    </div>
  );
}
```

### 3. Creating Data
```jsx
import { useCreateWorkout } from './hooks-api';

function CreateWorkoutForm() {
  const { createWorkout, loading } = useCreateWorkout();
  
  const handleSubmit = async (workoutData) => {
    try {
      await createWorkout(workoutData);
      // Show success message
    } catch (err) {
      // Handle error
    }
  };
}
```

## CORS Configuration

Make sure your backend has CORS configured to allow requests from your frontend:

```javascript
// In your backend (Express.js example)
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
}));
```

## Environment Variables

Create a `.env` file in your frontend root:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Then update `api-config.js`:
```javascript
BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
```

## Testing the Connection

1. Start your backend server
2. Start your frontend: `npm start`
3. Check browser console for any connection errors
4. Test login/registration functionality first
5. Verify API calls in browser Network tab

## Troubleshooting

### Common Issues:
1. **CORS errors** - Configure CORS in your backend
2. **404 errors** - Check if backend endpoints match the configuration
3. **Authentication errors** - Verify JWT token handling in backend
4. **Network errors** - Check if backend server is running

### Debug Tips:
- Use browser DevTools Network tab to monitor API calls
- Check console for error messages
- Verify backend server logs
- Test API endpoints directly with Postman/Thunder Client

## Next Steps

1. Move the files to the correct `src` directory
2. Update the API configuration with your backend URL
3. Implement the backend endpoints
4. Test the connection
5. Integrate with your existing components

The setup provides a complete, production-ready connection between your frontend and backend with proper error handling, authentication, and data management.