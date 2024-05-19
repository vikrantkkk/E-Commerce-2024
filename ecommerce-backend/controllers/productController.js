import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

export const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, brand, quantity, description, price, category } = req.fields;
    //validation
    switch (true) {
      case !name:
        return res.status(400).json({ msg: "name is required" });
      case !brand:
        return res.status(400).json({ msg: "brand is required" });
      case !quantity:
        return res.status(400).json({ msg: "quantity is required" });
      case description:
        return res.status(400).json({ msg: "description is required" });
      case !price:
        return res.status(400).json({ msg: "price is required" });
      case !category:
        return res.status(400).json({ msg: "category is required" });
    }

    const product = await Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, brand, quantity, description, price, category } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).json({ msg: "Name is required" });
      case !brand:
        return res.status(400).json({ msg: "Brand is required" });
      case !quantity:
        return res.status(400).json({ msg: "Quantity is required" });
      case !description:
        return res.status(400).json({ msg: "Description is required" });
      case !price:
        return res.status(400).json({ msg: "Price is required" });
      case !category:
        return res.status(400).json({ msg: "Category is required" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export const addProductReview = asyncHandler(async (req, res) => {
  try {
    const {comment , rating} = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});