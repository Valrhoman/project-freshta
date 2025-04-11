import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}
const uri = process.env.MONGODB_URI;

declare global {
  // this extends the Node.js global type
  var mongoose: {
    conn: typeof import("mongoose") | null;
    promise: Promise<typeof import("mongoose")> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Connect to the MongoDB database using Mongoose
async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName: "freshtaDB",
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

async function closeDB() {
  await mongoose.connection.close();
  console.log("Disconnected to db.");
}

process.on("SIGINT", async () => {
  try {
    console.log("Closing database connection...");
    await closeDB();
    console.log("Database connection closed.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

export { connectDB, closeDB };
