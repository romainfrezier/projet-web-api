module.exports = app => {
    const express = require('express')
    const activity = require('../controllers/activity_controller')
    const auth = require('../middlewares/auth_middleware')

    const router = express.Router()

    router.post('/', auth, activity.createActivity)
    router.get('/', auth, activity.getActivitiesByUserId)
    router.get('/sport/:sport', auth, activity.getActivitiesBySport)
    router.get('/:id', auth, activity.getActivityById)
    router.get('/date/:date', auth, activity.getActivitiesByDate)
    router.get('/name/:name', auth, activity.getActivitiesByName)
    router.put('/:id', auth, activity.updateActivity)
    router.delete('/:id', auth, activity.deleteActivity)
    router.delete('/', auth, activity.deleteAllActivitiesForUser)
    app.use('/activities', router)
}