import express from 'express';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import store from 'session-file-store';
import customRender from './utils/customRender';
import indexRouter from './router/indexRouter';
import apiRouter from './router/apiRouter';
import userRouter from './router/userRouter';

require('dotenv').config();

const app = express();
const { PORT } = process.env;
const FileStore = store(session);

const sessionConfig = {
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));

app.engine('jsx', customRender);
app.set('views', path.join(__dirname, 'components'));
app.set('view engine', 'jsx');

app.use((req, res, next) => {
  // console.log(res.locals);
  res.locals.user = req.session?.user;
  res.locals.path = req.originalUrl;
  next();
});

app.use('/', indexRouter);
app.use('/api/v1', apiRouter);
// app.use('/auth', userRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
