const verifyToken = require('../../middleware/token')
const upload = require('../../multer/multerConfig')
const express = require('express')
const router = express.Router()
const {Listings} = require('../../models/model')


router.post("/", verifyToken,upload.array('images', 5), async (req, res) => {
    if (req.user.role !== 'owner' && req.user.role !== 'admin') {
        return res.status(403).json({ message: "Unauthorized" });
    }

    const { name, phone, city, address} = req.body;

    const images = req.files.map(file=>file.path)

    try {
        const listing = new Listings({ name, phone, city, address, images });
        await listing.save();
        res.status(201).json(listing);
    } catch (error) {
        console.error("Error creating listing:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router