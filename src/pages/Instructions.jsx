import React from 'react';

const InstructionsPage = () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 mt-28">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden dark:bg-dark">
        <header className="text-center py-6 bg-primary text-white dark:bg-primary">
          <h1 className="text-3xl font-semibold">Course Instructions</h1>
        </header>

        <div className="p-6 space-y-6">
          <div className="instruction bg-gray-50 p-4 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white">
            <h2 className="text-xl text-dark dark:text-gray-100 font-semibold">1. Course Duration</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">The course duration is 6 months.</p>
          </div>

          <div className="instruction bg-gray-50 p-4 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white">
            <h2 className="text-xl text-dark dark:text-gray-100 font-semibold">2. Account Renewal</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">After 6 months, a charge of ₹500 will be applied for an additional 6 months of account usage.</p>
          </div>

          <div className="instruction bg-gray-50 p-4 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white">
            <h2 className="text-xl text-dark dark:text-gray-100 font-semibold">3. Video Uploads</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">If no lessons have been uploaded, They will be updated soon. We are working on it . Please be patient</p>
          </div>

          <div className="instruction bg-gray-50 p-4 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white">
            <h2 className="text-xl text-dark dark:text-gray-100 font-semibold">4. User Interface Issues</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">If there are any issues with the user interface, please email us with a screenshot at: <strong>admin@skillhigh.in</strong></p>
          </div>
        </div>

        <footer className="bg-primary text-white text-center py-4 dark:bg-primary">
          <p className="text-sm">&copy; 2025 SkillHigh. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default InstructionsPage;
