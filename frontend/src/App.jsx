import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
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

// Component to handle route changes and cleanup
function RouteHandler() {
  const location = useLocation();
  
  // Use layoutEffect for immediate cleanup before render
  useLayoutEffect(() => {
    // Kill all ScrollTrigger instances when route changes
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Clear all GSAP transforms on common elements
    gsap.set(".floating", { clearProps: "all" });
    gsap.set(".day-section", { clearProps: "all" });
    gsap.set("*", { clearProps: "transform" }); // Nuclear option for any transforms
    
    // Force refresh ScrollTrigger
    ScrollTrigger.refresh();
    
    // Reset scroll position for new routes
    if (location.pathname !== "/") {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <>
        <RouteHandler />
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
