// const ScheduleSchema = new Schema({
//     date: {
//       type: Date,
//       required: true,
//     },
//     startTime: {
//       type: String, // e.g., "10:00 AM"
//       required: true,
//     },
//     endTime: {
//       type: String, // e.g., "12:00 PM"
//       required: true,
//     },
//     trainer: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,  // Ensures that a trainer is assigned to every class
//     },
//     trainees: [{
//       type: Schema.Types.ObjectId,
//       ref: 'User',   // References the trainees enrolled in the class
//       max: 10,      // Max capacity is 10 trainees
//     }],
//   }, { timestamps: true });
  
//   // Ensure no more than 5 schedules can be created on the same day
//   ScheduleSchema.index({ date: 1 }, { unique: true, partialFilterExpression: { date: { $gte: new Date() } } });
  
//   const Schedule = mongoose.model('Schedule', ScheduleSchema);
  

const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String, // E.g., '10:00-12:00'
    required: true
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  maxAttendees: {
    type: Number,
    default: 10
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Schedule', scheduleSchema);
