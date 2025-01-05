import React, { useEffect } from 'react';
import { useData } from '../store/DataContext';
import Spinner from '../components/Spinner';
import { gradientStyle } from '../components/ButtonGradient';
import { useNavigateToProjects, useNavigateToQuizList } from '../utils/navigateUtils';

export default function Profile() {
  const { profileData, fetchUserData, loading } = useData();
  const redirectToProjects = useNavigateToProjects();
  const redirectToQuizList = useNavigateToQuizList();

 

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleCourseId = (courseId, courseName) => {
    redirectToProjects(courseId, courseName);
  };

  const handleQuiz = (courseId, courseName) => {
    redirectToQuizList(courseId, courseName);
  };

  const getInitials = (name) => {
    return name
      ? name
          .split(' ')
          .map((n) => n[0].toUpperCase())
          .join('')
      : 'U';
  };

  if (loading) {
    return <Spinner />;
  }

  const handleRedirect = () => {
    window.location.href = "https://skillhigh.in"; // Redirect to skillhigh.in
  };
  

  return (
    <div className="flex flex-col items-center justify-start p-4 sm:p-6 bg-gray-50 dark:bg-darkBg min-h-screen mt-20">
      {/* Profile Header */}
      <div className="w-full max-w-4xl bg-white dark:bg-darkBg rounded-lg shadow-lg p-6 mb-12 dark:border dark:border-dark relative">
        {/* <button
          onClick={logout}
          className="absolute top-4 right-4 text-sm bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
          aria-label="Logout"
        >
          Logout
        </button> */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
            {getInitials(profileData?.userName)}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary mb-1">
              {profileData?.userName || 'User Name'}
            </h1>
            <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300">
              {profileData?.userEmail || 'user@example.com'}
            </p>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white mb-8 text-center">
          Your Courses
        </h2>

        {/* Courses List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {profileData?.progress?.map((course, index) => (
            <div
              key={index}
              className="bg-white dark:bg-darkBg rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border dark:border-dark"
            >
              <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                {course.courseName}
              </h3>

              {/* Expiry Date */}
              {course.expiryDate && (
                <p className="text-sm sm:text-md text-gray-600 dark:text-gray-400 mb-4 text-center">
                  <strong>Expiry Date:</strong> {new Date(course.expiryDate).toLocaleDateString()}
                </p>
              )}

              {/* Progress Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    title: 'Topic Progress',
                    progress: course.topicProgressPercentage,
                  },
                  {
                    title: 'Quiz Progress',
                    progress: course.quizProgressPercentage ?? '0',
                  },
                  {
                    title: 'Project Progress',
                    progress: course.projectProgressPercentage,
                  },
                ].map(({ title, progress }, idx) => (
                  <div key={idx} className="text-center">
                    <h4 className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {title}
                    </h4>
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto">
                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-current text-gray-200 dark:text-neutral-700"
                          strokeWidth="2"
                        ></circle>
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-current text-primary dark:text-primary"
                          strokeWidth="2"
                          strokeDasharray="100"
                          strokeDashoffset={100 - progress}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                        ></circle>
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm sm:text-base font-semibold">
                        {progress}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col space-y-3">
                <button
                  onClick={() => handleQuiz(course.courseId, course.courseName)}
                  className="w-full bg-primary text-white py-3 px-6  rounded-full text-sm font-medium transition duration-300 focus:ring-4 focus:ring-green-300 focus:outline-none"
                  aria-label={`Go to quiz for ${course.courseName}`}
                >
                  Go to Quiz
                </button>
                <button
                  onClick={() => handleCourseId(course.courseId, course.courseName)}
                  className="w-full bg-primary text-white py-3 px-6 rounded-full text-sm font-medium transition duration-300 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                  aria-label={`Go to projects for ${course.courseName}`}
                >
                  Go to Projects
                </button>
                {/* <button
                  className="w-full bg-transparent text-primary py-3 px-6  rounded-full text-sm font-medium border border-primary hover:bg-primary hover:text-white transition duration-300 focus:ring-4 focus:ring-primary focus:outline-none"
                  aria-label={`Claim certificate for ${course.courseName}`}
                >
                  Claim Certificate
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {/* Enroll Another Course Button */}
        <div className="flex justify-center">
          <button
            style={gradientStyle}
            onClick={handleRedirect}
            className=" text-white py-3 px-6 rounded-full text-base sm:text-lg font-medium hover:opacity-90 transition duration-300 focus:ring-2 focus:ring-primary focus:outline-none"
            aria-label="Enroll in another course"
          >
            Enroll in Another Course
          </button>
        </div>
      </div>
    </div>
  );
}
