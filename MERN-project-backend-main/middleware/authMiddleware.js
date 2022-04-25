const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const postSchema = require('../models/postModel')
const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
      // ชนิด header ในการ authorization 'Bearer'
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')   
  ) {
    try {
      // Get token from header
      console.log('headers: ',req.headers)
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const adminCheck = asyncHandler( async(req, res, next) => {
  try {
    const { name } = req.user
    const adminUser = await User.findOne({ name }).exec()
    if(adminUser.role === 'admin'){
      res.status(403).send(err,'Admin Access denied')
    } else{
      next()
    }
  } catch (error) {
    console.log(error);
    res.status(401).send("Admin Access denied");
  }
})


module.exports = { protect, adminCheck}
