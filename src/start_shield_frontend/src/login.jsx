import { useEffect, useState } from "react";
import { useAuth } from "./context/AppContext"; // Ajustează calea după structura ta
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
// import { FeCompositeElement } from "../dist/assets/index.es-9cd05e67";

function Login() {
  const { backendActor, login, logout, isAuthenticated, identity } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [accessLevel, setAccessLevel] = useState(""); // Default role
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]); // Adaugăm state pentru `users`
  const navigate = useNavigate();
  const [userChecked, setUserChecked] = useState(false); // Nouă stare pentru finalizarea verificării

  useEffect(() => {
    console.log("Auth state:", { isAuthenticated, identity });
    if (isAuthenticated) {
      checkUser();
      console.log("Calling fetchUsers...");
    }
  }, [isAuthenticated]);
  // Fetch users when component mounts
  useEffect(() => {
    if (isAuthenticated && identity) {
      checkUser();
      console.log("Calling fetchUsers...");
    }
  }, [isAuthenticated, identity]);
  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const allUsers = await backendActor.getAllUsers(); // Presupunem că există metoda `getAllUsers`
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  // Check if the user already exists
  useEffect(() => {
    if (isAuthenticated && identity && backendActor) {
      checkUser();
    }
  }, [isAuthenticated, identity, backendActor]);
  const checkUser = async () => {
    try {
      setLoading(true);
      const principal = await identity.getPrincipal();
      console.log("Checking user for principal:", principal);
      const user = await backendActor.getUserByPrincipal(principal);
      console.log("User found:", user);
      // Dacă user este un array gol, considerăm că utilizatorul nu există
      if (user && user.length > 0) {
        const role = Object.keys(user[0].accessLevel || {})[0]; // Presupunem că user[0] conține datele utilizatorului
        if (role === "SUPER_ADMIN") { // Verifică exact valoarea pentru rolul Admin
          navigate("/s-a-dashboard");
        } else if (role === "ADMIN") {
          navigate("/a-dashboard");
        } else if (role === "USER") {
          navigate("/u-dashboard");
        }
        else if (role === "GUEST") {
          navigate("/ ")
        }
      } else {
        console.log("User does not exist. Redirecting to signup.");
        navigate("/createAccountSignIn");
      }
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setLoading(false);
      setUserChecked(true); // Marchează verificarea ca finalizată
    }
  };

  // Evită afișarea interfeței până când utilizatorul este verificat
  if (loading || (isAuthenticated && !userChecked)) {
    return <div className="text-center">Loading...</div>;
  }

  const submit = async (e) => {
    e.preventDefault();

    // Validarea câmpurilor obligatorii
    if (!name || !email || !age || !accessLevel) {
      alert("Please fill in all fields!");
      return;
    }

    if (backendActor) {
      try {
        setLoading(true);

        // Crearea obiectului utilizator
        const user = {
          name,
          email,
          age: BigInt(age),
          accessLevel: { [accessLevel]: null }, // Nivelul de acces este un obiect
          status: accessLevel === "ADMIN" ? "pending" : "approved", // Setăm statusul ca "pending" pentru admin
          timestamp: BigInt(Date.now()),
        };
        // Obținerea principalului utilizatorului curent
        const principal = await identity.getPrincipal();
        // Crearea utilizatorului în backend
        await backendActor.createUser(principal, user);
        // Reîmprospătarea listei de utilizatori
        await fetchUsers();
        // Navigare în funcție de nivelul de acces
        switch (accessLevel) {
          case "ADMIN":
            alert("Your account is pending approval by a Super Admin.");
            break;
          case "USER":
            navigate("/u-dashboard");
            break;
          case "SUPER-ADMIN":
            navigate("/s-a-dashboard");
            break;
          default:
            console.error("Unknown access level:", accessLevel);
            navigate("/");
        }
        // Confirmare succes
        alert("User successfully added!");
      } catch (error) {
        console.error("Error adding user:", error);
        alert("An error occurred while adding the user. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Backend actor is not available!");
      alert("Backend actor is not initialized. Please check your setup.");
    }
    if (!backendActor) {
      console.error("Backend actor is not initialized!");
      alert("Backend actor is not initialized. Please check your setup.");
      return;
    }
    if (!identity) {
      console.error("Identity is not initialized!");
      alert("Identity is not initialized. Please check your setup.");
      return;
    }
    try {
      const principal = await identity.getPrincipal();
      console.log("Principal:", principal);
      console.log("Creating user:", users);
      await backendActor.createUser(principal, users);
      console.log("User created successfully", principal.toText());
    } catch (error) {
      console.error("Error from backend:", error);
      alert("An error occurred while adding the user. Please try again.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              className="logo"
              src="/assets/images/start-shield-black-logo.jpg"
              alt="StartShield Logo"
            />
          </a>
          {isAuthenticated && (
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </nav>
      {/* Main content */}
      <main className="container mt-5">
        {isAuthenticated ? (
          <div>
            <h1 className="mb-4">Welcome to the User App!</h1>
            {/* Add User Form */}
            <div className="card p-4 mb-4">
              <h2>Add a User</h2>
              <form onSubmit={submit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="age" className="form-label">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    className="form-control"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="accessLevel" className="form-label">
                    Access Level
                  </label>
                  <select
                    id="accessLevel"
                    className="form-select"
                    value={accessLevel}
                    onChange={(e) => setAccessLevel(e.target.value)}
                    required
                  >
                    <option value="USER">User</option>
                    <option value="GUEST">Guest</option>
                    <option value="ADMIN">Admin</option>
                    <option value="SUPER_ADMIN">Super Admin</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </button>
              </form>
            </div>
            {/* Display Registered Users */}
            <div>
              <h2>Registered Users</h2>
              {users.length > 0 ? (
                <div className="row">
                  {users.map((user, index) => (
                    <div key={index} className="col-md-4">
                      <div className="card mb-3 p-3">
                        <h5>{user.name}</h5>
                        <p>Email: {user.email}</p>
                        <p>Age: {user.age.toString()}</p>
                        <p>Access Level: {Object.keys(user.accessLevel)[0]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No users found.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            {isAuthenticated ? (
              <div className="text-center">
                <h1>Welcome! Redirecting...</h1>
              </div>
            ) : (
              <div className="text-center">
                <h1>Login to Access the App</h1>
                <button className="btn btn-primary" onClick={login}>
                  Login
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Login;

