const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (your HTML, CSS, JS)
app.use(express.static(__dirname));

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'info.sonnephotography@gmail.com',
        pass: 'ovfyxbfedlhgnvzo'
    }
});

// Handle form submission
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'info.sonnephotography@gmail.com',
        subject: `New Contact Form Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});