import React, { useState, useEffect } from 'react';
import { useData } from '../store/DataContext';
import axios from '../config/axiosConfig';

export default function Sidebar() {
  const { courseTopicsData, setTopicData, data } = useData();  // Ensure setTopicData is available in your context
  const [checkedLessons, setCheckedLessons] = useState(
    Array(courseTopicsData.length).fill(false)
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Handle checkbox state change
  const handleCheckboxChange = async (index, topicId) => {
    const newCheckedLessons = [...checkedLessons];
    const newChecked = !newCheckedLessons[index];
    newCheckedLessons[index] = newChecked;
    setCheckedLessons(newCheckedLessons);

    // Call updateCheckbox API to update completion status
    await updateCheckbox(data, topicId, newChecked);  // data is courseId, topicId is passed
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTopic = (topic) => {
    setTopicData(topic);
  };

  const updateCheckbox = async (courseId, topicId, completed) => {
    try {
      const response = await axios.post('/dashboardUsers/updateProgress', {
        courseId,
        topicId,
        completed,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Initialize the checkbox states based on `topicCheckbox.completed` field
    if (courseTopicsData.length > 0) {
      const initialCheckedLessons = courseTopicsData.map((topic) =>
        topic.topicCheckbox.length > 0 ? topic.topicCheckbox[0].completed : false // Assuming each topic has one entry in topicCheckbox
      );
      setCheckedLessons(initialCheckedLessons);
    }
  }, [courseTopicsData]);

  return (
    <div>
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-white bg-primary p-3 rounded-full fixed top-4 left-4 z-50"
      >
        <span className="text-lg">☰</span>
      </button>

      {/* Sidebar - For Large Screens */}
      <div
        className={`bg-white dark:bg-darkBg text-black dark:text-white p-6 fixed lg:relative lg:w-80 transition-all duration-300 ease-in-out h-full ${
          isSidebarOpen ? 'w-64' : 'w-0 lg:w-80'
        } shadow-lg rounded-r-lg`}
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          Course Lessons
        </h2>

        {/* List of Lessons - Scrollable */}
        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-150px)]">
          {courseTopicsData && courseTopicsData.length > 0 ? (
            courseTopicsData.map((topic, index) => (
              <div
                key={topic.id}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={checkedLessons[index]}
                  onChange={() => handleCheckboxChange(index, topic.id)} // Pass topic.id to update the correct topic
                  className="h-5 w-5 text-primary dark:bg-gray-700 dark:border-gray-600 rounded-sm"
                />
                {/* Lesson Button */}
                <button
                  onClick={() => handleTopic(topic)} // Send the whole topic to setTopicData
                  className="flex-1 text-left bg-primary text-white py-2 px-4 rounded-md hover:bg-primaryDark transition-colors"
                >
                  {topic.title}
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">No lessons available.</p>
          )}
        </div>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 lg:hidden"
        ></div>
      )}
    </div>
  );
}
