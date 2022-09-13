require("dotenv").config();
const pool = require("./server/config/database");
const express = require("express");
const cors = require("cors");
const userRouter = require("./server/api/users/user.router");
const questionRouter = require("./server/api/question/question.router");
const answerRouter = require("./server/api/answer/answer.router");
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/question", questionRouter);
app.use("/api/answer", answerRouter);

app.listen(port, () => console.log(`Litsening at http://localhost:${port}`));
