export interface Sport {
  id: string;
  name: string;
  icon: string;
  maxPlayers: number;
  description?: string;
}

export const sports: Sport[] = [
  {
    id: "football",
    name: "Football",
    icon: "⚽",
    maxPlayers: 11,
    description: "The beautiful game - 11 players per team",
  },
  {
    id: "basketball",
    name: "Basketball",
    icon: "🏀",
    maxPlayers: 5,
    description: "Fast-paced court game - 5 players per team",
  },
  {
    id: "tennis",
    name: "Tennis",
    icon: "🎾",
    maxPlayers: 4,
    description: "Singles or doubles - up to 4 players",
  },
  {
    id: "volleyball",
    name: "Volleyball",
    icon: "🏐",
    maxPlayers: 6,
    description: "Net sport - 6 players per team",
  },
  {
    id: "badminton",
    name: "Badminton",
    icon: "🏸",
    maxPlayers: 4,
    description: "Racket sport - singles or doubles",
  },
  {
    id: "table-tennis",
    name: "Table Tennis",
    icon: "🏓",
    maxPlayers: 4,
    description: "Ping pong - singles or doubles",
  },
  {
    id: "other",
    name: "Other",
    icon: "❓",
    maxPlayers: 10,
    description: "Custom sport - set your own rules",
  },
];

export const getSportById = (id: string): Sport | undefined => {
  return sports.find((sport) => sport.id === id);
};

export const getSportByName = (name: string): Sport | undefined => {
  return sports.find(
    (sport) => sport.name.toLowerCase() === name.toLowerCase()
  );
};
