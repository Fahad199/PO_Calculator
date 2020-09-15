const joi = require('@hapi/joi');
const { validateRequest } = require('../middlewares/requestValidator');
const invoiceController = require('../Controllers/invoiceController');

const schema = {
  body: {
    invoice: joi.string().allow(null, '').required(),
  },
};

async function handler(req, res) {
  const { invoice } = req.body;
  await invoiceController.updateInvoice(invoice);
  res.status(201).json({ message: 'Invoice Updated' });
}

module.exports = [validateRequest(schema), handler];
