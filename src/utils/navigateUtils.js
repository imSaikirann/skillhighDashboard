// Refactored utility to navigate inside a component or custom hook
import { useNavigate } from 'react-router-dom';

// Navigate to a specific path
export const useNavigateTo = (path) => {
  const navigate = useNavigate(); // Use the hook inside the function
  return () => navigate(path); // Return a function to call the navigate hook
};

// Navigate to login page
export const useNavigateToLogin = () => {
  const navigate = useNavigate();
  return () => navigate('/login'); // Redirect to login
};

export const useNavigateToPlay = () => {
  const navigate = useNavigate();
  return () => navigate('/play'); // Redirect to Play
};
