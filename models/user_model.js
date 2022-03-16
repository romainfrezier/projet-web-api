module.exports = (sequelize, dataTypes) => {
    const Users = sequelize.define("users", {
        username: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        isPremium: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isAdmin: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
        {
            timestamps: false
        })
    return Users
}