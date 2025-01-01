import React, { useState } from 'react';

const projects = [
  {
    id: 1,
    name: "Demo Project 1",
    githubRepo: "https://github.com/username/repo1",
    status: "Pending",
  },
  {
    id: 2,
    name: "Demo Project 2",
    githubRepo: "",
    status: "In Review",
  },
  {
    id: 3,
    name: "Demo Project 3",
    githubRepo: "https://github.com/username/repo3",
    status: "Completed",
  }
];

export const ProjectSubmissionForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [githubUrl, setGithubUrl] = useState("");

  // Handle opening modal with project details
  const handleModalOpen = (project) => {
    setSelectedProject(project);
    setGithubUrl(project.githubRepo || ""); // Set the GitHub URL or empty if not present
    setModalOpen(true);
  };

  // Handle closing the modal
  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  // Handle GitHub URL input change
  const handleGithubUrlChange = (e) => {
    setGithubUrl(e.target.value);
  };

  // Handle Submit action
  const handleSubmit = () => {
    alert(`Project submitted with URL: ${githubUrl}`);
    handleModalClose();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-darkBg text-white  mt-20">
      <div className=" shadow-xl rounded-lg w-full max-w-6xl p-12">
        <h2 className="text-3xl font-semibold mb-10 text-center">Project Submission</h2>

        {/* List Projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-darkBg dark:border-2 dark:border-dark p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                {project.status === 'Completed' ? (
                  <span className="bg-green-700 text-white px-3 py-1 text-sm font-semibold rounded-full">Completed</span>
                ) : project.githubRepo ? (
                  <span className="bg-yellow-400 text-white px-3 py-1 text-sm font-semibold rounded-full">Pending</span>
                ) : (
                  <span className="bg-blue-500 text-white px-3 py-1 text-sm font-semibold rounded-full">{project.status}</span>
                )}
              </div>
              <p className="text-sm mt-2">GitHub Repository: {project.githubRepo || 'Not Provided'}</p>

              {/* Buttons */}
              <div className="mt-6">
                <button
                  onClick={() => handleModalOpen(project)}
                  className="w-full py-2 text-white font-semibold rounded-lg bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {project.githubRepo ? 'Update GitHub Link' : 'Submit Project'}
                </button>
                <button
                  onClick={() => handleModalOpen(project)}
                  className="mt-4 w-full py-2 text-white font-semibold rounded-lg bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  See Project Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Project Details */}
      {modalOpen && selectedProject && (
        <div className="fixed inset-0 bg-darkBg dark:border-2 dark:border-dark bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out">
          <div className="bg-darkBg shadow-xl dark:border-2 dark:border-dark rounded-lg w-96 p-8">
            <h3 className="text-2xl font-semibold text-center mb-6">Project Details</h3>
            <div className="space-y-4">
              <div>
                <strong className="text-sm">Project Name</strong>
                <p className="text-sm">{selectedProject.name}</p>
              </div>
              <div>
                <strong className="text-sm">GitHub Repository</strong>
                {selectedProject.githubRepo ? (
                  <p className="text-sm">{selectedProject.githubRepo}</p>
                ) : (
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={handleGithubUrlChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-700"
                    placeholder="Enter GitHub URL"
                    required
                  />
                )}
              </div>
              <div>
                <strong className="text-sm">Status</strong>
                <p className="text-sm">{selectedProject.status}</p>
              </div>

              <div className="flex justify-between space-x-2 mt-6">
                <button
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Close
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {selectedProject.githubRepo ? 'Update Link' : 'Submit Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
