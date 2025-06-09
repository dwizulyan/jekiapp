import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/parts/navbar/navbar";
import { ThemeProvider } from "./components/themeProvider";
import { UserContext } from "./contexts/userContext";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import type { IProfile } from "./components/types/profile";

const App: React.FC = () => {
  const [id, setId] = useState(Number(localStorage.getItem("id")) || null);
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [error, setError] = useState<string>("");
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

  async function checkToken(id: number) {
    try {
      const check = await fetch(
        `http://${import.meta.env.VITE_IP_SERVER}:3000/users/me`,
        {
          credentials: "include",
          method: "POST",
          body: JSON.stringify({
            id: id,
          }),
        }
      );
      if (!check) {
        throw new Error("Error while fetching data");
      }
      const res = await check.json();
      if (!res.success) {
        setError(res.message);
      }
      setProfile(res.profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown Error");
    }
  }
  useEffect(() => {
    async function call() {
      if (!id) {
        navigate("/login");
      } else {
        await checkToken(id);
      }
    }
    call();
  }, []);
  useEffect(() => {
    function callError(error: string) {
      error !== "" ? toast.error(error) : "";
    }
    callError(error);
  }, [error]);
  return (
    <UserContext.Provider
      value={{
        id: Number(id),
        setId: handleId,
        removeId: removeId,
        profile: profile,
        handleProfile: handleProfile,
        error: error,
        setError: setError,
      }}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster position="top-center" />
        <Navbar />
        <Outlet />
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
