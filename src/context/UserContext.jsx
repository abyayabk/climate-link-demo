import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // 1. Initialize state directly from localStorage (Lazy Initializer)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("userPrefs");
    return saved ? JSON.parse(saved) : {
      language: "en",
      role: "general",
      region: "lagos"
    };
  });

  const [theme, setTheme] = useState(true);

  // 2. We only need ONE useEffect to keep localStorage in sync
  useEffect(() => {
    localStorage.setItem("userPrefs", JSON.stringify(user));
  }, [user]);

  // 3. Apply theme to HTML tag correctly (forcing string/class)
  useEffect(() => {
    if (theme) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  return (
    <UserContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </UserContext.Provider>
  );
};

// custom hook (clean usage)
export const useUser = () => useContext(UserContext);