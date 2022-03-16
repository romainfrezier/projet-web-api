module.exports = (sequelize, dataTypes) => {
    const Competitions = sequelize.define("competitions", {
        competDate: {
            type: dataTypes.DATE,
            allowNull: false
        },
        sport: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        competName: {
            type: dataTypes.STRING,
            allowNull: false
        },
    },
        {
            timestamps: false
        })
    return Competitions
};