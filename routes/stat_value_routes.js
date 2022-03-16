module.exports = app => {
    const express = require('express')
    const statValue = require('../controllers/stat_value_controller')
    const auth = require('../middlewares/auth_middleware')

    const router = express.Router()

    router.post('/', auth, statValue.createStatValue)
    router.get('/', auth, statValue.getStatValuesByUserId)
    router.get('/activity/:activity', auth, statValue.getStatValuesByActivity)
    router.get('/:activity/:stat', auth, statValue.getOneStatValue)
    router.get('/stat/:stat', auth, statValue.getStatValuesByStat)
    router.put('/:activity/:stat', auth, statValue.updateStatValue)
    router.delete('/:activity/:stat', auth, statValue.deleteStatValue)
    app.use('/statValues', router)
}
