const UserController = require('../controllers/UserController');
const templates = require('../views/templates');

class BaseController{
    static routes(){
        return {
            index: '/',
            login: '/login'
        }
    }

    index(){
        return (req, resp) => {
            resp.marko(
                templates.base.home
            );
        };
    }

    loginIndex(){
        return (req, resp) => {
            resp.marko(
                templates.base.login
            );
        };
    }

    login(){
        return (req, resp, next) => {
            const passport = req.passport;
            passport.authenticate('local', (error, user, info) => {
                if(info){
                    return resp.marko(templates.base.login);       
                }
                if(error){
                    return next(error);
                }
                req.login(user, (error) => {
                    if(error){
                        return next(error);
                    }
                    return resp.redirect(UserController.routes().index);
                });
            })(req, resp, next)
        }; 
    }
}

module.exports = BaseController;