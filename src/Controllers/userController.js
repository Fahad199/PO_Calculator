const User = require('../models/user');
const { NotFoundError } = require('../middlewares/errorHandler');

class UserController {
  static async userLogin(req, res, data) {
    const result = await User.login(data);

    if (!result) {
      NotFoundError('Incorrect Username and/or Password!', res);
    } else {
      req.session.loggedin = true;
      req.session.name = result.dataValues.name;
    }

    return {
      status: true,
      data: {
        name: result.dataValues.name,
        username: result.dataValues.username,
      },
    };
  }
}

module.exports = UserController;
