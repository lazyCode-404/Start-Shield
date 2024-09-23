import React from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar = ({ role }) => {
    return (
        <div className="sidebar bg-light" style={{ height: '100vh', width: '250px', position: 'fixed' }}>
            <Nav className="flex-column">
                <Nav.Link href={role === 'admin' ? "/admin-dashboard" : "/user-dashboard"}>Dashboard</Nav.Link>
                {role === 'admin' && <Nav.Link href="#">User Management</Nav.Link>}
                {role === 'admin' && <Nav.Link href="#">Policy Management</Nav.Link>}
                {role === 'admin' && <Nav.Link href="#">Settings</Nav.Link>}
                {role === 'admin' && <Nav.Link href="#">Reports</Nav.Link>}
                {role === 'user' && <Nav.Link href="#">My Policies</Nav.Link>}
                {role === 'user' && <Nav.Link href="#">Support</Nav.Link>}
                <Nav.Link href="#">Token Management</Nav.Link>
                <Nav.Link href="#">Training & Events</Nav.Link>
              
            </Nav>
        </div>
    );
};

export default Sidebar;
