const mysql = require('mysql2');
const config = require('./mysql_config.json');

const connection = mysql.createConnection(config);

module.exports = {
  query: (sql, callback) => {
    connection.query(sql, callback);
  },
  close: () => {
    connection.end();
  },
};
