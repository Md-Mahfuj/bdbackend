const adminService = require('../../services/adminService');

async function createTrainer(req, res){
  try {
    const trainer = await adminService.createTrainer(req.body);
    res.status(201).json(trainer);
    
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};



module.exports = createTrainer;
