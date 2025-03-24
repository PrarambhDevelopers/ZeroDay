import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Submission from "./pages/Submission";
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLeaderboard from "./pages/AdminLeaderboard";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/hackwars_login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route 
            path="/hackwars_dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/flag-submit" 
            element={
              <ProtectedRoute>
                <Submission />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/leaderboard" 
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/1eaab48728e501291fe186e2bce9813f" 
            element={
                <AdminLeaderboard />
            } 
          />
          
          {/* Not Found */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Analytics />
      </>
    </Router>
  );
}

export default App;
