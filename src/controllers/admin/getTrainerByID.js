

const adminService = require('../../services/adminService');

async function  getTrainerByID(req, res) {
    try {
      const getTrainee = await adminService.getTrainerByID(req.params.id);
      res.status(200).json(getTrainee);
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  module.exports = getTrainerByID;

