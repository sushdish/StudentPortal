const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Users = require("../models/users");
const axios = require("axios");

exports.createUser = async (req, res) => {
  const user = req.body;
  console.log(user, "7");
  user.password = await bcrypt.hash("Student123", 8);
  try {
    const createUser = new Users(user);
    const saved = await createUser.save();
    console.log(saved, "11");
    res.json(saved);
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    let user = await Users.findByCredentials(req.body.email, req.body.password);
    console.log(user, "36");

    const token = await user.generateAuthToken();

    res.json({ user, token });
  } catch (error) {
    console.log(error.message, "Error in login");
    res.status(401).json({ error: error.message });
  }
};
