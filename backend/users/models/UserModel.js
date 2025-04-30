const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },      
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    birthdate: {
        type: Date,
        required: false,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
    },
    profilePic: {
      type: String,
      required: [false],
    },
    address: {
      type: String,
      required: [true, 'Location is required'],
    },
    libraryCard: {
      type: String,
      required: [false],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
