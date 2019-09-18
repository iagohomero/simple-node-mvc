class UserDao{

    constructor(db){
        this._db = db;
    }

    list(){
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM users',
                (error, result) => {
                    if (error) return reject('Error!');
                    return resolve(result);
                }
            );
        })
    }

    create(user){
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO users (
                    name, email, password
                ) VALUES (?, ?, ?)  
                `,
                [
                    user.name,
                    user.email,
                    user.password
                ],
                (error) => {
                    if(error){
                        console.log(error);
                        return reject('Error!')
                    }
                    resolve();
                }
            )
        })
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM users
                    WHERE id = ?
                `,
                [id],
                (error, user) => {
                    if (error) {
                        return reject('Not Found!');
                    }
                    return resolve(user);
                }
            );
        });
    }
    
    findByEmail(email) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM users
                    WHERE email = ?
                `,
                [email],
                (error, user) => {
                    if (error) {
                        return reject('Not Found!');
                    }
                    return resolve(user);
                }
            );
        });
    }

    update(user) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE users SET
                name = ?,
                email = ?,
                password = ?
                WHERE id = ?
            `,
            [
                user.name,
                user.email,
                user.password,
                user.id
            ],
            erro => {
                if (erro) {
                    return reject('Error!');
                }

                resolve();
            });
        });
    }

    delete(id) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    DELETE 
                    FROM users
                    WHERE id = ?
                `,
                [id],
                (error) => {
                    if (error) {
                        return reject('Error!');
                    }
                    return resolve();
                }
            );
        });
    }
}

module.exports = UserDao;