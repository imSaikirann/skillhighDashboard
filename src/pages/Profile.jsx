import React, { useEffect } from 'react';
import { useData } from '../store/DataContext';
import Spinner from '../components/Spinner';
import {gradientStyle} from '../components/ButtonGradient'
export default function Profile() {
  const { profileData, fetchUserData, loading } = useData();

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center justify-start p-6 bg-gray-100 dark:bg-darkBg min-h-screen mt-20">
      {/* Profile Header */}
   <div>
   <div className="w-full max-w-xl bg-white dark:bg-darkBg rounded-lg shadow-lg p-6 text-left mb-12 ">
        <h1 className="text-4xl font-bold text-primary dark:text-primary mb-2">
          {profileData?.userName || 'User Name'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {profileData?.userEmail || 'user@example.com'}
        </p>
        {/* <button
          className="absolute top-4 right-6 bg-red-500 text-white py-2 px-4 rounded-full text-sm hover:bg-red-600 transition duration-300 focus:ring-4 focus:ring-red-300 focus:outline-none"
          aria-label="Logout"
        >
          Logout
        </button> */}
      </div>
      <div>
        
      </div>
   </div>

      {/* Courses Section */}
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">
          Your Courses
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {profileData?.progress?.map((course, index) => (
            <div
              key={index}
              className="bg-white dark:bg-darkBg rounded-lg shadow-lg p-6 space-y-6"
            >
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {course.courseName}
              </h3>

              {/* Progress Stats */}
              <div className="space-y-4">
                {[
                  { title: 'Topic Progress', progress: course.topicProgressPercentage },
                  { title: 'Quiz Progress', progress: course.quizProgressPercentage },
                  { title: 'Project Progress', progress: course.projectProgressPercentage },
                ].map(({ title, progress }, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <h4 className="text-lg text-gray-800 dark:text-gray-300">{title}</h4>
                    <div className="relative w-20 h-20">
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
                          style={{
                            transition: 'stroke-dashoffset 1.5s ease-out',
                          }}
                        ></circle>
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
                        {progress}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Claim Certificate Button */}
              <button
                className="w-full bg-primary text-white py-2 px-4 rounded-full text-lg hover:bg-primaryDark transition duration-300 focus:ring-4 focus:ring-primary focus:outline-none"
                aria-label="Claim your certificate"
              >
                Claim Certificate
              </button>
            </div>
          ))}
        </div>

        {/* Enroll Another Course Button */}
        <div className="flex justify-center">
          <button
          style={gradientStyle}
            className="bg-blue-500 text-white py-3 px-6 rounded-full text-lg hover:bg-blue-600 transition duration-300 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            aria-label="Enroll in another course"
          >
            Enroll in Another Course
          </button>
        </div>
      </div>
    </div>
  );
}
