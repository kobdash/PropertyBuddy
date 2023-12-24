// models/House.js

const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  numberOfRooms: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensures usernames are unique
  },
  // Add more fields as needed
});

const House = mongoose.model('House', houseSchema);

module.exports = House;
