"use client";
import { AvailableGames } from "@/components/sections/AvailableGames";
import { CreateGame } from "@/components/sections/CreateGame";
import { MyTeams } from "@/components/sections/MyTeams";
import { ClientOnly } from "@/components/ClientOnly";

export default function Home() {
  const currentUserId = "1";

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <ClientOnly
          fallback={
            <div className="py-8">
              <div className="container mx-auto px-4">
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">⏳</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Loading...
                  </h3>
                  <p className="text-gray-500">
                    Please wait while we load the application
                  </p>
                </div>
              </div>
            </div>
          }
        >
          <AvailableGames currentUserId={currentUserId} />
          <CreateGame currentUserId={currentUserId} />
          <MyTeams currentUserId={currentUserId} />
        </ClientOnly>
      </main>
    </div>
  );
}
