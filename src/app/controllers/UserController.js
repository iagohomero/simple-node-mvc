const { validationResult } = require('express-validator/check');
const UserDao = require('../infra/user-dao')
const db = require('../../config/database');
const templates = require('../views/templates');

class UserController{
    
    static routes(){
        return {
            authenticated: '/users*',
            index: '/users',
            new: '/users/form',
            create: '/users',
            edit: '/users',
            update: '/users/form/:id',
            delete: '/users/:id',
        }
    }

    index(){
        return function(req, resp) {
            const userDao = new UserDao(db);
            userDao.list()
                .then(users => resp.marko(
                    templates.users.list,
                    {
                        users
                    }
                ))
                .catch(error => console.log(error))
        };
    }

    new(){
        return function(req, resp) {
            resp.marko(templates.users.form,{ user: {}})
        };
    }

    create(){
        return function(req, resp) {
            const userDao = new UserDao(db);
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return resp.marko(
                    templates.users.form,
                    {
                        user: req.body,
                        validationErrors: errors.array()
                    }
                );
            }
            userDao.create(req.body)
                .then(
                    resp.redirect(UserController.routes().index)
                )
                .catch(error => console.log(error));
        };
    }

    edit(){
        return function(req, resp) {
            const userDao = new UserDao(db);
            userDao.update(req.body)
                .then(
                    resp.redirect(UserController.routes().index)
                )
                .catch(error => console.log(error));
        };
    }

    update(){
        return function(req, resp) {
            const id = req.params.id;
            const userDao = new UserDao(db);
        
            userDao.findById(id)
                .then(user => 
                    resp.marko(
                        templates.users.form,
                        { user }
                    )
                )
                .catch(error => console.log(error));
        };
    }

    delete(){
        return function(req, resp){
            const id = req.params.id;
            const userDao = new UserDao(db);
            userDao.delete(id)
                    .then(() => resp.status(200).end())
                    .catch(error => console.log(error));
        };
    }
}

module.exports = UserController;