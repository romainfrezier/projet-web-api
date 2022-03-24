module.exports = (sequelize, dataTypes) => {
    const Activities = sequelize.define("activities", {
        activityName: {
            type: dataTypes.STRING,
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
        },
        time: {
            type: dataTypes.DATE,
            allowNull: true
        },
        distance: {
            type: dataTypes.REAL,
            allowNull: true
        },
        height: {
            type: dataTypes.INTEGER
        }
    },
        {
            timestamps: false
        })
    return Activities
}