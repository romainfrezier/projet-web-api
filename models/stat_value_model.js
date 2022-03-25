module.exports = (sequelize, dataTypes) => {
    const StatValues = sequelize.define("stat_values", {
        activity: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        stat: {
            type: dataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        value: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        user: {
            type: dataTypes.INTEGER,
            allowNull: false,
        }
    },
        {
            timestamps: false
        })
    return StatValues
}