import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Play from './pages/Play';
import Profile from './pages/Profile';
import { QuizComponent } from './pages/Quiz';
import { ProjectSubmissionForm } from './pages/Projects';
import Login from './pages/Login';
import ProtectedRoutes from './pages/ProtectedRoutes';
import { QuizList } from './pages/QuizList';
import VideoLesson from './pages/VideoContent';

function App() {
  return (
    <>
      {/* Display Navbar only on protected routes */}
      <Routes>
        <Route
          path="*"
          element={
            <ProtectedRoutes>
              {/* Render Navbar for authenticated routes */}
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/play" element={<VideoLesson/>} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/quiz" element={<QuizComponent />} />
                  <Route path="/projects" element={<ProjectSubmissionForm />} />
                  <Route path="/quiz_list" element={<QuizList/>} />
             

                </Routes>
              </>
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
