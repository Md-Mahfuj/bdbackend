const adminService = require('../../services/adminService');


async function deleteTrainer (req, res) {
    try {
      await adminService.deleteTrainer(req.params.id);
      res.status(200).json({ success: true, message: 'Trainer deleted successfully.' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  

  module.exports = deleteTrainer;
