const Router = require('koa-router');
const News = require('../controllers/news-controller');
const {isAuthenticate, isAdmin , isValidId} = require('../utils/middlewares');

const router = new Router();

router.get('/', News.get)
router.get('/:id', isValidId, News.getNews)
router.post('/', isAuthenticate, isAdmin, News.create)
router.delete('/:id', isAuthenticate, isAdmin, isValidId,  News.delete);
router.put('/:id', isAuthenticate, isValidId, News.update)
router.post('/commentary/:id', isAuthenticate, isValidId, News.addCommentary)

module.exports = router.routes(); 