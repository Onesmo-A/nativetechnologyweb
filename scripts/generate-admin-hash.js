/* eslint-disable no-console */
const bcrypt = require("bcryptjs");

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/generate-admin-hash.js <password>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
const escaped = hash.replace(/\$/g, "\\$");

console.log(hash);
console.log("");
console.log("Use this in .env.local (escaped for Next.js):");
console.log(`ADMIN_PASSWORD_HASH="${escaped}"`);
