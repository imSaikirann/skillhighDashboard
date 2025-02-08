import React, { useEffect } from 'react';
import { useData } from '../store/DataContext';
import Spinner from '../components/Spinner';
import { gradientStyle } from '../components/ButtonGradient';
import { useNavigateToProjects, useNavigateToQuizList, useNavigateToPlay } from '../utils/navigateUtils';
import { displayExpiryDate } from '../utils/helpers';
import { AddIcon } from '../assets/icons/icons';

export default function Profile() {
  const { profileData, fetchUserData, loading } = useData();
  const redirectToProjects = useNavigateToProjects();
  const redirectToQuizList = useNavigateToQuizList();
  const navigateToPlay = useNavigateToPlay();

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

  const handleRedirect = () => {
    window.location.href = "https://skillhigh.in/allcourses";
  };

  const redirectToCourse = (courseId) => {
    if (courseId) {
      navigateToPlay(courseId);
    } else {
      console.error('Course ID is undefined or invalid.');
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 bg-green-50 dark:bg-darkBg min-h-screen mt-20">
      {/* Profile Header */}
      <div className="w-full max-w-4xl bg-white dark:bg-dark rounded-lg  p-8 mb-12 relative">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary text-white text-3xl font-bold">
            {getInitials(profileData?.userName)}
          </div>
          <div className="text-center sm:text-left mt-4 sm:mt-0">
            <h1 className="text-4xl font-bold text-primary dark:text-primary mb-2">
              {profileData?.userName || 'User Name'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {profileData?.userEmail || 'user@example.com'}
            </p>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8 text-left">
          Courses You Are Enrolled In
        </h2>

        {/* Courses List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {profileData?.progress?.map((course, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border dark:border-neutral-700 cursor-pointer"
            >
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                {course.courseName}
              </h3>

              {/* Expiry Date */}
              {course.expiryDate && displayExpiryDate(course.expiryDate) && (
                <p className="text-md text-gray-600 dark:text-gray-400 mb-4 text-center">
                  <strong>Expiry Date:</strong> {new Date(course.expiryDate).toLocaleDateString()}
                </p>
              )}

              {/* Progress Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[{
                  title: 'Topic Progress',
                  progress: course.topicProgressPercentage,
                }, {
                  title: 'Quiz Progress',
                  progress: course.quizProgressPercentage ?? '0',
                }, {
                  title: 'Project Progress',
                  progress: course.projectProgressPercentage,
                }].map(({ title, progress }, idx) => (
                  <div key={idx} className="text-center">
                    <h4 className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {title}
                    </h4>
                    <div className="relative w-20 h-20 mx-auto">
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
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base font-semibold">
                        {progress}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => handleQuiz(course.courseId, course.courseName)}
                  className="w-full bg-primary text-white py-3 rounded-xl font-medium "
                  aria-label={`Go to quiz for ${course.courseName}`}
                >
                  Go to Quiz
                </button>
                <button
                  onClick={() => handleCourseId(course.courseId, course.courseName)}
                  className="w-full bg-white border border-primary text-primary dark:text-primary py-3 rounded-xl font-medium "
                  aria-label={`Go to projects for ${course.courseName}`}
                >
                  Go to Projects
                </button>
              </div>
            </div>
          ))}
          <div 
  onClick={handleRedirect} 
  className="bg-white text-center dark:bg-dark rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:-translate-y-1 transform flex flex-col items-center justify-center gap-3"
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") handleRedirect();
  }}
>
  <h1 className="text-xl font-semibold text-neutral-800 dark:text-white">
    Enroll in Another Course
  </h1>
  <AddIcon />
</div>



        </div>

       
      </div>
    </div>
  );
}
