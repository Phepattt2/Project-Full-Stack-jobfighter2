let jwt = require("jsonwebtoken");
    bcrypt = require("bcrypt");
    asyncHandler = require("express-async-handler");
    User = require("../models/userModel");
const postSchema = require('../models/postModel')

// Register new user
// POST /users
// access  Public



const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(400)
    throw new Error("Please add all fields");
  }

// Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    email,
    password: hashedPassword,
    role: req.body.role,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
    console.log("Register success")
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    let collecDel = []
    
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    };
    
    res.json({
      payload, token: generateToken(user._id)
    });
    console.log("Login success")


    if (user.role === 'admin')
    {
      const posts = await postSchema.find( {postDateExpire : {$ne:''}})
      console.log('total posts : ',posts.length)

      for (var i = 0 ; i < posts.length ; i++){
       var  dateExp = posts[i].postDateExpire
       var result = new Date().getTime() > new Date(dateExp).getTime()
       console.log(i)
       console.log(posts[i].id,' ',i,' ',result , new Date(dateExp).getTime() ,new Date().getTime() )
       if (result === true){
       var delSh  =  await postSchema.findByIdAndDelete(posts[i].id)
       console.log(posts[i].id,' ',i,' del')

      }
    
    
    }
      

    } 





  } else {
    res.status(400);
    throw new Error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณากรอกข้อมูลใหม่อีกครั้ง");
  }
});

// @desc  update user
// @End Point   Put /users/edit-user
// @access  Private
const updateUser = asyncHandler(async (req, res) => {

  try{
    const user = await userSchema.findById( req.user.id)
    if(!user){
      res.status(400);
      throw new Error("User not exists");
    }
    
    const updatedUser = await userSchema.findByIdAndUpdate(
      req.user.id,
      req.body,
      {
        new: true,
      }
    );
    console.log('Updated',updatedUser)
    res.status(200).json({msg: 'Edited'});
  }catch(err){
    console.log(err)
    res.status(500).send('Server Error!')
  }

})

// @desc   Get current user data
// @End Point   Post /users/current-user
// @access  Private
const currentUser = asyncHandler(async (req, res) => {
  try{
  // const user = await userSchema.findById(req.id)
  console.log('Currentuser',req.user)
  res.status(200).json(req.user);
  }catch(err){
    console.log(err)
    res.status(500).send('Server Error!')
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  currentUser,
};
