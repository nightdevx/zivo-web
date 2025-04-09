import * as React from "react";
import AuthService from "./lib/services/auth.service";
import { useAccessKey } from "./lib/stores/access-key.store";

export interface AuthContext {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: string | null;
}

const AuthContext = React.createContext<AuthContext | null>(null);

const key = "tanstack.auth.user";

function getStoredUser() {
  return localStorage.getItem(key);
}

function setStoredUser(user: string | null) {
  if (user) {
    localStorage.setItem(key, user);
  } else {
    localStorage.removeItem(key);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<string | null>(getStoredUser());
  const isAuthenticated = !!user;
  const accessKeyStore = useAccessKey();

  const logout = React.useCallback(async () => {
    try {
      await AuthService.logout();
      setStoredUser(null);
      setUser(null);
      accessKeyStore.setState(() => null); // Clear access token
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [accessKeyStore]);

  const login = React.useCallback(
    async (email: string, password: string) => {
      try {
        const response = await AuthService.login(email, password);
        const username = response?.user?.name || email; // Adjust based on API response
        const accessToken = response?.accessToken; // Adjust based on API response

        setStoredUser(username);
        setUser(username);

        if (accessToken) {
          accessKeyStore.setState(() => accessToken); // Store access token
        }
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    [accessKeyStore]
  );

  React.useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
