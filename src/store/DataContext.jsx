import axios from '../config/axiosConfig';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context
const DataContext = createContext();

// Create a Provider Component
export const DataProvider = ({ children }) => {
  const [icon, setIcon] = useState(false);
  const [alert, setAlert] = useState({ message: '', isVisible: false });
  const [loading, setLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [courseTopicsData, setCourseTopicsData] = useState([]);
  const [TopicsData, setTopicData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setprojects] = useState([]);
  const [quiz, setQuiz] = useState([]);



  //get user profiledata
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

  // //get user profiledata
  // const fetchProjects = async (courseId) => {

  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`/courseProjects/getProjectByCourseID/${courseId}`);
  //     setProfileData(response.data);
  //     console.log(response)
  //   } catch (error) {
  //     console.error("Error fetching profile data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Modal check when profileData changes
  useEffect(() => {
    if (loading) {

      if (profileData && profileData.userName) {
        setIsModalOpen(false); // Close modal if profileData is valid
      } else {
        const timer = setTimeout(() => {
          setIsModalOpen(true); // Open modal after 3 seconds if profileData is invalid
        }, 2000);
        // Cleanup the timer on unmount or dependency change
        return () => clearTimeout(timer);
      }
    }
  }, [profileData, loading]);
  




  //get user enrolled courses
  const fetchUserEnrolledCourses = async () => {
    setLoading(true)

    try {
      const response = await axios.get('/courses/getUserCourses')
      setEnrolledCourses(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  //fetch topics using courseId
  const fetchCourseTopics = async (courseId) => {
    try {
      // Passing courseId as a query parameter
      const response = await axios.get(`/courses/getCourseTopics/${courseId}`,)

      setCourseTopicsData(response.data.topics);
    } catch (error) {
      console.log(error);
    }
  };


  //fetch projects using courseId
  const fetchProjects = async (courseId) => {
    setLoading(true);
    try {
      // Passing courseId as a query parameter
      const response = await axios.get(`/courseProjects/getProjectByCourseID/${courseId}`,)
      setprojects(response.data.projects);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  //fetch all quizzes using courseId
  const fetchQuiz = async (courseId) => {
    setLoading(true);
    try {
      const response = await axios.get(`/quiz/getquizByCourseId/${courseId}`,)
      setQuiz(response.data.quizzes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  //fetch  quizz using courseId
  const fetchQuizById = async (quizId) => {
    setLoading(true);
    try {
      const response = await axios.get(`/quiz/getquizByQuizId/${quizId}`,)
      console.log(response)
      setQuiz(response.data.Quiz);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };


 //submit quiz result
  const submitQuizResult = async (quizId,answers) => {
    console.log(quizId,answers)
    setLoading(true);
    try {
      const response = await axios.post(`/quiz/submitquiz/${quizId}`,{answers})
      console.log(response)
  
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };



  const values = {
    icon, setLoading, loading, alert, setAlert, enrolledCourses, setIsModalOpen, profileData,fetchProjects,projects,fetchQuiz,submitQuizResult,
    fetchUserData, fetchUserEnrolledCourses, fetchCourseTopics, courseTopicsData, setTopicData, TopicsData, isModalOpen,quiz,fetchQuizById
  };
  return (
    <DataContext.Provider value={values}>
      {children}
    </DataContext.Provider>
  );
};

// Custom Hook to use Data Context
export const useData = () => useContext(DataContext);
