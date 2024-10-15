// app/page.js

"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { LinearProgress } from "@mui/material";
import QuizResultChart from "../components/QuizResultChart";

export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [scoreboard, setScoreboard] = useState([]); // Array for tracking points per question
  const [error, setError] = useState("");
  const [finalResults, setFinalResults] = useState([0, 0, 0]); // [Green, NDP, Cons]

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
      //reset the error if you had one previously
      setError("");
      // Update scoreboard with the points for this answer
      const updatedScoreboard = [...scoreboard];
      const selectedAnswer =
        quizData[currentQuestionIndex].answers[selectedAnswerIndex]; // Get the selected answer
      updatedScoreboard[currentQuestionIndex] = selectedAnswer.points; // Update with "Green", "NDP", "Cons"
      setScoreboard(updatedScoreboard);

      // Move to the next question or finish the quiz
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Increment the question index
      } else {
        // If it's the last question, mark the quiz as finished
        console.log("Quiz finished");

        // Calculate totals for each party
        const results = [0, 0, 0]; // [Green, NDP, Cons]

        scoreboard.forEach((answer) => {
          if (answer === "Green") results[0]++;
          else if (answer === "NDP") results[1]++;
          else if (answer === "Cons") results[2]++;
        });

        setQuizFinished(true);
        setFinalResults(results); // Store the final results in state to pass to the chart

     
      }

      // Reset selected answer index for the next question
      setSelectedAnswerIndex(null);
    } else {
      console.warn("No answer selected");
      setError("*Please select an answer to continue");
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
        <Image
          src="/characters.jpg"
          alt="Character sketch of the 3 candidates"
          width={0}
          height={0}
          sizes="100vw"
          priority={true}
          style={{ width: "100%", height: "auto" }} // optional
        />
        <div className="text-container">
          <img src="bcVotesHeading.svg" alt="BC Votes Heading" />
          <p>
            Take this quick quiz to see which of British Columbia's three
            political parties aligns with your views.
          </p>
        </div>
        {/* Pill-Shaped Button to Start Quiz */}
        <div className="button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartQuiz}
            size="large"
            sx={{
              borderRadius: "50px",
              padding: "15px 25px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <EditIcon sx={{ marginRight: "8px" }} />
            Start Quiz
          </Button>{" "}
        </div>
      </div>
    );
  }

  if (quizFinished) {



    const getAlignmentMessage = () => {
      const [green, ndp, cons] = finalResults;
  
      // Find the maximum score
      const maxScore = Math.max(green, ndp, cons);
  
      // Determine which groups have the maximum score
      const alignedParties = [];
      if (green === maxScore) alignedParties.push("the BC Greens");
      if (ndp === maxScore) alignedParties.push("the BC NDP");
      if (cons === maxScore) alignedParties.push("the BC Conservatives");
  
      // Construct the result message based on how many parties are tied
      if (alignedParties.length === 1) {
        return `Your answers most align with ${alignedParties[0]}.`;
      } else if (alignedParties.length === 2) {
        return `Your answers most align with both ${alignedParties[0]} and ${alignedParties[1]}.`;
      } else {
        return `Your answers are equally aligned with the BC Greens, BC NDP, and BC Conservatives.`;
      }
    };
  



    return (
      <div className="finished-container">
        <div className="question-tracking-container">
          <h3>
            Question: {currentQuestionIndex + 1} / {quizData.length}
          </h3>
          <LinearProgress
            value="50"
            sx={{ width: "100%" }}
            variant="determinate"
          />
        </div>
       
          

        
        <div className="heading-container">
          <h1>RESULTS</h1>
          <h2>{getAlignmentMessage()}</h2> {/* Dynamically generated message */}
        </div>

      {/* Display the quiz result chart */}
      <div className="quiz-chart-container">
        <QuizResultChart results={finalResults} />
      </div>
      

        
      </div>
    );
  }

  // When quiz starts, display the current question and its answers
  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="question-tracking-container">
        <h3>
          Question: {currentQuestionIndex + 1} / {quizData.length}
        </h3>
        <LinearProgress
          value="50"
          sx={{ width: "100%" }}
          variant="determinate"
        />
      </div>

      <div className="heading-container">
        <h2>{currentQuestion.question}</h2>
      </div>
      <div className="answers-container">
        {currentQuestion.answers.map((answer, index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => handleAnswerSelect(answer, index)}
            sx={{
              display: "block",
              backgroundColor: "lightblue", // Light blue background for the card
              color: "black", // Black text color
              textAlign: "left", // Align text to the left
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Slight shadow
              borderRadius: "5px", // Rounded corners for card-like appearance
              padding: "16px", // Padding for spacing inside the button
              width: "100%", // Full width of the container
              "&:hover": {
                backgroundColor: "#add8e6", // A bit darker blue on hover
              },
              borderColor: index === selectedAnswerIndex ? "blue" : "inherit", // Border change on selection
              transition: "background-color 0.3s ease", // Smooth transition for background color change
            }}
          >
            {answer.text}
          </Button>
        ))}
      </div>
      <div className="error-container">
        <h3>{error}</h3>
      </div>
      {/* Navigation Buttons for Back and Next */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",

          width: "100%",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          disabled={currentQuestionIndex === 0} // Disable "Back" on the first question
          startIcon={<ArrowBackIcon />} // Add an icon to the button
          sx={{ width: "120px", borderRadius: "50px" }}
        >
          Back
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          endIcon={<ArrowForwardIcon />} // Add an icon to the button
          sx={{ width: "120px", borderRadius: "50px" }}
        >
          Next
        </Button>
      </Box>
    </div>
  );
}
