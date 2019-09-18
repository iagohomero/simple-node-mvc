const { check, validationResult } = require('express-validator/check');

class User{
    static validations(){
        return [
            check('email').isEmail(),
            check('name').isLength({ min: 1}),
            check('password').isLength({ min: 5 }),
        ];
    }
}

module.exports = User;