const joi = require('@hapi/joi');
const { validateRequest } = require('../middlewares/requestValidator');
const csvProject = require('../Controllers/csvProject');

const schema = {
  query: {
    productName: joi.string().required(),
  },
};

async function handler(req, res) {
  const { productName } = req.query;
  const response = await csvProject.getLikeProducts(productName);
  res.status(200).json(response);
}

module.exports = [validateRequest(schema), handler];
