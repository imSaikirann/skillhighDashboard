import React, { useState } from 'react';
import axios from '../config/axiosConfig';
import { useData } from "../store/DataContext";
import Alert from '../components/Alert';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const { loading, setLoading, alert, setAlert } = useData();
  const navigate = useNavigate();

  // State to toggle password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/dashboardUsers/login', { email, password });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setAlert({ message: response.data.message, isVisible: true });
        navigate('/');
      } else {
        setAlert({ message: 'Login failed. Please check your credentials.', isVisible: true });
      }
    } catch (error) {
      setAlert({ message: error.response?.data?.message || 'Login failed. Please try again.', isVisible: true });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = () => {
    setIsEmailModalOpen(true);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/dashboardUsers/send-otp', { email });
      if (response.data.success) {
        setAlert({ message: 'OTP sent successfully!', isVisible: true });
        setIsEmailModalOpen(false);
        setIsOtpModalOpen(true);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      setAlert({ message: errorMessage, isVisible: true });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/dashboardUsers/verify-email', { email, otp });
      if (response.data.success) {
        setAlert({ message: 'Email verified successfully!', isVisible: true });
        setIsEmailVerified(true);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      setAlert({ message: errorMessage, isVisible: true });
    }
    setIsOtpModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsEmailModalOpen(false);
    setIsOtpModalOpen(false);
  };

  const handleForgotPassword = () => {
    // Handle forgot password functionality
    alert('Forgot password clicked');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6 dark:bg-darkBg">
      <Alert />
      <div className="bg-white p-10 rounded-lg shadow-xl w-full sm:w-[500px] dark:bg-darkBg dark:border-2 dark:border-dark">
        <h2 className="text-3xl font-semibold text-center text-primary dark:text-primary mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-primary">Email Address</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 mt-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-darkInput dark:text-gray-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-primary">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="w-full px-4 py-3 mt-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-darkInput dark:text-gray-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-4 top-8 transform -translate-y-1/2 text-primary dark:text-primary text-sm"
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <button
            onClick={handleForgotPassword}
            className="text-primary hover:underline text-sm"
          >
            Forgot Password?
          </button>
        </div>

        {/* Verify Email Button */}
        <div className="mt-6 text-center">
          {!isEmailVerified ? (
            <button
              onClick={handleVerifyEmail}
              className="text-primary hover:underline"
            >
              Verify Email ID
            </button>
          ) : (
            <p className="text-sm text-green-600">Email Verified Successfully!</p>
          )}
        </div>
      </div>

      {/* Email Verification Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 dark:bg-darkBg dark:border-2 dark:border-dark">
            <h2 className="text-xl font-bold text-center mb-4">Verify Email</h2>
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-4">
                <label htmlFor="verifyEmail" className="block text-sm font-medium">Enter your email</label>
                <input
                  type="email"
                  id="verifyEmail"
                  className="w-full px-4 py-3 mt-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-darkInput dark:text-gray-300"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary"
                >
                  {loading ? "Verifying" : "Verify"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OTP Modal */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 dark:bg-darkBg dark:border-2 dark:border-dark">
            <h2 className="text-xl font-bold text-center mb-4">Enter OTP</h2>
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <label htmlFor="otp" className="block text-sm font-medium">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  className="w-full px-4 py-3 mt-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-darkInput dark:text-gray-300"
                  placeholder="Enter the OTP sent to your email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
