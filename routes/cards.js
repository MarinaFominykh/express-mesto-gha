const router = require('express').Router();
const { createCard, getCards, deleteCard } = require('../controllers/cards');

router.get('/cards', getCards);

router.delete('/cards/:id', deleteCard);

router.post('cards', createCard);

module.exports = router;
