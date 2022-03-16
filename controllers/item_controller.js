const db = require("../models")
const Item = db.items

exports.createItem = (request, response) => {
    // Validate request
    if (!request.body.itemName || !request.body.sport || !request.body.user) {
        response.status(400).send({
            message: "There are still boxes to fill in !"
        })
        return
    }

    // Create a Item
    const item = {
        itemName: request.body.itemName,
        usage: request.body.usage ? request.body.usage : null,
        sport: request.body.sport,
        user: request.body.user
    }

    // Save Item in the database
    Item.create(item)
        .then(data => {
            response.status(201).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while creating the Item..."
            })
        })
}

exports.getItemsByName = (request, response) => {
    const itemName = request.params.name
    const user = request.body.user
    Item.findAll({ where: { itemName: itemName, user: user } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving items."
            })
        })
}

exports.getItemById = (request, response) => {
    const id = request.params.id
    const user = request.body.user
    Item.findAll({ where: { id: id, user: user } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving items."
            })
        })
}

exports.getItemsByUserId = (request, response) => {
    const user = request.body.user
    Item.findAll({ where: { user: user } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving items."
            })
        })
}

exports.getItemsBySport = (request, response) => {
    const sport = request.params.sport
    const user = request.body.user
    Item.findAll({ where: { sport: sport, user: user } })
        .then(data => {
            response.status(200).send(data)
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving items."
            })
        })
}

exports.updateItem = (request, response) => {
    const id = request.params.id
    const user = request.body.user
    Item.update(request.body, { where: { id: id, user: user } })
        .then(modified => {
            if (modified == 1) {
                response.status(200).send({
                    message: "Item was updated successfully."
                })
            } else {
                response.status(400).send({
                    message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`
                })
            }
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Error updating Item with id=" + id
            })
        })
}

exports.deleteItem = (request, response) => {
    const id = request.params.id
    const user = request.body.user
    Item.destroy({ where: { id: id, user: user } })
        .then(deleted => {
            if (deleted == 1) {
                response.status(200).send({
                    message: "Item was deleted successfully!"
                })
            } else {
                response.status(400).send({
                    message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
                })
            }
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Could not delete Item with id=" + id
            })
        })
}

exports.deleteAllItemsForUser = (request, response) => {
    const user = request.body.id
    Item.destroy({
        where: { user: user },
        truncate: false
    })
        .then(numbers => {
            response.send({ message: `${numbers} Items were deleted successfully!` })
        })
        .catch(error => {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while removing all items."
            })
        })
}