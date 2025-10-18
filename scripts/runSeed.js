const { exec } = require("child_process");
const path = require("path");

console.log("🌱 Running database seeding script...");

// Run the TypeScript seeding script
exec("npx tsx scripts/seedDatabase.ts", (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error: ${error}`);
    return;
  }

  if (stderr) {
    console.error(`⚠️ Warning: ${stderr}`);
  }

  console.log(stdout);
  console.log("✅ Seeding script completed");
});
