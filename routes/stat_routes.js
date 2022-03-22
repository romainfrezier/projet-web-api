module.exports = app => {
    const express = require('express')
    const stat = require('../controllers/stat_controller')
    const auth = require('../middlewares/auth_middleware')
    const admin = require('../middlewares/admin_auth_middleware')

    const router = express.Router()

    router.post('/:user/', admin, stat.createStat)
    router.get('/:user/:id', auth, stat.getStatById)
    router.get('/:user/name/:name', auth, stat.getStatByName)
    router.get('/:user/sport/:sport', auth, stat.getStatsBySport)
    router.put('/:user/:id', admin, stat.updateStat)
    router.delete('/:user/:id', admin, stat.deleteStat)
    app.use('/stats', router)
}