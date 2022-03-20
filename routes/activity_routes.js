module.exports = app => {
    const express = require('express')
    const activity = require('../controllers/activity_controller')
    const auth = require('../middlewares/auth_middleware')

    const router = express.Router()

    router.post('/:user/', auth, activity.createActivity)
    router.get('/:user/', auth, activity.getActivitiesByUserId)
    router.get('/:user/sport/:sport', auth, activity.getActivitiesBySport)
    router.get('/:user/:id', auth, activity.getActivityById)
    router.get('/:user/date/:date', auth, activity.getActivitiesByDate)
    router.get('/:user/name/:name', auth, activity.getActivitiesByName)
    router.put('/:user/:id', auth, activity.updateActivity)
    router.delete('/:user/:id', auth, activity.deleteActivity)
    router.delete('/:user/', auth, activity.deleteAllActivitiesForUser)
    app.use('/activities', router)
}