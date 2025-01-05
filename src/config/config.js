
const getApiUrl = () => {
  const ENV = import.meta.env.VITE_ENV; // "development" or "production"
  
  // Determine the API URL based on the current environment
  if (ENV === 'production') {
    return import.meta.env.VITE_API_URL_PRODUCTION || 'https://default-prod-api.com';
  } else if (ENV === 'development') {
    return import.meta.env.VITE_API_URL_DEVELOPMENT || 'http://localhost:4000';
  } else {
    console.error('Invalid environment. Please set VITE_ENV to either "development" or "production".');
    return null;
  }
};

export const API_URL = getApiUrl();
