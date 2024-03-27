const verifyToken = require('../../middleware/token')
const express = require('express')
const router = express.Router()
const {reviews} = require('../../models/model')

router.put('/:id',verifyToken,async(req,res)=>{
    if(req.user.role !=='user' && req.user.role !=='admin'){
        return res.status(401).json({message:"Unauthorized"})
    }

    try {
        const{text,rating} =req.body;

    const review = await reviews.findById(req.params.id)

    if(!review){
        return res.status(401).json({message:"review not found"})
    }

    review.text = text
    review.rating = rating
    await review.save();

    res.json(review)
    }  catch (error) {
        res.status(500).json({message:"Internal Error"})
    }
})

module.exports = router