import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

type User = {
  _id: string;
  name: string;
  email: string;
  wishlist?: string[];
  wanderlustPoints: number;
  loyaltyTier: string;
  role?: string;
  createdAt?: string;
} | null;

type AuthContextType = {
  user: User;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  toggleWishlist: (tourId: string) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await API.get("/auth/me");
          setUser(res.data);
        } catch (error) {
          console.error("Token invalid", error);
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = (userData: User, newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const toggleWishlist = async (tourId: string) => {
    if (!user || !token) return;
    try {
      const res = await API.post("/auth/wishlist/toggle", { tourId });
      setUser((prevUser) => prevUser ? { ...prevUser, wishlist: res.data.wishlist } : null);
    } catch (error) {
      console.error("Failed to toggle wishlist", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, toggleWishlist, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};