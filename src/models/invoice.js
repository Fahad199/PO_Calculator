const { Model } = require('sequelize');
const sequelize = require('../helpers/connection');
const { invoiceSchema } = require('../helpers/schemas');

class Invoice extends Model {
  static getInvoice() {
    return this.findOne({
      attributes: ['Invoice'],
      where: {
        Id: 0,
      },
    });
  }

  static updateInvoice(invoice) {
    return this.update({ Invoice: invoice }, {
      where: {
        Id: 0,
      },
    });
  }
}

Invoice.init(invoiceSchema, {
  sequelize,
  timestamps: false,
  modelName: 'invoices',
});

module.exports = Invoice;
