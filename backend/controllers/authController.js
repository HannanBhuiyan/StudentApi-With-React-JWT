const Profile = require("../models/ProfileModel")
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    try {
        const allUser = await Profile.find()
        res.status(200).json(allUser)

    } catch (error) {
        res.status(500).send(error.message)
    }
}



exports.registrationController = async (req, res) => {
    const { firstName, lastName, email, mobile, password  } = req.body
    try {
        const newUsers = new Profile({
            firstName,
            lastName,
            email,
            mobile,
            password
        }) 
        await newUsers.save()
        res.status(200).json({ "status": "Registration success" })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.loginController = async  (req, res) => {
    const { email, password } = req.body
    try {
        const existsUsers = await Profile.findOne({ email: email, password: password })
        if(existsUsers) {
            let payload = {
                exp: Math.floor(Date.now() / 1000) + (15*60*60),
                data:existsUsers
            }
            var token = jwt.sign(payload, 'secretkey123456');
            res.status(200).json({ "status" : "Login success", "token": token, "user": existsUsers })
        }
        else {
            res.status(401).json({ "status": "Unauthorized" })
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

