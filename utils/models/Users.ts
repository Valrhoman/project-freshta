import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    maxLength: [30, "First name must be less than 30 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    maxLength: [30, "Last name must be less than 30 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
});
// Create the Mongoose model for the products collection
const User = models.User || model("User", userSchema);

export default User;
