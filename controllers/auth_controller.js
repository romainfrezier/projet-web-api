const bcrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken')
const db = require("../models")
const User = db.users

exports.signup = (request, response) => {
    // Validate request
    if (!request.body.username || !request.body.password) {
        response.status(400).send({
            message: "There are still boxes to fill in !"
        })
        return
    }

    // Hash password
    bcrypt.hash(request.body.password, 10)
        .then(hash => {
            // Create a User
            const user = {
                username: request.body.username,
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
    User.findOne({ where: { username: request.body.username } })
        .then(user => {
            if (!user) {
                return response.status(401).send({ message: 'User not found !' })
            }
            bcrypt.compare(request.body.password, user.dataValues.password, function(error, result) {
                if (error) {
                    response.status(500).send({ message: 'Server error 1' })
                } if (result) {
                    response.status(200).json({
                        userId: user.dataValues.id,
                        token: jsonWebToken.sign(
                            { userId: user.dataValues.id },
                            'RANDOM_TOKEN_SECRET',
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