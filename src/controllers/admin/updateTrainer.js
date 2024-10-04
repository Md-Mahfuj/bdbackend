const adminService = require('../../services/adminService');

async function  updateTrainer(req, res) {
    try {

      console.log("req.body",req.body);
      const updatedTrainer = await adminService.updateTrainer(req.params.id, req.body);
      res.status(200).json(updatedTrainer);
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  module.exports = updateTrainer;
