import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import ExerciseLibrary from "./pages/ExerciseLibrary.jsx";

function HomeWrapper() {
  const navigate = useNavigate();
  const navigateTo = (to) => {
    // allow either 'exercise-library' or '/exercise-library'
    const path = to.startsWith('/') ? to : `/${to}`;
    navigate(path);
  };
  return <HomePage navigateTo={navigateTo} />;
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercise-library" element={<ExerciseLibraryWrapper />} />
      </Routes>
    </Router>
  );
}

function ExerciseLibraryWrapper() {
  const navigate = useNavigate();
  const navigateTo = (to) => {
    const path = to.startsWith('/') ? to : `/${to}`;
    navigate(path);
  };
  return <ExerciseLibrary navigateTo={(page) => navigate('/')} />;
}

export default App;