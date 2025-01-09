const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  problemName: {
    type: String,
    required: true,
  },
  youtubeLink: {
    type: String,
    required: true,
  },
  leetcodeLink: {
    type: String,
    required: true,
  },
  articleLink: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Done"],
    default: "Pending",
  },
});

const subtopicSchema = new mongoose.Schema({
  subtopicName: {
    type: String,
    required: true,
  },
  problems: [problemSchema],
});

const topicSchema = new mongoose.Schema({
  topicName: {
    type: String,
    required: true,
  },
  subtopics: [subtopicSchema],
});

module.exports = mongoose.model("Topic", topicSchema);
