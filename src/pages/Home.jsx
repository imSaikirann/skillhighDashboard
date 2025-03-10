import React, { useState, useEffect } from 'react';
import { useData } from '../store/DataContext';
import { useNavigateToPlay } from '../utils/navigateUtils';
import Spinner from '../components/Spinner';
import { gradientStyle } from '../components/ButtonGradient';
import axios from '../config/axiosConfig';
import { Rocket } from '../assets/icons/icons';

// Lazy loading the Alert component
const Alert = React.lazy(() => import('../components/Alert')); // dynamically import Alert

export default function Home() {
  const { fetchUserData, fetchUserEnrolledCourses, enrolledCourses, loading, isModalOpen, setIsModalOpen, profileData,setAlert } = useData();

  // State for Modal
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // Call the custom hook inside the functional component
  const navigateToPlay = useNavigateToPlay();

  useEffect(() => {
    fetchUserData();
    fetchUserEnrolledCourses();
  }, []);

  // Refactor handleCourseId to use the navigate function
  const handleCourseId = (courseId) => {
    if (courseId) {
      navigateToPlay(courseId); // Pass the courseId through state, not URL
    } else {
      console.error('Course ID is undefined or invalid.');
    }
  };

  // update details
  const handleSaveDetails = async () => {
    try {
      const response = await axios.post('/dashboardUsers/set-password', { name, password });
      if(response.data.success)
      {
        setIsModalOpen(false); 
        setAlert({ message: response.data.message, isVisible: true });
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        // Check if error response contains validation errors
        if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
          // Join all validation errors into a single string
          const errorMessages = error.response.data.errors.map((err) => err.message).join(', ');
  
          setAlert({
            message: errorMessages,
            isVisible: true
          });
        } else {
          // Fallback message if no detailed error messages are found
          setAlert({
            message: error.response.data.message || 'Details updating failed. Please try again.',
            isVisible: true
          });
        }
      } else {
        // Handle other types of errors (network errors, etc.)
        setAlert({
          message: 'An error occurred. Please try again.',
          isVisible: true
        });
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen  dark:bg-darkBg py-12 px-4 sm:px-6 lg:px-8 mt-20">

      {/* Greeting and User Info */}
      <div className=" text-center sm:text-left max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">Welcome, {profileData.userName} 👋🏻</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Here are the courses you are enrolled in to enhance your skills!
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
       <Alert />

          <div className="bg-white dark:bg-darkBg rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Set Your Details
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveDetails}
                  disabled={loading}
                  className="bg-primary text-white py-2 px-4 rounded-lg mr-2"
                >
                  {loading ? "Please Wait":"Done"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enrolled Courses Section */}
      <div className="max-w-7xl mx-auto mb-12">
  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
    Your Enrolled Courses
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {enrolledCourses && enrolledCourses.length > 0 ? (
      enrolledCourses.map((course) => (
        <div
          key={course.id}
          className="bg-white dark:bg-dark rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out dark:border-2 dark:border-dark"
        >
          {/* Full Width and Height Image */}
          <div className="relative w-full h-72 sm:h-80 md:h-96 lg:h-72">
            <img
              src={course.courseThumbnail}
              alt={course.courseName}
              className="w-full h-full object-cover rounded-t-lg"
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-darkBg dark:text-white">
              {course.courseName}
            </h3>
            
            {/* Button logic based on topicCount */}
            <button
              style={gradientStyle}
              onClick={() => handleCourseId(course.id)}
              className={`mt-4 text-sm sm:text-md text-white py-2 px-4 rounded-lg flex items-center justify-center ${
                course.topicCount === 0 ? 'bg-gray-400 cursor-not-allowed' : ''
              }`}
              disabled={course.topicCount === 0}
              aria-label={`Go to Course ${course.name || course.id}`}
            >
              {course.topicCount === 0
                ? 'Lessons will be updated soon..'
                : 'Go to Course'}
              {/* Remove the Rocket icon if topicCount is 0 */}
              {course.topicCount > 0 && <Rocket />}
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-600 dark:text-gray-400">No enrolled courses yet!</p>
    )}
  </div>
</div>
    </div>
  );
}
