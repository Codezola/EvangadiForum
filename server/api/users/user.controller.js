const {
  register,
  getAllUsers,
  userById,
  getUserByEmail,
  profile,
} = require("./user.service");
const pool = require("../../config/database");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
require("dotenv").config();

module.exports = {
  createUser: (req, res) => {
    const { userName, firstName, lastName, email, password } = req.body;

    if (!userName || !firstName || !lastName || !email || !password)
      return res
        .status(400)
        .json({ msg: "Not all fields have been provided!" });
    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 charactors" });
    pool.query(
      "SELECT * FROM registration WHERE user_email = ?",
      [email],
      (err, results) => {
        if (err) {
          return res.status(err).json({ msg: "database connection eror" });
        }
        if (results.length > 0) {
          return res
            .status(400)
            .json({ msg: "An account with this email already exists!" });
        } else {
          const salt = bcrypt.genSaltSync();
          req.body.password = bcrypt.hashSync(password, salt);

          register(req.body, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ msg: "database connection eror!" });
            }
            pool.query(
              "SELECT * FROM registration WHERE user_email = ?",
              [email],
              (err, results) => {
                if (err) {
                  return res
                    .status(err)
                    .json({ msg: "database connection eror" });
                }
                req.body.userId = results[0].user_id;
                console.log(req.body);
                profile(req.body, (err, results) => {
                  if (err) {
                    console.log(err);
                    return register
                      .status(500)
                      .json({ msg: "database connection eror" });
                  }
                  return res
                    .status(200)
                    .json({
                      msg: "New User Added Successfully",
                      data: results,
                    });
                });
              }
            );
          });
        }
      }
    );
  },
  getUsers: (req, res) => {
    getAllUsers((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection eror" });
      }
      return res.status(200).json({ data: results });
    });
  },
  getUserByID: (req, res) => {
    // const id = req.params.id;
    // console.log('id===>',id,'user===>',req.id);
    userById(req.id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500)
            .json({msg: 'database connection err'})
        }
        if (!results) {
            return res.status(404).json({msg:'Record not found'})
        }
        return res.status(200).json({data: results})
    })
  },
  login: (req, res) => {
    const {email, password} = req.body;
    //validation
    if(!email || !password)
    return res
    .status(400)
    .json({msg: 'Not all fields have been provided!'})
    getUserByEmail(email, (err, results) =>{
        if (err) {
            console.log(err);
            res.status(500).json({msg: 'database connection err'})
        }
        if (!results) {
            return res.status(404).json({msg:'No account with this email has registered'})
        }
        const isMatch = bcrypt.compareSync (password, results.user_password)
        if (!isMatch)
        return res .status(404).json({msg: 'Invalid Credentials'})
        const token = jwt.sign({id: results.user_id}, process.env.JWT_SECRET, { expiresIn: '1h'});
        return res.json({
            token,
            user: {
                id: results.user_id,
                display_name: results.user_name
            }
        })
    })
  }
};
