import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFilePdf, FaFileImage, FaFileVideo, FaUpload } from 'react-icons/fa';

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({
    creationDate: '',
    description: '',
    additionalInfo: ''
  });
  
  // Handle file drop
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      
      // Check if file type is supported
      const fileType = selectedFile.type.split('/')[0];
      if (!['application', 'image', 'video'].includes(fileType)) {
        alert('Only PDF, image, and video files are supported.');
        return;
      }
      
      // For PDFs, check if it's actually a PDF
      if (fileType === 'application' && !selectedFile.type.includes('pdf')) {
        alert('Only PDF documents are supported for application type.');
        return;
      }
      
      setFile(selectedFile);
    }
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'video/*': ['.mp4', '.webm', '.ogg', '.mov']
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
    if (!file) {
      alert('Please upload a file first.');
      return;
    }
    
    onFileUpload({ file, metadata });
  };
  
  // Get file icon based on type
  const getFileIcon = () => {
    if (!file) return <FaUpload className="text-4xl text-gray-400" />;
    
    const fileType = file.type.split('/')[0];
    switch (fileType) {
      case 'application': // PDF
        return <FaFilePdf className="text-4xl text-red-500" />;
      case 'image':
        return <FaFileImage className="text-4xl text-blue-500" />;
      case 'video':
        return <FaFileVideo className="text-4xl text-purple-500" />;
      default:
        return <FaUpload className="text-4xl text-gray-400" />;
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload File for AI Analysis</h2>
      
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 mb-4 text-center cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          {getFileIcon()}
          {file ? (
            <p className="text-sm font-medium text-gray-700">{file.name}</p>
          ) : (
            <>
              <p className="text-gray-700">Drag & drop a file here, or click to select</p>
              <p className="text-xs text-gray-500">Supports PDF, images, and videos</p>
            </>
          )}
        </div>
      </div>
      
      {file && (
        <form onSubmit={handleSubmit} className="space-y-4">
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
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Content Description
            </label>
            <textarea
              id="description"
              name="description"
              value={metadata.description}
              onChange={handleInputChange}
              placeholder={`Describe what's in this ${file.type.split('/')[0]}...`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              required
            />
          </div>
          
          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Information (optional)
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={metadata.additionalInfo}
              onChange={handleInputChange}
              placeholder="Any other details you'd like the AI to know..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
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