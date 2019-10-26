require('dotenv').config();
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');


app.use(express.urlencoded({
    extended: true
}));

//setting engine

app.set('views', (__dirname + '/views'));
app.set('view engine', 'ejs');

// routes

app.get('/', (request, response) => response.status(200).render('index'));

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
        to: "jnk.beneyto@gmail.com",
        subject: formData.nombre,
        text: `Client email: ${formData.email} / message: ${formData.mensaje}`
    };

    // Sending the email data

    trans.sendMail(mailData, (err, data) => {
        if (err) {
            let msg = {
                msg: 'error'
            };
            response.status(500).render('index', {
                msg
            });
        }
        console.log("Email sent successfully");
        let msg = {
            msg: 'email sent successfully'
        };
        response.status(200).render('index', {
            msg
        });
    });
});

//server

app.listen(4000, () => console.info('Application running on port 4000'));