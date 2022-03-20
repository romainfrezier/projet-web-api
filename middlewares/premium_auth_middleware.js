const jsonWebToken = require('jsonwebtoken');
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
        const isPremium = getUserType(userId)
        if (request.params.userId && request.params.userId !== userId) {
            throw 'Invalid user ID';
        } else if (isPremium == null) {
            throw 'An error occured...'
        } else if (!isPremium) {
            throw 'You need a premium account'
        } else {
            next();
        }
    } catch {
        res.status(401).send({
            message: "Invalid request!"
        });
    }
};