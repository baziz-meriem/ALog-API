const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const createError = require('http-errors');
const fs = require('fs');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const socketHandler = require('./api/v1/sockets');


require('dotenv').config();


const app = express();


// Middlewares
app.use(morgan('combined',{stream:fs.createWriteStream(path.join(__dirname, 'logger/access.log'), { flags: 'a' })}));

// Middleware function to check if the route contains 'webhooks' it neeeds raw data
const webhookMiddleware = (req, res, next) => {
  
  if (req.originalUrl.includes('webhooks')) {
    return express.raw({ type: '*/*' })(req, res, next);
  }
  return bodyParser.json()(req, res, next); // use body parser for the other routes
};
app.use(bodyParser.urlencoded({extended: true}));
// setup the view engine ejs and views folder path in order to test socket.io
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/api/v1/views'));

app.use(cors({
  origin: '*'
}));

// Routes
app.get('/api/v1', (req, res) => {
  res.render('index.ejs',{})
});
app.use('/api/v1',webhookMiddleware, require('./api/v1/routes'));

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

//whsec_769b58bcad36d9892c57272e2ff0f954fcce096f7b77c889ac0dabc38cde4a9d
const server = http.createServer(app);
// call socket.io
const socket = socketIO(server, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true
  }
});
// call socket handler
socketHandler(socket);
// Starting the server
const port= process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server on port ${port}` ) ;

}
);
module.exports = server;