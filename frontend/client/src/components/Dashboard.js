import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import BaseNavbar from './BaseNavbar';
import axios from 'axios';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Form, 
  FormControl, 
  Dropdown,
  Button } from "react-bootstrap";


// useLocation can be used to grab data
function Dashboard(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const name = location?.state?.name;

  useEffect(() => {
    if (name == null) {
      setIsLoggedIn(false);
      navigate('/auth');
    } else {
      setIsLoggedIn(true);
    }
    setIsRendered(true);
  }, [name, navigate]);

  if (!isRendered) {
    return null;
  }

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      axios.get(`/search?q=${query}`)
        .then((response) => {
          setSearchResults(response.data.slice(0, 5)); // limit to first 5 results
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSearchResults([]);
    }
  };

  const handleItemClick = (value) => {
    console.log(value);
  };

  const handleDataButton = () => {
    navigate('/data', 
      {state: {name: name}}
    );
  };


  const handleNewPatientButton = () => {
    navigate('/chart',
      {state: {name: name}}
    );
  };

  return (
  <div>
    <div>
      <BaseNavbar/>
      <h1>Welcome, {name}</h1>
      <Outlet />
    </div>
    <Container>
      <Row className="justify-content-center my-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Search For Patient by Name or ID</Card.Title>
              <Form>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" value={searchQuery} onChange={handleSearchChange} />
              </Form>
              {searchResults.length > 0 && (        
                <Dropdown>
                  <Dropdown.Item disabled>ID: Name, DOB</Dropdown.Item>
                  {searchResults.map((result) => (
                    <Dropdown.Item key={result.id} onClick={() => handleItemClick(result)}>
                      {result.id}: {result.name}, {result.dob}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              )}
              <div className="text-center p-3">
                <Button variant="primary" onClick={handleNewPatientButton}>Create New Patient</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center my-4">
        <Col md={6}>
          <Card>
            <Card.Body className="text-center">
              <Button variant="primary" onClick={handleDataButton}>View Patient Data</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
  );
}


export default Dashboard;