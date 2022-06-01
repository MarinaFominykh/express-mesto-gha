const bcrypt = require('bcrypt');
const validator = require('validator');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },

  about: {
    type: String,
    default: 'исследователь океана',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(value) {
        const urlPattern = /(http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&amp;%#!\-/]))?/;
        const urlRegExp = new RegExp(urlPattern);
        return value.match(urlRegExp);
      },
      message: (props) => `${props.value} не является корректным URL`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(str) {
        return str && validator.isEmail(str);
      },
      message: (props) => `${props.value} не является корректным e-mail`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+ password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль, один'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль, два'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
