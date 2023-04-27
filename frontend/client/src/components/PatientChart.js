import React, {useEffect, useState, useRef} from "react";
import BaseNavbar from "./BaseNavbar";
import { 
    Card, 
    Dropdown, 
    Row, 
    Col, 
    Tabs, 
    Tab,
    Button, 
    Form,
    Accordion,
    ListGroup} from 'react-bootstrap';
import { tab } from "@testing-library/user-event/dist/tab";

// create patient chart page
function PatientChart(props) {
    const [visitResults, setVisitResults] = useState([]);
    const [visitData, setVisitData] = useState([]);
    const [selectedGender, setSelectedGender] = useState('Gender');
    const [selectedDate, setSelectedDate] = useState('View Prior Visit');
    const [selectedDoctor, setSelectedDoctor] = useState('Doctor');
    const [selectedType, setSelectedType] = useState('Visit Type');
    const [PreExistingList, setPreExistingList] = useState(['item1', 'item2', 'item3']);


    // ALL THESE HANDLES ARE FOR THE DROPDOWNS. ESSENTIALLY JUST MAKE SURE DROPDOWN BUTTON UPDATES TO WHAT IS CHOSEN
    const handleGenderSelect = (eventKey) => {
        setSelectedGender(eventKey); // update state when an item is selected
      };

    const handleDoctorSelect = (eventKey) => {
        setSelectedDoctor(eventKey);
    }

    const handleTypeSelect = (eventKey) => {
        setSelectedType(eventKey);
    }

    // handle date selection for getting data for a specific visit
    const handleDateSelect = (eventKey) => {
        console.log(eventKey);
        const [date, id] = eventKey.split(':');
        setSelectedDate(date);
        get_visit_info('0', id);
    };

    // BUTTON HANDLE FOR NEW VISIT IF CLICKED
    const handleNewVisit = () => {
        const date = new Date();
        const dateString = date.toISOString().split('T')[0];
        console.log(dateString);
    };

    const handleListChange = (listItems, setListItems, action, index) => {
        switch(action) {
          case 'edit':
            // prompt user for new value and update list
            const newValue = prompt('Enter new value:');
            const newList = [...listItems];
            if (newValue !== null ){
                newList[index] = newValue;
            };
            setListItems(newList);
            break;
          case 'delete':
            // remove item from list
            const filteredList = listItems.filter((item, i) => i !== index);
            setListItems(filteredList);
            break;
          default:
            console.log('Invalid action:', action);
        }
      };

    console.log(PreExistingList);

    // if patient has prior visits, fetch whatever selected date is and fill in
    // THE BIG API REQUEST FOR PRETTY MUCH EVERYTHING
    const get_visit_info = (patient_id, visit_id) => {
        fetch(
            `http://3.95.80.50:8005/patientchart/chart.php?endpoint=get_visit_info&patient_id=${patient_id}&visit_id=${visit_id}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            setVisitData(data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    // if patient_id provided, fetch request to get_all_visit info.
    // need to see how to check what patient_id is/if passed along...
    const get_all_visits = (patient_id) => {
        return new Promise((resolve, reject) => {
            fetch(`http://3.95.80.50:8005/patientchart/chart.php?endpoint=get_all_visits&patient_id=${patient_id}`, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                setVisitResults(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
                reject(error);
            })
        });
    }
    
    const sortedResults = visitResults.sort((a, b) => b.visit_id - a.visit_id);

    // calls on first render automatically. 
    useEffect(() => {
        get_all_visits('0');
      }, []);
      
    useEffect(() => {
    if (visitResults.length > 0) {
        const sortedResults = visitResults.sort((a, b) => b.visit_id - a.visit_id);
        const most_recent = sortedResults[0];
        // REMEMBER 0 IS A FILLER PATIENT ID THAT DOES NOT EXIST
        get_visit_info('0', most_recent.visit_id);
    }
    }, [visitResults]);

    console.log(visitData);
    

    return(
        <div>
            <BaseNavbar/>
            <Row style={{padding:'25px'}}>
                <Col md={8}>
                    <Card style={{height:'100%'}}>
                        <Card.Header>
                            <h3>Visit Info</h3>
                            <div className="d-flex justify-content-between">
                            <Dropdown onSelect={handleDateSelect} className="mr-3">
                                <Dropdown.Toggle>{selectedDate}</Dropdown.Toggle>
                                <Dropdown.Menu style={{ maxHeight: '100px', overflowY: 'auto' }}>
                                    {sortedResults.map((result) => (
                                    <Dropdown.Item key={result.visit_id} eventKey={`${result.visit_date}:${result.visit_id}`}>
                                        {result.visit_date}
                                    </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                                <Button variant="primary" className="m1-auto" onClick={handleNewVisit}>Create New Visit</Button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col md={8}>
                                            <Form.Group controlId="chiefComplaint">
                                                <Form.Label>Chief Complaint</Form.Label>
                                                <Form.Control type="text" placeholder="None" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4} className="d-flex align-items-center justify-content-center">
                                            <Row>
                                                <Col>
                                                    <h6 style={{marginTop:'10px', marginLeft:'10px'}}>Type:</h6>      
                                                </Col>
                                                <Col>
                                                    <Dropdown onSelect={handleTypeSelect}>
                                                        <Dropdown.Toggle style={{ backgroundColor: '#f8f9fa', borderColor: '#f8f9fa', color: '#212529' }}>
                                                            {selectedType}                                            
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item eventKey="Checkup">Checkup</Dropdown.Item>
                                                            <Dropdown.Item eventKey="Emergency">Emergency</Dropdown.Item>
                                                            <Dropdown.Item eventKey="Procedure">Procedure</Dropdown.Item>
                                                            <Dropdown.Item eventKey="Surgery">Surgery</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <Form.Group controlid="diagnosis">
                                                <Form.Label>Diagnosis</Form.Label>
                                                <Form.Control type="text" placeholder="None" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4} className="d-flex align-items-center justify-content-center">
                                            <Row>
                                                <Col>
                                                    <h6 style={{marginTop:'10px'}}>Doctor:</h6>
                                                </Col>
                                                <Col>
                                                    <Dropdown onSelect={handleDoctorSelect}>
                                                        <Dropdown.Toggle style={{ backgroundColor: '#f8f9fa', borderColor: '#f8f9fa', color: '#212529' }}>
                                                            {selectedDoctor}                                            
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item eventKey="Dr. Smith">Dr. Smith</Dropdown.Item>
                                                            <Dropdown.Item eventKey="Dr. Jones">Dr. Jones</Dropdown.Item>
                                                            <Dropdown.Item eventKey="Dr. Davis">Dr. Davis</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card style={{height:'100%'}}>
                        <Card.Header>
                            <h3>Patient Info</h3>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                {/* EXAMPLE OF FETCHING DATA FROM API AND IMPLEMENTING HERE!!! */}
                                    <h6 style={{marginTop:'10px'}}>ID: {visitData.p_id}</h6>
                                </Col>
                                <Col>
                                    <Dropdown onSelect={handleGenderSelect}>
                                        <Dropdown.Toggle style={{ backgroundColor: '#f8f9fa', borderColor: '#f8f9fa', color: '#212529' }}>
                                            {selectedGender}                                            
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="Male">Male</Dropdown.Item>
                                            <Dropdown.Item eventKey="Female">Female</Dropdown.Item>
                                            <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                            <Form.Group controlId="patientName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="None" />
                            </Form.Group>
                            <Form.Group controlId="patientDOB">
                                <Form.Label>DOB</Form.Label>
                                <Form.Control type="text" placeholder="None" />
                            </Form.Group>
                            <div style={{marginTop: '20px'}}>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventkey="0">
                                        <Accordion.Header>More Info</Accordion.Header>
                                        <Accordion.Body>
                                        <Form.Group controlId="patientRace">
                                            <Form.Label>Race</Form.Label>
                                            <Form.Control type="text" placeholder="None" />
                                        </Form.Group>
                                        <Form.Group controlId="patientLanguage">
                                            <Form.Label>Language</Form.Label>
                                            <Form.Control type="text" placeholder="None" />
                                        </Form.Group>
                                        <Form.Group controlId="patientPhone">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control type="text" placeholder="None" />
                                        </Form.Group>
                                        <Form.Group controlId="patientAddress">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" placeholder="None" />
                                        </Form.Group>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row style={{padding:'25px'}}>
                <Col md={8}>
                    <Card>
                        <Card.Header>
                            <h3>History</h3>
                        </Card.Header>
                        <Card.Body>
                            <Card>
                                <Card.Header>
                                    <Tabs defaultActiveKey="pre-existing">
                                        <Tab eventKey="pre-existing" title="Pre-Existing">
                                            <Card.Body>
                                                <div style={{ height: '200px', overflowY: 'scroll' }}>
                                                <ListGroup variant='flush'>
                                                    {PreExistingList.map((item, index) => (
                                                        <ListGroup.Item
                                                        key={index}
                                                        onDoubleClick={() => handleListChange(PreExistingList, setPreExistingList, 'edit', index)}
                                                        >
                                                        {item}
                                                        <span
                                                            className='float-right text-danger'
                                                            style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '5px', cursor: 'pointer'}}
                                                            onClick={() => handleListChange(PreExistingList, setPreExistingList, 'delete', index)}
                                                        >
                                                            &times;
                                                        </span>
                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup>
                                                </div>
                                            </Card.Body>
                                        </Tab>
                                        <Tab eventKey="immunization" title="Immunization">
                                            <Card.Body>
                                            <p>Immunization Information</p>
                                            </Card.Body>
                                        </Tab>
                                        <Tab eventKey="family" title="Family">
                                            <Card.Body>
                                            <p>Family Information</p>
                                            </Card.Body>
                                        </Tab>
                                        <Tab eventKey="obstetric" title="Obstetric">
                                            <Card.Body>
                                            <p>Obstetric Information</p>
                                            </Card.Body>
                                        </Tab>
                                        <Tab eventKey="social" title="Social">
                                            <Card.Body>
                                            <p>Social Information</p>
                                            </Card.Body>
                                        </Tab>
                                        <Tab eventKey="Medications" title="Medications">
                                            <Card.Body>
                                            <p>Medication Information</p>
                                            </Card.Body>
                                        </Tab>
                                    </Tabs>
                                </Card.Header>
                            </Card>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card style={{height:'100%'}}>
                    <Card.Header>
                        <h3>SHOULD WE PUT TREATMENTS HERE!</h3>
                    </Card.Header>
                    <Card.Body>
                        <Card>
                        <Card.Body>
                            <p>Inner Card Component</p>
                        </Card.Body>
                        </Card>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row style={{padding:'25px'}}>
                <Col>
                    <Card style={{width:'100%'}}>
                        <Card.Header>
                            <h3>NOTES; UPLOAD OF DOCS???</h3>
                        </Card.Header>
                        <Card.Body>
                            <h3>more stuff; uploaded documents, attached things, etc</h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default PatientChart;

