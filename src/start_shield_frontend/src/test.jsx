// import { useEffect, useState } from "react";
// import { useAuth } from "./context/AppContext"; // Ajustează calea după structura ta
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const { backendActor, login, logout, isAuthenticated, identity } = useAuth();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [age, setAge] = useState(0);
//   const [accessLevel, setAccessLevel] = useState(""); // Default role
//   const [loading, setLoading] = useState(false);
//   const [users, setUsers] = useState([]); // Adaugăm state pentru `users`
//   const navigate = useNavigate();
//   const [userChecked, setUserChecked] = useState(false); // Nouă stare pentru finalizarea verificării

//   // Redirect if authenticated
//   useEffect(() => {
//     console.log("Auth state:", { isAuthenticated, identity });
//     if (isAuthenticated) {
//       checkUser();
//     }
//   }, [isAuthenticated]);

//   // Fetch users when component mounts
//   useEffect(() => {
//     if (isAuthenticated && identity) {
//       checkUser();
//     }
//   }, [isAuthenticated, identity]);


//   // Fetch all users
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const allUsers = await backendActor.getAllUsers(); // Presupunem că există metoda `getAllUsers`
//       setUsers(allUsers);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Check if the user already exists
//   useEffect(() => {
//     if (isAuthenticated && identity && backendActor) {
//       checkUser();
//     }
//   }, [isAuthenticated, identity, backendActor]);

//   const checkUser = async () => {
//     try {
//       setLoading(true);
//       const principal = await identity.getPrincipal();
//       console.log("Checking user for principal:", principal);

//       const user = await backendActor.getUserByPrincipal(principal);
//       console.log("User found:", user);

//       // Dacă user este un array gol, considerăm că utilizatorul nu există
//       if (user && user.length > 0) {
       
//         const role = Object.keys(user[0].accessLevel || {})[0]; // Presupunem că user[0] conține datele utilizatorului

//         if (role === "SUPER_ADMIN") { // Verifică exact valoarea pentru rolul Admin
//           navigate("/s-a-dashboard");
//         }else if (role === "ADMIN") {
//           navigate("/a-dashboard");
//         }else if (role === "USER") {
//           navigate("/u-dashboard");
//         }
//         else if (role === "GUEST") {
//           navigate("/ ")
//         }
//       } else {
//         console.log("User does not exist. Redirecting to signup.");
//         navigate("/createAccountSignIn");
//       }
//     } catch (error) {
//       console.error("Error checking user:", error);
//     } finally {
//       setLoading(false);
//       setUserChecked(true); // Marchează verificarea ca finalizată
//     }
//   };

//   // Evită afișarea interfeței până când utilizatorul este verificat
//   if (loading || (isAuthenticated && !userChecked)) {
//     return <div className="text-center">Loading...</div>;
//   }



//   // Submit new user
//   const submit = async (e) => {
//     e.preventDefault();
  
//     // Validarea câmpurilor obligatorii
//     if (!name || !email || !age || !accessLevel) {
//       alert("Please fill in all fields!");
//       return;
//     }
  
//     if (backendActor) {
//       try {
//         setLoading(true);
  
//         // Crearea obiectului utilizator
//         const user = {
//           name,
//           email,
//           age: BigInt(age),
//           accessLevel: { [accessLevel]: null }, // Nivelul de acces este un obiect
//           timestamp: BigInt(Date.now()),
//         };
  
//         // Obținerea principalului utilizatorului curent
//         const principal = await identity.getPrincipal();
  
//         // Crearea utilizatorului în backend
//         await backendActor.createUser(principal, user);
  
//         // Reîmprospătarea listei de utilizatori
//         await fetchUsers();
  
//         // Navigare în funcție de nivelul de acces
//         switch (accessLevel) {
//           case "ADMIN":
//             navigate("/a-dashboard");
//             break;
//           case "USER":
//             navigate("/u-dashboard");
//             break;
//           case "SUPER-ADMIN":
//             navigate("/s-a-dashboard");
//             break;
//           default:
//             console.error("Unknown access level:", accessLevel);
//             navigate("/");
//         }
  
//         // Confirmare succes
//         alert("User successfully added!");
//       } catch (error) {
//         console.error("Error adding user:", error);
//         alert("An error occurred while adding the user. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       console.error("Backend actor is not available!");
//       alert("Backend actor is not initialized. Please check your setup.");
//     }
//   };
  

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="/">
//             <img
//               className="logo"
//               src="/assets/images/start-shield-black-logo.jpg"
//               alt="StartShield Logo"
//             />
//           </a>
//           {isAuthenticated && (
//             <button className="btn btn-danger" onClick={logout}>
//               Logout
//             </button>
//           )}
//         </div>
//       </nav>

//       {/* Main content */}
//       <main className="container mt-5">
//         {isAuthenticated ? (
//           <div>
//             <h1 className="mb-4">Welcome to the User App!</h1>

//             {/* Add User Form */}
//             <div className="card p-4 mb-4">
//               <h2>Add a User</h2>
//               <form onSubmit={submit}>
//                 <div className="mb-3">
//                   <label htmlFor="name" className="form-label">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     className="form-control"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     className="form-control"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="age" className="form-label">
//                     Age
//                   </label>
//                   <input
//                     type="number"
//                     id="age"
//                     className="form-control"
//                     value={age}
//                     onChange={(e) => setAge(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="accessLevel" className="form-label">
//                     Access Level
//                   </label>
//                   <select
//                     id="accessLevel"
//                     className="form-select"
//                     value={accessLevel}
//                     onChange={(e) => setAccessLevel(e.target.value)}
//                     required
//                   >
//                     <option value="USER">User</option>
//                     <option value="GUEST">Guest</option>
//                     <option value="ADMIN">Admin</option>
//                     <option value="SUPER_ADMIN">Super Admin</option>
//                   </select>
//                 </div>
//                 <button type="submit" className="btn btn-primary" disabled={loading}>
//                   {loading ? "Saving..." : "Save"}
//                 </button>
//               </form>
//             </div>

//             {/* Display Registered Users */}
//             <div>
//               <h2>Registered Users</h2>
//               {users.length > 0 ? (
//                 <div className="row">
//                   {users.map((user, index) => (
//                     <div key={index} className="col-md-4">
//                       <div className="card mb-3 p-3">
//                         <h5>{user.name}</h5>
//                         <p>Email: {user.email}</p>
//                         <p>Age: {user.age.toString()}</p>
//                         <p>Access Level: {Object.keys(user.accessLevel)[0]}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>No users found.</p>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="text-center">
//             {isAuthenticated ? (
//               <div className="text-center">
//                 <h1>Welcome! Redirecting...</h1>
//               </div>
//             ) : (
//               <div className="text-center">
//                 <h1>Login to Access the App</h1>
//                 <button className="btn btn-primary" onClick={login}>
//                   Login
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default Login;



import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Wrapper from './components/Wrapper';
import Homepage from './components/Homepage/index';
import InsuranceSolutions from './components/InsuranceSolutions/BopPage.jsx';
import TokenizationAndStaking from './components/TokenizationAndStaking/index';
import GovernancePortal from './components/GovernancePortal/GovernancePortal';
import EducationalResources from './components/EducationalResources/EducationalResources';
import BlogNews from './components/BlogNews/BlogNews';
import AboutUs from './components/AboutUs/AboutUs';
import LegalCompliance from './components/LegalCompliance/LegalCompliance';
import CheckPriceInsurance from './components/CheckPriceInsurance/index.jsx';
// import SignUp from './components/CreateAccount/index.jsx';  // Only one import for SignUp
import Login from './login.jsx';
import { WelcomePage } from './components/Welcome/welcome.jsx';
import ViewPolicies from './components/InsuranceSolutions/ViewPolicies';
import RenewPolicy from './components/InsuranceSolutions/RenewPolicy';
import TokenManagement from './components/InsuranceSolutions/TokenManagement.jsx';
import Claims from './components/InsuranceSolutions/Claims.jsx';
import GetQuote from './components/InsuranceSolutions/GetQuote.jsx';
import SuperAdminDashboard1 from './components/SuperAdmin/SADasboard.jsx';
import AdminDashboard1 from './components/NewAD/ADasboard.jsx';
import UserDashboard1 from './components/newUserD/UDasboard.jsx';
import AppSuperAdmin from './AppSuperAdmin.jsx'
import AppAdmin from './AppAdmin.jsx'; // Import the new AppAdmin component
import AppUser from './AppUser.jsx';
import Alb from './components/InsuranceSolutions/Albcolor.jsx';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <Router>
      <AppContent userInfo={userInfo} setUserInfo={setUserInfo} />
    </Router>
  );
}

function AppContent({ userInfo, setUserInfo }) {
  const location = useLocation();

  const handleLogin = (user) => {
    setUserInfo(user); // Setează datele utilizatorului după login
  };

  // Verifică ruta pentru a afișa navbar-ul corect
  const isSuperAdminDashboard = location.pathname === '/s-a-dashboard';
  const isAdminDashboard = location.pathname === '/a-dashboard';
  const isUserDashboard = location.pathname === '/u-dashboard';

  return (
    <>
      {/* Verifică dacă utilizatorul este Admin sau User pentru a decide ce să afișezi */}
      {isAdminDashboard ? (
        <AppAdmin /> // Renders the admin-specific app if the path matches
      ) : isUserDashboard ? (
        <AppUser /> // Afișează aplicația User dacă rolul și URL-ul se potrivesc
      )  : isSuperAdminDashboard ? (
        <AppSuperAdmin /> // Afișează aplicația User dacă rolul și URL-ul se potrivesc
      ) : (
        <div>
          <NavBar userInfo={userInfo} />
          <Wrapper>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/insuranceSolution" element={<InsuranceSolutions />} />
              <Route path="/tokenizationAndStaking" element={<TokenizationAndStaking />} />
              <Route path="/governancePortal" element={<GovernancePortal />} />
              <Route path="/educationalResources" element={<EducationalResources />} />
              <Route path="/blogNews" element={<BlogNews />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/legalCompliance" element={<LegalCompliance />} />
              {/* <Route path="/SignUp" element={<SignUp />} /> */}
              <Route path="/createAccountSignIn" element={<Login onLogin={handleLogin} />} />
              <Route path="/checkPriceInsurance" element={<CheckPriceInsurance />} />
              <Route path="/" element={<WelcomePage />} />
              <Route path="/view-policies" element={<ViewPolicies />} />
              <Route path="/renew-policy" element={<RenewPolicy />} />
              <Route path="/token-management" element={<TokenManagement />} />
              <Route path="/claims" element={<Claims />} />
              <Route path="/get-quote" element={<GetQuote />} />
              <Route path="/alb" element={<Alb />} />

              {/* Redirecționează către dashboard-uri doar dacă utilizatorul e autentificat */}
              {userInfo && userInfo.role === 'SUPER_ADMIN' && (
                <Route path="/s_a-dashboard" element={<SuperAdminDashboard1 />} />
              )}
              {userInfo && userInfo.role === 'Admin' && (
                <Route path="/a-dashboard" element={<AdminDashboard1 />} />
              )}
              {userInfo && userInfo.role === 'User' && (
                <Route path="/u-dashboard" element={<UserDashboard1 />} />
              )}
            </Routes>
          </Wrapper>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;