// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AdminNavbar.css';
// import logo from '../../../public/assets/images/start-shield-black-logo.jpg';
// import { FaUserCircle, FaSearch, FaBell, FaSignOutAlt, FaCog, FaHome } from 'react-icons/fa';
// import Hero from "../Hero";
// import imag_hero from "../../src/assets/images/hero4.png";
// import { useAuth } from "../../context/AppContext";

// function AdminNavbar({ adminName }) {
//   const navigate = useNavigate();
//   const { backendActor, login, logout, isAuthenticated } = useAuth();

//   // Navigate to the home page
//   const handleHomeClick = () => {
//     navigate('/');
//   };

//   useEffect(() => {
//     if (backendActor && isAuthenticated) {
//       console.log("Authenticated and backend ready.");
//     }
//   }, [backendActor, isAuthenticated]);

//   return (
//     <>
//       <nav className="admin-navbar">
//         <div className="navbar-left">
//           <img src={logo} alt="StartShield Logo" className="navbar-logo" onClick={handleHomeClick} />
//         </div>
//         <div className="navbar-left-center">
//           <button className="home-button" onClick={handleHomeClick}>
//             <FaHome />
//           </button>
//         </div>
//         <div className="navbar-center">
//           <input
//             type="text"
//             placeholder="Search users, policies, or tokens..."
//             className="navbar-search"
//           />
//           <FaSearch className="search-icon" />
//         </div>
//         <div className="navbar-right">
//           <div className="profile-dropdown">
//             <FaUserCircle className="profile-icon" />
//             <div className="dropdown-menu">
//               <div className="dropdown-item"><FaBell /> Notifications</div>
//               <div className="dropdown-item"><FaCog /> Settings</div>
//               {isAuthenticated && (
//                 <div className="dropdown-item">
//                   <button className="btn btn-danger" onClick={() => {
//                     logout();
//                     navigate("/"); // Navighează după logout
//                   }}>
//                     <FaSignOutAlt /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
//       <Hero backgroundImage={imag_hero}>
//         <section className="overview">
//           <h1 className="hero-text">
//             Hello and Welcome back, {adminName}!
//           </h1>
//         </section>
//       </Hero>
//     </>
//   );
// }

// export default AdminNavbar;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AdminNavbar.css';
// import logo from '../../../public/assets/images/start-shield-black-logo.jpg';
// import { FaUserCircle, FaSearch, FaBell, FaSignOutAlt, FaCog, FaHome } from 'react-icons/fa';
// import Hero from "../Hero";
// import imag_hero from "../../src/assets/images/hero4.png";
// import { useAuth } from "../../context/AppContext";

// function AdminNavbar({ adminName }) {
//   const navigate = useNavigate();
//   const { backendActor, login, logout, isAuthenticated } = useAuth();

//   // State pentru a stoca detalii despre utilizator
//   const [userDetails, setUserDetails] = useState({ name: '', email: '' });


//   // Funcție pentru a obține datele utilizatorului din backend
//   // const fetchUserDetails = async () => {
//   //   if (backendActor && isAuthenticated) {
//   //     try {
//   //       const principal = await backendActor.getCallerPrincipal();
//   //       console.log("Caller principal:", principal);
//   //       // Exemplu, metoda reală poate varia
//   //       const user = await backendActor.getUserByPrincipal(principal); // Presupunem că backend-ul are această metodă
//   //       if (user) {
//   //         setUserDetails({ name: user.name, email: user.email });
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching user details:", error);
//   //     }
//   //   }
//   // };

//   const fetchUserDetails = async () => {
//     if (!backendActor) {
//       console.error("Backend actor is not initialized.");
//       return;
//     }
  
//     if (!isAuthenticated) {
//       console.error("User is not authenticated.");
//       return;
//     }
  
//     try {
//       const principal = await backendActor.getCallerPrincipal();
//       console.log("Caller principal:", principal);
  
//       // Presupunem că backend-ul are metoda getUserByPrincipal
//       const user = await backendActor.getUserByPrincipal(principal);
  
//       if (user) {
//         setUserDetails({ name: user.name, email: user.email });
//       } else {
//         console.warn("No user details found for the given principal.");
//       }
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   };
  
//   useEffect(() => {
//     if (backendActor && isAuthenticated) {
//       fetchUserDetails();
//     }
//   }, [backendActor, isAuthenticated]);
  
//   // useEffect(() => {
//   //   fetchUserDetails();
//   // }, [backendActor, isAuthenticated]);

//   // Navigate to the home page
//   const handleHomeClick = () => {
//     navigate('/');
//   };


//   useEffect(() => {
//     console.log("Authenticated:", isAuthenticated);
//     console.log("Backend actor:", backendActor);
//     fetchUserDetails();
//   }, [backendActor, isAuthenticated]);
  
//   const addTestUser = async () => {
//     if (backendActor) {
//       await backendActor.addUser({
//         principal: "your-principal-here",
//         user: {
//           name: "Test User",
//           email: "test@example.com",
//           age: 30,
//           accessLevel: { "#USER": null },
//           timestamp: Date.now(),
//         },
//       });
//       console.log("Test user added!");
//     }
//   };
  

//   return (
//     <>
//       <nav className="admin-navbar">
//         <div className="navbar-left">
//           <img src={logo} alt="StartShield Logo" className="navbar-logo" onClick={handleHomeClick} />
//         </div>
//         <div className="navbar-left-center">
//           <button className="home-button" onClick={handleHomeClick}>
//             <FaHome />
//           </button>
//         </div>
//         <div className="navbar-center">
//           <input
//             type="text"
//             placeholder="Search users, policies, or tokens..."
//             className="navbar-search"
//           />
//           <FaSearch className="search-icon" />
//         </div>
//         <div className="navbar-right" style={{color:'white'}}>
//           {isAuthenticated && (
//             <div
//               className="user-name-tooltip"
//               title={`Email: ${userDetails.email}`} // Afișează email-ul ca tooltip
//             >
//               {userDetails.name}
//             </div>
//           )}
//           <div className="profile-dropdown">
//             <FaUserCircle className="profile-icon" />
//             <div className="dropdown-menu">
//               <div className="dropdown-item"><FaBell /> Notifications</div>
//               <div className="dropdown-item"><FaCog /> Settings</div>
//               {isAuthenticated && (
//                 <div className="dropdown-item">
//                   <button className="btn btn-danger" onClick={() => {
//                     logout();
//                     navigate("/"); // Navighează după logout
//                   }}>
//                     <FaSignOutAlt /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
//       <Hero backgroundImage={imag_hero}>
//         <section className="overview">
//           <h1 className="hero-text">
//             Hello and Welcome back, {adminName}!
//           </h1>
//           <div className="user-name-tooltip" title={`Email: ${userDetails.email || "N/A"}`}>
//   {userDetails.name || "Guest"}
// </div>

//         </section>
//       </Hero>
//     </>
//   );
// }

// export default AdminNavbar;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css';
import logo from '../../../public/assets/images/start-shield-black-logo.jpg';
import { FaUserCircle, FaSearch, FaBell, FaSignOutAlt, FaCog, FaHome } from 'react-icons/fa';
import Hero from "../Hero";
import imag_hero from "../../src/assets/images/hero4.png";
import { useAuth } from "../../context/AppContext";

function AdminNavbar({ adminName }) {
  const navigate = useNavigate();
  const { backendActor, login, logout, isAuthenticated } = useAuth();

  // State pentru a stoca detalii despre utilizator
  const [userDetails, setUserDetails] = useState({ name: 'Guest', email: 'N/A' });
  const [isFetching, setIsFetching] = useState(false); // Previne apelurile multiple


  const fetchCallerPrincipal = async () => {
    try {
      const principal = await backendActor.getCallerPrincipal();
      console.log("Caller principal:", principal.toText()); // Afișează identitatea apelantului
    } catch (error) {
      console.error("Error fetching caller principal:", error);
    }
  };

  useEffect(() => {
    if (backendActor) {
      fetchCallerPrincipal();
    }
  }, [backendActor]); // Apelează funcția doar când `backendActor` este disponibil

  // Funcție pentru a obține datele utilizatorului din backend
  const fetchUserDetails = async () => {
    if (isFetching) return; // Previne apelurile multiple
    setIsFetching(true);

    if (!backendActor) {
      console.error("Backend actor is not initialized.");
      setIsFetching(false);
      return;
    }

    if (!isAuthenticated) {
      console.error("User is not authenticated.");
      setIsFetching(false);
      return;
    }

    try {
      const principal = await backendActor.getCallerPrincipal();
      console.log("Caller principal:", principal);

      const user = await backendActor.getUserByPrincipal(principal);

      if (user) {
        setUserDetails({ name: user.name, email: user.email });
      } else {
        console.warn("No user details found for the given principal.");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsFetching(false); // Resetează starea după ce funcția s-a terminat
    }
  };

  // Fetch user details when dependencies change
  useEffect(() => {
    if (backendActor && isAuthenticated && !userDetails.name) {
      fetchUserDetails();
    }
  }, [backendActor, isAuthenticated]);

  // Navigate to the home page
  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  

  return (
    <>
      <nav className="admin-navbar">
        <div className="navbar-left">
          <img src={logo} alt="StartShield Logo" className="navbar-logo" onClick={handleHomeClick} />
        </div>
        <div className="navbar-left-center">
          <button className="home-button" onClick={handleHomeClick}>
            <FaHome />
          </button>
        </div>
        <div className="navbar-center">
          <input
            type="text"
            placeholder="Search users, policies, or tokens..."
            className="navbar-search"
          />
          <FaSearch className="search-icon" />
        </div>
        <div className="navbar-right" style={{ color: 'white' }}>
          {isAuthenticated && (
            <div
              className="user-name-tooltip"
              title={`Email: ${userDetails.email}`} // Afișează email-ul ca tooltip
            >
              {userDetails.name}
            </div>
          )}
          <div className="profile-dropdown">
            <FaUserCircle className="profile-icon" />
            <div className="dropdown-menu">
              <div className="dropdown-item"><FaBell /> Notifications</div>
              <div className="dropdown-item"><FaCog /> Settings</div>
              {isAuthenticated && (
                <div className="dropdown-item">
                  <button className="btn btn-danger" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Hero backgroundImage={imag_hero}>
        <section className="overview">
          <h1 className="hero-text">
            Hello and Welcome back, {adminName}!
          </h1>
          <div className="user-name-tooltip" title={`Email: ${userDetails.email || "N/A"}`}>
            {userDetails.name || "Guest"}
          </div>
        </section>
      </Hero>
    </>
  );
}

export default AdminNavbar;
