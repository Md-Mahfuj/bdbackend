const Property = require("../models/Product");

async function UploadProductController(req, res) {
  try {
    const uploadProduct = new Property(req.body);
    const saveProduct = await uploadProduct.save();
    res.status(201).json({
      message: "Product upload successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadProductController;
