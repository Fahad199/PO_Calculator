const { Sequelize } = require('sequelize');
const {
  config: {
    host, user, dialect, database, password,
  },
} = require('../constants');

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect,
});

module.exports = sequelize;
