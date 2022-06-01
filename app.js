const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login, getCurrentUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.get('/users/me', getCurrentUser);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемая страница не найдена' });
});

app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
