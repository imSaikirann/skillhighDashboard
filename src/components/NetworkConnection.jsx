import React, { useEffect, useState } from 'react';
import { Offline, Online } from 'react-detect-offline';

export default function NetworkStatusAlert() {
  const [isOnline, setIsOnline] = useState(navigator.onLine); // Use browser's built-in API to track online status

  // This useEffect will listen for changes to online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div>
      {/* Online Alert */}
      {isOnline ? (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 fixed top-0 left-0 right-0 z-50"
          role="alert"
        >
          <span className="font-medium">You are back online!</span> All your requests will now be processed.
        </div>
      ) : (
        // Offline Alert
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 fixed top-0 left-0 right-0 z-50"
          role="alert"
        >
          <span className="font-medium">You are offline!</span> Please check your internet connection.
        </div>
      )}
    </div>
  );
}
