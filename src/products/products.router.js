const router = require("express").Router({ mergeParams: true });
const controller = require("./products.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


router.route("/:productId([0-9]+)").get(controller.read).all(methodNotAllowed);
router.route("/unavailable").get(controller.listOutOfStockCount).all(methodNotAllowed);
router.route("/price-summary").get(controller.listPriceSummary).all(methodNotAllowed);
router.route("/product-weight").get(controller.listTotalWeightByProduct).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
