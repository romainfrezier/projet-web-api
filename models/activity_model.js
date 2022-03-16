module.exports = (sequelize, dataTypes) => {
    const Activities = sequelize.define("activities", {
        activityName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        sport: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        item: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        date: {
            type: dataTypes.DATEONLY,
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
    return Activities
}