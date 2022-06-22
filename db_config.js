let mysql = require("mysql")

const connection = mysql.createConnection({
    host: 'localhost', // dit is localhost
    user: 'root', // Your username
    password: 'Wachtwoordvoorsql', // Your password
    database: 'eyf' // Your database name
})
module.exports = connection;