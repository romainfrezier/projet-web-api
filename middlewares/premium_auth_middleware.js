const jsonWebToken = require('jsonwebtoken');

module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jsonWebToken.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const isPremium = decodedToken.isPremium
        if (request.body.userId && request.body.userId !== userId) {
            throw 'Invalid user ID';
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