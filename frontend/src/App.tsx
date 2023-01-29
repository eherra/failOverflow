import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ProfilePage from "./pages/profile/ProfilePage";
import LoginPage from "./pages/auth/pages/login/LoginPage";
import FailuresPage from "./pages/failures/FailuresPage";
import LandingPage from "./pages/landing/LandingPage";
import RegisterPage from "./pages/auth/pages/register/RegisterPage";
import ProfileEditPage from "./pages/profile/pages/ProfileEditPage";
import ProfileOverviewPage from "./pages/profile/pages/ProfileOverviewPage";

const App = () => {
  return (
    <Routes>
      <Route>
        <Route index element={<HomePage />} />
        <Route path="failures" element={<FailuresPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="landing" element={<LandingPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="profile/overview" element={<ProfileOverviewPage />} />
        <Route path="profile/edit" element={<ProfileEditPage />} />
      </Route>
    </Routes>
  );
};

export default App;