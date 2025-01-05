import React, { useState, useEffect } from 'react';
import { useData } from '../store/DataContext';
import { PlayIcon } from '../assets/icons/icons';

export default function Sidebar() {
  const { courseTopicsData, setTopicData } = useData();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [checkedLessons, setCheckedLessons] = useState([]);


  useEffect(() => {
    if (courseTopicsData.length > 0) {
      const initialChecked = courseTopicsData.map(topic =>
        topic.topicCheckbox.length > 0 ? topic.topicCheckbox[0].completed : false
      );
      setCheckedLessons(initialChecked);
      setTopicData(courseTopicsData[0]);
    }
  }, [courseTopicsData, setTopicData]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleCheckboxChange = (index, topicId) => {
    const updatedChecked = [...checkedLessons];
    updatedChecked[index] = !updatedChecked[index];
    setCheckedLessons(updatedChecked);
  };

 

  return (
    <>
      {/* Sidebar Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className={`lg:hidden fixed top-24 ${
          isSidebarOpen ? 'left-72' : 'left-4'
        } bg-primary text-white rounded-full p-3 z-50 transition-all`}
      >
        {isSidebarOpen ? 'Close' : 'Open Contents'}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 lg:relative bg-white dark:bg-dark text-gray-900 dark:text-white transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 h-full w-64 lg:w-full shadow-lg z-40 mt-20`}
      >
        <h2 className="text-xl font-semibold p-4">Course Lessons</h2>
        <div className="overflow-y-auto max-h-[calc(100vh-4rem)] px-4">
          {courseTopicsData.map((topic, index) => (
            <div key={topic.id} className="flex items-center space-x-2 py-2">
              <input
                type="checkbox"
                checked={checkedLessons[index] || false}
                onChange={() => handleCheckboxChange(index, topic.id)}
                className="h-5 w-5"
              />
              <button
                onClick={() => setTopicData(topic)}
                className="text-sm font-medium text-primary dark:text-gray-300"
              >
                <PlayIcon className="inline-block mr-2" />
                {topic.title}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for Sidebar on Mobile */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
        ></div>
      )}
    </>
  );
}
