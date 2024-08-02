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

module.exports = { signup, login, getCurrentUser };