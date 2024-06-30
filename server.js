const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Dummy database to store confirmed payments (in real-world applications, use a proper database)
const confirmedPayments = {};

// Function to simulate payment confirmation for a given mobile number
const confirmPayment = (mobile) => {
    if (!confirmedPayments[mobile]) {
        confirmedPayments[mobile] = 1;
    } else {
        confirmedPayments[mobile]++;
    }
};

app.post('/submit-payment', (req, res) => {
    const { email, mobile } = req.body;

    // Simulate confirming the payment
    confirmPayment(mobile);

    // Check if payment has been made 100 times for the given mobile number
    if (confirmedPayments[mobile] >= 100) {
        sendMeetingLink(email);
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Payment not confirmed or not enough payments made.' });
    }
});

const sendMeetingLink = (email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'SQL Class Meeting Invitation',
        text: 'Thank you for your payment. Please join the SQL class using the following link: https://meet.google.com/zwt-wcvs-vsd'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ', error);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
};

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
