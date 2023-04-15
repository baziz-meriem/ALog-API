const express= require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const createError = require('http-errors');
const fs = require('fs');
const path= require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');
require('dotenv').config();


const app = express();

// Middlewares
app.use(morgan('combined',{stream:fs.createWriteStream(path.join(__dirname, 'logger/access.log'), { flags: 'a' })}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: '*'
}));

app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));



// Routes
app.get('/api/v1', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Hello World'
    });
});
app.use('/api/v1', require('./api/v1/routes'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});


// if the route is not found
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});


// Starting the server
const port= process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server on port ${port}` ) ;
}
);

module.exports = app;