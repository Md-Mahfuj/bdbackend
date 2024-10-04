const User = require('../models/User');



exports.getTrainer = async () => {

  try {
    const trainer = await User.find({});
    if (trainer) {
      console.log('Trainer list:', trainer);
      return trainer;
    } else {
      console.log('Trainer not found');
    }
  } catch (error) {
    console.error('Error updating trainer:', error);
  }
};

exports.getTrainerList = async () => {

  try {
    const trainer = await User.find({role:"Trainer"});
    if (trainer) {
      console.log('Trainer list:', trainer);
      return trainer;
    } else {
      console.log('Trainer not found');
    }
  } catch (error) {
    console.error('Error updating trainer:', error);
  }
};






exports.createTrainer = async (data) => {
  try {
    const { name, email, password ,role} = data;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create a new trainer
    const trainer = new User({ name, email, password, role});
    const newUser = await trainer.save();

    console.log('Trainer created:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error creating trainer:', error);
    throw error; // You can return a custom error response here if needed
  }
};



exports.updateTrainer = async (trainerId, updatedData) => {
  try {
    const updatedTrainer = await User.findByIdAndUpdate(trainerId, updatedData, { new: true });
    if (updatedTrainer) {
      console.log('Trainer updated:', updatedTrainer);
      return updatedTrainer;
    } else {
      console.log('Trainer not found');
    }
  } catch (error) {
    console.error('Error updating trainer:', error);
  }

};

exports.getTrainerByID = async (trainerId) => {
  try {
    // Find the trainer by their ID
    const trainer = await User.findById(trainerId);

    if (trainer) {
      console.log('Trainer found:', trainer);
      return trainer; // Return the found trainer
    } else {
      console.log('Trainer not found for the given ID:', trainerId);
      return null; // Return null if the trainer wasn't found
    }
  } catch (error) {
    console.error('Error occurred while retrieving trainer:', error);
    throw error; // Re-throw the error for the caller to handle
  }
};




exports.deleteTrainer = async (id) => {
  const trainer = await User.findByIdAndDelete(id);
  if (!trainer) throw new Error('Trainer not found');
};
