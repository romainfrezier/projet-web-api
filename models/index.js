// Use it for localhost

// const dbConfig = require("../config/db_config")
// const Sequelize = require("sequelize")
// const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
//     host: dbConfig.host,
//     schema: dbConfig.schema,
//     port: dbConfig.port,
//     dialect: dbConfig.dialect,
// })

// Use it for heroku host
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}
);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


const item_model = require("./item_model")(sequelize, Sequelize)
const sport_model = require("./sport_model")(sequelize, Sequelize)
const activity_model = require("./activity_model")(sequelize, Sequelize)

sport_model.hasMany(item_model, {foreignKey: {allowNull: false}})
item_model.belongsTo(sport_model)

sport_model.hasMany(activity_model, { foreignKey: { allowNull: false } })
activity_model.belongsTo(sport_model)

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.activities = activity_model
db.competitions = require("./competition_model")(sequelize, Sequelize)
db.items = item_model
db.sports = sport_model
db.statValues = require("./stat_value_model")(sequelize, Sequelize)
db.users = require("./user_model")(sequelize, Sequelize)

module.exports = db