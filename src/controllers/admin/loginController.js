const User = require('../../models/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// User login
async function LoginTrainer(req, res)  {
  const { email, password } = req.body;


  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }

    console.log("user",user);

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role,name:user.name }, "sdgbjdnkldamdsfdm", { expiresIn: '1d' });

    // const tokenOption = {
    //     httpOnly : true,
    //     secure : true
    // }

    const tokenOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' // Use `secure` only in production
    };

    res.cookie("token",token).status(200).json({
        message : "Login successfully",
        token : token,
        success : true,
        error : false
    })
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};







module.exports = LoginTrainer;
