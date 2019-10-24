
const express = require('express');
const app = express();

app.use(express.urlencoded({extended:true}));

// routes

app.get('/', (request, response) =>  response.sendFile(`${__dirname}/index.html`));

app.post('/handler', (request, response) => {
  const formData = request.body;  
  console.log( `Name is: ${formData.nombre} , email: ${formData.email} and the message: ${formData.mensaje}`
  );  
  response.json(formData);
});

//server

app.listen(3000, () => console.info('Application running on port 3000'));