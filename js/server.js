const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let users = []; // In-memory storage for users

// Registration endpoint
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // Save the new user
    users.push({ name, email, password });
    res.status(201).json({ message: 'User registered successfully' });
});

// Sign-in endpoint
app.post('/api/signin', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        res.status(200).json({ message: 'Sign-in successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
