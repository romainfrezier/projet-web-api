module.exports = (sequelize, dataTypes) => {
    const Sports = sequelize.define("sports", {
        sportName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        sportPeriod: {
            type: dataTypes.STRING,
            allowNull: false
        }
    },
        {
            timestamps: false
        })
    return Sports
};