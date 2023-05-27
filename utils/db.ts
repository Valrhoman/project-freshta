import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
const uri = process.env.MONGODB_URI;

let db = null;

// Connect to the MongoDB database using Mongoose
async function connectDB() {
  try {
    await mongoose.connect(uri, { dbName: "freshtaDB" });
    console.log("Successfully connected to MongoDB");
  } catch (err: any) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
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
