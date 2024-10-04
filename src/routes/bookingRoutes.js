const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/Trainee/bookingController'); 

const TraineeMiddleware = require('../middlewares/authorizeTrainee.js');
const authenticateToken = require('../middlewares/authenticateToken.js');

// Book a class
router.post('/book' ,authenticateToken,TraineeMiddleware,bookingController.bookClass);
// router.post('/book',TraineeMiddleware,authenticateToken, bookingController.bookClass);

// Cancel a booking
router.delete('/cancel/:bookingId',TraineeMiddleware,authenticateToken, bookingController.cancelBooking);

// Get all bookings for a trainee
// router.get('/trainee/:traineeId', TraineeMiddleware,authenticateToken,bookingController.getTraineeBookings);
router.get('/trainee/:traineeId',authenticateToken,bookingController.getTraineeBookings);

module.exports = router;
