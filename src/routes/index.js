const UploadProductController = require("../controllers/uploadProduct");
const GetProductController = require("../controllers/getProduct");

const express = require("express");

const router = express.Router();

router.post("/product", UploadProductController);
router.get("/product", GetProductController);

module.exports = router;
