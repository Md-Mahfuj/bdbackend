const Schedule = require('../models/Schedule'); // Your schedule model


// Create a new schedule
exports.createSchedule = async (req, res) => {
  try {
    const { date, timeSlot, trainer, maxAttendees } = req.body;

    // Check if there is already a schedule with the same date and timeSlot
    const existingSchedule = await Schedule.findOne({ date, timeSlot });
    if (existingSchedule) {
      return res.status(400).json({ message: 'A schedule with the same date and time slot already exists.' });
    }

    // Check if 5 schedules already exist for this date
    const scheduleCount = await Schedule.countDocuments({ date });
    if (scheduleCount >= 5) {
      return res.status(400).json({ message: 'Cannot schedule more than 5 classes per day.' });
    }

    // Create new schedule
    const newSchedule = new Schedule({
      date,
      timeSlot,
      trainer,
      maxAttendees
    });

    await newSchedule.save();
    res.status(201).json({ success: true, schedule: newSchedule });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Fetch all schedules
exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ createdAt: -1 })
    .populate('trainer').populate('attendees');
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch a single schedule by ID
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id).sort({ createdAt: -1 })
      .populate('trainer').populate('attendees');
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update schedule
exports.updateSchedule = async (req, res) => {
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSchedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.status(200).json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete schedule
exports.deleteSchedule = async (req, res) => {
  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!deletedSchedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.status(200).json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
