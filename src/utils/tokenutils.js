

// Function to get the token from localStorage
export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Function to set a token in localStorage
  export const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Function to remove a token from localStorage
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  