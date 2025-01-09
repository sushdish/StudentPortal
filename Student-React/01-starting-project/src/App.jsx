import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthInputs from "./components/AuthInputs.jsx";
import Header from "./components/Header.jsx";

import Profile from "./components/Profile.jsx";
import Topics from "./components/Topics.jsx";
import Progress from "./components/Progress.jsx";

export default function App() {
  return (
    <Router>
      <>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<AuthInputs />} />

            <Route path="/profilePage" element={<Profile />} />
            <Route path="/topicsPage" element={<Topics />} />
            <Route path="/progressPage" element={<Progress />} />
          </Routes>
        </main>
      </>
    </Router>
  );
}
