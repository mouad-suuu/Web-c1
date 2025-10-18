import {
  createUser,
  createGame,
  createTeamHistory,
  User,
  Game,
  TeamHistory,
} from "../actions/database";
import { Timestamp } from "firebase/firestore";

// Sample users data
const sampleUsers: Omit<User, "id">[] = [
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
  {
    username: "sarah_johnson",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah@example.com",
    password: "password123",
    location: "New York, USA",
    bio: "Tennis player and fitness lover",
    sports: ["tennis", "volleyball"],
  },
  {
    username: "mohamed_ali",
    firstName: "Mohamed",
    lastName: "Ali",
    email: "mohamed@example.com",
    password: "password123",
    location: "Alexandria, Egypt",
    bio: "Beginner football player",
    sports: ["football"],
  },
  {
    username: "emma_wilson",
    firstName: "Emma",
    lastName: "Wilson",
    email: "emma@example.com",
    password: "password123",
    location: "London, UK",
    bio: "Professional basketball player",
    sports: ["basketball", "tennis"],
  },
  {
    username: "omar_khalil",
    firstName: "Omar",
    lastName: "Khalil",
    email: "omar@example.com",
    password: "password123",
    location: "Dubai, UAE",
    bio: "Multi-sport athlete",
    sports: ["football", "volleyball"],
  },
];

// Function to seed the database
export async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Create users
    const createdUsers: User[] = [];
    for (const userData of sampleUsers) {
      try {
        const user = await createUser(userData as User);
        createdUsers.push(user);
        console.log(`✅ Created user: ${user.username}`);
      } catch (error) {
        console.log(`⚠️ User ${userData.username} might already exist`);
      }
    }

    if (createdUsers.length === 0) {
      console.log("❌ No users created. Database might already be seeded.");
      return;
    }

    // Create sample games
    const now = new Date();
    const sampleGames: Omit<Game, "id" | "createdAt">[] = [
      {
        sport: "Football",
        leader: createdUsers[0],
        team1: {
          name: "3wapa",
          players: [createdUsers[0], createdUsers[2]],
          maxPlayers: 5,
        },
        team2: {
          name: "Lm7sada",
          players: [createdUsers[4]],
          maxPlayers: 5,
        },
        startTime: Timestamp.fromDate(
          new Date(now.getTime() + 2 * 60 * 60 * 1000)
        ), // 2 hours from now
        period: 2,
        location: "City Sports Complex",
        status: "waiting",
        description: "Friendly match for intermediate players",
      },
      {
        sport: "Basketball",
        leader: createdUsers[3],
        team1: {
          name: "Slam Dunkers",
          players: [createdUsers[3]],
          maxPlayers: 5,
        },
        team2: {
          name: "Three Pointers",
          players: [],
          maxPlayers: 5,
        },
        startTime: Timestamp.fromDate(
          new Date(now.getTime() + 1 * 60 * 60 * 1000)
        ), // 1 hour from now
        period: 2,
        location: "Downtown Basketball Court",
        status: "waiting",
        description: "Competitive game for advanced players",
      },
      {
        sport: "Tennis",
        leader: createdUsers[1],
        team1: {
          name: "Ace Masters",
          players: [createdUsers[1]],
          maxPlayers: 2,
        },
        team2: {
          name: "Net Rulers",
          players: [],
          maxPlayers: 2,
        },
        startTime: Timestamp.fromDate(new Date(now.getTime() + 30 * 60 * 1000)), // 30 minutes from now
        period: 2,
        location: "Tennis Club Courts",
        status: "waiting",
        description: "Doubles match - all skill levels welcome",
      },
    ];

    // Create games
    for (const gameData of sampleGames) {
      try {
        const game = await createGame(gameData);
        console.log(
          `✅ Created game: ${game.sport} - ${game.team1.name} vs ${game.team2.name}`
        );
      } catch (error) {
        console.error(`❌ Failed to create game:`, error);
      }
    }

    // Create sample team history
    const sampleHistory: Omit<TeamHistory, "id">[] = [
      {
        gameId: "past1",
        sport: "Football",
        teamName: "3wapa",
        players: [createdUsers[0], createdUsers[2], createdUsers[4]],
        result: "won",
        date: Timestamp.fromDate(
          new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        ), // 1 week ago
        score: "3-1",
      },
      {
        gameId: "past2",
        sport: "Basketball",
        teamName: "Slam Dunkers",
        players: [createdUsers[3]],
        result: "lost",
        date: Timestamp.fromDate(
          new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
        ), // 3 days ago
        score: "45-52",
      },
      {
        gameId: "past3",
        sport: "Tennis",
        teamName: "Ace Masters",
        players: [createdUsers[1]],
        result: "won",
        date: Timestamp.fromDate(
          new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
        ), // 1 day ago
        score: "6-4, 6-2",
      },
    ];

    // Create team history
    for (const historyData of sampleHistory) {
      try {
        const history = await createTeamHistory(historyData);
        console.log(
          `✅ Created team history: ${history.sport} - ${history.result}`
        );
      } catch (error) {
        console.error(`❌ Failed to create team history:`, error);
      }
    }

    console.log("🎉 Database seeding completed successfully!");
    console.log(
      `📊 Created ${createdUsers.length} users, ${sampleGames.length} games, and ${sampleHistory.length} team history records`
    );
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
  }
}

// Run the seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("Seeding process finished");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding process failed:", error);
      process.exit(1);
    });
}
