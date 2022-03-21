const jsonWebToken = require('jsonwebtoken');

module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jsonWebToken.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId.toString()
        const premium = decodedToken.isPremium.toString()
        if (request.params.user && request.params.user !== userId) {
            throw 'Invalid user ID';
        } else if (premium == "null") {
            throw 'An error occured...'
        } else if (premium == "false") {
            throw 'You need a premium account'
        } else {
            next();
        }
    } catch {
        response.status(401).send({
            message: "Invalid request!"
        });
    }
};