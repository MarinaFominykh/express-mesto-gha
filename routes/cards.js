const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likecard,
  disLikecard,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:id', deleteCard);
router.post('/', createCard);
router.put('/:id/likes', likecard);
router.delete('/:id/likes', disLikecard);

module.exports = router;
