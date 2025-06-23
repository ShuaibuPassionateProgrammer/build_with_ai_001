import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiFile, FiImage, FiVideo, FiFileText } from 'react-icons/fi';

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({
    creationDate: '',
    description: '',
    additionalInfo: ''
  });

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      
      // Try to extract creation date from file if available
      try {
        const date = new Date(selectedFile.lastModified);
        setMetadata(prev => ({
          ...prev,
          creationDate: date.toISOString().split('T')[0]
        }));
      } catch (error) {
        console.error('Error extracting date:', error);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMetadata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onFileUpload({ file, metadata });
    }
  };

  const getFileIcon = () => {
    if (!file) return <FiUpload className="text-4xl" />;
    
    const fileType = file.type.split('/')[0];
    switch (fileType) {
      case 'image':
        return <FiImage className="text-4xl text-blue-500" />;
      case 'video':
        return <FiVideo className="text-4xl text-purple-500" />;
      case 'application':
        return <FiFileText className="text-4xl text-red-500" />;
      default:
        return <FiFile className="text-4xl text-gray-500" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Upload Your File</h2>
      
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-3">
          {getFileIcon()}
          {file ? (
            <p className="text-gray-700 font-medium">{file.name}</p>
          ) : (
            <>
              <p className="text-gray-700 font-medium">Drag & drop a file here, or click to select</p>
              <p className="text-gray-500 text-sm">Supports PDF, images, and videos</p>
            </>
          )}
        </div>
      </div>

      {file && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="creationDate" className="block text-sm font-medium text-gray-700 mb-1">
              Creation Date
            </label>
            <input
              type="date"
              id="creationDate"
              name="creationDate"
              value={metadata.creationDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={metadata.description}
              onChange={handleInputChange}
              rows="3"
              placeholder={`Describe what's in this ${file.type.split('/')[0]}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={metadata.additionalInfo}
              onChange={handleInputChange}
              rows="2"
              placeholder="Any other relevant details"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Analyze with AI
          </button>
        </form>
      )}
    </div>
  );
};

export default FileUpload;