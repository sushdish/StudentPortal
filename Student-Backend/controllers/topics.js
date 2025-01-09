const Topic = require("../models/topics");

exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: "Error fetching topics" });
  }
};

exports.getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: "Error fetching topic" });
  }
};

exports.createTopic = async (req, res) => {
  try {
    const newTopic = new Topic(req.body);
    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (err) {
    res.status(500).json({ message: "Error creating topic" });
  }
};

exports.updateProblemStatus = async (req, res) => {
  try {
    const topic = await Topic.findOne({
      "subtopics.problems._id": req.params.problemId,
    });

    if (!topic) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const subtopic = topic.subtopics.find((sub) =>
      sub.problems.id(req.params.problemId)
    );
    const problem = subtopic.problems.id(req.params.problemId);
    problem.status = req.body.status;

    await topic.save();
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: "Error updating problem status" });
  }
};

exports.getUserProgress = async (req, res) => {
  try {
    const topics = await Topic.find();
    let totalEasy = 0,
      totalMedium = 0,
      totalHard = 0,
      solvedEasy = 0,
      solvedMedium = 0,
      solvedHard = 0;

    topics.forEach((topic) => {
      topic.subtopics.forEach((subtopic) => {
        subtopic.problems.forEach((problem) => {
          if (problem.difficulty === "Easy") {
            totalEasy++;
            if (problem.status === "Done") solvedEasy++;
          } else if (problem.difficulty === "Medium") {
            totalMedium++;
            if (problem.status === "Done") solvedMedium++;
          } else if (problem.difficulty === "Hard") {
            totalHard++;
            if (problem.status === "Done") solvedHard++;
          }
        });
      });
    });

    const totalProblems = totalEasy + totalMedium + totalHard;
    const progress = {
      easy: `${Math.round((solvedEasy / totalEasy) * 100)}%`,
      medium: `${Math.round((solvedMedium / totalMedium) * 100)}%`,
      hard: `${Math.round((solvedHard / totalHard) * 100)}%`,
      overall: `${Math.round(
        ((solvedEasy + solvedMedium + solvedHard) / totalProblems) * 100
      )}%`,
    };

    res.status(200).json({ progress });
  } catch (err) {
    res.status(500).json({ message: "Error fetching progress data" });
  }
};
