const Router = require('koa-router');
const Users = require('../controllers/users-controller');
const {isAdmin, isValidId} = require('../utils/middlewares');

const router = new Router();

router.get('/', Users.get)
router.get('/:id', isValidId,  Users.getUser)
router.post('/',  Users.create)
router.delete('/:id',isAdmin, isValidId, Users.delete);
router.put('/:id', isValidId, Users.update)

module.exports = router.routes(); 