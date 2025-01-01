import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import newLogo from '../assets/newLogo.png';
import { Profile } from '../assets/icons/icons';
import { useData } from '../store/DataContext';
import {useNavigateToLogin} from '../utils/navigateUtils'
export default function Navbar() {
 const {profileData} = useData()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const redirectToLogin = useNavigateToLogin()
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
    if (!profileMenuOpen) {
      setIsDropdownOpen(false); // Close dark mode dropdown
    }
  };

  const toggleDarkModeDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setProfileMenuOpen(false); // Close profile menu
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  const handleThemeChange = (theme) => {
    if (theme === 'dark') {
      setDarkMode(true);
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      setDarkMode(false);
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);


  const handleLogout = () => {
    // Remove items from localStorage using string keys
    localStorage.removeItem("token"); // Assuming 'token' is the key for your auth token
    localStorage.removeItem("appData"); // Assuming 'appData' is the key for app-related data
  
   
  
      redirectToLogin(); // If redirectToLogin is a defined function
   
  };
  

  const renderProfileMenu = () => (
    <div className="absolute right-0 mt-2 w-auto bg-white dark:bg-dark dark:border-2 dark:border-dark rounded-lg shadow-lg">
      <div className="px-4 py-3 border-b">
        <span className="block text-sm text-gray-900 dark:text-white">
          {profileData?.userName || 'Guest'}
        </span>
        <span className="block text-xs text-gray-500 truncate dark:text-gray-300 mt-1">
          {profileData?.userEmail || 'guest@example.com'}
        </span>
      </div>
      <ul className="py-2">
        <li>
          <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/resume" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200">
            Resume
          </Link>
        </li>
        <li>
          <Link to="/earnings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200">
            Settings
          </Link>
        </li>
        <li>
          <button
            onClick={() => handleLogout()} // Replace with actual logout logic
            className="text-left block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
          >
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <nav className="bg-white border-gray-200 dark:bg-darkBg fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={newLogo} className="h-auto w-[150px]" alt="Logo" />
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse">
          <div className="relative">
            <button
              onClick={toggleDarkModeDropdown}
              className="flex items-center text-gray-600 dark:text-neutral-400"
              aria-haspopup="menu"
              aria-expanded={isDropdownOpen ? 'true' : 'false'}
              aria-label="Toggle Dark Mode Menu"
            >
              <svg className="block dark:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
              <svg className="hidden dark:block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark shadow-md rounded-lg p-2" role="menu" aria-orientation="vertical">
                <button className="w-full py-2 px-3 text-sm text-left text-gray-800 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg" onClick={() => handleThemeChange('light')}>
                  Default (Light)
                </button>
                <button className="w-full py-2 px-3 text-sm text-left text-gray-800 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg" onClick={() => handleThemeChange('dark')}>
                  Dark
                </button>
                <button className="w-full py-2 px-3 text-sm text-left text-gray-800 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg" onClick={() => handleThemeChange('auto')}>
                  Auto (System)
                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-dark rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-200"
              aria-label="Profile Menu"
            >
              <Profile />
            </button>
            {profileMenuOpen && renderProfileMenu()}
          </div>
        </div>
      </div>
    </nav>
  );
}
