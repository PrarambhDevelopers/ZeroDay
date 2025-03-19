import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { Analytics } from "@vercel/analytics/react"
import Footer from "./components/Footer";
// import TyForm from "./pages/TyForm";
// import SyForm from "./pages/SyForm";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Submission from "./pages/Submission";
import Leaderboard from './pages/Leaderboard'; // ✅ CORRECT (no curly braces)
import Profile from './pages/Profile'; // ✅ CORRECT (no curly braces)


function App() {
  //TY
//https://docs.google.com/forms/d/e/1FAIpQLSdTiZCA4jIS1uEMRi4BKfjS8Kc0KAx5jUkPv1QNM6CRc-MFCA/viewform?usp=sharing 

//SY
// https://docs.google.com/forms/d/e/1FAIpQLSfVhOkY5lYq-bwk8X7SnrJzF7emW9DgNqGKCDBouUdjILXHBA/viewform?usp=sharing
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/syregister" element={<SyForm status={"not_started"} />} />
          <Route path="/tyregister" element={<TyForm status={"not_started"} />} /> */}
          <Route path="/hackwars_login" element={<Login/>} />
          <Route path="/hackwars_dashboard" element={<Dashboard/>} />
          <Route path="/flag-submit" element={<Submission/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="*" element={<NotFound/>} />
       
        </Routes>
        <Footer />
        <Analytics/>
      </>
    </Router>
    
  );
}

export default App;
