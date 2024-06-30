const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit-payment', (req, res) => {
    const { email } = req.body;

    // Simulate payment confirmation
    const paymentConfirmed = true;

    if (paymentConfirmed) {
        sendMeetingLink(email);
        res.json({ success: true });
    } else {
        res.json({ success: false });
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
