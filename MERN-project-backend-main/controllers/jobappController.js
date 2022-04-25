const asyncHandler = require('express-async-handler')

const appSchema = require('../models/job-appModel')

const SubmitJob = asyncHandler(async (req, res) => {
  console.log('submitjob app')
  console.log(req.body.resume)
  
  const post = await appSchema.create({
    user: req.user.id,
    post: req.body.postid,
    company:req.body.companyid  ,
    status: 'wait',
    resume : req.body.resume
  })

  console.log('job submited')
  res.json(post)
  })

const getSubmited = asyncHandler(async (req, res) => {
  const post = await appSchema.find()
  res.json(post)
    })

const SearchOne = asyncHandler(async (req, res) => {
  console.log('req.user.id :',req.user.id)
  console.log('req.params.id :',req.params.id)
  const post = await appSchema.findOne({'user':req.user.id}).where({'post':req.params.id}).exec()
  console.log(post)
  res.json(post)

  })


module.exports = { 
    SubmitJob,getSubmited,SearchOne
  }