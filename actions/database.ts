import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
  orderBy,
  DocumentData,
  CollectionReference,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  bio?: string;
  sports?: string[];
}

export interface Team {
  name: string;
  players: User[];
  maxPlayers: number;
}

export interface Game {
  id?: string;
  sport: string;
  leader: User;
  team1: Team;
  team2: Team;
  startTime: Timestamp;
  period: number; // duration in hours

  status: "waiting" | "in-progress" | "completed" | "cancelled";
  description?: string;
  createdAt: Timestamp;
}

export interface TeamHistory {
  id?: string;
  gameId: string;
  sport: string;
  teamName: string;
  players: User[];
  result: "won" | "lost" | "tie";
  date: Timestamp;
  score?: string;
}

const usersCol = collection(db, "users") as CollectionReference<User>;
const gamesCol = collection(db, "games") as CollectionReference<Game>;
const teamHistoryCol = collection(
  db,
  "teamHistory"
) as CollectionReference<TeamHistory>;

export async function getUsers(): Promise<User[]> {
  const snapshot = await getDocs(usersCol);
  return snapshot.docs.map((doc) => doc.data());
}

export async function getUser(username: string): Promise<User> {
  const ref = doc(usersCol, username);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) {
    throw new Error(`User '${username}' not found`);
  }
  return snapshot.data() as User;
}

export async function createUser(userData: User): Promise<User> {
  if (!userData.username) {
    throw new Error("username is required");
  }

  const ref = doc(usersCol, userData.username);
  const existing = await getDoc(ref);

  if (existing.exists()) {
    throw new Error(`Username '${userData.username}' already exists`);
  }

  await setDoc(ref, userData);
  return userData;
}

export async function updateUser(
  username: string,
  updates: Partial<User>
): Promise<void> {
  const ref = doc(usersCol, username);
  await updateDoc(ref, updates as DocumentData);
}

export async function deleteUser(username: string): Promise<void> {
  const ref = doc(usersCol, username);
  await deleteDoc(ref);
}

// ================================
// 🎮 GAMES FUNCTIONS
// ================================

// ✅ Get all games
export async function getGames(): Promise<Game[]> {
  try {
    const q = query(gamesCol, orderBy("startTime", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting games:", error);
    return [];
  }
}

// ✅ Get games by status
export async function getGamesByStatus(
  status: Game["status"]
): Promise<Game[]> {
  const q = query(
    gamesCol,
    where("status", "==", status),
    orderBy("startTime", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ✅ Get games where user is participating
export async function getUserGames(userId: string): Promise<Game[]> {
  try {
    // Get all games and filter client-side to avoid complex queries
    const snapshot = await getDocs(gamesCol);
    const allGames = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Filter games where user is in either team (with proper error handling)
    const userGames = allGames.filter((game) => {
      try {
        // Check if team1 and team2 exist and have players arrays
        const team1Players = game.team1?.players || [];
        const team2Players = game.team2?.players || [];

        return (
          team1Players.some((player) => player?.id === userId) ||
          team2Players.some((player) => player?.id === userId)
        );
      } catch (error) {
        console.warn("Error filtering game:", error, game);
        return false;
      }
    });

    // Sort by start time
    return userGames.sort((a, b) => {
      try {
        return a.startTime.toMillis() - b.startTime.toMillis();
      } catch (error) {
        console.warn("Error sorting games:", error);
        return 0;
      }
    });
  } catch (error) {
    console.error("Error getting user games:", error);
    return [];
  }
}

// ✅ Get games created by user
export async function getGamesByLeader(leaderId: string): Promise<Game[]> {
  try {
    // For now, get all games and filter client-side to avoid index requirements
    const snapshot = await getDocs(gamesCol);
    const allGames = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Filter games where the leader ID matches (with proper error handling)
    const userGames = allGames.filter((game) => {
      try {
        return game.leader?.id === leaderId;
      } catch (error) {
        console.warn("Error filtering game by leader:", error, game);
        return false;
      }
    });

    // Sort by start time
    return userGames.sort((a, b) => {
      try {
        return a.startTime.toMillis() - b.startTime.toMillis();
      } catch (error) {
        console.warn("Error sorting games by leader:", error);
        return 0;
      }
    });
  } catch (error) {
    console.error("Error getting games by leader:", error);
    return [];
  }
}

// ✅ Create new game
export async function createGame(
  gameData: Omit<Game, "id" | "createdAt">
): Promise<Game> {
  const gameWithTimestamp = {
    ...gameData,
    createdAt: Timestamp.now(),
  };

  const docRef = await addDoc(gamesCol, gameWithTimestamp);
  return { id: docRef.id, ...gameWithTimestamp };
}

// ✅ Update game
export async function updateGame(
  gameId: string,
  updates: Partial<Game>
): Promise<void> {
  const ref = doc(gamesCol, gameId);
  await updateDoc(ref, updates as DocumentData);
}

// ✅ Join team in game
export async function joinTeam(
  gameId: string,
  teamNumber: 1 | 2,
  user: User
): Promise<void> {
  const gameRef = doc(gamesCol, gameId);
  const gameDoc = await getDoc(gameRef);

  if (!gameDoc.exists()) {
    throw new Error("Game not found");
  }

  const game = gameDoc.data();
  const team = teamNumber === 1 ? game.team1 : game.team2;

  if (team.players.length >= team.maxPlayers) {
    throw new Error("Team is full");
  }

  // Check if user is already in the team
  if (team.players.some((player) => player.id === user.id)) {
    throw new Error("User is already in this team");
  }

  const updatedTeam = {
    ...team,
    players: [...team.players, user],
  };

  const updates =
    teamNumber === 1 ? { team1: updatedTeam } : { team2: updatedTeam };

  await updateDoc(gameRef, updates);
}

// ✅ Delete game
export async function deleteGame(gameId: string): Promise<void> {
  const ref = doc(gamesCol, gameId);
  await deleteDoc(ref);
}
export async function getTeamHistory(userId: string): Promise<TeamHistory[]> {
  // Get all team history and filter client-side to avoid complex queries
  const snapshot = await getDocs(teamHistoryCol);
  const allHistory = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Filter history where user is in the players array
  const userHistory = allHistory.filter((history) =>
    history.players.some((player) => player.id === userId)
  );

  // Sort by date (most recent first)
  return userHistory.sort((a, b) => b.date.toMillis() - a.date.toMillis());
}

// ✅ Create team history record
export async function createTeamHistory(
  historyData: Omit<TeamHistory, "id">
): Promise<TeamHistory> {
  const docRef = await addDoc(teamHistoryCol, historyData);
  return { id: docRef.id, ...historyData };
}

// ✅ Update team history
export async function updateTeamHistory(
  historyId: string,
  updates: Partial<TeamHistory>
): Promise<void> {
  const ref = doc(teamHistoryCol, historyId);
  await updateDoc(ref, updates as DocumentData);
}

// ✅ Delete team history
export async function deleteTeamHistory(historyId: string): Promise<void> {
  const ref = doc(teamHistoryCol, historyId);
  await deleteDoc(ref);
}
