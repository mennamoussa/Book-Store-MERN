const asyncHandler = require('express-async-handler');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const { uploadFile } = require('../utils/cloudinary');

//desc Get all users
//route Get /users                    db
const getUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find({});
  res.status(200).json(users);
  console.log('All Users');
  // console.log(res.json(users));
});

//desc Get users by id
//route Get /users/:id
const getUserByID = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('ERROR: User not found');
  }
  res.status(200).json(user ? user : { message: 'User not found' });
});

//desc Create a user
//route Post /users
const createUser = asyncHandler(async (req, res) => {
  const { firstName,
    lastName,
    email,
    birthdate,
    phone,
    gender,
    address,
    password,
    libraryCard, } = req.body;
  if (!firstName || !email || !lastName) {
    res.status(400);
    throw new Error('ERROR: Please fill all the fields');
  }
  // Create a new user instance
  const user = new UserModel({firstName,
    firstName,
      lastName,
      email,
      birthdate,
      phone,
      gender,
      address,
      password,
      libraryCard, });
  // Save the user to the database
  await user.save();
  res.status(201).json({ message: 'User Created', body: user });
});

//desc Update a user
//route Put /users
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const {
    firstName,
    lastName,
    email,
    birthdate,
    phone,
    gender,
    address,
    profilePic,
    libraryCard,
  } = req.body;
  try {
    // Find the user by ID
    let user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Update user fields if provided in the request body
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (birthdate) user.birthdate = birthdate;
    if (phone) user.phone = phone;
    if (gender) user.gender = gender;
    if (address) user.address = address;
    if (profilePic) user.profilePic = profilePic;
    if (libraryCard) user.libraryCard = libraryCard;
    // Save the updated user to the database
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//desc Delete a user
//route Delete /users
const deleteUser = asyncHandler(async (req, res) => {
  const users = await UserModel.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Delete User for ${users.firstName}` });
});

//-----------------------------------------------------------------------

//desc Register a user
//route Post /users/register
const registerUser = asyncHandler(async (req, res) => {
  try {
    // File upload was successful, continue with user registration logic
    const {
      firstName,
      lastName,
      email,
      password,
      birthdate,
      phone,
      gender,
      address,
      libraryCard,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phone ||
      !gender ||
      !address
    ) {
      res.status(400);
      throw new Error('ERROR: Please fill all the fieldssssssss');
    }

    // Check if the user already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('ERROR: User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`hashedPassword of ${firstName} : ${hashedPassword}`);

    // const file = req.file;
    // const userPic = {
    //   name: Date.now() + '-' + file.originalname,
    //   data: file.buffer,
    // };
    // const uploadPicRes = await uploadFile(userPic, 'users');
    // let ProfilePicLink = uploadPicRes.Location;

    // Create a new user instance
    const user = new UserModel({
      firstName,
      lastName,
      email,
      birthdate,
      phone,
      gender,
      address,
      password: hashedPassword,
      // profilePic: ProfilePicLink,
      libraryCard,
    });

    // Save the user to the database
    await user.save();

    // Respond with the created user
    res.status(201).json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    res
      .status(400)
      .json({ message: 'Error registering userrrrr howa dahhh', error: error.message });
  }
});

//desc Login a user
//route Post /users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('ERROR: Please fill all the fields');
  }
  // Find the user by email
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('ERROR: User not found');
  }
  // Check if the password is correct
  // const hashedPassword = await bcrypt.hash(password, 10);
  if (user && (await bcrypt.compare(password, user.password))) {
    const accesstoken = jwt.sign(
      {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          birthdate: user.birthdate,
          phone: user.phone,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30m' }
    );
    res
      .status(200)
      .json({ message: 'Login Successful, Welcome', accesstoken, user });
    console.log(`token for ${user.firstName}`);
  } else {
    res.status(401);
    throw new Error('ERROR: Invalid email or password');
  }
});

//desc current user info
//route Get /users/"current"
//@access Private
const currentUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user.id, { password: 0 });
  if (!user) {
    res.status(404);
    throw new Error('ERROR: User not found');
  }
  console.log(req.user.id);
  res.json(user);
});

const UpdateCurrentUser = asyncHandler(async (req, res) => {
  try {
    // Find the user by ID
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Update user fields if provided in the request body
    const {
      firstName,
      lastName,
      email,
      birthdate,
      phone,
      gender,
      profilePic,
      address,
      libraryCard,
    } = req.body;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (birthdate) user.birthdate = birthdate;
    if (phone) user.phone = phone;
    if (gender) user.gender = gender;
    if (profilePic) user.profilePic = profilePic;
    if (address) user.address = address;
    if (libraryCard) user.libraryCard = libraryCard;

    // Save the updated user to the database
    await user.save();
    res
      .status(200)
      .json({ message: `User with ID ${user.id} updated successfully`, user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//------------------------------------------------------------------------------ im here 1:27:10

module.exports = {
  getUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  currentUser,
  UpdateCurrentUser,
};