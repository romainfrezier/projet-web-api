const jsonWebToken = require('jsonwebtoken');
const CryptoJS = require('crypto-js')
const db = require("../models")
const User = db.users

function getUserType(id) {
    User.findAll({ where: { id: id } })
        .then(data => {
            return data.isAdmin
        })
        .catch(error => {
            console.log(error)
            return null
        })
}

module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jsonWebToken.verify(token, process.env.TOKEN);
        const userId = CryptoJS.AES.decrypt(decodedToken.userId, process.env.KEY);
        const isAdmin = getUserType(userId)
        if (request.params.userId && request.params.userId !== userId) {
            throw 'Invalid user ID';
        } else if (isAdmin == null) {
            throw 'An error occured...'
        } else if (!isAdmin) {
            throw 'You are not admin'
        } else {
            next();
        }
    } catch {
        res.status(401).send({
            message: "Invalid request!"
        });
    }
};