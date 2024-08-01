const {Schema,model} = require('mongoose');
const { v4:uuidv4} = require('uuid');

const userSchema = new Schema({
  userId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  enrollmentNo:{
    type: String,
    required: true,
    unique: true,
  },
  mobileNo:{
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // select: false,
  },
  semester:{
    type: String,
  },
},{
    timestamps: true,
});

export const User = model("User", userSchema);
    