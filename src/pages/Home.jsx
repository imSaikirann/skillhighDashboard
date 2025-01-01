import React, { useState, useEffect } from 'react';
import { useData } from '../store/DataContext';
import { useNavigateToPlay } from '../utils/navigateUtils';
import Spinner from '../components/Spinner';
import { gradientStyle } from '../components/ButtonGradient';
import axios from '../config/axiosConfig';

export default function Home() {
  const { fetchUserData, fetchUserEnrolledCourses, enrolledCourses, setData, loading ,isModalOpen,setIsModalOpen,profileData} = useData();
  const navigateToPlay = useNavigateToPlay();

  // State for Modal
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchUserData();
    fetchUserEnrolledCourses();
  }, []);

  const handleCourseId = (courseId) => {
    setData(courseId);
    navigateToPlay();
  };

  const handleSaveDetails = async () => {
    console.log('Name:', name);
    console.log('Password:', password);
    try {
      const response = await axios.post('/dashboardUsers/set-password',{name,password})
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    setIsModalOpen(false); // Close the modal
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-darkBg py-12 px-4 sm:px-6 lg:px-8 mt-20">
      {/* Greeting and User Info */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">Welcome, {profileData.userName} 👋🏻</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Here are the courses you are enrolled in to enhance your skills!
        </p>
      </div>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
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
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
                >
                  Save
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {enrolledCourses && enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-darkBg rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out dark:border-2 dark:border-dark"
              >
                <img
                  src={course.courseThumbnail}
                  alt={course.courseName}
                  className="w-full h-72 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-darkBg dark:text-white">
                    {course.courseName}
                  </h3>
                  <button
                    style={gradientStyle}
                    onClick={() => handleCourseId(course.id)}
                    className="mt-4 text-white py-2 px-4 rounded-lg"
                  >
                    Go to Course
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
