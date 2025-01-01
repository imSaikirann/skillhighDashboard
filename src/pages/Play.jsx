import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Content from './Content';
import { useData } from '../store/DataContext';
export default function Play() {
  const {data,fetchCourseTopics} = useData()
  useEffect(()=>{
    fetchCourseTopics(data)
  },[data])
  
  return (
    <div className="flex flex-col lg:flex-row h-screen mt-20">
      {/* Sidebar - Visible on large screens, hidden on small screens */}
      <div className="lg:w-1/4 p-4 bg-gray-100 dark:bg-darkBg border-r-2 dark:border-dark shadow-lg h-full sticky top-0">
        <Sidebar />
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 overflow-y-auto h-full">
        <Content />
      </div>
    </div>
  );
}
