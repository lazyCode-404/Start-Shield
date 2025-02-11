import { useEffect, useState } from "react";
import { useAuth } from "../../context/AppContext"; // Ajustează calea după structura ta
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { backendActor, isAuthenticated, identity } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const allUsers = await backendActor.getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const approveAdmin = async (principal) => {
    try {
      await backendActor.approveAdmin(principal);
      fetchUsers(); // Reîmprospătăm lista utilizatorilor
    } catch (error) {
      console.error("Error approving admin:", error);
    }
  };

  const rejectAdmin = async (principal) => {
    try {
      await backendActor.rejectAdmin(principal);
      fetchUsers(); // Reîmprospătăm lista utilizatorilor
    } catch (error) {
      console.error("Error rejecting admin:", error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {loading ? <div>Loading...</div> : (
        <div>
          <h2>Pending Admins</h2>
          {users.filter(user => user.accessLevel.ADMIN && user.status === "pending").map((user, index) => (
            <div key={index}>
              <p>{user.name} - {user.email}</p>
              <button onClick={() => approveAdmin(user.principal)}>Approve</button>
              <button onClick={() => rejectAdmin(user.principal)}>Reject</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
