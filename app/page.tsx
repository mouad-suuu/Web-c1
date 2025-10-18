"use client";
import { AvailableGames } from "@/components/sections/AvailableGames";
import { CreateGame } from "@/components/sections/CreateGame";
import { MyTeams } from "@/components/sections/MyTeams";

export default function Home() {
  const currentUserId = "1";

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <AvailableGames currentUserId={currentUserId} />
        <CreateGame currentUserId={currentUserId} />
        <MyTeams currentUserId={currentUserId} />
      </main>
    </div>
  );
}
