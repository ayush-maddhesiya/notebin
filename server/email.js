require('dotenv').config();
const nodemailer = require('nodemailer');

const testEmailSending = async () => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.PASS}`
    }
  });

  const mailOptions = {
    to: 'ayush274405@gmail.com', // Replace with your email for testing
    from: `${process.env.EMAIL}`,
    subject: 'Test Email',
    text: 'This is a test email to verify the email sending functionality.'
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

testEmailSending();
