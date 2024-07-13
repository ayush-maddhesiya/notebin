const User = require('../models/User');

exports.register = async (req, res) => {
    try{
        const {username,email,contactNumber,password} = req.body ;  

        const existingUser = await User.findOne({$or:[{email},{username}]});
        if(existingUser) {return res.status(400).json({message: 'username or email already exists please use a different one'});
      }

      const newUser = new User({
            username,
            email,
            contactNumber,
            password
        });

        await newUser.save();
        res.status(201).json({message: 'User created successfully'});
            
} catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
}
};