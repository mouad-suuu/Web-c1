export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  favoriteSports: string[];
}
export interface Sport {
  id: string;
  name: string;
  icon: string;
  maxPlayers: number;
}
export interface Game {
  id: string;
  sport: string;
  leader: User;
  team1: {
    name: string;
    players: User[];
    maxPlayers: number;
  };
  team2: {
    name: string;
    players: User[];
    maxPlayers: number;
  };
  startTime: Date;
  period: number;
  location: string;
  status: "waiting" | "in-progress" | "completed" | "cancelled";
  description?: string;
}

export interface TeamHistory {
  id: string;
  gameId: string;
  sport: string;
  teamName: string;
  players: User[];
  result: "won" | "lost" | "tie";
  date: Date;
  score?: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    skillLevel: "advanced",
    favoriteSports: ["football", "basketball"],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    skillLevel: "intermediate",
    favoriteSports: ["tennis", "volleyball"],
  },
  {
    id: "3",
    name: "Mohamed Ali",
    email: "mohamed@example.com",
    skillLevel: "beginner",
    favoriteSports: ["football"],
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma@example.com",
    skillLevel: "advanced",
    favoriteSports: ["basketball", "tennis"],
  },
  {
    id: "5",
    name: "Omar Khalil",
    email: "omar@example.com",
    skillLevel: "intermediate",
    favoriteSports: ["football", "volleyball"],
  },
  {
    id: "6",
    name: "Lisa Chen",
    email: "lisa@example.com",
    skillLevel: "advanced",
    favoriteSports: ["tennis", "basketball"],
  },
  {
    id: "7",
    name: "Youssef Amrani",
    email: "youssef@example.com",
    skillLevel: "intermediate",
    favoriteSports: ["football"],
  },
  {
    id: "8",
    name: "Jessica Brown",
    email: "jessica@example.com",
    skillLevel: "beginner",
    favoriteSports: ["volleyball"],
  },
];

// Mock Games
export const mockGames: Game[] = [
  {
    id: "1",
    sport: "Football",
    leader: mockUsers[0],
    team1: {
      name: "3wapa",
      players: [mockUsers[0], mockUsers[2]],
      maxPlayers: 5,
    },
    team2: {
      name: "Lm7sada",
      players: [mockUsers[4]],
      maxPlayers: 5,
    },
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    period: 2, // 2 hours duration
    location: "City Sports Complex",
    status: "waiting",
    description: "Friendly match for intermediate players",
  },
  {
    id: "2",
    sport: "Basketball",
    leader: mockUsers[3],
    team1: {
      name: "Slam Dunkers",
      players: [mockUsers[3], mockUsers[5]],
      maxPlayers: 5,
    },
    team2: {
      name: "Three Pointers",
      players: [],
      maxPlayers: 5,
    },
    startTime: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
    period: 2, // 2 hours duration
    location: "Downtown Basketball Court",
    status: "waiting",
    description: "Competitive game for advanced players",
  },
  {
    id: "3",
    sport: "Tennis",
    leader: mockUsers[1],
    team1: {
      name: "Ace Masters",
      players: [mockUsers[1]],
      maxPlayers: 2,
    },
    team2: {
      name: "Net Rulers",
      players: [mockUsers[5]],
      maxPlayers: 2,
    },
    startTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    period: 2, // 2 hours duration
    location: "Tennis Club Courts",
    status: "waiting",
    description: "Doubles match - all skill levels welcome",
  },
  {
    id: "4",
    sport: "Volleyball",
    leader: mockUsers[4],
    team1: {
      name: "Spike Masters",
      players: [mockUsers[4], mockUsers[7]],
      maxPlayers: 6,
    },
    team2: {
      name: "Block Champions",
      players: [],
      maxPlayers: 6,
    },
    startTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
    period: 2, // 2 hours duration
    location: "Beach Volleyball Court",
    status: "waiting",
    description: "Beach volleyball - bring sunscreen!",
  },
];

// Mock Team History
export const mockTeamHistory: TeamHistory[] = [
  {
    id: "1",
    gameId: "past1",
    sport: "Football",
    teamName: "3wapa",
    players: [mockUsers[0], mockUsers[2], mockUsers[4]],
    result: "won",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    score: "3-1",
  },
  {
    id: "2",
    gameId: "past2",
    sport: "Basketball",
    teamName: "Slam Dunkers",
    players: [mockUsers[3], mockUsers[5]],
    result: "lost",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    score: "45-52",
  },
  {
    id: "3",
    gameId: "past3",
    sport: "Tennis",
    teamName: "Ace Masters",
    players: [mockUsers[1], mockUsers[6]],
    result: "won",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    score: "6-4, 6-2",
  },
];

export const sports = [
  { id: "football", name: "Football", icon: "⚽", maxPlayers: 11 },
  { id: "basketball", name: "Basketball", icon: "🏀", maxPlayers: 5 },
  { id: "tennis", name: "Tennis", icon: "🎾", maxPlayers: 4 },
  { id: "volleyball", name: "Volleyball", icon: "🏐", maxPlayers: 6 },
  { id: "badminton", name: "Badminton", icon: "🏸", maxPlayers: 4 },
  { id: "table-tennis", name: "Table Tennis", icon: "🏓", maxPlayers: 4 },
  { id: "other", name: "Other", icon: "❓" },
];
