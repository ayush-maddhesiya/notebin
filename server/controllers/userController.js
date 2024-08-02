const User = require('../models/user.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TryCatch = require('../middlewares/errorHandler.js');

// Sign up
const signup = TryCatch(async (req, res) => {
  const { userId, name, email, enrollmentNo, mobileNo, password, semester } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: "User already exists" });
  }

  user = await User.findOne({ enrollmentNo });
  if (user) {
    return res.status(400).json({ msg: "Enrollment number already in use" });
  }

  // Create a new user
  user = new User({
    userId,
    name,
    enrollmentNo,
    email,
    password,
    mobileNo,
    semester,
  });

  // Password Hashing
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  // Save the user in the database
  await user.save();

  // Return Jwt
  const payload = {
    user: {
      id: user.id,
      username: user.username,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 3600 },
    (err, token) => {
      if (err) throw err;
      res.cookie("token", token, {
        httpOnly: false,
        secure: process.env.SECURITY,
        sameSite: "Lax",
      });
      res.json({ token });
    }
  );
});

// Login
const login = TryCatch(async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "User not Found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid Credentials" });
  }

  // Return JWT
  const payload = {
    user: {
      id: user.id,
      username: user.username,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 3600 },
    (err, token) => {
      if (err) throw err;
      res.cookie("token", token, {
        httpOnly: false,
        secure: false,
        sameSite: "Lax",
      });
      res.json({ msg: "Login Successful", token });
    }
  );
});

// Get User Info
const getCurrentUser = TryCatch(async (req, res) => {
  const token = req.params.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

//Reset password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = jwt.verify(token, process.env.JWT_SECRET);
  if (!user) {
    return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
  }

  user.password = password;

  try {
    await user.save();
    res.status(200).json({ message: 'Password has been reset' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving new password' });
  }
};

//generate and send OTP
const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'This email is not registered' });
    }
    const otp = crypto.randomBytes(3).toString('hex'); // Generate 6-digit OTP
    user.otp = otp;
    user.otpExpires = Date.now() + 2 * 60 * 1000;

    await user.save();
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.PASS}`
      }
    });

    const mailOptions = {
      to: user.email,
      from: `${process.env.EMAIL}`,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}. It is valid for 2 minutes.`
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(200).json({ message: 'OTP sent to email' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }

}

// Verify OTP and reset password
const resetPasswordfromOtp = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();
    res.status(200).json({ message: 'Password has been reset' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { signup, login, getCurrentUser ,resetPasswordfromOtp,resetPassword,sendOtp};