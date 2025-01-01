import React from 'react';
import { useData } from '../store/DataContext';

export default function Content() {
  const { TopicsData } = useData();
  console.log("Video Data:", TopicsData); // Debugging line to ensure data is loaded correctly

  // Ensure that TopicsData.video is not empty or undefined
  const videoURL = TopicsData.video;
  console.log(videoURL)
 
  return (
    <div className="w-full max-w-6xl bg-white dark:bg-darkBg rounded-xl shadow-lg overflow-hidden mx-auto">
      {/* Video Embed */}
      <div style={{ position: 'relative', paddingTop: '56.25%' }}>
        <iframe
          src={videoURL}
          loading="lazy"
          style={{ border: 0, position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>

      {/* Video Details */}
      <div className="p-6 bg-gray-50 dark:bg-darkBg dark:border-2 dark:border-dark rounded-b-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">
          Lesson Overview
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          This video covers all the necessary concepts to get started with your learning journey. It provides step-by-step guidance to help you understand the key points and prepare for your next lesson.
        </p>

        {/* New Content Sections */}
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mt-6 mb-2">
          Topics Covered
        </h4>
        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
          <li>Introduction to core concepts</li>
          <li>Step-by-step explanation of key points</li>
          <li>Examples and practical applications</li>
          <li>Important best practices</li>
          <li>Common mistakes to avoid</li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mt-6 mb-2">
          Learning Outcomes
        </h4>
        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
          <li>Understand the fundamentals of the topic</li>
          <li>Apply the concepts to solve real-world problems</li>
          <li>Prepare for the next lesson or course level</li>
          <li>Have a strong grasp of key concepts and techniques</li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mt-6 mb-2">
          Related Resources
        </h4>
        <p className="text-gray-600 dark:text-gray-300">
          Here are some resources to help you deepen your understanding and practice:
        </p>
        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
          <li>
            <a href="https://www.example.com" className="text-blue-600 dark:text-blue-400">
              Example Article on Core Concepts
            </a>
          </li>
          <li>
            <a href="https://www.example.com" className="text-blue-600 dark:text-blue-400">
              Practice Exercises and Challenges
            </a>
          </li>
          <li>
            <a href="https://www.example.com" className="text-blue-600 dark:text-blue-400">
              Additional Reading and References
            </a>
          </li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mt-6 mb-2">
          Upcoming Lessons
        </h4>
        <p className="text-gray-600 dark:text-gray-300">
          Stay tuned for the next lessons where we will dive deeper into advanced topics and provide more hands-on examples to reinforce your learning.
        </p>
      </div>
    </div>
  );
}
