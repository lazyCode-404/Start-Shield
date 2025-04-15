import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AppContext";
import CC from "../CheckConnectivity/connectivityCheck.jsx";
import EditUser from "./EditUser.jsx";
import ViewProfile from "./ViewProfile.jsx";
import PendingApproval from "./PendingApproval.jsx";
import UserProfile from "./UserProfile.jsx";
import "./UserManagement.css";
import moment from "moment";

const UserManagement = () => {
    const { backendActor } = useAuth();
    const [users, setUsers] = useState([]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [activeSubSection, setActiveSubSection] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (backendActor) {
            fetchUsers();
        } else {
            console.error("Backend actor is not available!");
            setMessage("Backend actor is not available. Please check your setup.");
        }
    }, [backendActor]);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        setMessage(""); // Resetăm mesajele de eroare

        try {
            if (!backendActor) {
                setMessage("Eroare: Backend actor nu este inițializat!");
                return;
            }

            const allUsers = await backendActor.getAllUsers();
            if (!allUsers || !Array.isArray(allUsers)) {
                throw new Error("Datele utilizatorilor nu sunt valide!");
            }

            console.log("Utilizatori:", allUsers);
            setUsers(allUsers);
        } catch (error) {
            console.error("Eroare la preluarea utilizatorilor:", error);
            setMessage(`Eroare: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [backendActor]);

    const handleSort = (column) => {
        const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortOrder(order);

        const sortedUsers = [...users].sort((a, b) => {
            const valA = a[column] || "";
            const valB = b[column] || "";
            return typeof valA === "string"
                ? order === "asc"
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA)
                : order === "asc"
                ? valA - valB
                : valB - valA;
        });
        setUsers(sortedUsers);
    };

    const handleActionClick = (user, action) => {
        console.log("User selected for action:", user); // Adaugă acest log pentru a verifica valorile
        setSelectedUser(user);
        switch (action) {
            case "Edit":
                setActiveSubSection("editUser");
                break;
            case "User Profile":
                setActiveSubSection("userProfile");
                break;
            case "Pending":
                setActiveSubSection("pendingApproval");
                break;
            default:
                console.warn("Acțiune necunoscută:", action);
        }
    };

    const handleViewAllProfiles = () => {
        setActiveSubSection("viewProfiles");
    };

    return (
        <div className="user-management">
            <CC />
            {activeSubSection === "editUser" && selectedUser ? (
                <EditUser user={selectedUser} setActiveSubSection={setActiveSubSection} />
            ) : activeSubSection === "userProfile" && selectedUser ? (
                <UserProfile user={selectedUser} setActiveSubSection={setActiveSubSection} />
            ) : activeSubSection === "pendingApproval" && selectedUser ? (
                <PendingApproval user={selectedUser} setActiveSubSection={setActiveSubSection} />
            ) : activeSubSection === "viewProfiles" ? (
                <ViewProfile />
            ) : (
                <>
                    {isLoading ? (
                        <div>Se încarcă utilizatorii...</div>
                    ) : (
                        <>
                            {message && <div className="message">{message}</div>}
                            <div className="header-with-button">
                                <h2 className="panel-title">User Management</h2>
                                <div className="view-all-profiles">
                                    <p>Press here to see all Profiles</p>
                                    <button onClick={handleViewAllProfiles} className="view-all-profiles-button">
                                        View All Profiles
                                    </button>
                                </div>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        {["principal", "name", "email", "age", "role", "status", "adminStatus", "lastActivity"].map((column) => (
                                            <th key={column} onClick={() => handleSort(column)}>
                                                {column.charAt(0).toUpperCase() + column.slice(1)}
                                            </th>
                                        ))}
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users.map((user) => (
                                            <tr key={user.principal ? user.principal.toText() : user.name}>
                                                <td>{user.principal ? user.principal.toText() : "N/A"}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email || "N/A"}</td>
                                                <td>{user.age || "N/A"}</td>
                                                <td>{user.accessLevel ? user.accessLevel.toString() : "N/A"}</td>
                                                <td>{user.status ? user.status.toString() : "N/A"}</td>
                                                <td>{user.adminStatus ? user.adminStatus.toString() : "N/A"}</td>
                                                <td>{user.timestamp ? moment(Number(user.timestamp)).format("DD-MM-YYYY HH:mm") : "N/A"}</td>
                                                <td>
                                                    {user.principal ? (
                                                        <>
                                                            <button className="edit-button" onClick={() => handleActionClick(user, "Edit")}>Edit</button>
                                                            <button className="view-profile-button" onClick={() => handleActionClick(user, "User Profile")}>View Profile</button>
                                                            <button className="pending-button" onClick={() => handleActionClick(user, "Pending")}>Pending</button>
                                                        </>
                                                    ) : (
                                                        <span>Principal not available</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9">Nu există utilizatori disponibili.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default UserManagement;
