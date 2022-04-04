const express = require("express");
const router = express.Router();
const jwtGenerate = require('../utils/jwtgenertor');
const pool = require('../db');
const bcrypt = require('bcrypt');

const validInfo = require("../middleware/validInfo");
const validAuth = require("../middleware/validAuth");


router.post("/register",validInfo,async(req, res, next)=> {
    const {email, password, username} = req.body;
    try {
        // Check if username && email is not duplicate in database
        const user = await pool.query(
            `SELECT * FROM users WHERE email=$1 OR username=$2`,
            [email, username]
        )

        if(user.rows.length !==0) {
            return res.status(401).json({message:"User already exist!"});
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hashSync(password, salt);

        let newUser = await pool.query(
            `INSERT INTO users(email, username, password)`+
            `VALUES($1, $2, $3) RETURNING *`,
            [email, username, bcryptPassword]
        );

        const jwtToken = jwtGenerate(newUser.rows[0].id);

        return res.json({jwtToken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

router.post("/login",validInfo,async(req, res, next)=> {
    const {email, password, username} = req.body;

    try {
        // Check if user login with email or username
        const filterValue = email?email:username;
        const filterField = email?"email":"username";
    
        const user = await pool.query(
            `SELECT * FROM users `+
            `WHERE ${filterField}=$1`,
            [filterValue]
        );
        
        // Check if exists user
        if(user.rows.length ===0) {
            return res.status(401).json({message: "Invalid Credential"});
        }
        // Check if password is valid
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if(!validPassword) {
            return res.status(401).json({message: "Invalid Credential"});
        }

        // If all passed
        const jwtToken = jwtGenerate(user.rows[0].id);
        return res.json({jwtToken});
    }
    catch (err){
        res.status(500).send("Server error");
    }
});

router.post("/verify",validAuth, (req, res, next)=> {
    try {
        res.json(true);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

module.exports = router;

