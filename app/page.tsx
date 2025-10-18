"use client";
import { AvailableGames } from "@/components/sections/AvailableGames";
import { CreateGame } from "@/components/sections/CreateGame";
import { MyTeams } from "@/components/sections/MyTeams";
import { ClientOnly } from "@/components/ClientOnly";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Loading...
          </h3>
          <p className="text-gray-500">
            Please wait while we load the application
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to 13 Teams
          </h2>
          <p className="text-gray-600 mb-8">
            The ultimate platform for scheduling sports games and connecting
            with fellow athletes.
          </p>
          <p className="text-sm text-gray-500">
            Please sign in to access the platform features.
          </p>
        </div>
      </div>
    );
  }

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
          <AvailableGames currentUserId={user.uid} />
          <CreateGame currentUserId={user.uid} />
          <MyTeams currentUserId={user.uid} />
        </ClientOnly>
      </main>
    </div>
  );
}
