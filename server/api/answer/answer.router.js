const router = require("express").Router();
const auth = require("../middleware/auth");

const { newAnswer, getAnswerByQuestId } = require("./answer.controller");

router.post("/newanswer", auth, newAnswer);

router.get("/getanswer", auth, getAnswerByQuestId);

module.exports = router;
