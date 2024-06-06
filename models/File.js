const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Kryptonian', required: true },
  base64Data: { type: String, required: true },
});

module.exports = mongoose.model('File', fileSchema);
