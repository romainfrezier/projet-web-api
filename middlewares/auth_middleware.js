const jsonWebToken = require('jsonwebtoken');

module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jsonWebToken.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId.toString()
        if (request.params.user && request.params.user !== userId) {
            console.log("je suis la")
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        console.log("la aussi")
        response.status(401).send({
            message: "Invalid request!"
        });
    }
};