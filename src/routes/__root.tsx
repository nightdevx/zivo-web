import { Link, createRootRouteWithContext } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { AuthContext, useAuth } from "@/auth";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: AuthContext;
}>()({
  notFoundComponent: () => {
    const { isAuthenticated } = useAuth();

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-6 text-lg text-gray-600">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to={isAuthenticated ? "/dashboard" : "/login"}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    );
  },
});
