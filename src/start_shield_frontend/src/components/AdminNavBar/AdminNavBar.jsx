import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import logo from "../../../public/assets/images/start-shield-black-logo.jpg";
import { FaUserCircle, FaSearch, FaBell, FaSignOutAlt, FaCog, FaHome } from "react-icons/fa";
import Hero from "../Hero";
import imag_hero from "../../src/assets/images/hero4.png";
import { useAuth } from "../../context/AppContext";

function AdminNavbar({ adminName }) {
  const navigate = useNavigate();
  const { backendActor, login, logout, isAuthenticated } = useAuth();
  // State pentru detalii utilizator
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [principalText, setPrincipalText] = useState(""); // Stochează principalul utilizatorului
  const [isFetchingPrincipal, setIsFetchingPrincipal] = useState(false); // Previne apelurile multiple
  const [isLoading, setIsLoading] = useState(true); // Stare pentru încărcare
  // Memorizează backendActor pentru a evita schimbările frecvente
  const stableBackendActor = useMemo(() => backendActor, [backendActor]);
  // Funcție pentru a obține principalul utilizatorului din backend
  const fetchUserDetails = async () => {
    if (!stableBackendActor) {
      console.warn("Backend actor is not initialized.");
      return;
    }
    if (!isAuthenticated) {
      console.warn("User is not authenticated.");
      return;
    }
    if (isFetchingPrincipal) {
      console.log("Already fetching principal. Skipping...");
      return;
    }
    setIsFetchingPrincipal(true);
    setIsLoading(true); // Începe încărcarea
    try {
      // Obține principalul utilizatorului
      const principal = await stableBackendActor.getCallerPrincipal();
      const principalString = principal.toText(); // Convertim principalul în text lizibil
      console.log("Caller principal from backend:", principalString);
      setPrincipalText(principalString); // Stocăm principalul în stare
      // Obține detaliile utilizatorului pe baza principalului
      const user = await stableBackendActor.getUserByPrincipal(principal);
      console.log("Fetched user details from backend:", user);
      if (user && user.length > 0) { // Verifică dacă array-ul conține elemente
        setUserDetails({ name: user[0].name || "Unknown", email: user[0].email || "N/A" });
        console.log("User details updated:", { name: user[0].name || "Unknown", email: user[0].email || "N/A" }); // Verifică dacă valorile sunt corecte
      } else {
        console.warn("No user details found for the given principal.");
        setUserDetails({ name: "Unknown", email: "N/A" }); // Setează valori implicite
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUserDetails({ name: "Unknown", email: "N/A" }); // Setează valori implicite în caz de eroare
    } finally {
      setIsFetchingPrincipal(false);
      setIsLoading(false); // Oprește încărcarea
    }
  };
  // Efect pentru a apela fetchUserDetails
  useEffect(() => {
    let isMounted = true; // Previne actualizările după demontare
    if (stableBackendActor && isAuthenticated && !userDetails.name) {
      (async () => {
        try {
          await fetchUserDetails();
        } catch (error) {
          console.error("Error in fetchUserDetails effect:", error);
        }
      })();
    }
    return () => {
      isMounted = false; // Cleanup pentru a preveni actualizările după demontare
    };
  }, [stableBackendActor, isAuthenticated]);
  // Navighează la pagina de start
  const handleHomeClick = () => {
    navigate("/");
  };

  // Funcție de logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
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
        <div className="navbar-right" style={{ color: "white" }}>
          {isAuthenticated && (
            <>
              {isLoading ? (
                <div>Loading user details...</div>
              ) : (
                <>
                  <div
                    className="user-name-tooltip"
                    title={`Email: ${userDetails.email || "N/A"}`}
                  >
                    {userDetails.name || "Unknown"}
                  </div>
                </>
              )}
            </>
          )}
          <div className="profile-dropdown">
            <FaUserCircle className="profile-icon" />
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <FaBell /> Notifications
              </div>
              <div className="dropdown-item">
                <FaCog /> Settings
              </div>
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
          <h1 className="hero-text">Hello and Welcome back, {adminName}!</h1>
          <div className="user-name-tooltip">
            {userDetails.name || "Loading..."}
            <span className="tooltip-text">{userDetails.email || "N/A"}</span>
          </div>
          <div className="principal-display">
            <p>Principal: {principalText || "Loading..."}</p>
          </div>
        </section>
      </Hero>
    </>
  );
}

export default AdminNavbar;
