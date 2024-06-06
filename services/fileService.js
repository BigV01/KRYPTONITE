const File = require('../models/File');
const base64Img = require('base64-img');

exports.uploadFile = async (req, res) => {
  try {
    const { apiKey } = req.headers;
    const { imageData } = req.body;

    const kryptonian = await Kryptonian.findOne({ apiKey });
    if (!kryptonian) {
      return res.status(403).send('Invalid API key.');
    }

    const base64Data = base64Img.base64Sync(imageData);

    const file = new File({
      owner: kryptonian._id,
      base64Data,
    });

    await file.save();
    res.status(201).send('File uploaded successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).send('File not found.');
    }
    res.status(200).json(file);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
