const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.use((req, res, next) => {
  req.user = {
    _id: '',
  };

  next();
});

app.use('/users', userRouter);
app.use('/', cardRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
