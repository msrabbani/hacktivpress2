const Contr = require('../controllers/articles')
const Author = require('./helpers/authorisation')
var express = require('express');
var router = express.Router();


router.get('/', Author.authUser, Contr.getAllArticle)
router.post('/', Author.authUser, Contr.createArticle)
router.get('/:id', Contr.getSingleArticle)
// router.get('/:author', Contr.getByAuthor)
// router.get('/:category', Contr.getByCategory)
router.delete('/:id', Author.authUser, Contr.deleteArticle)
router.put('/:id', Author.authUser, Contr.updateArticle)

module.exports = router;
