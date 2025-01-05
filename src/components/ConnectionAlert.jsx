import React, { useEffect, useState } from 'react';

export default function ConnectionAlert() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div>
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 shadow-md z-50">
          <h3 className="text-sm font-semibold">You are currently offline</h3>
        </div>
      )}
      {isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 shadow-md z-50">
          <h3 className="text-sm font-semibold">You are back online!</h3>
        </div>
      )}
    </div>
  );
}
