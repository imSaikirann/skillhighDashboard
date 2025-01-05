import React, { useState, useEffect } from 'react';
import { useData } from '../store/DataContext';
import { useLocation } from 'react-router-dom';
import axios from '../config/axiosConfig';

export const VideoLesson = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [checkedLessons, setCheckedLessons] = useState({});
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { courseTopicsData, setTopicData, fetchCourseTopics } = useData();
  const location = useLocation();
  const { courseId } = location.state || {};
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      fetchCourseTopics(courseId);
    }
  }, [courseId]);

  useEffect(() => {
    if (courseTopicsData && courseTopicsData.length > 0) {
      const initialChecked = {};
      courseTopicsData.forEach((topic, index) => {
        initialChecked[index] = topic.topicCheckbox?.[0]?.completed || false;
      });
      setCheckedLessons(initialChecked);
      setTopicData(courseTopicsData[0]);

      const lastSelectedIndex = localStorage.getItem('selectedLessonIndex');
      if (lastSelectedIndex !== null) {
        setSelectedLessonIndex(Number(lastSelectedIndex));
        setIsLoading(false);
      } else {
        setSelectedLessonIndex(0);
        setIsLoading(false);
      }
    }
  }, [courseTopicsData, setTopicData]);

  const handleLessonClick = (index) => {
    setSelectedLessonIndex(index);
    setSidebarVisible(false);
    localStorage.setItem('selectedLessonIndex', index);
  };

  const handlePrevLesson = () => {
    if (selectedLessonIndex > 0) {
      const newIndex = selectedLessonIndex - 1;
      setSelectedLessonIndex(newIndex);
      localStorage.setItem('selectedLessonIndex', newIndex);
    }
  };

  const handleNextLesson = () => {
    if (selectedLessonIndex < courseTopicsData.length - 1) {
      const newIndex = selectedLessonIndex + 1;
      setSelectedLessonIndex(newIndex);
      localStorage.setItem('selectedLessonIndex', newIndex);
    }
  };

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleCheckboxChange = (index, topicId) => {
    const updatedChecked = { ...checkedLessons, [index]: !checkedLessons[index] };
    setCheckedLessons(updatedChecked);

    // Call the API to update the backend
    updateCheckbox(courseId, topicId, updatedChecked[index]);
  };

  const updateCheckbox = async (courseId, topicId, completed) => {
    try {
      const response = await axios.post('/dashboardUsers/updateTopicProgress', { courseId, topicId, completed });
     
    } catch (error) {
      console.error('Error updating checkbox:', error.response?.data || error.message);

      // Optionally revert the checkbox state on error
      setCheckedLessons((prev) => ({ ...prev, [index]: !prev[index] }));
    }
  };

  return (
    <div className="flex flex-col md:flex-row-reverse h-screen  dark:bg-darkBg text-gray-800 dark:text-gray-200 ">
     <aside
  className={`fixed md:relative p-4 z-20 top-0 left-0 pt-24 h-full bg-white border-r dark:bg-darkBg shadow-xl md:shadow-none transform transition-transform duration-300 w-72 md:w-1/4 overflow-y-auto ${
    isSidebarVisible ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
  }`}
>
  <h2 className="text-xl md:text-2xl font-bold mb-8 text-gray-800 dark:text-gray-200">
    Lessons
  </h2>
  <ul className="space-y-6">
    {courseTopicsData?.map((lesson, index) => (
      <li
        key={lesson.id || index}
        onClick={() => handleLessonClick(index)}
        className={`flex items-center justify-between p-4 text-white rounded-lg shadow-md transition duration-200 ease-in-out cursor-pointer ${
          selectedLessonIndex === index
            ? 'bg-primary'
            : 'bg-gray-750 dark:bg-gray-700 hover:bg-gray-800'
        }`}
      >
        <div className="flex items-center gap-4">
          <span className="text-sm md:text-base lg:text-base xl:text-base">
            {lesson.title}
          </span>
        </div>
        <input
          type="checkbox"
          checked={!!checkedLessons[index]}
          onChange={() => handleCheckboxChange(index, lesson.id)}
          className="w-6 h-6 border-2 rounded-md bg-gray-200 border-gray-400 cursor-pointer transition duration-200 ease-in-out checked:bg-primary checked:border-primary appearance-none checked:after:content-['✔'] checked:after:text-white checked:after:font-bold checked:after:flex checked:after:justify-center checked:after:items-center"
        />
      </li>
    ))}
  </ul>
</aside>

      {isModalVisible && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md  sm:max-w-3xl max-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Lesson Description
        </h2>
        <p 
  className="text-gray-700 dark:text-gray-300 text-justify"
  style={{ whiteSpace: 'pre-line' }}
>
  {courseTopicsData[selectedLessonIndex]?.description || 'No description available for this lesson.'}
</p>

        <div className="mt-6 flex justify-end">
          <button
            onClick={closeModal}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    
      )}

      <main className="flex-1 flex flex-col items-center justify-start md:justify-center p-8 md:p-6 h-auto mt-16">
        <button
          className="md:hidden fixed bottom-10 right-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary transition duration-200 z-50"
          onClick={() => setSidebarVisible(!isSidebarVisible)}
          aria-label="Toggle Sidebar"
        >
          {isSidebarVisible ? 'Hide Contents' : 'Show Contents'}
        </button>
        {isLoading ? (
          <div className="w-full max-w-5xl bg-gray-300 dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden mt-4 animate-pulse">
            <div className="relative w-full pb-[56.25%] bg-gray-400 dark:bg-gray-600"></div>
          </div>
        ) : (
          <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mt-4">
            <div className="relative w-full pb-[56.25%]">
              <iframe
                src={courseTopicsData[selectedLessonIndex]?.video}
                loading="lazy"
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title="Lesson Video"
              ></iframe>
            </div>
          </div>
        )}
        {!isLoading && (
          <div className="mt-6 flex flex-col sm:flex-row gap-10 items-center justify-between w-full max-w-5xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8 w-full sm:w-auto">
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 text-center sm:text-left">
                {courseTopicsData[selectedLessonIndex]?.title || 'Lesson Title'}
              </h1>
              <button
                onClick={openModal}
                className="bg-primary text-white px-6 py-3 rounded-full shadow-lg hover:bg-main transition duration-200"
              >
                Description
              </button>
            </div>
            <div className="flex gap-6">
              <button
                onClick={handlePrevLesson}
                disabled={selectedLessonIndex === 0}
                className={`px-6 py-3 rounded-full shadow-md transition duration-200 ${selectedLessonIndex === 0 ? 'bg-gray-400 cursor-not-allowed text-gray-700' : 'bg-primary text-black hover:bg-primary'}`}
              >
                Previous
              </button>
              <button
                onClick={handleNextLesson}
                disabled={selectedLessonIndex === courseTopicsData.length - 1}
                className={`px-6 py-3 rounded-full shadow-md transition duration-200 ${selectedLessonIndex === courseTopicsData.length - 1 ? 'bg-gray-400 cursor-not-allowed text-gray-700' : 'bg-primary text-black hover:bg-primary'}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VideoLesson;
