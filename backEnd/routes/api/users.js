const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Users = require("../../models/Users");


// @route   GET api/users
// @desc    test user routes
// @access  Public
router.get('/',(req,res) => res.send("User route"));

// @route   POST api/users
// @desc    post users routes
// @access  Public
router.post('/', async (req,res) => {
    const { email, date, description, password } = req.body;
    try {
        let user = await Users.findOne({ email });
        if(user){
            return res.status(400).json({errors: [{ msg: "User sudah ada!"}]});
        }

        user = new Users({
            email,
            date,
            description,
            password
        });
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.json(req.body);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Errror");
    }
});

module.exports = router;