import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId as iiCanId } from "../../../declarations/internet_identity";
import { Actor, HttpAgent } from "@dfinity/agent";
import { canisterId, idlFactory } from "../../../declarations/start_shield_backend";

const network = process.env.DFX_NETWORK || "local";
const localhost = "http://localhost:4943";
const host = "https://icp0.io";

const initialContext = {
  identity: null,
  backendActor: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
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
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [authClient, setAuthClient] = useState(null);
  const [backendActor, setBackendActor] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // Inițializează AuthClient la montare
  useEffect(() => {
    AuthClient.create(options.createOptions).then((client) => {
      updateClient(client);
    });
  }, []);

  const login = () => {
    authClient?.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient);
      },
    });
  };

  async function updateClient(client) {
    const authenticated = await client.isAuthenticated();
    setIsAuthenticated(authenticated);

    setAuthClient(client);

    const _identity = client.getIdentity();
    console.log("Identity:", _identity); // Log pentru a verifica identitatea
    setIdentity(_identity);

    const agent = new HttpAgent({
      host: network === "local" ? localhost : host,
      identity: _identity,
    });

    if (network === "local") {
      await agent.fetchRootKey();
    }

    const _backendActor = Actor.createActor(idlFactory, {
      agent,
      canisterId,
    });
    setBackendActor(_backendActor);

    if (authenticated) {
      fetchUserInfo(_backendActor, _identity);
    }
  }

  const fetchUserInfo = async (_backendActor = backendActor, _identity = identity) => {
    if (_backendActor && _identity) {
      try {
        const userData = await _backendActor.getUserByPrincipal(_identity.getPrincipal());
        if (userData) {
          const role = Object.keys(userData[0]?.accessLevel || {})[0]; // Determină rolul utilizatorului
          setUserInfo({ ...userData[0], role });
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    }
  };

  const logout = async () => {
    await authClient?.logout();
    if (authClient) {
      await updateClient(authClient);
      setUserInfo(null); // Resetează informațiile despre utilizator
    }
  };

  return {
    isAuthenticated,
    backendActor,
    login,
    logout,
    identity,
    userInfo,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
