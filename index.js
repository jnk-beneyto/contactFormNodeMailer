require('dotenv').config();
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');


app.use(express.urlencoded({
    extended: true
}));


// routes

app.get('/', (request, response) => response.sendFile(`${__dirname}/index.html`));

app.post('/handler', (request, response) => {
    const formData = request.body;
    console.log(`Name is: ${formData.nombre} , email: ${formData.email} and the message: ${formData.mensaje}`);

    // Setting sender data 

    let trans = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MYEMAIL,
            pass: process.env.MYPASSWORD
        }
    });

    // Setting data with data got from ContactForm

    let mailData = {
        from: process.env.MYEMAIL,
        to: "juankete78@gmail.com",
        subject: formData.nombre,
        text: `Client email: ${formData.email} / message: ${formData.mensaje}`
    };

    // Sending the email data

    trans.sendMail(mailData, (err, data) => {
        if (err) {
            let errorEmail = "there is an error";
            console.log("there is an error");
            response.json(errorEmail);
        }
        let okEmail = "Email sent successfully";
        console.log("Email sent successfully");
        response.json(okEmail);
    });
});

//server

app.listen(3000, () => console.info('Application running on port 3000'));