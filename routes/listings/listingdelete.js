const verifyToken = require('../../middleware/token')
const express = require('express')
const router = express.Router()
const {Listings} = require('../../models/model')
const fs = require('fs') 
const path = require('path')


router.delete('/:id',verifyToken,async(req,res)=>{
    if(req.user.role!=='admin'){
        return res.status(403).json("Unauthorized")
    }
    try{
        const listingId = req.params.id;
        const deletedListing = await Listings.findByIdAndDelete(listingId);

        if (!deletedListing) {
            return res.status(404).json({ message: "Listing not found" });
        }
 
        if (deletedListing.images && deletedListing.images.length > 0) {
            deletedListing.images.forEach(imagePath => {
                const imageName = imagePath.split('\\')
                fs.unlinkSync(path.join(__dirname,"uploads",imageName[imageName.length-1])); 
            });
        }

        res.json(deletedListing)
    }
    catch(err){
        res.status(500).json({message:"Internal Error"})
    }
})

module.exports = router