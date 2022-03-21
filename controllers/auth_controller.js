const bcrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken')
const db = require("../models")
const User = db.users
const CryptoJS = require('crypto-js')

exports.signup = (request, response) => {
    // Validate request
    if (!request.body.username || !request.body.password) {
        response.status(400).send({
            message: "There are still boxes to fill in !"
        })
        return
    }
    
    const usernameDecrypted = CryptoJS.AES.decrypt(request.body.username, `${process.env.KEY}`).toString(CryptoJS.enc.Utf8)
    const passwordDecrypted = CryptoJS.AES.decrypt(request.body.password, `${process.env.KEY}`).toString(CryptoJS.enc.Utf8)
    User.findAll({ where: { username: usernameDecrypted } })
        .then(data => {
            if (data.length != 0) {
                response.status(400).send({
                    message: "This username is already in use. Please choose another."
                })
                return
            }
        })
        .catch(error => {
            return response.status(500).send({ message : error})
        })
    
    // Hash password
    bcrypt.hash(passwordDecrypted, 10)
        .then(hash => {
            // Create a User
            const user = {
                username: usernameDecrypted,
                password: hash,
                isPremium: request.body.isPremium ? request.body.isPremium : false,
                isAdmin: request.body.isAdmin ? request.body.isAdmin : false,
            }
            // Save User in the database
            User.create(user)
                .then(data => {
                    response.status(201).send(data)
                })
                .catch(error => {
                    response.status(400).send({
                        message:
                            error.message || "Some error occurred while creating the User..."
                    })
                })

        })
        .catch(error => response.status(500).send({ message: error }))
}

exports.login = (request, response) => {
    const usernameDecrypted = CryptoJS.AES.decrypt(request.body.username, `${process.env.KEY}`).toString(CryptoJS.enc.Utf8)
    const passwordDecrypted = CryptoJS.AES.decrypt(request.body.password, `${process.env.KEY}`).toString(CryptoJS.enc.Utf8)
    User.findOne({ where: { username: usernameDecrypted } })
        .then(user => {
            if (!user) {
                return response.status(401).send({ message: 'User not found !' })
            }
            bcrypt.compare(passwordDecrypted, user.dataValues.password, function (error, result) {
                console.log(user.dataValues.id)
                if (error) {
                    response.status(500).send({ message: 'Server error 1' })
                } if (result) {
                    response.status(200).json({
                        userId: CryptoJS.AES.encrypt(JSON.stringify(user.dataValues.id), `${process.env.KEY}`).toString(),
                        isPremium: CryptoJS.AES.encrypt(JSON.stringify(user.dataValues.isPremium), `${process.env.KEY}`).toString(),
                        isAdmin: CryptoJS.AES.encrypt(JSON.stringify(user.dataValues.isAdmin), `${process.env.KEY}`).toString(),
                        token: jsonWebToken.sign(
                            {
                                userId: user.dataValues.id,
                                isAdmin: user.dataValues.isAdmin,
                                isPremium: user.dataValues.isPremium
                            },
                            process.env.TOKEN,
                            { expiresIn: '1h' }
                        )
                    })
                } else {
                    response.status(401).send({ message: 'Incorrect password !' })
                }
            })
        })
        .catch(error => response.status(500).json({ message: 'Server error 2' }))
}