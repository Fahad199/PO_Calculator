/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
/* eslint-disable max-len */
const csvProject = require('../models/csvProject');
const Invoice = require('./invoiceController');
const { NotFoundError } = require('../middlewares/errorHandler');

class CSVProjectController {
  static async updateBulkProduct(data) {
    if (data == null || data === undefined) {
      return { message: 'Product data is required' };
    }
    const parsedProducts = JSON.parse(data);
    const productUpdate = await csvProject.updateBulkProduct(parsedProducts);
    if (productUpdate <= 0) {
      return NotFoundError('Failed to update the products');
    }
    const invoices = await Invoice.getInvoice();
    if (invoices == null || invoices === undefined) {
      return { message: 'Products updated successfully' };
    }
    let stage1Cpp = 0;
    let stage1Cost = 0;
    const parsedInvoices = JSON.parse(invoices.Invoice);
    const newArr = [];
    parsedInvoices.map((iterator, x) => {
      iterator.totalCost = 0;
      iterator.finalCostPO = 0;
      if (typeof iterator.premises === 'undefined') {
        for (let i = 0; i <= (parsedProducts.length) - 1; i++) {
          if (iterator.invoice.length > 0) {
            for (let j = 0; j <= (iterator.invoice.length) - 1; j++) {
              // validating outside supplier
              if (parsedProducts[i].name == iterator.invoice[j].productName && parsedProducts[i].supplier == iterator.invoice[j].selectedSuplier.name) {
                console.log('## OUTSIDE MATCHED');
                const newCost = iterator.invoice[j].quantity * parsedProducts[i].rate;
                iterator.invoice[j].rate = parsedProducts[i].rate;
                iterator.invoice[j].cost = newCost;
                iterator.totalCost += newCost;
                // Validating Uplift case
                if (iterator.invoice[j].upliftItem.upliftPercentage > 0) {
                  console.log('Uplift exist and applied as well');
                  iterator.invoice[j].upliftItem.rate = (iterator.invoice[j].upliftItem.upliftPercentage / 100) * parsedProducts[i].rate;
                  const upliftNewCost = iterator.invoice[j].upliftItem.quantity * iterator.invoice[j].upliftItem.rate;
                  iterator.invoice[j].upliftItem.cost = upliftNewCost;
                  iterator.totalCost += upliftNewCost;
                } else {
                  console.log('Uplift is not exist');
                }
              }
              if (iterator.invoice[j].material.productName != undefined) {
                if (parsedProducts[i].name == iterator.invoice[j].material.productName && parsedProducts[i].supplier == iterator.invoice[j].material.selectedSuplier.name) {
                  console.log('## MATERIAL EXIST AND MATCHED AS WELL');
                  const materialNewCost = iterator.invoice[j].material.quantity * parsedProducts[i].rate;
                  iterator.invoice[j].material.rate = parsedProducts[i].rate;
                  iterator.invoice[j].material.cost = materialNewCost;
                  iterator.totalCost += materialNewCost;
                }
              }
              // finally calculate CPPP
              if (parsedInvoices[4] != undefined) {
                if (x == 1) {
                  iterator.cppp = (iterator.totalCost) / (parsedInvoices[4].premises);
                  stage1Cpp = iterator.cppp;
                  stage1Cost = iterator.totalCost;
                } else if (x == 2) {
                  iterator.cppp = (iterator.totalCost) / (parsedInvoices[4].premises);
                  iterator.cppp += stage1Cpp;
                  iterator.finalCostPO = stage1Cost + iterator.totalCost;
                } else {
                  iterator.cppp = (iterator.totalCost) / (parsedInvoices[4].premises);
                }
              }
              // validating available-supplier
              if (iterator.invoice[j].availableSupplier.length > 0) {
                for (let k = 0; k <= (iterator.invoice[j].availableSupplier.length) - 1; k++) {
                  if (parsedProducts[i].name == iterator.invoice[j].productName && parsedProducts[i].supplier == iterator.invoice[j].availableSupplier[k].name) {
                    iterator.invoice[j].availableSupplier[k].rate = parsedProducts[i].rate;
                  }
                }
              }
            }
          }
        }
        newArr.push(iterator);
      }
    });
    newArr.push({ premises: parsedInvoices[4].premises });

    const invoiceUpdate = await Invoice.updateInvoice(JSON.stringify(newArr));
    if (invoiceUpdate <= 0) {
      const message = 'Failed to update the products and invoices';
      return { message };
    }
    return { message: 'Products and Invoices updated successfully' };
  }

  static async getLikeProducts(name) {
    const types = await this.getAllTypes();
    const categories = await this.getAllCategories();
    const suppliers = await this.getAllSuppliers();
    const result = await csvProject.getLikeProducts(name);

    if (result.length <= 0) {
      NotFoundError('Products not found');
    }

    return result.map((data, i) => {
      const row = {
        id: i + 1,
        name: data.dataValues.Product,
      };
      return row;
    });
  }

  static async getAllSuppliers() {
    const result = await csvProject.getAllSuppliers();

    if (result.length <= 0) {
      NotFoundError('Suppliers not found');
    }

    return result.map((data, i) => ({
      name: data.dataValues.Supplier,
      id: data.id = i + 1,
    }));
  }

  static async getAllCategories() {
    const result = await csvProject.getAllCategories();

    if (result.length <= 0) {
      NotFoundError('Categories not found');
    }

    return result.map((data, i) => ({
      name: data.dataValues.Category,
      id: data.id = i + 1,
    }));
  }

  static async getAllTypes() {
    const categories = await this.getAllCategories();
    const result = await csvProject.getAllTypes();

    if (result.length <= 0) {
      NotFoundError('Types not found');
    }

    return result.map((data, i) => ({
      name: data.dataValues.Type,
      catId: categories.find((category) => category.name === data.dataValues.Category).id,
      id: data.id = i + 1,
    }));
  }

  static async getAllProducts() {
    const types = await this.getAllTypes();
    const categories = await this.getAllCategories();
    const suppliers = await this.getAllSuppliers();
    const result = await csvProject.getAllProducts();

    if (result.length <= 0) {
      NotFoundError('Products not found');
    }

    return result.map((data, i) => {
      const row = {
        id: i + 1,
        supplierId: suppliers.find((supplier) => supplier.name === data.dataValues.Supplier).id,
        name: data.dataValues.Product,
        rate: data.dataValues.Rate,
        catId: categories.find((category) => category.name === data.dataValues.Category).id,
        typeId: types.find((type) => type.name === data.dataValues.Type).id,
        matReq: data.dataValues.Mat_Req,
        matIncl: data.dataValues.Mat_Incl,
        unit: data.dataValues.Unit,
        uplift: data.dataValues.Uplift,
      };
      return row;
    });
  }

  static async getProductsBySupplier(supplierId) {
    const suppliers = await this.getAllSuppliers();
    const mappedSupplier = suppliers.find((iterator) => iterator.id == supplierId);
    if (mappedSupplier != undefined) {
      const result = await csvProject.getProductsBySupplier(mappedSupplier.name);
      if (result.length <= 0) {
        NotFoundError(`Product for ${supplier} is not found`);
      }

      return result.map((data, i) => ({
        supplier: data.dataValues.Supplier,
        name: data.dataValues.Product,
        rate: data.dataValues.Rate,
        id: data.id = i + 1,
      }));
    }
    return { message: 'Product for is not found or Supplier Id is not valid' };
  }
}

module.exports = CSVProjectController;
