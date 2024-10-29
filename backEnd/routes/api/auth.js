const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Auth = require("../../middleware/auth");
const Users = require("../../models/Users");
const { check, validationResult } = require("express-validator");

// @route   Get api/auth
// @desc    test route
// @access  Public
router.get("/", Auth, async(req,res) => {
    try {
        const user = await Users.findById(req.user.id).select("password email");
        res.json(user);
    } catch (error) {
        console.log(err.message);
        res.status(500).send("Server error!!");
    }
})


// @route   Post api/auth
// @desc    authentikasi user dan token
// @access  Public
router.post('/',
    [
        check('email','Email harus valid').isEmail(),
        check('password','Password harus minimal 4 karakter').exists()
    ],
    async(req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await Users.findOne({email});
            if(!user){
                return res.status(400).json({errors:[{ msg: "Invalid Email"}]});
            }
            // compare return
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({errors:[{ msg: "Invalid credentials"}]});
            }
            const payload = {
                user: {
                    id: user.id,
                }
            }
            jwt.sign(
                payload,
                config.get("jwtsecret"),
                {expiresIn: 720000},
                (err, token) => {
                    if(err) throw err;
                    res.json({token});
                }
            )
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error!!");
        }
    }
)

module.exports = router;