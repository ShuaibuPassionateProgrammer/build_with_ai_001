import { useState } from 'react'
import './App.css'

// Import components
import Header from './components/Header'
import FileUpload from './components/FileUpload'
import Chat from './components/Chat'
import Summary from './components/Summary'
import Loader from './components/Loader'

// Import Gemini API utilities
import { analyzeFileContent, generateResponse } from './utils/geminiApi'

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  
  const handleFileUpload = async ({ file, metadata }) => {
    setIsLoading(true);
    setError(null);
    setCurrentFile(file);
    
    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: `I've uploaded a ${file.type.split('/')[0]} file named "${file.name}". ${metadata.description ? `It contains: ${metadata.description}` : ''}`
    };
    setMessages([userMessage]);
    
    try {
      // Call Gemini API to analyze the file
      const result = await analyzeFileContent(file, metadata);
      
      if (result.success) {
        // Add AI response to chat
        const aiMessage = {
          role: 'assistant',
          content: result.analysis
        };
        setMessages(prev => [...prev, aiMessage]);
        
        // Create summary
        setSummary({
          fileType: result.fileType,
          creationDate: metadata.creationDate,
          description: metadata.description,
          aiAnalysis: result.analysis,
          additionalInsights: metadata.additionalInfo
        });
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error('Error processing file:', err);
      setError(err.message || 'Failed to process file. Please try again.');
      
      // Add error message to chat
      const errorMessage = {
        role: 'assistant',
        content: `I'm sorry, I encountered an error while analyzing your file: ${err.message || 'Unknown error'}`
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUserQuery = async (query) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: query
    };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      // Get context from previous analysis if available
      const context = summary?.aiAnalysis;
      
      // Call Gemini API to generate response
      const result = await generateResponse(query, context);
      
      if (result.success) {
        // Add AI response to chat
        const aiMessage = {
          role: 'assistant',
          content: result.text
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error('Error generating response:', err);
      
      // Add error message to chat
      const errorMessage = {
        role: 'assistant',
        content: `I'm sorry, I encountered an error: ${err.message || 'Unknown error'}`
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <FileUpload onFileUpload={handleFileUpload} />
        
        {isLoading && <Loader />}
        
        <Chat messages={messages} />
        
        {summary && <Summary summary={summary} />}
        
        {currentFile && !isLoading && (
          <div className="max-w-2xl mx-auto mt-8">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const query = e.target.query.value;
                handleUserQuery(query);
                e.target.query.value = '';
              }}
              className="flex gap-2"
            >
              <input 
                type="text" 
                name="query"
                placeholder="Ask a follow-up question about your file..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </main>
      
      <footer className="mt-12 py-6 bg-gray-100 text-center text-gray-600">
        <p>AI File Analyzer powered by Gemini API</p>
      </footer>
    </div>
  )
}

export default App
