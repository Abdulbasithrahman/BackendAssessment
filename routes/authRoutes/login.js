const express = require('express');
const router = express.Router()
const jwt = require("jsonwebtoken")
const {Users} = require('../../models/model');

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Users.findOne({ username });

        if (!user || password !== user.password) {
            return res.status(401).json("Invalid username or password");
        }

        const accessToken = jwt.sign({ id: user.id, name: user.username, role: user.role }, process.env.ACCESS_WEB_TOKEN);

        res.json({ accessToken: accessToken });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;