// app/page.js

"use client"; // Ensure this is a client component

import { Button } from '@mui/material'; // Import Button
import EditIcon from '@mui/icons-material/Edit'; // Import the pencil icon

export default function Home() {
  const handleStartQuiz = () => {
    // Your logic to start the quiz
    console.log("Quiz started!");
  };

  return (
    <div className='master-container'>
 
      {/* Pill-Shaped Button */}
      <Button
        variant="contained"     // Use 'contained' for high emphasis
        color="primary"         // Set the color (primary is usually high emphasis)
        onClick={handleStartQuiz} // Add the click handler
        size="large"            // Optional: set the size of the button
        sx={{
          borderRadius: '50px', // Makes the button pill-shaped
          padding: '10px 20px', // Adjust padding as needed
          display: 'flex',       // Flex display to center the icon and text
          alignItems: 'center',  // Center icon and text vertically
        }}
      >
        <EditIcon sx={{ marginRight: '8px' }} /> {/* Pencil Icon */}
        Start Quiz
      </Button>
    </div>
  );
}