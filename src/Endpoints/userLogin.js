const joi = require('@hapi/joi');
const { validateRequest } = require('../middlewares/requestValidator');
const userController = require('../Controllers/userController');

const schema = {
  body: {
    username: joi.string().required(),
    password: joi.string().required(),
  },
};

async function handler(req, res) {
  const { username, password } = req.body;
  res.status(200).json(await userController.userLogin(req, res, {
    username,
    password,
  }));
}

module.exports = [validateRequest(schema), handler];
