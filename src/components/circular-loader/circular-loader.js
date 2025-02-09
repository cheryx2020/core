import React, { useState, useEffect } from 'react';

const CircularLoader = ({ Grid = () => { }, CircularProgress = () => { }, Typography = () => { }, height = 'auto', color = 'primary', text = '', onFinished = () => { } }) => {
  if ([Grid, CircularProgress, Typography].some(component => component?.toString() === "function() {}")) {
    return "Required: import { Grid, CircularProgress, Typography } from '@mui/material'";
  }
  const [progress, setProgress] = useState(0);
  let timer; // Declare the timer variable outside the useEffect

  useEffect(() => {
    const getRandomInterval = () => Math.floor(Math.random() * 500) + 500; // Random interval between 500ms and 1000ms

    const updateProgress = () => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 10));
      if (progress >= 100) {
        clearTimeout(timer); // Stop the timer when progress reaches 100 or more
        onFinished();
      } else {
        timer = setTimeout(updateProgress, getRandomInterval()); // Assign the timer here
      }
    };

    timer = setTimeout(updateProgress, getRandomInterval()); // Initialize the timer

    return () => {
      clearTimeout(timer);
    };
  }, [progress]);
  return (
    <Grid container justifyContent="center" alignItems="center" flexDirection="column" sx={{ height }}>
      <CircularProgress size={80} variant="determinate" value={progress} color={color} style={{ color: "#F08C5F" }} thickness={4} />
      <Typography variant="body1" component="div" color={color} style={{ color: "#F08C5F" }}>
        {`${Math.round(progress)}%`}
      </Typography>
      <Typography variant="body1" component="div" color={color} style={{ color: "#F08C5F" }}>
        {text}
      </Typography>
    </Grid>
  );
};

export default CircularLoader;
