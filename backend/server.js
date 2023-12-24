const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./db/db');
const cors = require('cors');
const authController = require('./controllers/authController');
const bodyParser = require('body-parser');
const houseRouter = require('./routes/houseRouter'); // Adjust the path as needed

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Parses HTML data and makes it available as JavaScript
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.post('/login', authController.login);
app.post('/register', authController.register);
app.use('/api/houses', houseRouter); // Use the houseRouter for '/api/houses' route

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


