const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likecard,
  disLikecard,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:id', deleteCard);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);
router.put('/:id/likes', likecard);
router.delete('/:id/likes', disLikecard);

module.exports = router;
