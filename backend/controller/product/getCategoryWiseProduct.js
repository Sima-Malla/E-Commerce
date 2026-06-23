const productModel = require("../../models/productModel");

// Escapes regex special characters so category names like
// "Men's Wear", "T-Shirts (New)" etc. don't break the RegExp constructor
const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const getCategoryWiseProduct = async (req, res) => {
  try {
    const category = req.body?.category || req.query?.category;

    if (!category) {
      return res.status(400).json({
        message: "Category is required",
        error: true,
        success: false,
      });
    }

    const safeCategory = escapeRegex(category);

    const product = await productModel.find({
      category: { $regex: new RegExp(`^${safeCategory}$`, "i") },
    });

    res.json({
      data: product,
      message: "Product",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryWiseProduct;
