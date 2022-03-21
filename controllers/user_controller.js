const { raw } = require("express")
const db = require("../models")
const User = db.users

exports.getUserByUsername = (request, response) => {
    const username = request.params.username
    User.findAll({ where: { username: username } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving User."
            })
        })
}

exports.getUserById = (request, response) => {
    const id = request.params.id
    User.findAll({ where: { id: id } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving User."
            })
        })
}

exports.getUsersByTypePremium = (request, response) => {
    User.findAll({ where: { isPremium: true } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving User(s)."
            })
        })
}

exports.getUsersByTypeAdmin = (request, response) => {
    User.findAll({ where: { isAdmin: true } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving User(s)."
            })
        })
}

exports.getAllUsers = (request, response) => {
    User.findAll({ where: { }})
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving Users."
            })
        })
}

exports.updateUser = (request, response) => {
    const id = request.params.id
    const user = request.params.user
    User.update(request.body, { where: { id: id, user: user } })
        .then(modified => {
            if (modified == 1) {
                response.status(200).send({
                    message: "User was updated successfully."
                })
            } else {
                response.status(400).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                })
            }
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Error updating User with id=" + id
            })
        })
}

exports.deleteUser = (request, response) => {
    const id = request.params.id
    const user = request.params.user
    User.destroy({where: { id: id, user: user }})
        .then(deleted => {
            if (deleted == 1) {
                response.status(200).send({
                    message: "User was deleted successfully!"
                })
            } else {
                response.status(400).send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                })
            }
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Could not delete User with id=" + id
            })
        })
}