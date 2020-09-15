/* eslint-disable max-len */
const Invoice = require('../models/invoice');
const { NotFoundError, ValidationError } = require('../middlewares/errorHandler');
const { vendors, approvals } = require('../constants');

class InvoiceController {
  static async getInvoice() {
    const result = await Invoice.getInvoice();

    if (!result) {
      throw new NotFoundError('Invoice not found');
    }

    return result.dataValues;
  }

  static async updateInvoice(invoice) {
    const result = await Invoice.updateInvoice(invoice);

    if (!result) {
      ValidationError('Failed to update the Invoice');
    }

    return result;
  }

  // static async compareInvoices() {
  //   let jointArray = [];
  //   const invoiceData = await Invoice.getInvoice();
  //   const parsedInvoices = JSON.parse(invoiceData.dataValues.Invoice);
  //   const firstInvoice = parsedInvoices[1];
  //   const secondInvoice = parsedInvoices[2];

  //   const mapFirstInvoice = firstInvoice.invoice.map((product) => {
  //     if (!product.material) {
  //       console.log('PD', product);
  //       return {
  //         productName: product.material.productName,
  //         quantity: product.material.quantity,
  //         supplier: product.material.selectedSuplier.name,
  //       }
  //     }
  //     if (!product.upliftItem) {
  //       if (product.upliftItem.upliftPercentage > 0) {
  //         return {
  //           productName: product.upliftItem.productName,
  //           quantity: product.upliftItem.quantity,
  //           supplier: product.upliftItem.selectedSuplier.name,
  //         }
  //       }
  //     } else {
  //       return {
  //         productName: product.productName,
  //         quantity: product.quantity,
  //         supplier: product.selectedSuplier.name,
  //       }
  //     }
  //   });

  //   const mapSecondInvoice = secondInvoice.invoice.map((product) => {
  //     if (!product.material) {
  //       return {
  //         productName: product.material.productName,
  //         quantity: product.material.quantity,
  //         supplier: product.material.selectedSuplier.name,
  //       }
  //     }
  //     if (!product.upliftItem) {
  //       if (product.upliftItem.upliftPercentage > 0) {
  //         return {
  //           productName: product.upliftItem.productName,
  //           uantity: product.upliftItem.quantity,
  //           supplier: product.upliftItem.selectedSuplier.name,
  //         }
  //       }
  //     } else {
  //       return {
  //         productName: product.productName,
  //         quantity: product.quantity,
  //         supplier: product.selectedSuplier.name,
  //       }
  //     }
  //   });

  //   let jointInvoices = mapFirstInvoice.concat(mapSecondInvoice);
  //   jointInvoices = jointInvoices.filter((item, index) => {
  //     return (jointInvoices.indexOf(item) == index)
  //   })
  //   // console.log('JOINT INVOICES', jointInvoices);

  //   // const mergedTwoInvoices = mapFirstInvoice.map((firstInvoice) => mapSecondInvoice.map((secondInvoice) => {
  //   //   if (firstInvoice.productName == secondInvoice.productName && firstInvoice.supplier == secondInvoice.supplier) {
  //   //     jointArray = [...jointArray, ...firstInvoice];
  //   //     console.log('A', mergedArr);
  //   //   }
  //   //   console.log('ABC', firstInvoice.productName, secondInvoice.productName, firstInvoice.supplier, secondInvoice.supplier);
  //   //   if ((firstInvoice.productName == secondInvoice.productName && firstInvoice.supplier != secondInvoice.supplier) ||
  //   //     (firstInvoice.productName != secondInvoice.productName && firstInvoice.supplier != secondInvoice.supplier) ||
  //   //     (firstInvoice.productName != secondInvoice.productName && firstInvoice.supplier == secondInvoice.supplier)) {
  //   //     jointArray = [...jointArray, ...firstInvoice, ...secondInvoice];

  //   //     console.log('B', mergedArr);
  //   //   }
  //   // }))

  //   console.log('first', mapFirstInvoice);
  //   console.log('second', mapSecondInvoice);
  //   // console.log('MERGED TWO INVOICES', mergedTwoInvoices);
  //   return jointInvoices;
  // }

  static async invoiceApproval({ approval, vendor }) {
    const invoice = await Invoice.getInvoice();
    const parsedInvoice = JSON.parse(invoice.dataValues.Invoice);

    if (vendor === vendors.FINANCE && parsedInvoice[1].approval.financeApproval === false && parsedInvoice[1].approval.financeRejection === false) {
      if (approval === approvals.APPROVE && vendor === vendors.FINANCE) {
        parsedInvoice[1].approval.financeApproval = new Date();
        parsedInvoice[1].approval.financeRejection = false;
        await Invoice.updateInvoice(JSON.stringify(parsedInvoice));
        return {
          message: 'Finance Approved',
        };
      }

      if (approval === approvals.REJECT && vendor === vendors.FINANCE) {
        parsedInvoice[1].approval.financeRejection = new Date();
        parsedInvoice[1].approval.financeApproval = false;
        await Invoice.updateInvoice(JSON.stringify(parsedInvoice));
        return {
          message: 'Finance Rejected',
        };
      }
    }
    if (vendor === vendors.DIRECTOR && parsedInvoice[1].approval.directorApproval === false && parsedInvoice[1].approval.directorRejection === false) {
      if (approval === approvals.APPROVE && vendor === vendors.DIRECTOR) {
        parsedInvoice[1].approval.directorApproval = new Date();
        parsedInvoice[1].approval.directorRejection = false;
        await Invoice.updateInvoice(JSON.stringify(parsedInvoice));
        return {
          message: 'Director Approved',
        };
      }

      if (approval === approvals.REJECT && vendor === vendors.DIRECTOR) {
        parsedInvoice[1].approval.directorRejection = new Date();
        parsedInvoice[1].approval.directorApproval = false;
        await Invoice.updateInvoice(JSON.stringify(parsedInvoice));
        return {
          message: 'Director Rejected',
        };
      }
      return {
        message: 'Incorrect Verification',
      };
    }
    return {
      message: 'Already Done',
    };
  }
}

module.exports = InvoiceController;
