module.exports = {
    user: 'romainfrezier',
    host: 'localhost',
    database: 'ProjetWeb',
    schema: 'ProjetWeb',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    dialect: 'postgres',
};