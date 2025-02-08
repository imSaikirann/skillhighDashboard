import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear user-related data from localStorage or sessionStorage
    localStorage.removeItem('token');  // or sessionStorage.removeItem('authToken')
    // Redirect the user to the login page
    navigate('/login');
  };

  return logout;
};

export default useLogout;
