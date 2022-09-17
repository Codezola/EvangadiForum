const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  askQuestion,
  getQuestions,
  getquestionbyid,
} = require("./question.controller");


router.post("/newquestion", auth, askQuestion);


router.get("/getquestions", auth, getQuestions);


router.get("/getquestionbyid", auth, getquestionbyid);

module.exports = router;