const mongoose = require('mongoose')

const appSchema = mongoose.Schema(
  { 
    // user ID ที่คนที่สมัครงาน
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // post ID ที่สมัครงาน
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
    // companyId
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
    status: String,     // สถานนะการยอมรับเข้าทำงาน
    resume:String
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('jobApp', appSchema)
