import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

import Footer from "./components/Footer";
import TyForm from "./pages/TyForm";
import SyForm from "./pages/SyForm";
function App() {

  return (
    <Router>
      <>
        <Routes>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/syregister" element={<SyForm status={"not_started"} />} />
          <Route path="/tyregister" element={<TyForm status={"not_started"} />} />
          <Route path="*" element={<div>404 Page Not Found</div>} />
       
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
