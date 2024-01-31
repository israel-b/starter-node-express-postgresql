const productsService = require("../products/products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function productExists(req, res, next) {
  const product = await productsService.read(req.params.productId);
  if (product) {
    res.locals.product = product;
    return next();
  }
  next({ status: 404, message: `Product cannot be found.` });
}

function read(req, res, next) {
  const { product: data } = res.locals;
  res.json({ data });
}

async function list(req, res, next) {
  const data = await productsService.list();
  res.json({data});
}

async function listOutOfStockCount(req, res, next){
  const data = await productsService.listOutOfStockCount();
  res.json({ data });
}

async function listPriceSummary(req, res, next){
  const data = await productsService.listPriceSummary();
  res.json({ data });
}

async function listTotalWeightByProduct(req, res, next) {
  const data = await productsService.listTotalWeightByProduct();
  res.json({ data });
}

module.exports = {
  listTotalWeightByProduct: [asyncErrorBoundary(listTotalWeightByProduct)],
  listPriceSummary: [asyncErrorBoundary(listPriceSummary)],
  listOutOfStockCount: [asyncErrorBoundary(listOutOfStockCount)],
  read: [asyncErrorBoundary(productExists), read],
  list: [asyncErrorBoundary(list)],
};
