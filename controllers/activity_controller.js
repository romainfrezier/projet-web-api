const db = require("../models")
const Activity = db.activities
const Sports = db.sports

exports.createActivity = (request, response) => {
    // Validate request
    if (!request.params.user || !request.body.activityName || !request.body.sport || !request.body.date || !request.body.user) {
        response.status(400).send({
            message: "There are still boxes to fill in !"
        })
        return
    }

    // Create an Activity
    const activity = {
        activityName: request.body.activityName,
        sport: request.body.sport,
        item: request.body.item ? request.body.item : null,
        date: request.body.date,
        user: request.params.user
    }

    // Save Activity in the database
    Activity.create(activity)
        .then(data => {
            response.status(201).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while creating the Activity..."
            })
        })
}

exports.getActivitiesByName = (request, response) => {
    const activityName = request.params.name
    const user = request.params.user
    Activity.findAll({ where: { activityName: activityName, user: user } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving activities."
            })
        })
}

exports.getActivitiesByUserId = (request, response) => {
    const user = request.params.user
    Activity.findAll({
        where: { user: user },
        include: Sports,
        order: [['date', 'DESC']]
    })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving activities."
            })
        })
}

exports.getActivitiesByDate = (request, response) => {
    const date = request.params.date
    const user = request.params.user
    Activity.findAll({ where: { date: date, user: user } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving activities."
            })
        })
}

exports.getActivitiesBySport = (request, response) => {
    const sport = request.params.sport
    const user = request.params.user
    Activity.findAll({ where: { sport: sport, user: user } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(err => {
            response.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving activities."
            })
        })
}

exports.getActivityById = (request, response) => {
    const id = request.params.id
    const user = request.params.user
    Activity.findAll({ where: { id: id, user: user } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving activities."
            })
        })
}

exports.updateActivity = (request, response) => {
    const id = request.params.id
    const user = request.params.user
    Activity.update(request.body, { where: { id: id, user: user } })
        .then(number => {
            if (number == 1) {
                response.status(200).send({
                    message: "Activity was updated successfully."
                })
            } else {
                response.status(400).send({
                    message: `Cannot update Activity with id=${id}. Maybe Activity was not found or req.body is empty!`
                })
            }
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Error updating Activity with id=" + id
            })
        })
}

exports.deleteActivity = (request, response) => {
    const id = request.params.id
    const user = request.params.user
    Activity.destroy({
        where: { id: id, user: user }
    })
        .then(number => {
            if (number == 1) {
                response.status(200).send({
                    message: "Activity was deleted successfully!"
                })
            } else {
                response.status(400).send({
                    message: `Cannot delete Activity with id=${id}. Maybe Activity was not found!`
                })
            }
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Could not delete Activity with id=" + id
            })
        })
}

exports.deleteAllActivitiesForUser = (request, response) => {
    const user = request.params.user
    Activity.destroy({
        where: { user: user },
        truncate: false
    })
        .then(numbers => {
            response.status(200).send({ message: `${numbers} Activities were deleted successfully!` })
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while removing all activities."
            })
        })
}