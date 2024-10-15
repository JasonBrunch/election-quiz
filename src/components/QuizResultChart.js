import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register chart components
Chart.register(...registerables);

const QuizResultChart = ({ results }) => {
  const data = {
    labels: ['Green', 'NDP', 'Cons'], // Labels for the categories
    datasets: [
      {
        label: '', // Empty label removes the legend title
        data: results, // Array of scores, e.g., [5, 8, 3]
        backgroundColor: ['#66bb6a', '#ff7043', '#42a5f5'], // Colors for each bar
        borderColor: ['#388e3c', '#d84315', '#1976d2'], // Border colors
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'x', // For vertical bars
    scales: {
      y: {
        beginAtZero: true, // Ensure the y-axis starts from 0
        ticks: {
          display: false, // Remove the y-axis labels (0.0 to 1.0)
        },
        grid: {
          display: false, // Remove the grid lines from the y-axis
        },
        border: {
          display: false, // Remove the axis line (left side)
        },
      },
      x: {
        ticks: {
          font: {
            family: 'Roboto', // Use Roboto font for labels
            size: 14, // Customize font size for labels
            color: '#333', // Darker font color
          },
        },
        grid: {
          display: false, // Remove the grid lines from the x-axis
        },
        border: {
          display: false, // Remove the axis line (bottom side)
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Remove the legend completely
      },
      title: {
        display: false, // No title
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default QuizResultChart;