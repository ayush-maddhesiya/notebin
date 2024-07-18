const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: function(){return !this.googleId},

    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
      },
      googleToken: {
        type: String
      }
    },{timestamps:true});

  userSchema.pre('save', async function(next) {  
    if(!this.isModified('password')) return next();

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(error){
        next(error);
    }
    });

    userSchema.methods.comparePassword = async function (enteredPassword){
    try {
        return  await bcrypt.compare(enteredPassword, this.password);      
    } catch (error) { throw new Error(error); };
}

const User = mongoose.model('User', userSchema);

module.exports = User;