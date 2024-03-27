const verifyToken = require('../../middleware/token')
const express = require('express')
const router = express.Router()
const {reviews} = require('../../models/model')

router.put('/:id',verifyToken,async(req,res)=>{
    if(req.user.role !=='owner' && req.user.role !=='admin'){
      return res.status(401).json("Unauthorized")
    }

    try {
    const {response} = req.body;
    const reviewId = req.params.id;

   const review = await reviews.findById(reviewId);
 
   if(!review){
    return res.status(401).json({message:"review not found"})
   }

   review.response = response;
   await review.save();

   res.json(review)
    } catch (error) {
        res.status(500).json({message:"Internal Error"})
    }
})

module.exports = router