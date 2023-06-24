const express = require('express');
const router = express.Router();
const controlerUsers = require('../controllers/controllerUsers');


router.post('/signUp', controlerUsers.signUp)




module.exports = router; 

