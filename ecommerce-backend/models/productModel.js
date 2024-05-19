import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: ObjectId, ref: "Category", required: true },
  description: { type: String, required: true },
  reviews: [reviewSchema],
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, requires: true, default: 0 },
  price: { type: Number, requires: true, default: 0 },
  countStock: { type: Number, requires: true, default: 0 },
});

export default mongoose.model("Product", productSchema);
