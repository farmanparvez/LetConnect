const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt =  require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require("../../middleware/auth")
const User = require("../../models/User")


// get all user 

router.get("/all", async(req, res) => {
    try {
        const users = await User.find(); 
        
        res.json(users)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


// get user by id

router.get("/", auth, async(req, res) => {
    try {

        const user = await User.findById(req.user.id).select('-password')
        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error")
    }
})



router.post("/", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is requied").exists()

], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    const {email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}]})
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}]})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.jwtSecret, {expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({token})
        })
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }

    })

module.exports = router;