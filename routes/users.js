const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUser);
router.get('/me', getCurrentUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
