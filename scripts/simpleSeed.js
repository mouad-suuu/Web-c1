// Simple seeding script that doesn't require complex setup
console.log("🌱 Simple database seeding...");
console.log("📝 To seed your database with sample data:");
console.log("1. Go to your Firebase Console");
console.log("2. Navigate to Firestore Database");
console.log("3. Create the following collections manually:");

console.log("\n📊 USERS Collection:");
console.log("Document ID: ahmed_hassan");
console.log(
  JSON.stringify(
    {
      username: "ahmed_hassan",
      firstName: "Ahmed",
      lastName: "Hassan",
      email: "ahmed@example.com",
      password: "password123",
      location: "Cairo, Egypt",
      bio: "Football enthusiast and team player",
      sports: ["football", "basketball"],
    },
    null,
    2
  )
);

console.log("\n📊 GAMES Collection:");
console.log("Document ID: game1");
console.log(
  JSON.stringify(
    {
      sport: "Football",
      leader: {
        id: "ahmed_hassan",
        username: "ahmed_hassan",
        firstName: "Ahmed",
        lastName: "Hassan",
        email: "ahmed@example.com",
        password: "password123",
      },
      team1: {
        name: "3wapa",
        players: [
          {
            id: "ahmed_hassan",
            username: "ahmed_hassan",
            firstName: "Ahmed",
            lastName: "Hassan",
            email: "ahmed@example.com",
            password: "password123",
          },
        ],
        maxPlayers: 5,
      },
      team2: {
        name: "Lm7sada",
        players: [],
        maxPlayers: 5,
      },
      startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      period: 2,
      location: "City Sports Complex",
      status: "waiting",
      description: "Friendly match for intermediate players",
      createdAt: new Date(),
    },
    null,
    2
  )
);

console.log("\n✅ Copy these documents to your Firestore collections");
console.log("🔗 Firebase Console: https://console.firebase.google.com/");
console.log("📁 Project: thirteenteams1337");
