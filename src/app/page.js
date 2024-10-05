// app/page.js

"use client";

import { useState } from "react";
import { Button, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; 

export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false); 
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [selectedAnswers, setSelectedAnswers] = useState([]); 
  const [quizData, setQuizData] = useState(null); 
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null); 
  const [scoreboard, setScoreboard] = useState([]); // Array for tracking points per question

  const handleStartQuiz = async () => {
    try {
      const response = await fetch("/quizData.json"); // Fetch JSON from public folder
      const data = await response.json();
      setQuizData(data.quiz); // Set the 'quiz' array directly

      // Initialize scoreboard with 'Unanswered' for each question
      const initialScoreboard = data.quiz.map(() => "Unanswered");
      setScoreboard(initialScoreboard);
      

      setQuizStarted(true); // Only start the quiz once the data is loaded
    } catch (error) {
      console.error("Failed to load quiz data:", error);
    }
  };
  const handleAnswerSelect = (answer, index) => {
    setSelectedAnswerIndex(index); // Set the selected answer index
    setSelectedAnswers([...selectedAnswers, answer]); // Track selected answers
  };

  const handleNext = () => {
    console.log("Next button clicked");
  
    // Check if an answer is selected
    if (selectedAnswerIndex !== null) {
      // Update scoreboard with the points for this answer
      const updatedScoreboard = [...scoreboard];
      const selectedAnswer = quizData[currentQuestionIndex].answers[selectedAnswerIndex]; // Get the selected answer
      updatedScoreboard[currentQuestionIndex] = selectedAnswer.points; // Update with "Green", "NDP", "Cons"
      setScoreboard(updatedScoreboard);
  
      // Move to the next question or finish the quiz
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Increment the question index
      } else {
        // If it's the last question, mark the quiz as finished
        console.log("Quiz finished");
        setQuizFinished(true);
      }
  
      // Reset selected answer index for the next question
      setSelectedAnswerIndex(null);
    } else {
      console.warn("No answer selected");
    }
  };

  const handleBack = () => {
    console.log("Back button clicked");
    // Logic for the "Back" button (if required)
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1); // Decrement the question index
      setSelectedAnswerIndex(null); // Reset selected answer index when going back
    }
  };


  //Start Screen when Quiz Not Started
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
  if(quizFinished){
    return (
      <div className="master-container">
        <h1>Good Job!</h1>
        <h2>Scoreboard:</h2>
        <ul>
          {scoreboard.map((score, index) => (
            <li key={index}>
              Question {index + 1}: {score === "Unanswered" ? "Not Answered" : score} points
            </li>
          ))}
        </ul>
      </div>
    );
  };

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
       {/* Navigation Buttons for Back and Next */}
       <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleBack}
          disabled={currentQuestionIndex === 0} // Disable "Back" on the first question
          startIcon={<ArrowBackIcon />} // Add an icon to the button
          sx={{ width: '120px' }}
        >
          Back
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          endIcon={<ArrowForwardIcon />} // Add an icon to the button
          sx={{ width: '120px' }}
        >
          Next
        </Button>
      </Box>
    </div>
  );
}