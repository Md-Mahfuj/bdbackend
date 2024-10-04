
const mongoose = require('mongoose');

const BookingSchema =  new mongoose.Schema({
    trainee: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Schedule',
      required: true,
    },
    bookedAt: {
      type: Date,
      default: Date.now,
    }
  });
  
  // Prevent duplicate bookings for the same trainee and schedule
  BookingSchema.index({ trainee: 1, schedule: 1 }, { unique: true });
  
  const Booking = mongoose.model('Booking', BookingSchema);

  module.exports = Booking;
  