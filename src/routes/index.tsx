import { useAuth } from "@/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    navigate({
      to: isAuthenticated ? "/dashboard" : "/login",
    });
  }, [isAuthenticated, navigate]);

  return null; // Optionally render a loading state or nothing
}
