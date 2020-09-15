const { Model, Op } = require('sequelize');
const sequelize = require('../helpers/connection');
const { csvProjectSchema } = require('../helpers/schemas');
const operatorsAliases = {
  $like: Op.like,
}

class CSVProject extends Model {
  static getLikeProducts(name) {
    return this.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('Product')), 'Product']],
      where: {
        Product: {
          [Op.like]: `${name}%`
        }
      }
    })
  }

  static getAllSuppliers() {
    return this.findAll({
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.col('Supplier')), 'Supplier'],
      ],
    });
  }

  static getAllCategories() {
    return this.findAll({
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.col('Category')), 'Category'],
      ],
    });
  }

  static getAllTypes() {
    return this.findAll({
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.col('Type')), 'Type'],
        'Category',
      ],
    });
  }

  static getAllProducts() {
    return this.findAll({
      attributes: ['Product', 'Rate', 'Mat_Req', 'Mat_Incl', 'Unit', 'Uplift', 'Type', 'Category', 'Supplier'],
    });
  }

  static getProductsBySupplier(supplier) {
    return this.findAll({
      attributes: ['Product', 'Rate', 'Mat_Req', 'Mat_Incl', 'Unit', 'Uplift', 'Type', 'Category', 'Supplier'],
      where: {
        Supplier: supplier,
      },
    });
  }

  static updateBulkProduct(productData) {
    const products = productData.map((product) => ({
      Product: product.name,
      Supplier: product.supplier,
      Rate: product.rate,
    }));
    const result = products.forEach((product) => this.update({ Rate: product.Rate },
      {
        where: {
          Product: product.Product,
          Supplier: product.Supplier,
        },
      }));
    return result;
  }
}

CSVProject.init(csvProjectSchema, {
  sequelize,
  timestamps: false,
  modelName: 'supplier_products',
});

module.exports = CSVProject;
