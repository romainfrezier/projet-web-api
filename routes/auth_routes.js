module.exports = app => {
    const express = require('express')
    const auth = require('../controllers/auth_controller')

    const router = express.Router()

    router.post('/signup/', auth.signup)
    router.post('/login/', auth.login)
    
    app.use(router)
}