import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/parts/navbar/navbar";
import { ThemeProvider } from "./components/themeProvider";
import { UserContext } from "./contexts/userContext";
import { useNavigate } from "react-router-dom";
import type { IProfile } from "./components/types/profile";

const App: React.FC = () => {
  const [id, setId] = useState(Number(localStorage.getItem("id")) || null);
  const [profile, setProfile] = useState<IProfile | null>(null);
  const navigate = useNavigate();
  function handleId(id: number) {
    setId(id);
    localStorage.setItem("id", String(id));
  }
  function handleProfile(id: number, username: string, email: string) {
    setProfile({ id, username, email });
  }
  function removeId() {
    setId(null);
    localStorage.removeItem("id");
  }
  useEffect(() => {
    if (!id) {
      navigate("/login");
    }
  }, []);
  return (
    <UserContext.Provider
      value={{
        id: Number(id),
        setId: handleId,
        removeId: removeId,
        profile: profile,
        handleProfile: handleProfile,
      }}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Outlet />
      </ThemeProvider>
    </UserContext.Provider>
  );
};
export default App;
