
const mongoose = require('mongoose')
const postSchema = mongoose.Schema(
  { 
    // user ID เจ้าของ Post
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    desc: String,
    benefit: String,    // สวัสดิการ
    college: String,
    faculty: String,     // คณะ
    program: String,    // สาขา    
    jobType: String,    // ประเภทงาน
    position: String,   // ตำแหน่ง
    wageMin : Number,
    wageMax : Number,
    rate: Number,       // อัตราที่รับ
    provinceAddress : String,    // ที่อยู่บริษัท
    postDateExpire : String,  // *รอแก้ ระยะเวลาโพส
    enable: Boolean,
    companyAddress : String,
    boost: Boolean,     // boost post
    
    
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Post', postSchema)
