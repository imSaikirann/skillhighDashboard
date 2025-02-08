import React from "react";

export default function CourseDashboard() {
  const lessons = [
    "Introduction to AI",
    "Machine Learning Basics",
    "Supervised Learning",
    "Unsupervised Learning",
    "Deep Learning Concepts",
    "Neural Networks",
    "Natural Language Processing",
    "Computer Vision",
    "AI Ethics",
    "Capstone Project Prep",
  ];

  const projects = [
    "Image Classifier",
    "Text Sentiment Analyzer",
    "AI-Powered Recommendation System",
  ];

  const quizzes = ["AI Basics", "ML Concepts", "Final Assessment"];

  const totalItems = lessons.length + projects.length + quizzes.length;
  const completedItems = 8; // Replace this with dynamic tracking
  const progressPercentage = (completedItems / totalItems) * 100;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl shadow-lg mb-12">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">AI & ML Course Dashboard</h1>
            <p className="text-lg">Master AI concepts with hands-on lessons, projects, and quizzes.</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-white text-blue-600 font-medium px-6 py-3 rounded-md shadow-md hover:bg-gray-100">
              My Profile
            </button>
          </div>
        </div>
      </header>

      {/* Progress Bar Section */}
      <section className="bg-white p-6 rounded-xl shadow-md mb-12">
        <h2 className="text-2xl font-semibold mb-4">Course Progress</h2>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-gray-600 mt-2">
          {completedItems}/{totalItems} completed ({Math.floor(progressPercentage)}%)
        </p>
      </section>

      {/* Content Sections */}
      <section>
        <h2 className="text-3xl font-semibold mb-8">Lessons, Projects & Quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Lesson Cards */}
          {lessons.map((lesson, index) => (
            <div key={index} className="flex flex-col bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Lesson {index + 1}: {lesson}</h2>
              <p className="text-gray-600 mb-4">Description for {lesson}</p>
              <button className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Start Lesson
              </button>
            </div>
          ))}

          {/* Project Cards */}
          {projects.map((project, index) => (
            <div key={index} className="flex flex-col bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Project {index + 1}: {project}</h2>
              <p className="text-gray-600 mb-4">Work on {project} using AI techniques.</p>
              <button className="mt-auto bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Start Project
              </button>
            </div>
          ))}

          {/* Quiz Cards */}
          {quizzes.map((quiz, index) => (
            <div key={index} className="flex flex-col bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Quiz {index + 1}: {quiz}</h2>
              <p className="text-gray-600 mb-4">Test your knowledge with {quiz}</p>
              <button className="mt-auto bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                Take Quiz
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
