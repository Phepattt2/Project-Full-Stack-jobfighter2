const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {                    //@student ชื่อ นามสกุล 
      type: String,            //@company ชื่อ
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {                 // role as student, company, admin
      type: String,
      default: 'student'
    },

    img: Buffer,            // student or company img 

    //@student 
    phone: Number,
    address: String,    
    college: String,
    faculty: String,
    program: String,


    //@company
    // phone: Number,
    BusinessType: String,    // ประเภทธุรกิจ
    desc: String,
    benefit: String,
    // address: String,   
    

  },
  {
    timestamps: true,  
  }
)

module.exports = mongoose.model('User', userSchema)
