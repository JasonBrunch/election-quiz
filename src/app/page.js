// app/page.js

"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [selectedAnswers, setSelectedAnswers] = useState([]); 
  const [quizData, setQuizData] = useState(null); 
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null); 

  const handleStartQuiz = async () => {
    try {
      const response = await fetch("/quizData.json"); // Fetch JSON from public folder
      const data = await response.json();
      setQuizData(data.quiz); // Set the 'quiz' array directly
      setQuizStarted(true); // Only start the quiz once the data is loaded
    } catch (error) {
      console.error("Failed to load quiz data:", error);
    }
  };
  const handleAnswerSelect = (answer, index) => {
    setSelectedAnswerIndex(index); // Set the selected answer index
    setSelectedAnswers([...selectedAnswers, answer]); // Track selected answers
  };

  if (!quizStarted) {
    return (
      <div className="master-container">
        {/* Pill-Shaped Button to Start Quiz */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartQuiz}
          size="large"
          sx={{
            borderRadius: "50px",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <EditIcon sx={{ marginRight: "8px" }} />
          Start Quiz
        </Button>
      </div>
    );
  }

  // When quiz starts, display the current question and its answers
  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>{currentQuestion.question}</h2>
      <div className="answers">
        {currentQuestion.answers.map((answer, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => handleAnswerSelect(answer, index)}
            sx={{
              margin: "10px",
              display: "block",
              backgroundColor:
                index === selectedAnswerIndex ? "lightblue" : "inherit", // Simple background change on selection
              borderColor: index === selectedAnswerIndex ? "blue" : "inherit", // Optional: border change on selection
            }}
          >
            {answer.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
