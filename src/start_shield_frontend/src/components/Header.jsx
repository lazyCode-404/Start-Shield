import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';

const Header = ({ role }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">StartShield</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {role} Profile
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#">Settings</Dropdown.Item>
                            <Dropdown.Item href="#">Notifications</Dropdown.Item>
                            <Dropdown.Item href="#">Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
