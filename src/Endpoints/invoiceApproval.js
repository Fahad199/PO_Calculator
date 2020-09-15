const joi = require('@hapi/joi');
const { validateRequest } = require('../middlewares/requestValidator');
const invoiceController = require('../Controllers/invoiceController');

const schema = {
  query: {
    approval: joi.string().required(),
    vendor: joi.string().required(),
  },
};

async function handler(req, res) {
  const { approval, vendor } = req.query;
  const response = await invoiceController.invoiceApproval({ approval, vendor });
  res.status(200).json(response);
}

module.exports = [validateRequest(schema), handler];
