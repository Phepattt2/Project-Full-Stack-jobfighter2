
const express = require('express')
const router = express.Router()

const { GetSearch, SelectedPost, SubmitJob ,GetSearchBoost,GetSearchNotBoost} = require('../controllers/searchController')

router.post('/',GetSearch)
router.post('/gsb',GetSearchBoost)
router.post('/gsnb',GetSearchNotBoost)
router.get('/:id',SelectedPost)
router.put('/:id',SubmitJob)


module.exports = router

