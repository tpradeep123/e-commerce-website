var mysql = require("mysql");
var pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "quickshopee",
  password: "1234",
  multipleStatements: true,
  connection: 100,
});

module.exports = pool;
