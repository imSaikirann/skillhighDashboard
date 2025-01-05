import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Content from './Content';
import { useData } from '../store/DataContext';
import { useLocation } from 'react-router-dom';

export default function Play() {
  const { fetchCourseTopics, TopicsData } = useData();
  const location = useLocation();
  const { courseId } = location.state || {};

  useEffect(() => {
    // Check if the TopicsData object is loaded or not.
    if (TopicsData && TopicsData.video) {
      setIsLoading(false); // Set loading to false once data is available
    }
  }, [TopicsData]);

  useEffect(() => {
    fetchCourseTopics(courseId);
  }, [courseId]);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 dark:bg-darkBg mt-36">
      {/* Sidebar */}
      <div className="lg:w-1/4 w-full lg:flex ">
        <Sidebar />
      </div>
      <div className="flex-1 w-full">
        <Content />
      </div>
    </div>
  );
}

