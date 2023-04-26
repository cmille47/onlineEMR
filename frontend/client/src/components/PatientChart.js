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
    } from 'react-bootstrap';

// create patient chart page
function PatientChart(props) {
    const [selectedDate, setSelectedDate] = useState('Select Visit Date');
    const [visitResults, setVisitResults] = useState([]);
    const [visitData, setVisitData] = useState([]);


    // need to add that if new patient is selected, 
    // that is passed along and new patient id is generated
    // also need to add all the editable fields. We have the cards/basic layout
    // but need each field to be editable and to be able to save changes

    // handle date selection for getting data for a specific visit
    const handleDateSelect = (eventKey) => {
        console.log(eventKey)
        get_visit_info('0', eventKey);
    };

    // handle creating a new visit
    const handleNewVisit = () => {
        const date = new Date();
        const dateString = date.toISOString().split('T')[0];
        console.log(dateString);
    };

    // if patient has prior visits, fetch whatever selected date is and fill in
    // the info
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
                                <Dropdown.Toggle>View Prior Visit</Dropdown.Toggle>
                                <Dropdown.Menu style={{ maxHeight: '100px', overflowY: 'auto' }}>
                                    {sortedResults.map((result) => (
                                    <Dropdown.Item key={result.visit_id} eventKey={result.visit_id}>
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
                                <Col md={6}>
                                    <Form.Group controlid="chiefComplaint">
                                        <Form.Label>Chief Complaint</Form.Label>
                                        <Form.Control type="text" placeholder="None" />
                                    </Form.Group>
                                    <Form.Group controlid="diagnosis">
                                        <Form.Label>Diagnosis</Form.Label>
                                        <Form.Control type="text" placeholder="None" />
                                    </Form.Group>
                                </Col>
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
                                            <p>Pre-Existing Information</p>
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
                        <h3>Other Info</h3>
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
                            <h3>Idk something else?</h3>
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

