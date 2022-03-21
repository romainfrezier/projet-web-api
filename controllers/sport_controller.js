const db = require("../models")
const Sport = db.sports

exports.createSport = (request, response) => {
    // Validate request
    if (!request.body.sportName || !request.body.sportPeriod) {
        response.status(400).send({
            message: "There are still boxes to fill in !"
        })
        return
    }

    // Create a Sport
    const sport = {
        sportName: request.body.sportName,
        sportPeriod: request.body.sportPeriod,
    }

    // Save Sport in the database
    Sport.create(sport)
        .then(data => {
            response.status(201).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while creating the Sport..."
            })
        })
}

exports.getAllSport = (request, response) => {
    Sport.findAll({ where: {} })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving sport."
            })
        })
}

exports.getSportByName = (request, response) => {
    const sportName = request.params.name
    Sport.findAll({ where: { sportName: sportName } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving sport."
            })
        })
}

exports.getSportById = (request, response) => {
    const id = request.params.id
    Sport.findAll({ where: { id: id } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving sport."
            })
        })
}

exports.updateSport = (request, response) => {
    const id = request.params.id
    Sport.update(request.body, {
        where: { id: id }
    })
        .then(modified => {
            if (modified == 1) {
                response.status(200).send({
                    message: "Sport was updated successfully."
                })
            } else {
                response.status(400).send({
                    message: `Cannot update Sport with id=${id}. Maybe Sport was not found or req.body is empty!`
                })
            }
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Error updating Sport with id=" + id
            })
        })
}

exports.deleteSport = (request, response) => {
    const id = request.params.id
    Sport.destroy({
        where: { id: id }
    })
        .then(deleted => {
            if (deleted == 1) {
                response.status(200).send({
                    message: "Sport was deleted successfully!"
                })
            } else {
                response.status(400).send({
                    message: `Cannot delete Sport with id=${id}. Maybe Sport was not found!`
                })
            }
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Could not delete Sport with id=" + id
            })
        })
}