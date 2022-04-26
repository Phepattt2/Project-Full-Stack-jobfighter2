const express = require('express')
const router = express.Router()

const {
  getPosts,
  setPost,
  updatePost,
  deletePost,
  payPost,
  getpayPost,
} = require('../controllers/postController')

const { protect } = require('../middleware/authMiddleware')
// ใส่ protect => เจ้าของ user ID ของโพสเท่านั้นถึงจะโพสได้
router.route('/').get(protect,getPosts).post(protect, setPost)
router.route('/:id').delete(protect, deletePost).put(protect, updatePost)
router.route('/pay/:id').put(protect,payPost).get(protect,getpayPost)
// router.route('/:id').put(updateStatus)

module.exports = router
