import React, { useContext, useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { createBackendActor } from "../config/backend";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Starea utilizatorului
  const [backendActor, setBackendActor] = useState(null); // Actorul backend
  const [identity, setIdentity] = useState(null); // Identitatea utilizatorului
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Starea autentificării

  // Funcția de login
  const login = async () => {
    try {
      const authClient = await AuthClient.create();
      await authClient.login({
        identityProvider: "https://identity.ic0.app", // URL-ul Internet Identity
        onSuccess: async () => {
          console.log("User successfully logged in!");
          await initializeAuth(authClient);
        },
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Funcția de logout
  const logout = async () => {
    try {
      const authClient = await AuthClient.create();
      await authClient.logout();
      setUser(null);
      setBackendActor(null);
      setIdentity(null);
      setIsAuthenticated(false);
      localStorage.removeItem("authUser"); // Șterge datele utilizatorului din localStorage
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Funcția de inițializare a autentificării
  const initializeAuth = async (authClient) => {
    try {
      const authenticated = await authClient.isAuthenticated();

      if (!authenticated) {
        console.log("User is not authenticated.");
        return;
      }

      const identity = authClient.getIdentity();
      if (!identity) {
        console.error("Failed to retrieve identity.");
        return;
      }

      console.log("User identity:", identity.getPrincipal().toText());

      // Creează actorul backend folosind identitatea utilizatorului
      const backendActor = createBackendActor(identity); // Nu este nevoie de `await` aici
      setBackendActor(backendActor);
      setIdentity(identity);
      setIsAuthenticated(true);

      // Setează informațiile despre utilizator
      const userData = { username: identity.getPrincipal().toText(), role: "user" };
      setUser(userData);
      localStorage.setItem("authUser", JSON.stringify(userData)); // Salvează utilizatorul în localStorage
    } catch (error) {
      console.error("Failed to initialize authentication:", error);
    }
  };

  // Verifică autentificarea la montarea aplicației
  useEffect(() => {
    const initializeOnMount = async () => {
      try {
        const authClient = await AuthClient.create();
        await initializeAuth(authClient);

        // Reîncarcă utilizatorul din localStorage (dacă există)
        const storedUser = localStorage.getItem("authUser");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to initialize on mount:", error);
      }
    };

    initializeOnMount();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, backendActor, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizat pentru a folosi contextul de autentificare
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
