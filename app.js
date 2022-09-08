const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');
const router = require('./routes');
const { InternalServerError } = require('./errors/InternalServerError');
const { login, createUser } = require('./controllers/users');
const { validateSigUp, validateSigIn } = require('./validation/validation');

const app = express();
const { PORT = 3000 } = process.env;

app.use(cookieParser());
app.use(express.json());
app.post('/signin', validateSigIn, login);
app.post('/signup', validateSigUp, createUser);
app.use(auth);// все роуты ниже этой строки будут защищены авторизацией
app.use(router);
app.use(errors());
app.use(InternalServerError);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT);
