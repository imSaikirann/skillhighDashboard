import React, { useState, useEffect } from 'react';
import { useData } from '../store/DataContext';

export default function Content() {
  const { TopicsData } = useData();
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Check if the TopicsData object is loaded or not.
    if (TopicsData && TopicsData.video) {
      setIsLoading(false); // Set loading to false once data is available
    }
  }, [TopicsData]);

  // If TopicsData is not yet available, show skeleton loader.
  const videoURL = TopicsData?.video || '';
  const pptLink = TopicsData?.pptLink || '#'; // Assuming pptLink is part of TopicsData

  return (
    <div className="w-full max-w-6xl bg-white dark:bg-darkBg rounded-xl shadow-lg overflow-hidden mx-auto">
      {/* Video Embed */}
      {isLoading ? (
        <div className="w-full" style={{ position: 'relative', paddingTop: '56.25%' }}>
          <div className="animate-pulse bg-red-500 dark:bg-gray-700 w-full h-full rounded-lg"></div>
        </div>
      ) : (
        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
          <iframe
            src={videoURL}
            loading="lazy"
            style={{
              border: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
            }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Video Details */}
      <div className="p-6 bg-gray-50 dark:bg-dark dark:border-2 dark:border-dark rounded-b-xl">
        {/* Button Container with Flexbox for Right Alignment */}
        <div className="flex justify-end mb-4">
          {isLoading ? null : (
            <button
              onClick={() => window.open(pptLink, '_blank')}
              className="px-6 py-2 bg-primary text-white text-sm rounded-lg shadow-md hover:bg-primary focus:outline-none"
            >
              Open PPT
            </button>
          )}
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
          Lesson Description
        </h3>

        {isLoading ? (
          <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-3/4 mb-4"></div>
        ) : (
          <p className="text-dark text-justify  dark:text-gray-300">
            {TopicsData.description}
          </p>
        )}
      </div>
    </div>
  );
}
