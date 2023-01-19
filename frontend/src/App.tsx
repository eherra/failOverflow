import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Failures from "./pages/failures/Failures";
import LandingPage from "./pages/landing/LandingPage";

const App = () => {
  return (
    <Routes>
      <Route>
        <Route index element={<Home />} />
        <Route path="failures" element={<Failures />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="landing" element={<LandingPage />} />
      </Route>
    </Routes>
  );
};

export default App;