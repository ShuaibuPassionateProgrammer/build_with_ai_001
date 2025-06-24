import { geminiModel } from '../../firebase/config';

/**
 * Converts a file to a base64 string for Gemini API
 */
const fileToGenerativePart = async (file) => {
  const base64EncodedContent = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  
  return {
    inlineData: {
      data: base64EncodedContent,
      mimeType: file.type
    }
  };
};

/**
 * Analyzes file content using Gemini API
 */
export const analyzeFileContent = async (file, metadata) => {
  try {
    const fileType = file.type.split('/')[0];
    let fileTypeLabel = fileType;
    
    // Handle PDFs specifically
    if (fileType === 'application' && file.type.includes('pdf')) {
      fileTypeLabel = 'PDF';
    }
    
    // Convert file to format expected by Gemini
    const filePart = await fileToGenerativePart(file);
    
    // Create a dynamic prompt based on file type and metadata
    let prompt = `Analyze this ${fileTypeLabel} file in detail. `;
    
    if (metadata.creationDate) {
      prompt += `The file was created on ${metadata.creationDate}. `;
    }
    
    if (metadata.description) {
      prompt += `The user describes it as: "${metadata.description}". `;
    }
    
    if (metadata.additionalInfo) {
      prompt += `Additional context: "${metadata.additionalInfo}". `;
    }
    
    // Add specific instructions based on file type
    switch (fileTypeLabel) {
      case 'image':
        prompt += 'Describe what you see in the image, including objects, people, scenes, colors, and any text visible. Provide a detailed analysis of the content.';
        break;
      case 'video':
        prompt += 'Analyze the key frames of this video. Describe what you can see, including scenes, actions, people, and any text visible. Note that you may only be able to analyze certain frames.';
        break;
      case 'PDF':
        prompt += 'Extract and summarize the key information from this PDF document. Identify the main topics, any important data points, and the overall purpose of the document.';
        break;
      default:
        prompt += 'Provide a detailed analysis of this file\'s content.';
    }
    
    // Call Gemini API with the file and prompt
    const result = await geminiModel.generateContent([
      prompt,
      filePart
    ]);
    
    const response = await result.response;
    const text = response.text();
    
    return {
      success: true,
      fileType: fileTypeLabel,
      analysis: text
    };
  } catch (error) {
    console.error('Error analyzing file:', error);
    return {
      success: false,
      error: error.message || 'Failed to analyze file'
    };
  }
};

/**
 * Generates a response to a user query, optionally with context
 */
export const generateResponse = async (query, context = null) => {
  try {
    let prompt = query;
    
    // If we have context from previous analysis, include it
    if (context) {
      prompt = `Based on the previous analysis: "${context}", please answer the following question: ${query}`;
    }
    
    // Call Gemini API with the prompt
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return {
      success: true,
      text
    };
  } catch (error) {
    console.error('Error generating response:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate response'
    };
  }
};