import React, { useState, useEffect } from 'react';
import { DownloadIcon } from '../assets/icons/icons';
import { useData } from '../store/DataContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from '../config/axiosConfig';
import Alert from '../components/Alert';

export const ProjectSubmissionForm = () => {
  const { projects, fetchProjects, loading, setAlert } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectDescription, setProjectDescription] = useState(""); 
  const [githubUrl, setGithubUrl] = useState(""); 
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId, courseName } = location.state || {}; 


  useEffect(() => {
    if (!courseId) {
      navigate('/', { replace: true });
      return;
    }
    fetchProjects(courseId);
  }, [courseId, navigate]);

  if (!courseId) {
    return null;
  }

  const handleModalOpen = (project) => {
    setSelectedProject(project);

    // If project has an existing solution, pre-fill the modal inputs with that data
    const existingSolution = project.solutions?.[0] || {};
    console.log(existingSolution)
    setProjectDescription(existingSolution.explanation || "");
    setGithubUrl(existingSolution.githubLink || "");

    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  const handleGithubUrlChange = (e) => {
    setGithubUrl(e.target.value); 
  };

  const handleProjectDescriptionChange = (e) => {
    setProjectDescription(e.target.value); 
  };

  const handleSubmit = async () => {
    if (!selectedProject) return;
    console.log(selectedProject)
    const updatedData = {
      explanation: projectDescription,
      githubLink: githubUrl,
    };
  
    try {
      let response;
      // If the project already has a solution, update it with PUT
      if (selectedProject.solutions?.length > 0) {
        response = await axios.put(`/courseProjects/updateSolution/${selectedProject?.solutions[0].id}`, updatedData);
      } 
      // If the project doesn't have a solution, create a new one with POST
      else {
        response = await axios.post(`/courseProjects/submitSolution/${selectedProject.id}`, updatedData);
      }
  
      if (response.data.success) {
        setAlert({ message: response.data.message, isVisible: true });
        setProjectDescription("");
        setGithubUrl("");
        handleModalClose();
      }
    } catch (error) {
      setAlert({ message: error.response?.data?.message, isVisible: true });
    }
  };
  

  if (loading) {
    return <Spinner />;
  }
  if (!Array.isArray(projects) || projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-darkBg mt-26 md:mt-0">
        <Alert message="No projects available" isVisible={true} />
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg text-center">
          We are working on adding projects for "{courseName || 'this course'}". 
          Please check back soon to submit your work and showcase your skills!
        </p>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-darkBg mt-26 md:mt-0">
      <Alert />
      <div className="max-w-6xl w-full p-8 space-y-6">
        {/* Header Section */}
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white">{courseName}</h2>

        {/* Tagline Section */}
        <p className="text-lg text-center text-gray-700 dark:text-gray-300 mt-4">
          Completed your {courseName} projects? Claim your certificate now and showcase your expertise!
        </p>

        {/* Projects List (Grid layout with columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-darkBg rounded-lg border-2 border-gray-100 dark:border-dark shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6"
            >
              {/* Status Badge */}
              {project.solutions?.[0]?.reviewState && (
                <div
                  className={`py-1 px-4 text-sm font-semibold text-white rounded-full w-max mb-6 ${
                    project.solutions[0]?.reviewState === 'SUCCESSFUL' ? 'bg-green-600' : 'bg-yellow-600'
                  }`}
                >
                  {project.solutions[0]?.reviewState}
                </div>
              )}

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{project.projectName}</h3>

              {/* PDF Download Button */}
              {project.projectLink && (
                <div className="mt-4 flex items-center justify-center">
                  <a
                    href={project.projectLink}
                    download
                    className="flex items-center space-x-2 text-primary hover:text-green-950"
                  >
                    <DownloadIcon />
                    <span className="text-sm">Download Description</span>
                  </a>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 space-y-4">
                <button
                  onClick={() => handleModalOpen(project)}
                  className={`w-full py-3 text-white font-semibold rounded-lg ${
                    project.solutions?.[0]?.reviewState === 'SUCCESSFUL'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary hover:bg-primary-dark'
                  }`}
                  disabled={project.solutions?.[0]?.reviewState === 'SUCCESSFUL'}
                >
                  {project.solutions?.length > 0 ? 'Update GitHub Link' : 'Submit Project'}
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Project Details */}
      {modalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center mt-20 sm:mt-10">
          <div className="bg-white dark:bg-darkBg shadow-lg rounded-lg w-96 sm:w-[600px] p-8">
            <h3 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6">Project Details</h3>
            <div className="space-y-6">
              <div>
                <strong className="text-sm text-gray-600 dark:text-gray-400">Project Name</strong>
                <p className="text-lg text-gray-800 dark:text-white">{selectedProject.projectName}</p>
              </div>

              <div>
                <strong className="text-sm text-gray-600 dark:text-gray-400">GitHub URL</strong>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={handleGithubUrlChange}
                  className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-darkBg dark:text-white"
                  placeholder="Enter GitHub URL"
                  required
                />
              </div>

              <div>
                <strong className="text-sm text-gray-600 dark:text-gray-400">Project Description</strong>
                <textarea
                  value={projectDescription}
                  onChange={handleProjectDescriptionChange}
                  className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-darkBg dark:text-white"
                  placeholder="Enter project description here"
                  required
                  rows="4"
                />
              </div>

              <div>
                <strong className="text-sm text-gray-600 dark:text-gray-400">Status</strong>
                {selectedProject.solutions?.[0]?.reviewState ? (
                  <p
                    className={`text-lg font-semibold ${
                      selectedProject.solutions[0].reviewState === 'SUCCESSFUL'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {selectedProject.solutions[0].reviewState}
                  </p>
                ) : (
                  <p className="text-lg text-gray-600 dark:text-gray-400">No review yet</p>
                )}
              </div>

              <div className="flex justify-between space-x-2 mt-8">
                <button
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700"
                >
                  Close
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-primary text-white font-normal rounded-lg"
                >
                  {selectedProject.solutions?.length > 0 ? 'Update Link' : 'Submit Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
