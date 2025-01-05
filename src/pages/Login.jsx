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
  const [isNewPasswordModalOpen, setIsNewPasswordModalOpen] = useState(false); // For reset password
  const [otp, setOtp] = useState('');
  const { loading, setLoading, setAlert } = useData();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // To disable buttons after submission

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      setLoading(true);
      const response = await axios.post('/dashboardUsers/login', { email, password });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setAlert({ message: response.data.message, isVisible: true });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setAlert({ message: 'Login failed. Please check your credentials.', isVisible: true });
      }
    } catch (error) {
      setAlert({ message: error.response?.data?.message || 'Login failed. Please try again.', isVisible: true });
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleVerifyEmail = () => {
    setIsEmailModalOpen(true);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
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
      setIsSubmitting(false);
    }
  };

  const handleForgotOtpSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('/dashboardUsers/verify-email', { email, otp });
      console.log(response)
      if (response.data.success) {
        setAlert({ message: 'Email verified successfully!', isVisible: true });
        setIsEmailVerified(true);
        setIsOtpModalOpen(false);
        setIsNewPasswordModalOpen(true);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      setAlert({ message: errorMessage, isVisible: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailOtpSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if(forgoutpassword)
      {
      const response = await axios.post('/dashboardUsers/forgot-password', { password });

      }
      else
      {
        const response = await axios.post('/dashboardUsers/verify-email', { email, otp });

      }
      console.log(response)
      if (response) {
        setAlert({ message: 'Email verified successfully!', isVisible: true });
        localStorage.setItem('token',response.data.token)
        setIsEmailVerified(true);
        navigate('/')
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      setAlert({ message: errorMessage, isVisible: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      setLoading(true);
      const response = await axios.post('/dashboardUsers/set-password', { password });
      setAlert({ message: 'Password reset successfully!', isVisible: true });
      setIsNewPasswordModalOpen(false);
    } catch (error) {
      setAlert({ message: error.response?.data?.message || 'Password reset failed.', isVisible: true });
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsEmailModalOpen(false);
    setIsOtpModalOpen(false);
    setIsNewPasswordModalOpen(false);
  };

  const handleForgotPassword = () => {
    setIsEmailModalOpen(true);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6 dark:bg-darkBg">
      <Alert />
      <div className="bg-white p-10 rounded-lg shadow-lg w-full sm:w-[500px] dark:bg-darkBg dark:border-2 dark:border-dark">
        <h2 className="text-3xl font-semibold text-center text-primary dark:text-primary mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-darkInput dark:text-gray-300 dark:border-gray-600"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-darkInput dark:text-gray-300 dark:border-gray-600"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-4 top-10 text-primary dark:text-primary text-sm"
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 px-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300 ease-in-out ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            disabled={isSubmitting || loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Forgot Password Link */}
          <div className="text-center mt-4">
            <a onClick={handleForgotPassword} className="text-sm text-primary cursor-pointer hover:underline">
              Forgot Password?
            </a>
          </div>
        </form>

        {/* Email Verification Button */}
        <div className="mt-6 text-center">
          {!isEmailVerified ? (
            <button
              onClick={handleVerifyEmail}
              className="text-primary hover:underline"
            >
              Verify Email ID
            </button>
          ) : (
            <p className="text-md text-primary">Email Verified Successfully!</p>
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
                  className="w-full px-4 py-3 mt-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-darkInput dark:text-gray-300"
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
                  className={`px-4 py-2 bg-primary text-white rounded-md hover:bg-primary  ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"} `}
                  disabled={isSubmitting}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-1">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 dark:bg-darkBg dark:border-2 dark:border-dark">
            <h2 className="text-xl font-bold text-center mb-4">Enter OTP</h2>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-4">
              We've sent an OTP to your email. Please check your inbox and enter the OTP below.
            </p>
            <form onSubmit={handleEmailOtpSubmit}>
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
                  className={`px-4 py-2 bg-primary text-white rounded-md hover:bg-primary  ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                  disabled={isSubmitting || loading}
                >
                  {loading ? "Verifying..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Set New Password Modal */}
      {isNewPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 dark:bg-darkBg dark:border-2 dark:border-dark">
            <h2 className="text-xl font-bold text-center mb-4">Set New Password</h2>
            <form onSubmit={handleNewPasswordSubmit}>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full px-4 py-3 mt-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-darkInput dark:text-gray-300"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  disabled={isSubmitting}
                >
                  Set Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
