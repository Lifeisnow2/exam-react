const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'finally',
});

connection.connect();

app.use(bodyParser.json());
app.use(morgan('dev'));

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
