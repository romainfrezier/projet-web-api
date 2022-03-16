module.exports = app => {
    const express = require('express')
    const stat = require('../controllers/stat_controller')
    const auth = require('../middlewares/auth_middleware')
    const admin = require('../middlewares/admin_auth_middleware')

    const router = express.Router()

    router.post('/', admin, stat.createStat)
    router.get('/:id', auth, stat.getStatById)
    router.get('/name/:name', auth, stat.getStatByName)
    router.get('/sport/:sport', auth, stat.getStatsBySport)
    router.put('/:id', admin, stat.updateStat)
    router.delete('/:id', admin, stat.deleteStat)
    app.use('/stats', router)
}