module.exports = app => {
    const express = require('express')
    const sport = require('../controllers/sport_controller')
    const admin = require('../middlewares/admin_auth_middleware')
    const auth = require('../middlewares/auth_middleware')

    const router = express.Router()

    router.post('/', admin, sport.createSport)
    router.get('/', auth, sport.getAllSport)
    router.get('/:id', auth, sport.getSportById)
    router.get('/name/:name', auth, sport.getSportByName)
    router.put('/:id', admin, sport.updateSport)
    router.delete('/:id', admin, sport.deleteSport)
    app.use('/sports', router)
}