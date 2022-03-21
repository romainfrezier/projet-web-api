const jsonWebToken = require('jsonwebtoken');
const CryptoJS = require('crypto-js')

module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jsonWebToken.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId.toString()
        const admin = decodedToken.isAdmin.toString()
        if (request.params.user && request.params.user !== userId) {
            throw 'Invalid user ID';
        } else if (admin == "null") {
            throw 'An error occured...'
        } else if (admin == "false") {
            throw 'You are not admin'
        } else{
            next();
        }
    } catch {
        response.status(401).send({
            message: "Invalid request!"
        });
    }
};