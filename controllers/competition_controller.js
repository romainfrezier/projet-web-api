const db = require("../models")
const Competition = db.competitions

exports.createCompetition = (request, response) => {
    // Validate request
    if (!request.body.competDate || !request.body.sport || !request.body.competName ) {
        response.status(400).send({
            message: "There are still boxes to fill in !"
        })
        return
    }

    // Create a Competition
    const competition = {
        competDate: request.body.competDate,
        sport: request.body.sport,
        competName: request.body.competName
    }

    // Save Competition in the database
    Competition.create(competition)
        .then(data => {
            response.status(201).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while creating the Competition..."
            })
        })
}

exports.getCompetitionsByName = (request, response) => {
    const competName = request.params.name
    Competition.findAll({ where: { competName: competName} })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving competitions."
            })
        })
}

exports.getCompetitionById = (request, response) => {
    const id = request.params.id
    Competition.findAll({ where: { id: id } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving competitions."
            })
        })
}

exports.getCompetitionsByDate = (request, response) => {
    const date = request.params.date
    Competition.findAll({ where: { competDate: date } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving competitions."
            })
        })
}

exports.getCompetitionsBySport = (request, response) => {
    const sport = request.params.sport
    Competition.findAll({ where: { sport: sport } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving competitions."
            })
        })
}

exports.updateCompetition = (request, response) => {
    const id = request.params.id
    Competition.update(request.body, {
        where: { id: id }
    })
        .then(modified => {
            if (modified == 1) {
                response.status(200).send({
                    message: "Competition was updated successfully."
                })
            } else {
                response.status(400).send({
                    message: `Cannot update Competition with id=${id}. Maybe Competition was not found or req.body is empty!`
                })
            }
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Error updating Competition with id=" + id
            })
        })
}

exports.deleteCompetition = (request, response) => {
    const id = request.params.id
    Competition.destroy({
        where: { id: id }
    })
        .then(deleted => {
            if (deleted == 1) {
                response.status(200).send({
                    message: "Competition was deleted successfully!"
                })
            } else {
                response.status(400).send({
                    message: `Cannot delete Competition with id=${id}. Maybe Competition was not found!`
                })
            }
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Could not delete Competition with id=" + id
            })
        })
}