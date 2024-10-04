

const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();

const createTrainer = require("../controllers/admin/createTrainer.js")
const updateTrainer = require("../controllers/admin/updateTrainer.js")
const deleteTrainer = require("../controllers/admin/deleteTrainer.js");
const getTrainer = require("../controllers/admin/getTrainer.js");
const getTrainerList = require("../controllers/admin/getTrainerList.js");
const getTrainerByiD = require("../controllers/admin/getTrainerByID.js");
const LoginTrainer = require("../controllers/admin/loginController.js")
const authMiddleware = require('../middlewares/authorizeAdmin.js');
const authenticateToken = require('../middlewares/authenticateToken.js');

// const auth = require('../middleware/auth');

// Use the auth middleware to restrict access to Admins only
router.post('/login',  LoginTrainer);
// createTrainer use sinup 
router.post('/trainers',createTrainer);
router.get('/trainee/:id',getTrainerByiD);

// router.get('/trainers',getTrainer);

router.get('/trainerslist',getTrainerList);
// router.put('/trainers/:id', updateTrainer);
// router.delete('/trainers/:id',deleteTrainer);


router.get('/trainers',authMiddleware,getTrainer);
router.put('/trainers/:id',authMiddleware, updateTrainer);
router.delete('/trainers/:id',authMiddleware,deleteTrainer);



// User login







module.exports = router;
