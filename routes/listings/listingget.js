const verifyToken = require('../../middleware/token')
const express = require('express')
const router = express.Router()
const {Listings} = require('../../models/model')

router.get('/', verifyToken, async (req, res) => {
    const listings = await Listings.find();
    res.json(listings);
});

module.exports = router