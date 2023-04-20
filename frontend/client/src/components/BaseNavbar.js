import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function BaseNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // NEED TO ADD AUTHENTICATION CLEAR SESSION STUFF (LOGOUT == LOSE AUTH TOKEN)
        // Navigate to the login page
        navigate('/');
    };

    return (
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/dashboard">MedDB</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/dashboard">Home</Nav.Link>
                <Nav.Link href="/data_page">View Data</Nav.Link> 
                <Nav.Link href="/settings">Settings</Nav.Link>
            </Nav>
            <Nav className="m1-auto">
                <button className="btn btn-primary"
                    onClick={handleLogout}>
                    Logout
                </button>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default BaseNavbar;