const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'ElasticEmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_SERVICE_API_KEY,
  },
});

exports.sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};
