const db = require("../models")
const Stat = db.stats

exports.createStat = (request, response) => {
    // Validate request
    if (!request.body.statName || !request.body.sport) {
        response.status(400).send({
            message: "There are still boxes to fill in !"
        })
        return
    }

    // Create a Type of Stat
    const stat = {
        statName: request.body.statName,
        sport: request.body.sport,
    }

    // Save Type of Stat in the database
    Stat.create(stat)
        .then(data => {
            response.status(201).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while creating the Stat..."
            })
        })
}

exports.getStatByName = (request, response) => {
    const statName = request.params.name
    Stat.findAll({ where: { statName: statName } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving stat."
            })
        })
}

exports.getStatById = (request, response) => {
    const id = request.params.id
    Stat.findAll({ where: { id: id } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving stat."
            })
        })
}

exports.getStatsBySport = (request, response) => {
    const sport = request.params.sport
    Stat.findAll({ where: { sport: sport } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving stat(s)."
            })
        })
}

exports.updateStat = (request, response) => {
    const id = request.params.id
    Stat.update(request.body, {
        where: { id: id }
    })
        .then(modified => {
            if (modified == 1) {
                response.status(200).send({
                    message: "Stat was updated successfully."
                })
            } else {
                response.status(400).send({
                    message: `Cannot update Stat with id=${id}. Maybe Stat was not found or req.body is empty!`
                })
            }
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Error updating Stat with id=" + id
            })
        })
}

exports.deleteStat = (request, response) => {
    const id = request.params.id
    Stat.destroy({
        where: { id: id }
    })
        .then(deleted => {
            if (deleted == 1) {
                response.status(200).send({
                    message: "Stat was deleted successfully!"
                })
            } else {
                response.status(400).send({
                    message: `Cannot delete Stat with id=${id}. Maybe Stat was not found!`
                })
            }
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Could not delete Stat with id=" + id
            })
        })
}