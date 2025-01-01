import React, { useState } from 'react';

const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
  {
    question: "Which language is used to build React?",
    options: ["Java", "C++", "JavaScript", "Python"],
    correctAnswer: "JavaScript",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: "Pacific",
  },
];

export const QuizComponent = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Handle selecting an option
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Handle submitting the answer
  const handleSubmitAnswer = () => {
    if (selectedOption === quizQuestions[currentQuestionIndex].correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
    } else {
      setQuizCompleted(true);
    }
  };

  // Calculate progress
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

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
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
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
                {quizQuestions[currentQuestionIndex].question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full py-3 text-left rounded-lg border pl-4 border-transparent transition-all duration-200 ${
                    selectedOption === option
                      ? "bg-main text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-darkBg dark:text-gray-200"
                  } hover:bg-main focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOption}
                className={`w-full py-3 bg-main text-white bg-primary font-semibold rounded-lg shadow-md hover:bg-main focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !selectedOption ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {currentQuestionIndex === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-darkBg dark:text-gray-200 mb-4">
              Quiz Completed!
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              You answered {correctAnswers} out of {quizQuestions.length} questions correctly.
            </p>
            <div className="mt-4">
              <button
                onClick={() => window.location.reload()}
                className="py-3 px-6 bg-main text-white font-semibold rounded-lg hover:bg-main focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
