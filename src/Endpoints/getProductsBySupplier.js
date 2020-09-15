const joi = require('@hapi/joi');
const csvController = require('../Controllers/csvProject');
const { validateRequest } = require('../middlewares/requestValidator');

const schema = {
  query: {
    supplierId: joi.string().required(),
  },
};

async function handler(req, res) {
  const response = await csvController.getProductsBySupplier(req.query.supplierId);
  res.status(200).json(response);
}

module.exports = [validateRequest(schema), handler];
