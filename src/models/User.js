const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/  // Basic email format validation
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Trainer', 'Trainee'],
    default: 'Trainee',
    required: true,
  },
  profile: {
    age: Number,
    phoneNumber: String,
    address: String,
  },
  expertise: {
    type: String,
    // required: true
  },
  assignedSchedules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule'
  }],

  bookings: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Schedule' 
  }]
}, { timestamps: true });

// Password hashing middleware
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
