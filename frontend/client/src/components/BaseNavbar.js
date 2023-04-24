import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';

function BaseNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const name = location?.state?.name;

    const handleLogout = (e) => {
        // NEED TO ADD AUTHENTICATION CLEAR SESSION STUFF (LOGOUT == LOSE AUTH TOKEN)
        // Navigate to the login page
        e.preventDefault();
        navigate('/');
    };

    // used to handle clicks to ensure data is properly passed along to navbar links
    // data necessary for user authentication
    function handleLinkClick(e, link){
        e.preventDefault();
        navigate(link, {
            state: {name: name}
        });
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand onClick={(e) => handleLinkClick(e, '/dashboard')}>MedDB</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link onClick={(e) => handleLinkClick(e, '/dashboard')}>Home</Nav.Link>
                    <Nav.Link onClick={(e) => handleLinkClick(e, '/data')}>View Data</Nav.Link> 
                    <Nav.Link onClick={(e) => handleLinkClick(e, '/settings')}>Settings</Nav.Link>
                </Nav>
                <Nav className="m1-auto">
                    <button className="btn btn-primary" onClick={(e) => handleLogout(e)}>
                        Logout
                    </button>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BaseNavbar;