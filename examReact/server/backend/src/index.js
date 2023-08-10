const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mysql = require('mysql2');
const organizeRouter = require('./routes/organize');
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

app.use('/api/organizers', organizeRouter);

const authenticate = require('./middleware/authenticate'); // Подключаем middleware аутентификации

const usersRouter = require('./routes/users');
app.use('/api/users', authenticate, usersRouter); // Используем middleware перед маршрутами пользователей

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
