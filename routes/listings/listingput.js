const verifyToken = require('../../middleware/token')
const upload = require('../../multer/multerConfig')
const express = require('express')
const router = express.Router()
const {Listings} = require('../../models/model')
const fs = require('fs') 
const path = require('path')



router.put('/:id', verifyToken, upload.array('images', 5), async (req, res) => {
    try {
        const { name, phone, city, address } = req.body;
        const listingId = req.params.id;

        // Check user role
        if (req.user.role !== "admin" && req.user.role !== "owner") {
            return res.status(401).json("Unauthorized");
        }

        const ListingData = await Listings.findById(listingId)

        if (req.files && req.files.length > 0 && ListingData.images && ListingData.images.length > 0) {
            ListingData.images.forEach(imagePath => {
                const imageName = imagePath.split('\\')
                fs.unlinkSync(path.join(__dirname,"uploads",imageName[imageName.length-1])); 
            });
        }

        ListingData.name = name || ListingData.name;
        ListingData.phone = phone || ListingData.phone;
		ListingData.address = address||ListingData.address;
		ListingData.city = city ||ListingData.city;

        // Handle file uploads
        if (req.files && req.files.length > 0) {
            const images = req.files.map(file => file.path);
            ListingData.images = images;
        }

         await ListingData.save();

        if (!ListingData) {
            return res.status(404).json({ message: "Listing not found" });
        }

        res.json(ListingData);
    } catch (error) {
        console.error("Error updating listing:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router