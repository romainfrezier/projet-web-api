const http = require('http')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
})

require('./routes/activity_routes')(app)
require('./routes/auth_routes')(app)
require('./routes/competition_routes')(app)
require('./routes/item_routes')(app)
require('./routes/sport_routes')(app)
require('./routes/stat_routes')(app)
require('./routes/stat_value_routes')(app)
require('./routes/user_routes')(app)

const normalizePort = val => {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }
    return false
}
const port = normalizePort(process.env.PORT || '4000')

app.set('port', port)

app.get("/", (request, response) => {
    response.json({ message: "Welcome to my App" })
})

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error
    }
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.')
            process.exit(1)
            break
        default:
            throw error
    }
}

const server = http.createServer(app)

server.on('error', errorHandler)
server.on('listening', () => {
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
    console.log('Listening on ' + bind)
})

const db = require("./models")
db.sequelize.sync()

server.listen(port)