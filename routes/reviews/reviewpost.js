const verifyToken = require('../../middleware/token')
const express = require('express')
const router = express.Router()
const {reviews} = require('../../models/model')


router.post('/',verifyToken,async(req,res)=>{
    if(req.user.role !=='user' && req.user.role !=='admin'){
        return res.status(401).json({message:"Unauthorized"})
    }

    try {
        const{rating,text,businessId} =req.body

        const userId = req.user.id

    const review = await new reviews({
        userId,rating,text,businessId
    })

    await review.save();

    res.json(review);
    } catch (error) {
        res.status(500).json({message:"Internal Error"})
    }
})

module.exports = router