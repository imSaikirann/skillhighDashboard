import React, { useEffect } from "react";
import { useData } from "../store/DataContext";

const Alert = () => {
  const { alert, setAlert } = useData();

  // Handle alert auto-dismiss
  useEffect(() => {
    if (alert.isVisible) {
      const timer = setTimeout(() => {
        setAlert({ ...alert, isVisible: false });
      }, alert.autoDismissTime || 2000); // Default to 2 seconds if not specified

      return () => clearTimeout(timer);
    }
  }, [alert, setAlert]);

  // Custom styling based on alert type (success, error, etc.)
  const alertStyles = {
    success: "bg-green-500 text-white",
    error: "bg-primary text-white",
    info: "bg-primary text-white",
  };

  return (
    alert.isVisible && (
      <div
        role="alert"
        className={`fixed bottom-5 right-5 w-full max-w-sm p-4 text-sm rounded-md shadow-lg transform transition-all duration-300 ${
          alertStyles[alert.type] || alertStyles.info
        } sm:max-w-sm md:max-w-md`}
        style={{
          transform: alert.isVisible ? "translateY(0)" : "translateY(100px)",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Alert Message */}
          <span className="text-sm sm:text-base">{alert.message}</span>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setAlert({ ...alert, isVisible: false })}
            className="ml-2 text-white hover:bg-opacity-75"
            aria-label="Close alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    )
  );
};

export default Alert;
