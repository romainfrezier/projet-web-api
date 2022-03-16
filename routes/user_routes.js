module.exports = app => {
    const express = require('express')
    const user = require('../controllers/user_controller')
    const auth = require('../middlewares/auth_middleware')
    const admin = require('../middlewares/admin_auth_middleware')

    const router = express.Router()

    router.get('/:id', admin, user.getUserById)
    router.get('/type/premium/', admin, user.getUsersByTypePremium)
    router.get('/type/admin/', admin, user.getUsersByTypeAdmin)
    router.get('/', admin, user.getAllUsers)
    router.get('/username/:username', admin, user.getUserByUsername)
    router.put('/:id', auth, user.updateUser)
    router.delete('/:id', admin, user.deleteUser)
    app.use('/users', router)
}