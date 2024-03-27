const verifyToken = require('../../middleware/token')
const express = require('express')
const router = express.Router()
const {reviews} = require('../../models/model')

router.delete('/:id',verifyToken,async(req,res)=>{
    if(req.user.role !=='user' && req.user.role !=='admin'){
        return res.status(401).json({message:"Unauthorized"})
    }
    try {
        const deletedReview = await reviews.findByIdAndDelete(req.params.id)

        if(!deletedReview){
            res.json({message:"review not found"})
        }
        res.json(deletedReview)
    } catch (error) {
        res.status(500).json({message:"Internal Error"})
    }
})

module.exports = router