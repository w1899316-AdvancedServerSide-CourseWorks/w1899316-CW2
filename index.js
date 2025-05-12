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
const userRouter = require('./src/routes/user_route');
const blogRouter = require('./src/routes/blogPost_route');
const followRouter = require('./src/routes/follow_route');
const reactionRouter = require('./src/routes/reaction_route');
const path    = require('path');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
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
app.use(
  '/uploads',
  express.static(path.resolve(__dirname, 'uploads'))
);
app.use('/', router);
app.use('/travel-tales/api/user', userRouter);
app.use('/travel-tales/api/post', blogRouter);
app.use('/travel-tales/api/follow', followRouter);
app.use('/travel-tales/api/reaction', reactionRouter)
app.use(errorLogger);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});