const User = require('../models/user');

const createUser = (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk.toString();
  });
  req.on('end', () => {
    const { name, about, avatar } = JSON.parse(data);
    if (!name || !about || !avatar) {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }
    User.create({ name, about, avatar })
      .then((user) => res.send({ data: user }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  });
  // const { name, about, avatar } = req.body;
  // console.log('req.body', name, about, avatar);
  // const { name, about, avatar } = req.body;
  // console.log(name, about, avatar);
  // if (!name || !about || !avatar) {
  //   res.status(400).send({ message: 'Данные некорректны либо отсутствуют' });
  //   return;
  // }
  // User.create({ name, about, avatar })
  //   .then((user) => res.send({ data: user }))
  //   .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  if (!name || !about) {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  }
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  if (!avatar) {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  }
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
};
