import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-3 text-gray-600">Processing...</p>
    </div>
  );
};

export default Loader;