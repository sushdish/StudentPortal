import Navigation from "./Navigation";
import { Typography, Box, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../backend";

export default function Progress() {
  const [progress, setProgress] = useState(null);
  const [totalProblems, setTotalProblems] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`${API}/topics/progress/report`);
        setProgress(response.data.progress);
        setTotalProblems(response.data.totalProblems);
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) return <CircularProgress />;
  if (!progress) return <Typography>No progress data available.</Typography>;

  return (
    <>
      <Navigation />
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Progress Report
        </Typography>
        <Typography variant="h6">Total Problems: {totalProblems}</Typography>
        <Typography variant="h6">Easy: {progress.easy}</Typography>
        <Typography variant="h6">Medium: {progress.medium}</Typography>
        <Typography variant="h6">Hard: {progress.hard}</Typography>
      </Box>
    </>
  );
}
