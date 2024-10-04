

const adminService = require('../../services/adminService');

async function  getTrainer(req, res) {

  const { role} = req.body;

    try {
      const updatedTrainer = await adminService.getTrainer(role);
      res.status(200).json(updatedTrainer);
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  module.exports = getTrainer;
