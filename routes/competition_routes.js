module.exports = app => {
    const express = require('express')
    const competition = require('../controllers/competition_controller')
    const premium = require('../middlewares/premium_auth_middleware')

    const router = express.Router()

    router.post('/', premium, competition.createCompetition)
    router.get('/:id', premium, competition.getCompetitionById)
    router.get('/date/:date', premium, competition.getCompetitionsByDate)
    router.get('/sport/:sport', premium, competition.getCompetitionsBySport)
    router.get('/name/:name', premium, competition.getCompetitionsByName)
    router.put('/:id', premium, competition.updateCompetition)
    router.delete('/:id', premium, competition.deleteCompetition)
    app.use('/competitions', router)
}