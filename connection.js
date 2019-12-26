var mysql = require('mysql');
 
console.log('Get connection ...');
 
var conn = mysql.createConnection({
  database: 'projetNode1',
  host: "localhost",
  user: "root",
  password: ""
});
module.exports = conn;
