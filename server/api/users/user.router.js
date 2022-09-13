const router = require('express').Router();
const auth = require('../middleware/auth')
const {createUser, getUsers, getUserByID, login} = require ('./user.controller');
router.post('/', createUser);
router.get('/all', getUsers);
router.get('/',auth, getUserByID);
router.post('/login', login);
 
module.exports = router;