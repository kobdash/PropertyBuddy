// routes/houseRouter.js

const express = require('express');
const router = express.Router();
const connectDB = require('../db/db'); // Adjust the path as needed
const House = require('../models/House'); // Assuming you have a House model

// Connect to MongoDB
connectDB();

// Route for adding a house
router.post('/', async (req, res) => {
  try {
    const { ownerName, address, numberOfRooms } = req.body;

    // Validate the data (you can add more validation as needed)

    // Create a new House instance
    const newHouse = new House({
      ownerName,
      address,
      numberOfRooms,
      username: 'username',
      // Add more fields as needed
    })

    // Save the new house to the database
    await newHouse.save();

    // Respond with a success message or the newly added house data
    res.status(201).json({ message: 'House added successfully', data: newHouse });
  } catch (error) {
    console.error('Error adding house:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route for fetching all houses
router.get('/', async (req, res) => {
  try {
    const houses = await House.find();
    res.status(200).json(houses);
  } catch (error) {
    console.error('Error fetching houses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;

