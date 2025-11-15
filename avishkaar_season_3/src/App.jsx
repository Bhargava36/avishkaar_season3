import "./App.css";
import About from "./Components/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardSwapDemo from "./Components/CardSwapDemo";
import GradualBlurMemo from "./Components/GradualBlurMemo";
import { ParallaxProvider } from "react-scroll-parallax";
import ThemeWithFilter from "./Components/ThemeWithFilter";
// import CustomCursorPage from "./Components/CustomCursorPage";
import Navbar from "./Components/Navbar";
import Globe from "./Components/Globe";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Login from "./Components/Login";
import Tracks from "./Components/Tracks";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useLocation } from "react-router-dom";
import SignUp from "./Components/Signup";
import UsersDashboard from "./Pages/Users/UsersDashboard";
import ForgotPassword from "./Pages/Users/ForgetPassword";
import Activation from "./Pages/Users/Activation";
import ResetPassword from "./Pages/Users/ResetPassword";
import UsersOverview from "./Pages/Users/usersOverview";
import TeamOverview from "./Pages/Users/TeamOverview";
import AdminRegistration from "./Pages/Admin/AdminRegistration";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminForgot from "./Pages/Admin/AdminForgot";
import AbstractSubmission from "./Pages/Users/AbstractSubmission";
import AdminOverview from "./Pages/Admin/AdminOverview";
import ImportantDates from "./Pages/Admin/ImportantDates";
import Themes from "./Pages/Admin/Themes";
import TeamMembers from "./Pages/Admin/TeamMembers";
import TeamPage from "./Components/TeamPage";
import RegisteredTeams from "./Pages/Admin/RegisteredTeams";
import Preloader3D from "./Components/Preloader3D";
import TrackSwitch from "./Components/TrackSwitch";
import ScrollToTop from "./Components/ScrollToTop";
import AdminsTeamOverview from "./Pages/Admin/AdminsTeamOverview";
import AdminAbstractOverview from "./Pages/Admin/AdminAbstractOverview";
import AdminAbstractResults from "./Pages/Admin/AdminAbstractResults";
import AdminAbstractsList from "./Pages/Admin/AdminAbstractsList";
import AdminMentorManagement from "./Pages/Admin/AdminMentorManagement";
import AdminAccommodationManagement from "./Pages/Admin/AdminAccommodationManagement";

function App() {
  const location = useLocation();

  const hideNavbarRoutes = ["/admin", "/users"];

  const shouldHideNavbar = hideNavbarRoutes.some((path) =>
    location.pathname.startsWith(path)

  );

  return (
    <ParallaxProvider>
        {/* <Preloader3D/> */}
        <ScrollToTop />
      {!shouldHideNavbar && <Navbar />}
        {/* <UsersDashboard/> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/cards" element={<CardSwapDemo />} /> */}
          
          {/* <Route path="/globe" element={<Globe />} /> */}
          {/* <Route path="/theme" element={<ThemeWithFilter />} /> */}
          <Route path="/onlinetrack" element={<TrackSwitch defaultTrack="online" />}/>
          <Route path="/offlinetrack" element={<TrackSwitch defaultTrack="offline" />}/>
          <Route path="/tracks" element={<TrackSwitch defaultTrack="offline" />}/>

          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/activation" element={<Activation />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/admregistration" element={<AdminRegistration/>}/>
          <Route path="/admlogin" element={<AdminLogin/>}/>
          <Route path="/admforgot" element={<AdminForgot/>}/>
          <Route path="/team" element={<TeamPage/>}/>
          <Route path="/admin" element={
              <ProtectedRoute allowedRole="Admin">
                <AdminDashboard />
              </ProtectedRoute>
            }>
                  <Route path="" element={<AdminOverview />} />
                  <Route path="team/:teamId" element={<AdminsTeamOverview />} />
                  <Route path="abstract/:teamId" element={<AdminAbstractOverview />} />
                  <Route path="mentor-management" element={<AdminMentorManagement />} />
                  <Route path="abstracts-list" element={<AdminAbstractsList />} />
                  <Route path="abstract-results" element={<AdminAbstractResults />} />
                  <Route path="registered-teams" element={<RegisteredTeams />} />
                  <Route path="important-dates" element={<ImportantDates />} />
                  <Route path="themes" element={<Themes />} />
                  <Route path="team" element={<TeamMembers />} />
                  <Route path="accommodation" element={<AdminAccommodationManagement />} />
          </Route>

          <Route path="/users" element={
              <ProtectedRoute allowedRole="Team">
                <UsersDashboard />
              </ProtectedRoute>
            }>
                  <Route path="" element={<TeamOverview />} />
                  <Route path="abstract-submission" element={<AbstractSubmission />} />
                  <Route path="services" element={<Home />} />
                  <Route path="contacts" element={<Home />} />
          </Route>
        </Routes>
        
        {!shouldHideNavbar && <GradualBlurMemo/>}
        {!shouldHideNavbar && <Footer />}
      
    </ParallaxProvider>
  );
}

export default App;
