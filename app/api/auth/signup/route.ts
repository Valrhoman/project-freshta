import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import User from "@/utils/models/Users";
import mongoose from "mongoose";
import { data } from "autoprefixer";
import { connectDB, closeDB } from "@/utils/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    if (!req.body)
      return NextResponse.json({ error: "Data is missing" }, { status: 400 });

    // Get form data
    const formData = await req.formData();
    const email = formData.get("email");
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    console.log(firstName, lastName, email, password);

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { error: "User already exists. Try entering other email address." },
        { status: 409 }
      );
    }

    // Check if password is valid
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create new user model
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Save the new user model to database and store data
    const createdUser = await user.save();

    // Remove the password from the response
    const returnUserData = {
      email: createdUser.email,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      _id: createdUser._id,
    };

    return NextResponse.json(
      { returnUserData, success: true },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    NextResponse.json(err);
  } finally {
    await closeDB();
  }
}
