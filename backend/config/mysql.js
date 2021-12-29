/* const { Sequelize } = require("sequelize");

const db = new Sequelize("english_app", "root", "", {
    host: "localhost",
    port: 3307,
    dialect: "mysql"
}
)

module.exports = { db } */



/* // get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'english_app'
});

connection.connect((error) => {
    if(error){
        throw error;
    } else {
        console.log('CONEXIÓN EXITOSA')
    }
});
connection.end(); */


const { Sequelize } = require("sequelize");

const db = new Sequelize("english_app", "root", "", {
    host: "localhost",
    port: 3307,
    dialect: "mysql"
}
)
module.exports = { db }