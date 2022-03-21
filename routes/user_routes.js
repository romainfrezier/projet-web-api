module.exports = app => {
    const express = require('express')
    const user = require('../controllers/user_controller')
    const auth = require('../middlewares/auth_middleware')
    const admin = require('../middlewares/admin_auth_middleware')

    const router = express.Router()

    router.get('/:user/:id', admin, user.getUserById)
    router.get('/:user/type/premium/', admin, user.getUsersByTypePremium)
    router.get('/:user/type/admin/', admin, user.getUsersByTypeAdmin)
    router.get('/:user/', admin, user.getAllUsers)
    router.get('/:user/username/:username', admin, user.getUserByUsername)
    router.put('/:user/:id', auth, user.updateUser)
    router.delete('/:user/:id', admin, user.deleteUser)
    app.use('/users', router)
}