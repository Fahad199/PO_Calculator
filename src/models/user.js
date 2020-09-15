const { Model } = require('sequelize');
const sequelize = require('../helpers/connection');
const { userSchema } = require('../helpers/schemas');

class User extends Model {
  static login(data) {
    return this.findOne({
      attributes: ['name', 'username'],
      where: {
        username: data.username,
        password: data.password,
      },
    });
  }
}

User.init(userSchema, {
  sequelize,
  timestamps: false,
  modelName: 'users',
});

module.exports = User;
