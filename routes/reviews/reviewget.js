const verifyToken = require('../../middleware/token')
const express = require('express')
const router = express.Router()
const {reviews} = require('../../models/model')

router.get('/',verifyToken,async(req,res)=>{
    const Allreview = await reviews.find()

    res.json({Allreview});
})

module.exports = router