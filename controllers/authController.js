const Kryptonian = require('../models/Kryptonian');
const { generateOTP } = require('../utils/otpGenerator');
const emailService = require('../services/emailService');
const redisClient = require('../redisClient'); // Initialize and connect to Redis

exports.register = async (req, res) => {
  try {
    const { email } = req.body;
    const kryptonian = new Kryptonian({ email });
    await kryptonian.save();

    res.status(201).send('Kryptonian registered. Check your email for the confirmation.');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email } = req.body;
    const kryptonian = await Kryptonian.findOne({ email });
    if (!kryptonian) {
      return res.status(404).send('Kryptonian not found.');
    }

    const otp = generateOTP();
    await redisClient.setex(email, 300, otp); // OTP expires in 5 minutes
    await emailService.sendOTP(email, otp);

    res.status(200).send('OTP sent to your email.');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const storedOTP = await redisClient.get(email);

    if (storedOTP === otp) {
      const token = uuidv4();
      res.status(200).json({ token });
    } else {
      res.status(400).send('Invalid OTP.');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
