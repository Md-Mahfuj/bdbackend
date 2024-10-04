const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  expertise: {
    type: String,
    required: true
  },
  assignedSchedules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Trainer', trainerSchema);
