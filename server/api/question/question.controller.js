
const {
  askQuestion,
    getQuestions,
    getquestionbyid,
} = require("./question.service");
const pool = require("../../config/database");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
require("dotenv").config();
  module.exports = {
    
    askQuestion: (req, res) => {
      const { title, question  } = req.body;
      
      
      if (!title || !question)
        return res
          .status(400)
          .json({ msg: "Not all fields have been provided!" });
      if (title.length > 50)
        return res
          .status(400)
          .json({ msg: "Title length can not be greater than 50 characters!" });
  
      
      askQuestion(req, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "Database connection err" });
        }
        return res.status(200).json({
          msg: "New Questions added successfully",
          data: results,
        });
      });
    },
    getQuestions: (req, res) => {
      getQuestions((err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "database connection err" });
        }
        if (!results) {
          return res.status(404).json({ msg: "Record not found" });
        } else {
          return res.status(200).json({ data: results });
        }
      });
    },
    getquestionbyid: (req, res) => {
      getquestionbyid(req.query.question_id, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "database connection err" });
        }
        if (!results) {
          return res.status(404).json({ msg: "Record not found" });
        } else {
          return res.status(200).json({ data: results[0] });
        }
      });
    },
  };