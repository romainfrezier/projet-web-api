module.exports = app => {
    const express = require('express')
    const competition = require('../controllers/competition_controller')
    const premium = require('../middlewares/premium_auth_middleware')

    const router = express.Router()

    router.post('/:user/', premium, competition.createCompetition)
    router.get('/:user/', premium, competition.getAllCompetitions)
    router.get('/:user/:id', premium, competition.getCompetitionById)
    router.get('/:user/date/:date', premium, competition.getCompetitionsByDate)
    router.get('/:user/sport/:sport', premium, competition.getCompetitionsBySport)
    router.get('/:user/name/:name', premium, competition.getCompetitionsByName)
    router.put('/:user/:id', premium, competition.updateCompetition)
    router.delete('/:user/:id', premium, competition.deleteCompetition)
    app.use('/competitions', router)
}