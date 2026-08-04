import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  name: String,
  weight: Number,
  price: Number,
  tags: Array,
  imageUrl: String,
  ownerId: {
    type: String,
    required: true,
    index: true,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
});
// Create the Mongoose model for the products collection
const Product = models.Product || model("Product", productSchema);

export default Product;
