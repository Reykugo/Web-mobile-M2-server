//instantiate api routes
let {isAuthenticate} = require("../utils/middlewares");

module.exports = (router) => {
    router.use('/authentication', require('./auth'))
    router.use('api/users',isAuthenticate, require('./user'));
    router.use('/api/news', require('./news'))
    router.get('api/test', (ctx) =>{console.log("test received");ctx.ok("api work")})
}