const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register

exports.register = async (req, res) => {
  try {
    const { username, email, contactNumber, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
          message:
            "username or email already exists please use a different one",
        });
    }

    const newUser = new User({
      username,
      email,
      contactNumber,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
// ...

//Login
exports.login = (req,res ,next) => {
    passport.authenticate('local',{session: false},(err,user,info)=>{
        if(err || !user){
            return res.status(400).json({
                message: 'Login failed',
                user: user
            });
        
    }

    req.login(user, {session: false},(err) =>{
        if(err){
            res.send(err);
        }
        const token = jwt.sign(
            {id: user._id, username: user.username, email: user.email},
            process.env.JWT_SECRET,{
                expiresIn: "2h"
            }
        );

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 3600000 
          });
            return res.json({user, token});
    })

})  (req,res);
}
//...
//logout
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout error", error: err.message });
    }
    res.clearCookie('jwt');
    res.status(200).json({ message: "Logout successful" });
  });
};