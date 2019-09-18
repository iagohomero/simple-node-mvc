const sqlite3 = require('sqlite3').verbose();
const bd = new sqlite3.Database('data.db');

const USUARIOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name VARCHAR(40) NOT NULL UNIQUE, 
    email VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL
)
`;

const INSERIR_USUARIO_1 = 
`
INSERT INTO users (
    name, 
    email,
    password
) SELECT 'Iago Homero', 'iagohomero@gmail.com', '123' WHERE NOT EXISTS (SELECT * FROM users WHERE email = 'iagohomero@gmail.com')
`;


bd.serialize(() => {
    bd.run("PRAGMA foreign_keys=ON");
    bd.run(USUARIOS_SCHEMA);
    bd.run(INSERIR_USUARIO_1);
});

process.on('SIGINT', () =>
    bd.close(() => {
        process.exit(0);
    })
);

module.exports = bd;