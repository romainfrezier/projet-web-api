const db = require("../models")
const StatValue = db.statValues

exports.createStatValue = (request, response) => {
    // Validate request
    if (!request.body.activity || !request.body.stat || !request.body.value || !request.body.user) {
        response.status(400).send({
            message: "There are still boxes to fill in !"
        })
        return
    }

    // Create a Stat Value
    const statValue = {
        activity: request.body.activity,
        stat: request.body.stat,
        value: request.body.value,
        user: request.body.user,
    }

    // Save Stat Value in the database
    StatValue.create(statValue)
        .then(data => {
            response.status(201).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while creating the Stat Value..."
            })
        })
}

exports.getStatValuesByUserId = (request, response) => {
    const user = request.body.user
    StatValue.findAll({ where: { user: user } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving stat values."
            })
        })
}

exports.getStatValuesByActivity = (request, response) => {
    const activity = request.params.activity
    const user = request.body.user
    StatValue.findAll({ where: { activity: activity, user: user } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving stat values."
            })
        })
}

exports.getStatValuesByStat = (request, response) => {
    const stat = request.params.stat
    const user = request.body.user
    StatValue.findAll({ where: { stat: stat, user: user } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving stat values."
            })
        })
}

exports.getOneStatValue = (request, response) => {
    const stat = request.params.stat
    const activity = request.params.activity
    const user = request.body.user
    StatValue.findAll({ where: { stat: stat, activity: activity, user: user } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving stat value."
            })
        })
}

exports.updateStatValue = (request, response) => {
    const stat = request.params.stat
    const activity = request.params.activity
    const user = request.body.user
    StatValue.update(request.body, {
        where: { stat: stat, activity: activity, user: user }
    })
        .then(modified => {
            if (modified == 1) {
                response.status(200).send({
                    message: "Stat Value was updated successfully."
                })
            } else {
                response.status(400).send({
                    message: "Cannot update Stat Value. Maybe Stat Value was not found or req.body is empty!"
                })
            }
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Error updating Stat Value"
            })
        })
}

exports.deleteStatValue = (request, response) => {
    const stat = request.params.stat
    const activity = request.params.activity
    const user = request.body.user
    StatValue.destroy({
        where: { stat: stat, activity: activity, user: user }
    })
        .then(deleted => {
            if (deleted == 1) {
                response.status(200).send({
                    message: "Stat Value was deleted successfully!"
                })
            } else {
                response.status(400).send({
                    message: "Cannot delete Stat Value. Maybe Stat Value was not found!"
                })
            }
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Could not delete Stat Value"
            })
        })
}