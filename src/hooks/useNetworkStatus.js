import { useEffect, useState } from "react";

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateNetworkStatus = () => {
      setIsOnline(navigator.onLine);
      if (!navigator.onLine) {
        alert("You are offline! Please check your internet connection.");
      }
    };

    window.addEventListener("offline", updateNetworkStatus);
    window.addEventListener("online", updateNetworkStatus);

    return () => {
      window.removeEventListener("offline", updateNetworkStatus);
      window.removeEventListener("online", updateNetworkStatus);
    };
  }, []);

  return isOnline;
};

export default useNetworkStatus;
