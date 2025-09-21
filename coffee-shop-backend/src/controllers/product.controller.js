const pick = require('lodash/pick');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');
const ApiError = require('../utils/ApiError');

const createProduct = async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(201).send(product);
};

const getProducts = async (req, res) => {
  const filter = pick(req.query, ['name', 'category', 'priceMin', 'priceMax']);
  if (filter.priceMin || filter.priceMax) {
    filter.price = {};
    if (filter.priceMin) {
      filter.price.$gte = parseFloat(filter.priceMin);
      delete filter.priceMin;
    }
    if (filter.priceMax) {
      filter.price.$lte = parseFloat(filter.priceMax);
      delete filter.priceMax;
    }
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, options);
  res.send(result);
};

const getProduct = async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
};

const updateProduct = async (req, res) => {
  const product = await productService.updateProductById(req.params.productId, req.body);
  res.send(product);
};

const deleteProduct = async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  res.status(204).send();
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
