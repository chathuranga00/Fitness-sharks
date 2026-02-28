import './App.css';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from "./pages/HomePage.jsx";

import WorkoutPlans from "./pages/WorkoutPlans.jsx";
import AuthPage from "./pages/Login.jsx";
import ExerciseLibrary from "./pages/ExerciseLibrary.jsx";
import Trainers from "./pages/Trainers.jsx";
import Profile from "./pages/Profile.jsx";
import CommunityForum from "./pages/CommunityForum.jsx";
import NutritionGuide from "./pages/NutritionGuide.jsx";
import TermsPage from "./pages/Terms.jsx";
import PrivacyPage from "./pages/Privacy.jsx";
import CookiesPage from "./pages/Cookies.jsx";
import LicensePage from "./pages/License.jsx";

import DayPassPage from "./pages/DayPass.jsx";
import MonthlyPage from "./pages/Monthly.jsx";
import AnnualPage from "./pages/Annual.jsx";
import AboutPage from "./pages/About.jsx";
import CareersPage from "./pages/Careers.jsx";
import CareerApplication from "./pages/CareerApplication.jsx";
import ContactPage from "./pages/Contact.jsx";
import PressPage from "./pages/Press.jsx";

import AdminPanel from "./pages/AdminPanel.jsx";
import TourOurGym from "./pages/TourOurGym.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import BackendConnectionTest from "./components/BackendConnectionTest.jsx";
import ApiTest from "./pages/ApiTest.jsx";
import Subscribe from "./pages/Subscribe.jsx";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
        <BackendConnectionTest />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workout-plans" element={<WorkoutPlans />} />
          <Route path="/exercise-library" element={<ExerciseLibrary />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage defaultMode="signup" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/community-forum" element={<CommunityForum />} />
          <Route path="/nutrition-guide" element={<NutritionGuide />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/license" element={<LicensePage />} />

          <Route path="/day-pass" element={<DayPassPage />} />
          <Route path="/monthly" element={<MonthlyPage />} />
          <Route path="/annual" element={<AnnualPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/career-application/:jobId" element={<CareerApplication />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/press" element={<PressPage />} />

          <Route path="/tour-our-gym" element={<TourOurGym />} />
          <Route path="/admin-dashboard" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPanel />
            </ProtectedRoute>
          } />
          <Route path="/api-test" element={<ApiTest />} />
          <Route path="/subscribe/:planId" element={<Subscribe />} />
        </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;