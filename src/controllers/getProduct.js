const Property = require("../models/Product");

async function GetProductController(req, res) {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      typeOfPlace,
      minPrice,
      maxPrice,
    } = req.query;

    // Create the filter object
    let filter = {};

    // Add filters based on query params
    if (category) filter.category = category;
    if (typeOfPlace) filter.typeOfPlace = typeOfPlace;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Pagination and sorting
    const skip = (page - 1) * limit;
    const properties = await Property.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 }); // Sort by creation date (newest first)

    // Get total properties count for pagination
    const totalProperties = await Property.countDocuments(filter);
    const totalPages = Math.ceil(totalProperties / limit);

    res.status(200).json({
      success: true,
      properties,
      page,
      totalPages,
      totalProperties,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

module.exports = GetProductController;
