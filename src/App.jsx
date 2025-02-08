import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { QuizComponent } from './pages/Quiz';
import { ProjectSubmissionForm } from './pages/Projects';
import Login from './pages/Login';
import ProtectedRoutes from './pages/ProtectedRoutes';
import { QuizList } from './pages/QuizList';
import VideoLesson from './pages/VideoContent';
import InstructionsPage from './pages/Instructions';
import CourseDashboard from './pages/CourseDasboard';


function App() {
  return (
    <>

      <Routes>
        <Route
          path="*"
          element={
            <ProtectedRoutes>
              {/* Render Navbar for authenticated routes */}
              <MainLayout />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/play" element={<VideoLesson />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/quiz" element={<QuizComponent />} />
                <Route path="/projects" element={<ProjectSubmissionForm />} />
                <Route path="/quiz_list" element={<QuizList />} />
                <Route path="/instructions" element={<InstructionsPage />} />
                <Route path="/c" element={<CourseDashboard/>} />

              </Routes>
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
