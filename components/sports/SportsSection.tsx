import { useState } from 'react';
import { FC } from 'react';

type Sport = {
  id: string;
  name: string;
  image: string;
  teams: {
    team1: string[];
    team2: string[];
  };
};

export const SportsSection: FC = () => {
  const [sports, setSports] = useState<Sport[]>([
    {
      id: 'football',
      name: 'Football',
      image: '/sports/football.jpg',
      teams: {
        team1: [],
        team2: []
      }
    },
    {
      id: 'basketball',
      name: 'Basketball',
      image: '/sports/basketball.jpg',
      teams: {
        team1: [],
        team2: []
      }
    },
    {
      id: 'tennis',
      name: 'Tennis',
      image: '/sports/tennis.jpg',
      teams: {
        team1: [],
        team2: []
      }
    },
    {
      id: 'volleyball',
      name: 'Volleyball',
      image: '/sports/volleyball.jpg',
      teams: {
        team1: [],
        team2: []
      }
    },
  ]);

  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');

  const handleCreateTeams = (sportId: string) => {
    if (!team1Name.trim() || !team2Name.trim()) {
      alert('Please enter both team names');
      return;
    }

    setSports(sports.map(sport => 
      sport.id === sportId 
        ? { 
            ...sport, 
            teams: { 
              team1: [team1Name], 
              team2: [team2Name] 
            } 
          } 
        : sport
    ));
    
    setTeam1Name('');
    setTeam2Name('');
    setSelectedSport(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Available Sports</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sports.map((sport) => (
          <div 
            key={sport.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-48 bg-gray-200 relative">
              <img 
                src={sport.image} 
                alt={sport.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{sport.name}</h3>
              </div>
            </div>
            
            <div className="p-4">
              {selectedSport === sport.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Team 1 Name:
                    </label>
                    <input
                      type="text"
                      value={team1Name}
                      onChange={(e) => setTeam1Name(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Enter team 1 name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Team 2 Name:
                    </label>
                    <input
                      type="text"
                      value={team2Name}
                      onChange={(e) => setTeam2Name(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Enter team 2 name"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCreateTeams(sport.id)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      Create Teams
                    </button>
                    <button
                      onClick={() => setSelectedSport(null)}
                      className="px-4 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Teams:</h4>
                    {sport.teams.team1.length > 0 ? (
                      <div className="space-y-2">
                        <div className="bg-gray-100 p-2 rounded">
                          <p className="font-medium">Team 1:</p>
                          <p>{sport.teams.team1[0]}</p>
                        </div>
                        <div className="bg-gray-100 p-2 rounded">
                          <p className="font-medium">Team 2:</p>
                          <p>{sport.teams.team2[0]}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No teams created yet</p>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedSport(sport.id)}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    {sport.teams.team1.length > 0 ? 'Edit Teams' : 'Create Teams'}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
