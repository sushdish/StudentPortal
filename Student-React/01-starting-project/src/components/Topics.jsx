import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Navigation from "./Navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../backend";
import {
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(`${API}/topics/alltopics`);
        const data = response.data;
        setTopics(data);
      } catch (err) {
        console.error("Error fetching topics:", err);
      }
    };

    fetchTopics();
  }, []);

  const updateStatus = async (problemId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Pending" ? "Done" : "Pending";
      await axios.put(`${API}/topics/problems/${problemId}`, {
        status: newStatus,
      });

      setTopics((prevTopics) =>
        prevTopics.map((topic) => ({
          ...topic,
          subtopics: topic.subtopics.map((subtopic) => ({
            ...subtopic,
            problems: subtopic.problems.map((problem) =>
              problem._id === problemId
                ? { ...problem, status: newStatus }
                : problem
            ),
          })),
        }))
      );
    } catch (error) {
      console.error("Error updating problem status:", error);
    }
  };

  return (
    <>
      <Navigation />

      <Card
        sx={{
          margin: 2,
          padding: 2,
          backgroundColor: "#ffdee8",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              textAlign: "center",
            }}
          >
            Topics
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: "center",
              fontSize: "0.875rem",
            }}
          >
            Explore the exciting topics & keep learning
          </Typography>
          {topics.map((topic) => (
            <Accordion
              key={topic._id}
              sx={{
                backgroundColor: "#ffe5ec",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{topic.topicName}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {topic.subtopics.map((subtopic) => (
                  <Accordion
                    key={subtopic._id}
                    sx={{
                      backgroundColor: "#ffeef2",
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{subtopic.subtopicName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Done</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>LeetCode</TableCell>
                            <TableCell>YouTube</TableCell>
                            <TableCell>Article</TableCell>
                            <TableCell>Level</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {subtopic.problems.map((problem) => (
                            <TableRow key={problem._id}>
                              <TableCell>
                                <Checkbox
                                  checked={problem.status === "Done"}
                                  onChange={() =>
                                    updateStatus(problem._id, problem.status)
                                  }
                                />
                              </TableCell>
                              <TableCell>{problem.problemName}</TableCell>
                              <TableCell>
                                <a
                                  href={problem.leetcodeLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Practice
                                </a>
                              </TableCell>
                              <TableCell>
                                <a
                                  href={problem.youtubeLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Watch
                                </a>
                              </TableCell>
                              <TableCell>
                                <a
                                  href={problem.articleLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Read
                                </a>
                              </TableCell>
                              <TableCell>{problem.difficulty}</TableCell>
                              <TableCell>{problem.status}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
