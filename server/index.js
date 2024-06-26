const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const People = require('./models/Peoples'); // Ensure this path and case are correct

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: 'https://authentication-frontend-psi.vercel.app', // Ensure this matches your frontend URL exactly
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Check if MONGO_URI is defined
if (!process.env.MONGO_URI) {
    console.error('MONGO_URI environment variable is not defined');
    process.exit(1); // Exit the process if MONGO_URI is not defined
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected Successfully!');
    })
    .catch((error) => {
        console.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1); // Exit the process if MongoDB connection fails
    });

// Root route for health check
app.get("/", (req, res) => {
    res.json("hello");
});

// Register route
app.post('/register', (req, res) => {
    console.log('Register request received:', req.body); // Log the request payload

    People.create(req.body)
        .then(person => res.json(person))
        .catch(err => {
            console.error('Registration error:', err); // Log the error
            res.status(400).json(err);
        });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    console.log('Login request received:', email, password); // Log the request payload

    People.findOne({ email: email })
        .then(user => {
            console.log('User found:', user); // Log the retrieved user data

            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.status(400).json("Incorrect password");
                }
            } else {
                res.status(400).json("No record found");
            }
        })
        .catch(err => {
            console.error('Login error:', err); // Log any errors
            res.status(500).json("Server error");
        });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started and running on port ${PORT}`);
});
