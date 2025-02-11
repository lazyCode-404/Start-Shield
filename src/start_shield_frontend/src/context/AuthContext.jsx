// import React, { createContext, useState, useContext } from 'react';

// // Create the Auth Context
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Initially, no user is logged in

//   const login = (username, role) => {
//     setUser({ username, role });
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useState, useContext, useEffect } from "react";

// // Creăm contextul de autentificare
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Starea utilizatorului (inițial null)

//   // Funcția de login
//   const login = (username, role) => {
//     const userData = { username, role };
//     setUser(userData); // Setează utilizatorul în starea locală
//     localStorage.setItem("authUser", JSON.stringify(userData)); // Salvează utilizatorul în localStorage
//   };

//   // Funcția de logout
//   const logout = () => {
//     setUser(null); // Resetează starea utilizatorului
//     localStorage.removeItem("authUser"); // Șterge datele utilizatorului din localStorage
//   };

//   // Reîncarcă starea utilizatorului din localStorage la montarea componentelor
//   useEffect(() => {
//     const storedUser = localStorage.getItem("authUser");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser)); // Setează utilizatorul din localStorage în starea aplicației
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook personalizat pentru a folosi contextul de autentificare
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// async function updateClient(client) {
//   if (!await client.isAuthenticated()) {
//     console.log("User is not authenticated. Redirecting to login...");
//     await client.login({
//       identityProvider: defaultOptions.loginOptions.identityProvider,
//       onSuccess: () => updateClient(client),
//     });
//     return; // Oprește execuția până când utilizatorul se autentifică
//   }

//   const authenticated = await client.isAuthenticated();
//   setIsAuthenticated(authenticated);

//   const _identity = client.getIdentity();
//   console.log("Identity:", _identity ? _identity.getPrincipal().toText() : "No identity");
//   setIdentity(_identity);

//   const agent = new HttpAgent({
//     host: network === "local" ? localhost : host,
//     identity: _identity,
//   });

//   if (network === "local") {
//     await agent.fetchRootKey();
//   }

//   const _backendActor = Actor.createActor(idlFactory, {
//     agent,
//     canisterId,
//   });
//   setBackendActor(_backendActor);

//   if (authenticated) {
//     fetchUserInfo(_backendActor, _identity);
//   }
// };

// import React, { createContext, useState, useContext, useEffect } from "react";
// import { createBackendActor } from "../config/backend"; // Importă funcția pentru crearea actorului backend

// // Creăm contextul de autentificare
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Starea utilizatorului (inițial null)
//   const [backendActor, setBackendActor] = useState(null); // Actorul backend
//   const [identity, setIdentity] = useState(null); // Identitatea utilizatorului

//   // Funcția de login
//   const login = (username, role) => {
//     const userData = { username, role };
//     setUser(userData); // Setează utilizatorul în starea locală
//     localStorage.setItem("authUser", JSON.stringify(userData)); // Salvează utilizatorul în localStorage
//   };

//   // Funcția de logout
//   const logout = () => {
//     setUser(null); // Resetează starea utilizatorului
//     setBackendActor(null); // Resetează actorul backend
//     setIdentity(null); // Resetează identitatea utilizatorului
//     localStorage.removeItem("authUser"); // Șterge datele utilizatorului din localStorage
//   };

//   // Reîncarcă starea utilizatorului din localStorage la montarea componentelor
//   useEffect(() => {
//     const storedUser = localStorage.getItem("authUser");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser)); // Setează utilizatorul din localStorage în starea aplicației
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout, backendActor }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook personalizat pentru a folosi contextul de autentificare
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // Funcția `updateClient` pentru gestionarea autentificării și inițializarea actorului backend
// export async function updateClient(authClient) {
//   const authenticated = await authClient.isAuthenticated();
  
//   if (!authenticated) {
//     console.log("User is not authenticated. Redirecting to login...");
//     await authClient.login({
//       identityProvider: "https://identity.ic0.app",
//       onSuccess: () => updateClient(authClient), // Reapelează `updateClient` după autentificare
//     });
//     return; // Oprește execuția până când utilizatorul se autentifică
//   }

//   // Obține identitatea utilizatorului după autentificare
//   const identity = authClient.getIdentity();
  
//   if (!identity) {
//     console.error("Failed to retrieve identity.");
//     return;
//   }

//   console.log("User identity:", identity.getPrincipal().toText());

//   // Creează actorul backend folosind identitatea utilizatorului
//   try {
//     const backendActor = await createBackendActor(identity);
//     console.log("Backend actor initialized:", backendActor);

//     // Poți seta actorul și identitatea într-un context global sau într-o stare locală (dacă este necesar)
//     setBackendActor(backendActor);
//     setIdentity(identity);
    
//     return { backendActor, identity }; // Returnează actorul și identitatea pentru utilizare ulterioară
//   } catch (error) {
//     console.error("Failed to initialize backend actor:", error);
//   }
// }


// import React, { createContext, useState, useContext, useEffect } from "react";
// import { createBackendActor } from "../config/backend"; // Importă funcția pentru crearea actorului backend
// import { AuthClient } from "@dfinity/auth-client"; // Importă AuthClient pentru autentificare

// // Creăm contextul de autentificare
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Starea utilizatorului (inițial null)
//   const [backendActor, setBackendActor] = useState(null); // Actorul backend
//   const [identity, setIdentity] = useState(null); // Identitatea utilizatorului
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // Starea de autentificare

//   // Funcția de login
//   const login = async () => {
//     const authClient = await AuthClient.create();
//     await authClient.login({
//       identityProvider: "https://identity.ic0.app",
//       onSuccess: async () => {
//         console.log("User successfully logged in!");
//         await initializeAuth(authClient); // Reinitializează autentificarea după login
//       },
//     });
//   };

//   // Funcția de logout
//   const logout = async () => {
//     const authClient = await AuthClient.create();
//     await authClient.logout(); // Deloghează utilizatorul din Internet Identity
//     setUser(null); // Resetează starea utilizatorului
//     setBackendActor(null); // Resetează actorul backend
//     setIdentity(null); // Resetează identitatea utilizatorului
//     setIsAuthenticated(false); // Resetează starea de autentificare
//     localStorage.removeItem("authUser"); // Șterge datele utilizatorului din localStorage
//   };

//   // Funcția pentru a inițializa autentificarea și actorul backend
//   const initializeAuth = async (authClient) => {
//     const authenticated = await authClient.isAuthenticated();

//     if (!authenticated) {
//       console.log("User is not authenticated.");
//       return;
//     }

//     const identity = authClient.getIdentity();
//     if (!identity) {
//       console.error("Failed to retrieve identity.");
//       return;
//     }

//     console.log("User identity:", identity.getPrincipal().toText());

//     try {
//       const backendActor = await createBackendActor(identity);
//       console.log("Backend actor initialized:", backendActor);

//       setBackendActor(backendActor);
//       setIdentity(identity);
//       setIsAuthenticated(true);

//       // Setează informațiile despre utilizator (opțional)
//       const userData = { username: identity.getPrincipal().toText(), role: "user" }; // Exemplu simplu
//       setUser(userData);
//       localStorage.setItem("authUser", JSON.stringify(userData));
//     } catch (error) {
//       console.error("Failed to initialize backend actor:", error);
//     }
//   };

//   // Reîncarcă starea utilizatorului la montarea componentelor
//   useEffect(() => {
//     const initializeOnMount = async () => {
//       const authClient = await AuthClient.create();
//       await initializeAuth(authClient);
//     };

//     initializeOnMount();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout, backendActor, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook personalizat pentru a folosi contextul de autentificare
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
import React, { useContext, useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { createBackendActor } from "../config/backend";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [backendActor, setBackendActor] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Funcția de login
  const login = async () => {
    try {
      const authClient = await AuthClient.create();
      await authClient.login({
        identityProvider: "https://identity.ic0.app",
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
      const backendActor = await createBackendActor(identity);
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
