import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId as iiCanId } from "../../../declarations/internet_identity";
import { Actor, HttpAgent } from "@dfinity/agent";
import { canisterId, idlFactory } from "../../../declarations/start_shield_backend";
import axios from "axios";

const network = process.env.DFX_NETWORK || "local";
const localhost = "http://localhost:4943";
const host = "https://icp0.io";

const initialContext = {
  identity: null,
  backendActor: null,
  isAuthenticated: false,
  login: () => { },
  logout: () => { },
  userInfo: null, // Pentru stocarea informațiilor despre utilizator
};

const AuthContext = createContext(initialContext);

const defaultOptions = {
  createOptions: {
    idleOptions: {
      disableIdle: true,
    },
  },
  loginOptions: {
    identityProvider:
      network === "ic"
        ? "https://identity.ic0.app/#authorize"
        : `http://${iiCanId}.localhost:4943`,
  },
};

export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState(null);
  const [backendActor, setBackendActor] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Inițializează AuthClient la montare
  useEffect(() => {
    AuthClient.create(options.createOptions).then((client) => {
      updateClient(client);
    });
    // eslint-disable-next-line
  }, []);

  const login = () => {
    authClient?.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient);
      },
    });
  };

  const logout = async () => {
    await authClient?.logout();
    if (authClient) {
      await updateClient(authClient);
      setUserInfo(null);
    }
  };

  async function updateClient(client) {
    setLoading(true);
    const authenticated = await client.isAuthenticated();
    setIsAuthenticated(authenticated);
    setAuthClient(client);

    if (authenticated) {
      const _identity = client.getIdentity();
      setIdentity(_identity);

      const agent = new HttpAgent({
        host: network === "local" ? localhost : host,
        identity: _identity,
      });

      // Fetch root key doar pe local
      if (network === "local") {
        try {
          await agent.fetchRootKey();
        } catch (err) {
          console.warn("Unable to fetch root key. Is your local replica running?");
          console.error(err);
        }
      }

      const _backendActor = Actor.createActor(idlFactory, {
        agent,
        canisterId,
      });
      setBackendActor(_backendActor);

      // Fetch user info
      try {
        const userData = await _backendActor.getUserByPrincipal(_identity.getPrincipal());
        if (userData && userData.length > 0) {
          const role = Object.keys(userData[0]?.accessLevel || {})[0];
          setUserInfo({ ...userData[0], role });
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        setUserInfo(null);
        console.error("Failed to fetch user info:", error);
      }
    } else {
      setIdentity(null);
      setBackendActor(null);
      setUserInfo(null);
    }
    setLoading(false);
  }

  return {
    isAuthenticated,
    backendActor,
    login,
    logout,
    identity,
    userInfo,
    loading,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

// Opțional: context pentru mesaje backend (ex: health-check)
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4943/api/health-check")
      .then(response => setBackendMessage(response.data.message))
      .catch(() => setBackendMessage("Eroare de conectare la backend!"));
  }, []);

  return (
    <AppContext.Provider value={{ backendMessage }}>
      {children}
    </AppContext.Provider>
  );
};