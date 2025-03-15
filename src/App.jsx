import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

import Footer from "./components/Footer";
import TyForm from "./pages/TyForm";
import SyForm from "./pages/SyForm";
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
          <Route path="/home" element={<LandingPage />} />
          {/* <Route path="/syregister" element={<SyForm status={"not_started"} />} />
          <Route path="/tyregister" element={<TyForm status={"not_started"} />} /> */}
     
          <Route path="*" element={<div>404 Page Not Found</div>} />
       
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
