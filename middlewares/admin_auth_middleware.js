const jsonWebToken = require('jsonwebtoken');
const CryptoJS = require('crypto-js')

module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jsonWebToken.verify(token, process.env.TOKEN);
        const userId = CryptoJS.AES.decrypt(decodedToken.userId, process.env.KEY);
        const isAdmin = CryptoJS.AES.decrypt(decodedToken.isAdmin, process.env.KEY);
        if (request.body.userId && request.body.userId !== userId) {
            throw 'Invalid user ID';
        } else if (!isAdmin) {
            throw 'You are not a app admin'
        } else {
            next();
        }
    } catch {
        res.status(401).send({
            message: "Invalid request!"
        });
    }
};