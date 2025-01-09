const express = require("express");
const router = express.Router();
const {
  getAllTopics,
  getTopicById,
  createTopic,
  updateProblemStatus,
  getUserProgress,
} = require("../controllers/topics");

router.get("/alltopics", getAllTopics);

router.get("/topics/:id", getTopicById);

router.post("/create", createTopic);

router.put("/problems/:problemId", updateProblemStatus);

router.get("/progress/report", getUserProgress);

module.exports = router;
