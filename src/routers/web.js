const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const AdminController = require("../apps/controllers/admin");
const AuthController = require("../apps/controllers/auth");
const ProductController = require("../apps/controllers/product");
const SiteController = require("../apps/controllers/site");

const checkGuest = require("../apps/middlewares/check-guest");
const checkLogin = require("../apps/middlewares/check-login");
const checkLevel = require("../apps/middlewares/check-level");
const { route } = require("../app");
const upload = multer({ dest: path.resolve("temp") });
const router = Router();

router.get("/", SiteController.home);
router.get("/category.:id", SiteController.category);
router.get("/product.:id", SiteController.product);
router.get("/search", SiteController.search);
router.get("/cart", SiteController.cart);
router.get("/cart/delete.:id", SiteController.deleteCart);
router.post("/cart", SiteController.updateCart);
router.get("/order-success", SiteController.orderSuccess);
router.post("/comments", SiteController.comment);

router.post("/add-to-cart", SiteController.addToCart);

router.use("/admin", checkGuest, checkLevel);
router.get("/admin", AdminController.dashboard);
router.get("/admin/products", ProductController.index);
router
  .route("/admin/products/create")
  .get(ProductController.create)
  .post(upload.single("prd_image"), ProductController.store);

router
  .route("/admin/products/:id/edit")
  .get(ProductController.edit)
  .post(upload.single("prd_image"), ProductController.update);

router.get("/admin/products/:id/delete", ProductController.destroy);

router
  .route("/login")
  .all(checkLogin)
  .get(AuthController.getLogin)
  .post(AuthController.postLogin);

router.get("/admin/logout", AuthController.logout);

module.exports = router;
