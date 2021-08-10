const path = require("path");

const express = require("express");
const { products } = require("./admin");
const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", shopController.getIndex);
router.get("/cart", isAuth, shopController.getCart);
router.post("/cart", isAuth, shopController.postCart);
router.delete("/cart:productId", isAuth, shopController.cartDeleteProduct);
router.post("/create-order", isAuth, shopController.postOrder);
router.get("/checkout", isAuth, shopController.getCheckOut);
router.get("/products/:productId", shopController.getProduct);
router.get("/products", shopController.getProducts);

router.get("/orders", isAuth, shopController.getOrders);
router.get("/orders/:orderId", isAuth, shopController.getInvoice);
router.get("/checkout/success", shopController.getCheckOutSuccess);
router.get("/checkout/cancel", shopController.getCheckOut);

module.exports = router;
