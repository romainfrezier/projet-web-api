module.exports = app => {
    const express = require('express')
    const statValue = require('../controllers/stat_value_controller')
    const auth = require('../middlewares/auth_middleware')

    const router = express.Router()

    router.post('/:user/:stat', auth, statValue.createStatValue)
    router.get('/:user/', auth, statValue.getStatValuesByUserId)
    router.get('/:user/activity/:activity', auth, statValue.getStatValuesByActivity)
    router.get('/:user/:activity/:stat', auth, statValue.getOneStatValue)
    router.get('/:user/:stat', auth, statValue.getStatValuesByStat)
    router.put('/:user/:activity/:stat', auth, statValue.updateStatValue)
    router.delete('/:user/:activity/:stat', auth, statValue.deleteStatValue)
    app.use('/statValues', router)
}
