import { createContext, useContext, useMemo, ReactNode, useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage.ts";
import { getUserInfo } from "../api/users.api.ts";
import { User } from "../types.ts"; // Import your User type

interface AuthContextType {
  user_id: string | null;
  jwt: string | null;
  refresh_token: string | null;
  user: User | null;  // Use the imported User type
  login: (data: { tokens: { access: string; refresh: string }; id: string }) => void;
  logout: () => void;
  forceLogout: (error: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user_id, setUserId] = useLocalStorage<string | null>("user_id", null);
  const [jwt, setJwt] = useLocalStorage<string | null>("jwt", null);
  const [refresh_token, setRefreshToken] = useLocalStorage<string | null>("refresh_token", null);
  const [user, setUser] = useState<User | null>(null);  // Use User type

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (jwt && user_id && !user) {
        try {
          const response = await getUserInfo(jwt);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user info:", error);
          logout();  // Optionally force a logout if fetching the user info fails
        }
      }
    };

    fetchUserInfo();
  }, [jwt, user_id, user]);

  const login = async (data: { tokens: { access: string; refresh: string }; id: string }) => {
    setJwt(data.tokens.access);
    setRefreshToken(data.tokens.refresh);
    setUserId(data.id);
    try {
      const response = await getUserInfo(data.tokens.access);  // Fetch user info after login
      setUser(response.data);  // Set the user info (like role)
    } catch (error) {
      console.error("Failed to fetch user info during login:", error);
      logout();  // Optionally log out if fetching the user info fails
    }
  };

  const logout = () => {
    setUserId(null);
    setJwt(null);
    setRefreshToken(null);
    setUser(null);  // Clear the user info on logout
  };

  const forceLogout = (error: any) => {
    if (error.response?.status === 401) {
      logout();
    }
  };

  const value = useMemo(
    () => ({
      user_id,
      jwt,
      refresh_token,
      user, // Add user to the context value
      login,
      logout,
      forceLogout,
    }),
    [user_id, jwt, refresh_token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
