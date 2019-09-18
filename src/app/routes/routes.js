const userRoutes = require('./UserRoutes');
const baseRoutes = require('./BaseRoutes');

module.exports = (app) => {
    userRoutes(app);
    baseRoutes(app);
}
