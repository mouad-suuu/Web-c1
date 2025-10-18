"use client";
import { useEffect, useState } from "react";
import { sports } from "@/data/mockData";
import { getUsers, User } from "@/actions/database";
import { Sport } from "@/data/mockData";

interface CreateGameProps {
  currentUserId: string;
}

export const CreateGame: React.FC<CreateGameProps> = ({ currentUserId }) => {
  const [selectedSport, setSelectedSport] = useState("");
  const [gameDate, setGameDate] = useState("");
  const [gameTime, setGameTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<User[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const currentUser =
    users.find((user) => user.id === currentUserId) || users[0];
  const filteredUsers = users.filter(
    (user) =>
      user.username !== currentUserId &&
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedFriends.find((friend) => friend.username === user.username)
  );

  //useffect to load users using database getusers
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers: User[] = await getUsers();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  const handleAddFriend = (friend: User) => {
    setSelectedFriends([...selectedFriends, friend]);
    setSearchQuery("");
  };

  const handleRemoveFriend = (friendId: string) => {
    setSelectedFriends(
      selectedFriends.filter((friend) => friend.id !== friendId)
    );
  };

  const handleCreateGame = async () => {
    if (
      !selectedSport ||
      !gameDate ||
      !gameTime ||
      !location ||
      !team1Name ||
      !team2Name
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsCreating(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("Game created successfully!");

    // Reset form
    setSelectedSport("");
    setGameDate("");
    setGameTime("");
    setLocation("");
    setDescription("");
    setTeam1Name("");
    setTeam2Name("");
    setMaxPlayers(5);
    setSelectedFriends([]);
    setIsCreating(false);
  };

  const selectedSportData = sports.find((sport) => sport.id === selectedSport);

  return (
    <section id="teams/new" className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Create New Game
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Game Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Game Details
                  </h3>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sport *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {sports.map((sport: any) => (
                        <button
                          key={sport.id}
                          onClick={() => {
                            setSelectedSport(sport.id);
                            setMaxPlayers(sport.maxPlayers);
                          }}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            selectedSport === sport.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="text-2xl mb-1">{sport.icon}</div>
                          <div className="text-sm font-medium">
                            {sport.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        value={gameDate}
                        onChange={(e) => setGameDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time *
                      </label>
                      <input
                        type="time"
                        value={gameTime}
                        onChange={(e) => setGameTime(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., City Sports Complex"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Team Names */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Team 1 Name *
                      </label>
                      <input
                        type="text"
                        value={team1Name}
                        onChange={(e) => setTeam1Name(e.target.value)}
                        placeholder="3wapa..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Team 2 Name *
                      </label>
                      <input
                        type="text"
                        value={team2Name}
                        onChange={(e) => setTeam2Name(e.target.value)}
                        placeholder="Lm7sada..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {selectedSportData && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Players per Team
                      </label>
                      <input
                        type="number"
                        value={maxPlayers}
                        onChange={(e) =>
                          setMaxPlayers(parseInt(e.target.value))
                        }
                        min="2"
                        max={selectedSportData.maxPlayers}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Recommended: {selectedSportData.maxPlayers} players for{" "}
                        {selectedSportData.name}
                      </p>
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add any additional details about the game..."
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Invite Friends
                  </h3>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search Friends
                    </label>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {searchQuery && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Search Results
                      </h4>
                      <div className="max-h-40 overflow-y-auto space-y-2">
                        {filteredUsers.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600">
                                  {user.username.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">
                                  {user.username}
                                </p>
                                {/* <p className="text-sm text-gray-600 capitalize">
                                  {user.skillLevel}
                                </p> */}
                              </div>
                            </div>
                            <button
                              onClick={() => handleAddFriend(user)}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Add
                            </button>
                          </div>
                        ))}
                        {filteredUsers.length === 0 && (
                          <p className="text-gray-500 text-sm text-center py-4">
                            No friends found
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Selected Friends ({selectedFriends.length})
                    </h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedFriends.map((friend) => (
                        <div
                          key={friend.id}
                          className="flex items-center justify-between p-2 bg-blue-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">
                                {friend.username.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                {friend.username}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveFriend(friend.id)}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      {selectedFriends.length === 0 && (
                        <p className="text-gray-500 text-sm text-center py-4">
                          No friends selected
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <p>You will be the leader of this game</p>
                  <p>Game will be visible to all users once created</p>
                </div>
                <button
                  onClick={handleCreateGame}
                  disabled={isCreating}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                    isCreating
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {isCreating ? "Creating Game..." : "Create Game"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
