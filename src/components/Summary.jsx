import React from 'react';

const Summary = ({ summary }) => {
  if (!summary) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Summary</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-medium text-gray-800 mb-2">AI Analysis Results</h3>
        
        {summary.fileType && (
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-600">File Type:</span>
            <span className="ml-2 text-gray-800">{summary.fileType}</span>
          </div>
        )}
        
        {summary.creationDate && (
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-600">Creation Date:</span>
            <span className="ml-2 text-gray-800">{summary.creationDate}</span>
          </div>
        )}
        
        {summary.description && (
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-600">Description:</span>
            <p className="mt-1 text-gray-800">{summary.description}</p>
          </div>
        )}
        
        {summary.aiAnalysis && (
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-600">AI Analysis:</span>
            <p className="mt-1 text-gray-800 whitespace-pre-line">{summary.aiAnalysis}</p>
          </div>
        )}
        
        {summary.additionalInsights && (
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-600">Additional Insights:</span>
            <p className="mt-1 text-gray-800">{summary.additionalInsights}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;