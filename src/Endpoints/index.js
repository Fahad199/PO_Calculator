const express = require('express');
const session = require('express-session');

const cors = require('cors');

const app = express();

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

const getAllSuppliers = require('./getAllSuppliers');
const getAllCategories = require('./getAllCategories');
const getAllTypes = require('./getAllTypes');
const getAllProducts = require('./getAllProducts');
const getProductsBySupplier = require('./getProductsBySupplier');
const userLogin = require('./userLogin');
const getInvoice = require('./getInvoice');
const updateInvoice = require('./updateInvoice');
const invoiceApproval = require('./invoiceApproval');
const updateBulkProducts = require('./updateBulkProduct');
const getLikeProducts = require('./getLikeProducts');
// const compareInvoices = require('./compareInvoices');

app.post('/login', userLogin);
app.get('/verify/invoice', invoiceApproval);
// app.get('/compare/invoices', compareInvoices);
app.put('/update/invoice', updateInvoice);
app.get('/get/invoice', getInvoice);
app.get('/get/suppliers', getAllSuppliers);
app.get('/get/categories', getAllCategories);
app.get('/get/types', getAllTypes);
app.get('/get/products', getAllProducts);
app.get('/get/product', getProductsBySupplier);
app.post('/update/products', updateBulkProducts);
app.get('/like/products', getLikeProducts);

module.exports = app;
