//Connecting to a database
const { Sequelize } = require("sequelize");

const db = new Sequelize("english_app", "root", "", {
    host: "localhost",
    port: 3307,
    dialect: "mysql",
    define: {
        "timestamps": false
      }
});

//Testing the connection
db.authenticate().then(() => {
    console.log('Connection established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = { db };