const invoiceController = require('../Controllers/invoiceController');

async function handler(req, res) {
  const response = await invoiceController.getInvoice();
  res.status(200).json(response);
}

module.exports = [handler];
