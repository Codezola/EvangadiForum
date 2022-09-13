const pool = require("../../config/database");

module.exports = {
  askQuestion: (data, callback) => {
    
    pool.query(
      `INSERT INTO question(user_id, title, question, time )VALUES(?,?,?,?)`,
      [data.id, data.body.title, data.body.question, new Date()],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  getQuestions: (callback) => {
    pool.query(
      `SELECT question.question_id, registration.user_id, registration.user_name, question.title, question.question, question.time  FROM question LEFT OUTER JOIN registration ON question.user_id = registration.user_id  order by question.time desc`,
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  getquestionbyid: (question_id, callback) => {
    pool.query(
      `SELECT question.question_id, registration.user_id, registration.user_name, question.title, question.question, question.time  FROM question LEFT OUTER JOIN registration ON question.user_id = registration.user_id where question_id = ?`,
      [question_id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
};