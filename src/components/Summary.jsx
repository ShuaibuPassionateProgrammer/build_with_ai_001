import React from 'react';

const Summary = ({ summary }) => {
  if (!summary) return null;
  
  // Format the date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    
    // Try to create a Date object and format it
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString; // Fallback to the original string if parsing fails
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-green-600 text-white">
        <h2 className="text-lg font-semibold">Analysis Summary</h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-500">File Type</h3>
            <p className="text-gray-800">{summary.fileType}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500">Creation Date</h3>
            <p className="text-gray-800">{formatDate(summary.creationDate)}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-500">Description</h3>
          <p className="text-gray-800">{summary.description}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-500">AI Analysis</h3>
          <p className="text-gray-800 whitespace-pre-wrap">{summary.aiAnalysis}</p>
        </div>
        
        {summary.additionalInsights && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500">Additional Insights</h3>
            <p className="text-gray-800">{summary.additionalInsights}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;