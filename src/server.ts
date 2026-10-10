import mongoose from "mongoose";
import { app } from "./app";
import config from "./app/config";
import type { Server } from "http";
import { seedSuperAdmin } from "./app/DB";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    await seedSuperAdmin();
    server = app.listen(config.port, () => {
      console.log(`Server listening on ${config.port} port`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", () => {
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", () => {
  process.exit(1);
});
