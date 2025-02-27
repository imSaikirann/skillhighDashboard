import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { useData } from "../store/DataContext";
import { useNavigateToQuiz } from "../utils/navigateUtils";

export const QuizList = () => {
  const { fetchQuiz, quiz, loading, resetQuizData } = useData(); // Assuming a reset function exists
  const location = useLocation();
  const navigate = useNavigate();
  const redirectToQuiz = useNavigateToQuiz();

  const { courseId, courseName } = location.state || {};

  // Handle quiz redirection
  const handleQuizId = (quizId) => {
    console.log(quizId);
    redirectToQuiz(quizId);
  };

  // Fetch quizzes when courseId is available
  useEffect(() => {
    if (!courseId) {
      navigate("/", { replace: true });
      return;
    }
    fetchQuiz(courseId); // Fetch quizzes for the specific course
    
    // Clean up courseId when navigating away
    return () => {
      // If you have a context or local state, reset it here
      if (resetQuizData) {
        resetQuizData();  // Reset the quiz data and courseId in context
      }
    };
  }, []);

  // If loading, show spinner
  if (loading) {
    return <Spinner />;
  }


  // If no quiz is available, display a custom message
  if (!quiz || quiz.length === 0)  {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-darkBg mt-26 md:mt-0">
        <Alert message="No quizzes available" isVisible={true} />
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg text-center">
          Stay tuned! New quizzes for "{courseName || "this course"}" are coming soon.
          Check back later to test your knowledge and skills.
        </p>
      </div>
    );
  }

  // Ensure quiz is wrapped in an array (for consistent handling)
  const quizList = Array.isArray(quiz) ? quiz : [quiz];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-darkBg mt-26 md:mt-0">
      <Alert />
      <div className="max-w-6xl w-full p-8 space-y-6">
        {/* Header Section */}
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white">{courseName}</h2>

        {/* Tagline Section */}
        <p className="text-lg text-center text-gray-700 dark:text-gray-300 mt-4">
          Test your knowledge and skills with our quizzes!
        </p>

        {/* Quiz Cards (Grid layout with columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {quizList.map((quizItem, index) => (
            <div
              key={quizItem.id}
              className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6"
            >
              {/* Quiz Heading with Number */}
              <div className="bg-primary text-white py-2 px-4 rounded-t-lg mb-4">
                <h3 className="text-xl font-semibold">Quiz {index + 1}</h3>
              </div>

              {/* Questions Count */}
              <p className="text-gray-500">Questions: {quizItem.questions?.length || 0}</p>

              {/* Action Button */}
              <div className="mt-6 space-y-4">
                <button
                  onClick={() => handleQuizId(quizItem.id)}
                  className="w-full py-3 text-primary font-normal rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
