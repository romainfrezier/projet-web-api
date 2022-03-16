module.exports = (sequelize, dataTypes) => {
    const Stats = sequelize.define("stats", {
        statName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        sport: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            timestamps: false
        })
    return Stats
}