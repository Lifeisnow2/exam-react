const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const authenticate = require('../middleware/authenticate'); // Подключаем middleware аутентификации
require('dotenv').config();

// Создаем пул подключения к базе данных
const dbPool = mysql
  .createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'finally',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();

// Validation users data
const userSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
  age: Joi.number().integer(),
});

// Получение списка пользователей (требуется аутентификация)
router.get('/', authenticate, async (req, res) => {
  try {
    const [rows] = await dbPool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

// Создание нового пользователя (доступно всем)
router.post('/', async (req, res) => {
  try {
    // Validation  users data
    const validatedUser = await userSchema.validateAsync(req.body);

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(validatedUser.password, 10);

    // Добавление пользователя в базу данных
    const [response] = await dbPool.execute(
      'INSERT INTO users (name, email, password, age) VALUES (?, ?, ?, ?)',
      [
        validatedUser.name,
        validatedUser.email,
        hashedPassword,
        validatedUser.age,
      ]
    );

    //  токен
    const token = jwt.sign(
      {
        id: response.insertId,
        name: validatedUser.name,
        email: validatedUser.email,
      },
      process.env.JWT_SECRET
    );

    // Отправить токен в ответе
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating user' });
  }
});

module.exports = router;
