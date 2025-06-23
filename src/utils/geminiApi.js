import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
// Note: In a production environment, you should use environment variables for API keys
const API_KEY = import.meta.VITE_GEMINI_API_KEY; // Replace with your actual API key or use environment variables
const genAI = new GoogleGenerativeAI(API_KEY);

// Function to convert file to base64
const fileToGenerativePart = async (file) => {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

// Function to analyze file content with Gemini
export const analyzeFileContent = async (file, metadata) => {
  try {
    // Select the appropriate model based on file type
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    
    // Convert file to the format expected by Gemini API
    const filePart = await fileToGenerativePart(file);
    
    // Create prompt based on file type and metadata
    const fileType = file.type.split('/')[0];
    let prompt = `Analyze this ${fileType} file. `;
    
    if (metadata.description) {
      prompt += `The user describes it as: "${metadata.description}". `;
    }
    
    if (metadata.creationDate) {
      prompt += `It was created on ${metadata.creationDate}. `;
    }
    
    if (metadata.additionalInfo) {
      prompt += `Additional context: ${metadata.additionalInfo}. `;
    }
    
    prompt += 'Please provide a detailed analysis of the content, key elements, and any insights you can extract.';
    
    // Generate content using Gemini
    const result = await model.generateContent([prompt, filePart]);
    const response = await result.response;
    const text = response.text();
    
    return {
      success: true,
      analysis: text,
      fileType,
      metadata
    };
  } catch (error) {
    console.error('Error analyzing file with Gemini:', error);
    return {
      success: false,
      error: error.message || 'Failed to analyze file'
    };
  }
};

// Function to generate a follow-up response based on user query
export const generateResponse = async (query, context) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    let prompt = query;
    if (context) {
      prompt = `Context: ${context}\n\nUser query: ${query}`;
    }
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return {
      success: true,
      text: response.text()
    };
  } catch (error) {
    console.error('Error generating response with Gemini:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate response'
    };
  }
};