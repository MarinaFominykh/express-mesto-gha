const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const InValidDataError = require('../errors/in-valid-data-err');
// const EmailDuplicateError = require('../errors/email-duplicate-err');
// const { hash } = require('bcrypt');

const JWT_SECRET_KEY = 'some-secret-key';
// Вариант с валидацией в самой функции создания:
// const createUser = (req, res, next) => {
//   const {
//     name, about, avatar, email, password,
//   } = req.body;
//   if (!email || !password) {
//     throw new InValidDataError('Переданы некорректные данные');
//   }
//   User.findOne({ email })
//     .then((user) => {
//       if (user) {
//         throw new EmailDuplicateError('Пользователь с таким e-mail уже существует');
//       }
//       bcrypt.hash(password, 10)
//         .then((hash) => {
//           User.create({
//             name, about, avatar, email, password: hash,
//           })
//             .then((newUser) => res.status(200).send({ data: newUser }));
//         });
//     })
//     .catch(next);
// };

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    throw new InValidDataError('Переданы некорректные данные');
  }
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then(() => {
          res.status(200).send({ message: 'Пользователь успешно создан' });
        })
        .catch((err) => {
          if (err.code === 11000) {
            const duplicateError = new Error('Пользователь с таким e-mail уже существует');
            duplicateError.statusCode = 409;
            next(duplicateError);
          // eslint-disable-next-line no-underscore-dangle
          } else if (err._message === 'user validation failed') {
            const validateError = new Error('Переданы некорректные данные');
            validateError.statusCode = 400;
            return next(validateError);
          }
          return next(err);
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY);
      res.status(200).send({ token });
    })
    .catch(next);
};

// const login = (req, res, next) => {
//   const { email, password } = req.body;
//   User.findOne({ email })
//     .then((user) => {
//       if (!user) {
//         throw new InValidDataError('Неправильные почта или пароль');
//       }
//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             throw new InValidDataError('Неправильные почта или пароль');
//           }
//           return user;
//         });
//     })
//     .then((newUser) => {
//       const token = jwt.sign({ _id: newUser._id }, JWT_SECRET_KEY);
//       res.status(200).send({ token });
//     })
//     .catch(next);
// };

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такой пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  if (!name || !about) {
    throw new InValidDataError('Переданы некорректные данные');
  }
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then(() => res.status(200).send({ message: 'Данные успешно обновлены' }))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  if (!avatar) {
    throw new InValidDataError('Переданы некорректные данныe');
  }
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findOne(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такой пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
  login,
  getCurrentUser,
};
