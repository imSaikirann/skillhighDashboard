import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../store/DataContext';
import { useLocation, useNavigate } from 'react-router-dom';

export const QuizComponent = () => {
  const { fetchQuizById, quiz, loading, submitQuizResult } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Destructure quizId from location.state, if available
  const { quizId } = location.state || {};
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Using useRef to store answers to avoid re-renders
  const answersRef = useRef([]);
  console.log(quiz);

  useEffect(() => {
    if (quizId) {
      fetchQuizById(quizId);
    }

    // Clean up quizId when navigating away
    return () => {
      // Reset the quizId when component unmounts or navigation happens
      if (quizId) {
        console.log("Resetting quizId on navigate away");
      }
    };
  }, [quizId]);

  // Ensure quiz.questions is available before rendering
  if (!quiz || !quiz.questions) {
    return (
      <div>Loading...</div>
    );
  }

  // Handle selecting an option
  const handleOptionSelect = (option) => {
    setSelectedOption(option.text);
  };

  // Handle submitting the answer
  const handleSubmitAnswer = async () => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.answers.find(answer => answer.text === selectedOption);

    // Create answer object in the desired format
    const answerData = {
      questionId: currentQuestion.id,
      answerId: selectedAnswer?.id,
    };

    // Append the new answer to the answersRef array
    answersRef.current.push(answerData);

    // Check if selected option is correct
    if (selectedOption === currentQuestion.answers.find(answer => answer.isCorrect)?.text) {
      setCorrectAnswers(correctAnswers + 1);
    }

    // Move to next question or finish quiz
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(""); // Reset selected option
    } else {
      await submitQuizResult(quizId, answersRef.current); // Submit the answers in the correct format
      setQuizCompleted(true);
    }
  };

  // Calculate progress
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  // Handle navigation to the home page
  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen font-poppins mt-20">
      <div className="bg-white dark:bg-darkBg rounded-lg w-full max-w-3xl p-8 shadow-2xl transition-all duration-300 dark:border-2 dark:border-dark ">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-darkBg dark:text-gray-200">
          Quiz Challenge
        </h2>

        {!quizCompleted ? (
          <>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="bg-gradient-to-r from-primary to-main h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-darkBg dark:text-gray-200">
                {quiz.questions[currentQuestionIndex].text}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {/* Ensure answers exist */}
              {quiz.questions[currentQuestionIndex] && quiz.questions[currentQuestionIndex].answers?.length > 0 ? (
                quiz.questions[currentQuestionIndex].answers.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full py-3 text-left rounded-lg border pl-4 border-transparent transition-all duration-200 ${
                      selectedOption === option.text
                        ? "bg-white text-primary "
                        : "bg-gray-100 dark:bg-gray-700 text-darkBg dark:text-gray-200"
                    } hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  >
                    {option.text}
                  </button>
                ))
              ) : (
                <div>No options available for this question.</div> // Fallback if no answers
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOption}
                className={`w-full py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !selectedOption ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {currentQuestionIndex === quiz.questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-darkBg dark:text-gray-200 mb-4">
              Quiz Completed!
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              You answered {correctAnswers} out of {quiz.questions.length} questions correctly.
            </p>
            <div className="mt-4 space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="py-3 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Try Again
              </button>
              <button
                onClick={handleReturnHome}
                className="py-3 px-6 bg-gray-300 text-darkBg font-semibold rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
