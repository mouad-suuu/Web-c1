"use client";
import { useState } from "react";
import { TeamHistory, mockTeamHistory, mockGames } from "@/data/mockData";

interface MyTeamsProps {
  currentUserId: string;
}

export const MyTeams: React.FC<MyTeamsProps> = ({ currentUserId }) => {
  const [activeTab, setActiveTab] = useState<
    "history" | "upcoming" | "created"
  >("history");

  // Filter games where current user is participating
  const upcomingGames = mockGames.filter(
    (game) =>
      game.team1.players.some((player) => player.id === currentUserId) ||
      game.team2.players.some((player) => player.id === currentUserId)
  );

  // Filter games created by current user
  const createdGames = mockGames.filter(
    (game) => game.leader.id === currentUserId
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case "won":
        return "text-green-600 bg-green-100";
      case "lost":
        return "text-red-600 bg-red-100";
      case "tie":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getSportIcon = (sport: string) => {
    switch (sport.toLowerCase()) {
      case "football":
        return "⚽";
      case "basketball":
        return "🏀";
      case "tennis":
        return "🎾";
      case "volleyball":
        return "🏐";
      default:
        return "🏆";
    }
  };

  return (
    <section id="my-teams" className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          My Teams
        </h2>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "history"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Game History
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "upcoming"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Upcoming Games
            </button>
            <button
              onClick={() => setActiveTab("created")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "created"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Games I Created
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === "history" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Game History
              </h3>
              {mockTeamHistory.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockTeamHistory.map((game) => (
                    <div
                      key={game.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">
                              {getSportIcon(game.sport)}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800">
                                {game.sport}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {game.teamName}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getResultColor(
                              game.result
                            )}`}
                          >
                            {game.result.toUpperCase()}
                          </span>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">
                            📅 {formatDate(game.date)}
                          </p>
                          {game.score && (
                            <p className="text-lg font-semibold text-gray-800">
                              Score: {game.score}
                            </p>
                          )}
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">
                            Teammates:
                          </h5>
                          <div className="space-y-1">
                            {game.players.map((player) => (
                              <div
                                key={player.id}
                                className="flex items-center gap-2"
                              >
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-medium text-blue-600">
                                    {player.name.charAt(0)}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-700">
                                  {player.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No game history yet
                  </h3>
                  <p className="text-gray-500">
                    Start playing games to see your history here!
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "upcoming" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Upcoming Games
              </h3>
              {upcomingGames.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {upcomingGames.map((game) => (
                    <div
                      key={game.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">
                              {getSportIcon(game.sport)}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800">
                                {game.sport}
                              </h4>
                              <p className="text-sm text-gray-600">
                                vs {game.team2.name}
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

                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-1">
                            📅 {formatDate(game.startTime)}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            📍 {game.location}
                          </p>
                          {game.description && (
                            <p className="text-sm text-gray-600">
                              {game.description}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <h5 className="font-medium text-gray-800 mb-2">
                              Your Team
                            </h5>
                            <p className="text-sm text-gray-600">
                              {game.team1.players.length}/
                              {game.team1.maxPlayers} players
                            </p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <h5 className="font-medium text-gray-800 mb-2">
                              Opponent
                            </h5>
                            <p className="text-sm text-gray-600">
                              {game.team2.players.length}/
                              {game.team2.maxPlayers} players
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">⏰</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No upcoming games
                  </h3>
                  <p className="text-gray-500">
                    Join a game or create one to get started!
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "created" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Games I Created
              </h3>
              {createdGames.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {createdGames.map((game) => (
                    <div
                      key={game.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">
                              {getSportIcon(game.sport)}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800">
                                {game.sport}
                              </h4>
                              <p className="text-sm text-gray-600">
                                You are the leader
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

                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-1">
                            📅 {formatDate(game.startTime)}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            📍 {game.location}
                          </p>
                          {game.description && (
                            <p className="text-sm text-gray-600">
                              {game.description}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <h5 className="font-medium text-gray-800 mb-2">
                              {game.team1.name}
                            </h5>
                            <p className="text-sm text-gray-600">
                              {game.team1.players.length}/
                              {game.team1.maxPlayers} players
                            </p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <h5 className="font-medium text-gray-800 mb-2">
                              {game.team2.name}
                            </h5>
                            <p className="text-sm text-gray-600">
                              {game.team2.players.length}/
                              {game.team2.maxPlayers} players
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Manage Game
                          </button>
                          <button className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎮</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No games created yet
                  </h3>
                  <p className="text-gray-500">
                    Create your first game to get started!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
