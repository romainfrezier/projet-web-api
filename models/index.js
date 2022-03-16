const dbConfig = require("../config/db_config")
const Sequelize = require("sequelize")
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    schema: dbConfig.schema,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.activities = require("./activity_model")(sequelize, Sequelize)
db.competitions = require("./competition_model")(sequelize, Sequelize)
db.items = require("./item_model")(sequelize, Sequelize)
db.sports = require("./sport_model")(sequelize, Sequelize)
db.stats = require("./stat_model")(sequelize, Sequelize)
db.statValues = require("./stat_value_model")(sequelize, Sequelize)
db.users = require("./user_model")(sequelize, Sequelize)

module.exports = db