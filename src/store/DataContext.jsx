import axios from '../config/axiosConfig';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context
const DataContext = createContext();

// Create a Provider Component
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Load initial data from Local Storage
    const savedData = localStorage.getItem('appData');
    return savedData ? JSON.parse(savedData) : {};
  });
  const [icon, setIcon] = useState(false);
  const [alert, setAlert] = useState({ message: '', isVisible: false });
  const [loading, setLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [courseTopicsData, setCourseTopicsData] = useState([]);
  const [TopicsData, setTopicData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);



  // Persist data to Local Storage whenever it changes
  useEffect(() => {
    localStorage.setItem('appData', JSON.stringify(data));
  }, [data]);

//get user profiledata
 // Fetch user data
 const fetchUserData = async () => {
  setLoading(true);
  try {
    const response = await axios.get("/dashboardUsers/profile");
    setProfileData(response.data);
  } catch (error) {
    console.error("Error fetching profile data:", error);
  } finally {
    setLoading(false);
  }
};

// Modal check when profileData changes
useEffect(() => {
  let timer; // Declare a timer reference

  if (profileData && profileData.userName) {
    setIsModalOpen(false);
  } else {
    timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 1000);
  }

  // Cleanup the timer on unmount or dependency change
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
  };
}, [profileData]);




//get user enrolled courses
  const fetchUserEnrolledCourses =  async () => {
    setLoading(true)

    try {
      const response = await axios.get('/courses/getUserCourses')
      setEnrolledCourses(response.data)
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false)
    }
  }


  
  const fetchCourseTopics = async (courseId) => {
    try {
      // Passing courseId as a query parameter
      const response = await axios.get(`/courses/getCourseTopics/${courseId}`, )
      setCourseTopicsData(response.data);
    } catch (error) {
      console.log(error);
    } 
  };

  const values = {
     data, setData ,icon,setLoading,loading,alert, setAlert,enrolledCourses,setIsModalOpen,
     fetchUserData,fetchUserEnrolledCourses,profileData,fetchCourseTopics,courseTopicsData,setTopicData,TopicsData,isModalOpen
  };
  return (
    <DataContext.Provider value={values}>
      {children}
    </DataContext.Provider>
  );
};

// Custom Hook to use Data Context
export const useData = () => useContext(DataContext);
