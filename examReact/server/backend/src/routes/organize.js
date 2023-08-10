const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'finally',
});

connection.connect();

const organizerSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
  age: Joi.number().integer().min(18).required(),
});

router.post('/register', async (req, res) => {
  try {
    const { error, value } = organizerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: 'Validation error' });
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);
    const query =
      'INSERT INTO organizers (first_name, last_name, email, password, age) VALUES (?, ?, ?, ?, ?)';
    const [result] = await connection
      .promise()
      .execute(query, [
        value.firstName,
        value.lastName,
        value.email,
        hashedPassword,
        value.age,
      ]);

    if (result.affectedRows === 1) {
      return res
        .status(201)
        .json({ message: 'Organizer registered successfully' });
    } else {
      return res.status(500).json({ error: 'Error registering organizer' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = 'SELECT * FROM organizers WHERE email = ?';
    const [rows] = await connection.promise().execute(query, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const organizer = rows[0];
    const isPasswordValid = await bcrypt.compare(password, organizer.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: organizer.id, email: organizer.email },
      'secret'
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
