"use client";
import { useState, useEffect } from "react";
import { Game, getGames, joinTeam, getUserById } from "@/actions/database";

interface TimerProps {
  targetDate: Date;
  label: string;
}

const Timer: React.FC<TimerProps> = ({ targetDate, label }) => {
  const [timeLeft, setTimeLeft] = useState("00:00:00");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      } else {
        setTimeLeft("00:00:00");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, mounted]);

  if (!mounted) {
    return (
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <p className="text-lg font-mono font-bold text-blue-600">--:--:--</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-lg font-mono font-bold text-blue-600">{timeLeft}</p>
    </div>
  );
};

interface AvailableGamesProps {
  currentUserId: string;
}

export const AvailableGames: React.FC<AvailableGamesProps> = ({
  currentUserId,
}) => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const fetchedGames = await getGames();

        const validGames = fetchedGames.filter((game) => {
          try {
            return (
              game &&
              game.team1 &&
              game.team2 &&
              game.leader &&
              Array.isArray(game.team1.players) &&
              Array.isArray(game.team2.players)
            );
          } catch (error) {
            console.warn("Invalid game data:", game, error);
            return false;
          }
        });

        setGames(validGames);
      } catch (err) {
        console.error("Error fetching games from database:", err);
        setError("Failed to load games. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleJoinTeam = async (gameId: string, teamNumber: 1 | 2) => {
    try {
      const currentUser = await getUserById(currentUserId);

      await joinTeam(gameId, teamNumber, currentUser);

      const updatedGames = await getGames();
      setGames(updatedGames);

      alert("Successfully joined the team!");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to join team");
      console.error("Error joining team:", err);
    }
  };

  const filteredGames =
    selectedSport === "all"
      ? games
      : games.filter((game) => game.sport.toLowerCase() === selectedSport);

  const availableSports = [
    "all",
    ...Array.from(new Set(games.map((game) => game.sport.toLowerCase()))),
  ];

  return (
    <section id="teams" className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Available Games
          </h2>

          <div className="flex gap-2">
            {availableSports.map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedSport === sport
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {sport === "all"
                  ? "All Sports"
                  : sport.charAt(0).toUpperCase() + sport.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⏳</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Loading games...
            </h3>
            <p className="text-gray-500">
              Please wait while we fetch the latest games
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              Error loading games
            </h3>
            <p className="text-gray-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredGames.map((game, index) => (
              <div
                key={game.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">
                          {game.sport === "Football"
                            ? "⚽"
                            : game.sport === "Basketball"
                            ? "🏀"
                            : game.sport === "Tennis"
                            ? "🎾"
                            : "🏐"}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {game.sport}
                        </h3>
                        <p className="text-gray-600">
                          Led by {game.leader?.firstName || "Unknown"}{" "}
                          {game.leader?.lastName || "User"}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        game.status === "waiting"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {game.status}
                    </span>
                  </div>

                  {/* Teams */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {game.team1.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {game.team1.players.length}/{game.team1.maxPlayers}{" "}
                        players
                      </p>
                      <div className="space-y-1 mb-3">
                        {game.team1.players.map((player) => (
                          <div
                            key={player.id}
                            className="text-sm text-gray-700"
                          >
                            • {player?.firstName || "Unknown"}{" "}
                            {player?.lastName || "User"}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => handleJoinTeam(game.id!, 1)}
                        disabled={
                          game.team1.players.length >= game.team1.maxPlayers
                        }
                        className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          game.team1.players.length >= game.team1.maxPlayers
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {game.team1.players.length >= game.team1.maxPlayers
                          ? "Team Full"
                          : "Join Team 1"}
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {game.team2.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {game.team2.players.length}/{game.team2.maxPlayers}{" "}
                        players
                      </p>
                      <div className="space-y-1 mb-3">
                        {game.team2.players.map((player) => (
                          <div
                            key={player.id}
                            className="text-sm text-gray-700"
                          >
                            • {player?.firstName || "Unknown"}{" "}
                            {player?.lastName || "User"}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => handleJoinTeam(game.id!, 2)}
                        disabled={
                          game.team2.players.length >= game.team2.maxPlayers
                        }
                        className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          game.team2.players.length >= game.team2.maxPlayers
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                      >
                        {game.team2.players.length >= game.team2.maxPlayers
                          ? "Team Full"
                          : "Join Team 2"}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <Timer
                      targetDate={game.startTime.toDate()}
                      label="Game Starts In"
                    />
                    <Timer
                      targetDate={
                        new Date(
                          game.startTime.toDate().getTime() +
                            game.period * 60 * 60 * 1000
                        )
                      }
                      label="Game Ends In"
                    />
                  </div>
                </div>
              </div>
            ))}
            {filteredGames.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏃‍♂️</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No games available
                </h3>
                <p className="text-gray-500">Be the first to create a game!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
