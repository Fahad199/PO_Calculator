const csvController = require('../Controllers/csvProject');

async function handler(req, res) {
  const response = await csvController.getAllProducts();
  res.status(200).json(response);
}

module.exports = [handler];
