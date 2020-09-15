const invoiceController = require('../Controllers/invoiceController');

async function handler(req, res) {
  const response = await invoiceController.compareInvoices();
  res.status(200).json(response);
}

module.exports = [handler];
