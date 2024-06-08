const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const peopleSchema = require('./models/Peoples'); // Import the model

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'https://authentication-frontend-psi.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected Successfully!');
    })
    .catch((error) => {
        console.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1); // Exit the process if MongoDB connection fails
    });

app.get("/", (req, res) => {
    res.json("hello");
});

// Register route
app.post('/register', (req, res) => {
    peopleSchema.create(req.body)
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

    peopleSchema.findOne({ email: email })
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
