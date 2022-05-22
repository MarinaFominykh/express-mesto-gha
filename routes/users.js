const router = require('express').Router();

const { createUser, getUsers, getUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
module.exports = router;
