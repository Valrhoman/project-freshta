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

// Connect to the MongoDB database using Mongoose.
// Keep the connection open across requests (Next.js / serverless best practice).
async function connectDB() {
  // readyState: 0 disconnected, 1 connected, 2 connecting, 3 disconnecting
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // Stale cache after closeDB() — force a fresh connect
  if (mongoose.connection.readyState === 0) {
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName: "freshtaDB",
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    cached.conn = null;
    throw err;
  }

  return cached.conn;
}

async function closeDB() {
  if (mongoose.connection.readyState === 0) {
    cached.conn = null;
    cached.promise = null;
    return;
  }

  await mongoose.connection.close();
  cached.conn = null;
  cached.promise = null;
  console.log("Disconnected from db.");
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
