// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH7MR34OLZQL4h1rCE34pcSZ8ZOxGTTY0",
  authDomain: "build-with-ai-001.firebaseapp.com",
  projectId: "build-with-ai-001",
  storageBucket: "build-with-ai-001.firebasestorage.app",
  messagingSenderId: "302895286081",
  appId: "1:302895286081:web:1f333b88e96d72dc0f43c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const ai = getAI(app, { backend: new GoogleAIBackend() });
export const geminiModel = getGenerativeModel(ai, { model: "gemini-2.5-flash" });