const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const kryptonianSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  apiKey: { type: String, default: uuidv4 },
});

module.exports = mongoose.model('Kryptonian', kryptonianSchema);


