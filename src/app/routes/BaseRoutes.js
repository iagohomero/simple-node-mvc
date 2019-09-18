const BaseController = require('../controllers/BaseController');
const baseController = new BaseController(); 
 
module.exports = (app) => {
    const baseRoutes = BaseController.routes();
    app.route(baseRoutes.login)
        .get(baseController.loginIndex())
        .post(baseController.login());
    app.get(baseRoutes.index, baseController.index());
}
