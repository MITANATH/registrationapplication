const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = 3000;

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'mydatabase',
    password: '283117',
    port: 5432,
});

client.connect();

app.use(bodyParser.json());

// API to create a new user
app.post('/api/user', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await client.query('INSERT INTO users(username, password) VALUES($1, $2) RETURNING *', [username, password]);
        res.json({ user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API to update user password
app.put('/api/user/:id', async (req, res) => {
    const userId = req.params.id;
   // const { password } = req.body;
    const {username,password} = req.body;
    try {
        const result = await client.query('UPDATE users SET username = $1 WHERE id = $2 RETURNING *', [username, userId]);
        res.json({ user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API to check user credentials
app.post('/api/check', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await client.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

        if (result.rows.length > 0) {
            res.json({ authenticated: true });
        } else {
            res.json({ authenticated: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
