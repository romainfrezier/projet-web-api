module.exports = (sequelize, dataTypes) => {
    const Items = sequelize.define("items", {
        itemName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        usage: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        sport: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        user: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            timestamps: false
        })
    return Items
}