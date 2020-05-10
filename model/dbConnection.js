const mysql = require('mysql2');

const dbConfig = {
   host: 'localhost',
   user: 'dev',
   password: 'secret',
   port: 3306,
   database: 'example',
   multipleStatements: true,
};

const dbc1 = mysql.createPool(dbConfig).promise();
module.exports = dbc1;