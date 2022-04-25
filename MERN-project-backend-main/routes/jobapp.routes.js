const express = require('express')
const router = express.Router()

const {
  SubmitJob,getSubmited,SearchOne
} = require('../controllers/jobappController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect,SubmitJob).get(getSubmited)
router.route('/focheck/:id').get(protect,SearchOne)
module.exports = router

