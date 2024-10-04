
const Schedule = require('../models/Schedule'); // Adjust the path as needed

// Get schedules by trainer

exports.getschedules = async (req, res) =>{
    try {
        const { trainerId } = req.params;

        const schedules = await Schedule.find({ trainer: trainerId }).populate('attendees');

        // console.log("schedules by tainer",schedules);
        
        if (!schedules.length) {
            return res.status(404).json({ message: 'No schedules found for this trainer.' });
        }
        
        res.status(200).json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


