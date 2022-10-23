const express = require("express")
const mongoose = require("mongoose")
const usersModel = require('../models/Users.js');
const routes2 = express.Router()

// allow user to create new account
routes2.post("/user/signup", async (req, res) => {
    try {
        const newUser = new usersModel(req.body)
        const user = await newUser.save()
        res.status(201).send(user)
    }
    catch (error) {
        res.status(404).send(error)
    }
})
//allow user to access the system
routes2.post('/user/login', async (req, res) => {
    try {
        usersModel.findOne({ username: req.body.username }, (error, user) => {
            if (error) throw errpr

            if (user == null) {
                res.status(500).send({
                    "status": false, "message": "Please enter correct username or password."
                })
            } else {
                user.verifyPassword(req.body.password, (error, isMatch) => {
                    if (error) throw error
                    if (isMatch) {
                        res.status(200).send({
                            "status": true, "username": req.body.username, "message": "User logged in successfully."
                        })
                    } else {
                        res.status(500).send({
                            "status": false, "message": "Please enter correct username or password."
                        })
                    }
                })
            }

        })

    } catch (error) {
        res.status(500).send({
            "status": false, "message": error.message
        })
    }
});

module.exports = routes2