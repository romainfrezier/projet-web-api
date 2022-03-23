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