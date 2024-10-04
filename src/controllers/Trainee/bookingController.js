const Booking = require('../../models/Booking'); 
const Schedule = require('../../models/Schedule'); 

const User = require('../../models/User');




exports.updateProfile = async (req, res) => {
  try {
    const { traineeId } = req.params;
    const { name, email } = req.body;

    const updatedTrainee = await User.findByIdAndUpdate(
      traineeId,
      { name, email },
      { new: true }
    );

    if (!updatedTrainee) {
      return res.status(404).json({ message: 'Trainee not found' });
    }

    res.status(200).json({ success: true, trainee: updatedTrainee });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Book a class
exports.bookClass = async (req, res) => {
    try {
      const { trainee, schedule } = req.body;
  
      // Check if the schedule exists and get the time slot
      const scheduleDetails = await Schedule.findById(schedule);
      if (!scheduleDetails) {
        return res.status(404).json({ message: 'Schedule not found' });
      }
  
      // Check if the schedule has available slots (max 10 trainees)
      const bookingCount = await Booking.countDocuments({ schedule });
      if (bookingCount >= 10) {
        return res.status(400).json({ message: 'Schedule is fully booked' });
      }
  
      // Ensure the trainee is not already booked for this schedule
      const existingBooking = await Booking.findOne({ 
        trainee, 
        schedule 
      });
  
      if (existingBooking) {
        return res.status(400).json({ message: 'Trainee has already booked this schedule' });
      }
  
      // Ensure the trainee is not booked in another class in the same time slot
      const overlappingBooking = await Booking.findOne({ 
        trainee, 
        'schedule.timeSlot': scheduleDetails.timeSlot, 
        'schedule.date': scheduleDetails.date 
      }).populate('schedule');
  
      if (overlappingBooking) {
        return res.status(400).json({ message: 'Trainee is already booked for a class in the same time slot' });
      }
  
      // Create the booking
      const newBooking = new Booking({
        trainee,
        schedule
      });
  
      await newBooking.save();
      res.status(201).json({ success: true, booking: newBooking });
  
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  
// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Check if the booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Delete the booking
    await Booking.findByIdAndDelete(bookingId);
    res.status(200).json({ success: true, message: 'Booking canceled successfully' });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get bookings for a trainee
exports.getTraineeBookings = async (req, res) => {
  try {
    const { traineeId } = req.params;

    // Fetch bookings for the trainee
    const bookings = await Booking.find({ trainee: traineeId }).populate('schedule');
    res.status(200).json({ success: true, bookings });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
