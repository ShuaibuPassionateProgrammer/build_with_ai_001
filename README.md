# AI File Analyzer

An AI-powered system built with React that allows users to upload PDF, image, or video files. Once uploaded, the system prompts users to provide additional information about the file and then uses the Gemini API to analyze the content and generate responses.

## Features

- File upload for PDF, image, and video files
- Metadata collection for uploaded files
- AI-powered analysis using Google's Gemini API
- Interactive chat interface for follow-up questions
- Summary view of analysis results

## Technologies Used

- React (v19)
- Vite
- Tailwind CSS
- Google Generative AI (@google/generative-ai)
- React Dropzone
- React Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- A Gemini API key from Google AI Studio

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd build_with_ai_001
```

2. Install dependencies

```bash
npm install
```

3. Add your Gemini API key

Open `src/utils/geminiApi.js` and replace `'YOUR_GEMINI_API_KEY'` with your actual API key.

```javascript
const API_KEY = 'YOUR_GEMINI_API_KEY'; // Replace with your actual API key
```

For production, consider using environment variables instead.

4. Start the development server

```bash
npm run dev
```

## Usage

1. Upload a file (PDF, image, or video) using the file upload component
2. Fill in the metadata form with information about the file
3. Click "Analyze with AI" to process the file
4. View the AI analysis results in the chat and summary sections
5. Ask follow-up questions using the chat input at the bottom

## Project Structure

```
src/
├── components/
│   ├── Chat.jsx        # Chat interface component
│   ├── FileUpload.jsx  # File upload and metadata collection
│   ├── Header.jsx      # Application header
│   ├── Loader.jsx      # Loading indicator
│   └── Summary.jsx     # Analysis summary display
├── utils/
│   └── geminiApi.js    # Gemini API integration
├── App.jsx             # Main application component
├── App.css             # Application styles
├── main.jsx            # Application entry point
└── index.css           # Global styles with Tailwind directives
```

## Notes

- The Gemini API has usage limits. Check the [Google AI documentation](https://ai.google.dev/) for more information.
- For production use, implement proper API key management and error handling.
- The application currently processes one file at a time.

## License

MIT
