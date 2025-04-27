require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const requestLogger = require('./src/middlewares/logger/requestLogger');
const errorLogger = require('./src/middlewares/logger/errorLogger');
const errorHandler = require('./src/middlewares/errorHandler');
const cors = require('cors');
const database = require('./src/config/db');
const router = require('./src/routes/route_default');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
//app.set('trust proxy', true);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 
  }
}));
app.use('/', router);
app.use(errorLogger);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});