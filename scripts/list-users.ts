/**
 * List users (newest ObjectId first). Usage:
 *   node --env-file=.env.local ./node_modules/tsx/dist/cli.mjs scripts/list-users.ts
 */
import { connectDB, closeDB } from "../utils/db";
import User from "../utils/models/Users";

async function main() {
  await connectDB();
  const users = await User.find().select("_id email firstName lastName").lean().exec();
  // ObjectIds are roughly chronological — newest last in natural order, so reverse
  users.sort((a, b) => String(b._id).localeCompare(String(a._id)));
  if (users.length === 0) {
    console.log("No users found.");
    return;
  }
  console.log("Newest first:\n");
  for (const u of users) {
    console.log(`${String(u._id)}  ${u.email}  ${u.firstName ?? ""} ${u.lastName ?? ""}`.trimEnd());
  }
  console.log(`\nLatest user id (use for backfill):\n  ${String(users[0]._id)}`);
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(async () => {
    try {
      await closeDB();
    } catch {
      // ignore
    }
  });
