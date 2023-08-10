const express = require('express');
const mysql = require('mysql2'); // Используем правильное название библиотеки

const router = express.Router();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'finally',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM users';
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const query = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
    await pool.query(query, [name, email, age]);
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating user' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, age } = req.body;
    const query = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';
    await pool.query(query, [name, email, age, userId]);
    res.send('User updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating user' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const query = 'DELETE FROM users WHERE id = ?';
    await pool.query(query, [userId]);
    res.send('User deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting user' });
  }
});

module.exports = router;
