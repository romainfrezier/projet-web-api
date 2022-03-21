module.exports = app => {
    const express = require('express')
    const sport = require('../controllers/sport_controller')
    const admin = require('../middlewares/admin_auth_middleware')
    const auth = require('../middlewares/auth_middleware')

    const router = express.Router()

    router.post('/:user/', admin, sport.createSport)
    router.get('/:user/', auth, sport.getAllSport)
    router.get('/:user/:id', auth, sport.getSportById)
    router.get('/:user/name/:name', auth, sport.getSportByName)
    router.put('/:user/:id', admin, sport.updateSport)
    router.delete('/:user/:id', admin, sport.deleteSport)
    app.use('/sports', router)
}