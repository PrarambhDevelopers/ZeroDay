import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegistrationForm from "./pages/RegistrationForm";
import Footer from "./components/Footer";

function App() {
  const sylink ="https://forms.gle/eaA36YZaA3TJ4qB38";
  const tylink ="https://forms.gle/eaA36YZaA3TJ4qB38";
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/syregister" element={<RegistrationForm link={sylink} status={"not_started"} />} />
          <Route path="/tyregister" element={<RegistrationForm link={tylink} status={"not_started"} />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
