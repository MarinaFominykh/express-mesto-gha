const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  if (!name || !link) {
    res.status(400).send({ message: 'Наименование или ссылка некорректны' });
    return;
  }
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Данные не найдены' });
        return;
      }
      res.send({ data: card });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};