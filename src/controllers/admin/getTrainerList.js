

const adminService = require('../../services/adminService');

async function  getTrainer(req, res) {



    try {
      const updatedTrainer = await adminService.getTrainerList();
      res.status(200).json(updatedTrainer);
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  module.exports = getTrainer;
