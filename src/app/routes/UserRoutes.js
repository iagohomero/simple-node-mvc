const UserController = require('../controllers/UserController');
const BaseController = require('../controllers/BaseController');
const userController = new UserController();
const User = require('../models/User');

module.exports = (app) => {
    const userRoutes = UserController.routes();
    app.use(userRoutes.authenticated, (req, resp, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            resp.redirect(BaseController.routes().login);
        }
    });
    app.get(userRoutes.index, userController.index());    
    app.get(userRoutes.new, userController.new());
    app.post(userRoutes.create, User.validations(), userController.create());
    app.put(userRoutes.edit, userController.edit());
    app.get(userRoutes.update, userController.update());
    app.delete(userRoutes.delete, userController.delete());
}
