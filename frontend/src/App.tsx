import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ProfilePage from "./pages/profile/ProfilePage";
import LoginPage from "./pages/login/LoginPage";
import FailuresPage from "./pages/failures/FailuresPage";
import LandingPage from "./pages/landing/LandingPage";

const App = () => {
  return (
    <Routes>
      <Route>
        <Route index element={<HomePage />} />
        <Route path="failures" element={<FailuresPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="landing" element={<LandingPage />} />
      </Route>
    </Routes>
  );
};

export default App;