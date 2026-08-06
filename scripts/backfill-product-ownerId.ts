/**
 * One-off migration: assign ownerId to products missing one.
 *
 * Dry-run (default):
 *   npm run backfill:ownerId
 *
 * Apply:
 *   npm run backfill:ownerId -- --ownerId <userId> --apply
 *   BACKFILL_OWNER_ID=<userId> npm run backfill:ownerId -- --apply
 */
import { connectDB, closeDB } from "../utils/db";
import Product from "../utils/models/Product";
import User from "../utils/models/Users";

const ORPHAN_FILTER = {
  $or: [
    { ownerId: { $exists: false } },
    { ownerId: null },
    { ownerId: "" },
  ],
};

function parseArgs(argv: string[]) {
  let apply = false;
  let ownerId: string | undefined;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--apply") {
      apply = true;
    } else if (arg === "--ownerId") {
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        throw new Error("--ownerId requires a value");
      }
      ownerId = next;
      i++;
    } else if (arg.startsWith("--ownerId=")) {
      ownerId = arg.slice("--ownerId=".length);
      if (!ownerId) {
        throw new Error("--ownerId requires a value");
      }
    } else if (arg === "--help" || arg === "-h") {
      console.log(`Usage:
  npm run backfill:ownerId
  npm run backfill:ownerId -- --ownerId <userId> --apply

Options:
  --ownerId <id>   Target seller (or set BACKFILL_OWNER_ID)
  --apply          Write changes (default is dry-run)
  -h, --help       Show this help`);
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!ownerId) {
    ownerId = process.env.BACKFILL_OWNER_ID || undefined;
  }

  return { apply, ownerId };
}

async function main() {
  const { apply, ownerId } = parseArgs(process.argv.slice(2));

  await connectDB();

  const orphans = await Product.find(ORPHAN_FILTER)
    .select("_id name ownerId")
    .lean()
    .exec();

  console.log(`Found ${orphans.length} product(s) missing ownerId.`);
  for (const doc of orphans) {
    console.log(`  - ${String(doc._id)}  ${doc.name ?? "(no name)"}`);
  }

  if (!apply) {
    console.log("Dry-run only. Re-run with --ownerId <userId> --apply to write.");
    return;
  }

  if (!ownerId) {
    throw new Error(
      "Apply mode requires --ownerId <userId> or BACKFILL_OWNER_ID"
    );
  }

  const user = await User.findById(ownerId).lean().exec();
  if (!user) {
    throw new Error(`No user found for ownerId: ${ownerId}`);
  }

  const result = await Product.updateMany(ORPHAN_FILTER, {
    $set: { ownerId },
  });

  console.log(
    `Applied ownerId=${ownerId} to ${result.modifiedCount} product(s) (matched ${result.matchedCount}).`
  );
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
      // ignore close errors after a failed connect
    }
  });
