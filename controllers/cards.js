const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/un-authorized-err');
const InValidDataError = require('../errors/in-valid-data-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
  // .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  if (!name || !link) {
    throw InValidDataError('Переданы некорректные данные карточки');
  }
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const deleteCard = (req, res, next) => {
  const owner = req.user;
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      return card.id;
    })
    .then((cardId) => {
      if (cardId !== owner) {
        throw new ForbiddenError('Вы не можете удалять чужие карточки');
      }
      Card.findByIdAndRemove(req.params.id);
    })
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        res.status(400).send({ message: 'Переданы некорректные данные карточки' });
        return;
      }
      next(error);
    });
};

const likecard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const disLikecard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likecard,
  disLikecard,
};
