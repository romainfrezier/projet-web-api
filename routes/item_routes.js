module.exports = app => {
    const express = require('express')
    const item = require('../controllers/item_controller')
    const premium = require('../middlewares/premium_auth_middleware')

    const router = express.Router()

    router.post('/:user/', premium, item.createItem)
    router.get('/:user/', premium, item.getItemsByUserId)
    router.get('/:user/sport/:sport', item.getItemsBySport)
    router.get('/:user/:id', premium, item.getItemById)
    router.get('/:user/name/:name', premium, item.getItemsByName)
    router.put('/:user/:id', premium, item.updateItem)
    router.delete('/:user/:id', premium, item.deleteItem)
    app.use('/items', router)
}