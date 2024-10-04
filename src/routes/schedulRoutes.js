const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController'); 
const trainerController = require('../controllers/trainerController'); 
const authenticateToken = require('../middlewares/authenticateToken.js');

// Create a schedule
router.post('/schedules', scheduleController.createSchedule);

// Get all schedules
router.get('/schedules', scheduleController.getSchedules);

// Get all schedules by trainer
router.get('/schedules/trainer/:trainerId', trainerController.getschedules);

// Get a schedule by ID
router.get('/schedules/:id',scheduleController.getScheduleById);

// Update a schedule
router.put('/schedules/:id', scheduleController.updateSchedule);

// Delete a schedule
router.delete('/schedules/:id',scheduleController.deleteSchedule);

module.exports = router;
