const Contr = require('../controllers/articles')
const author = require('../helpers/authorisation')
var express = require('express');
var router = express.Router();

router.get('/', author.authUser, Contr.getAllArticle)
router.post('/', author.authUser ,Contr.createArticle)
router.get('/:id', author.authUser, Contr.getSingleArticle)
// router.get('/:author', Contr.getByAuthor)
// router.get('/:category', Contr.getByCategory)
router.delete('/:id', author.authUser, Contr.deleteArticle)
router.put('/:id', author.authUser, Contr.updateArticle)

module.exports = router;
