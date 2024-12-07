import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    FC,
  } from "react";
  import {
    AuthClient,
  } from "@dfinity/auth-client";
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
    const [backendActor, setBackendActor] =
      useState(null);
    const [identity, setIdentity] = useState(null);

    useEffect(() => {
      AuthClient.create(options.createOptions).then(async (client) => {
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
      const isAuthenticated = await client.isAuthenticated();
      setIsAuthenticated(isAuthenticated);
  
      setAuthClient(client);
  
      const _identity = client.getIdentity();
      setIdentity(_identity);

      let agent = new HttpAgent({
        host: network === "local" ? localhost : host,
        identity: _identity,
      });
  
      if (network === "local") {
        agent.fetchRootKey();
      }
  
      const _backendActor = Actor.createActor(
        idlFactory,
        {
          agent,
          canisterId: canisterId,
        }
      );
      setBackendActor(_backendActor);
    }
  
    
  
    async function logout() {
      await authClient?.logout();
      if (authClient) {
        await updateClient(authClient);
      }
    }
  
    return {
      isAuthenticated,
      backendActor,
      login,
      logout,
      identity,
    };
  };
  

  export const AuthProvider = ({ children }) => {
    const auth = useAuthClient();
  
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
  };
  
  export const useAuth = () => useContext(AuthContext);
  