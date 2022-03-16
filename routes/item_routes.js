module.exports = app => {
    const express = require('express')
    const item = require('../controllers/item_controller')
    const premium = require('../middlewares/premium_auth_middleware')

    const router = express.Router()

    router.post('/', premium, item.createItem)
    router.get('/', premium, item.getItemsByUserId)
    router.get('/sport/:sport', item.getItemsBySport)
    router.get('/:id', premium, item.getItemById)
    router.get('/name/:name', premium, item.getItemsByName)
    router.put('/:id', premium, item.updateItem)
    router.delete('/:id', premium, item.deleteItem)
    router.delete('/', premium, item.deleteAllItemsForUser)
    app.use('/items', router)
}