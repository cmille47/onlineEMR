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
    ListGroup,
    Table} from 'react-bootstrap';

// create patient chart page
function PatientChart(props) {
    // more general things
    const [visitResults, setVisitResults] = useState([]);
    const [serverData, setServerData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('View Prior Visit');

    // top left part
    const [visitData, setVisitData] = useState({
        CHIEF_COMPLAINT: '',
        DIAGNOSIS: '',
        DOCTOR_NAME: 'Doctor',
        HEIGHT: '',
        NOTES: '',
        PATIENT_ID: '',
        REF_PATIENT_ID: '',
        REF_VISIT_ID: '',
        VISIT_DATE: '',
        VISIT_ID: '',
        VISIT_TYPE: 'Visit Type',
        WEIGHT: '',
      });
    const [visitUpdated, setVisitUpdated] = useState(false);

    // top right part
    const [patientGenerics, setPatientGenerics] = useState({
        PATIENT_ID: null,
        FIRST_NAME: '',
        LAST_NAME: '',
        DOB: '',
        GENDER: 'Gender',
        RACE: '',
        PREF_LANGUAGE: '',
        PHONE: '',
        STREET1: '',
        STREET2: '',
        CITY: '',
        STATE: '',
        ZIP: '',
      });
    const [patientChanged, setPatientChanged] = useState(false);

    // bottom left part
    const [PreExistingList, setPreExistingList] = useState([]);
    const [preExistingChanged, setPreExistingChanged] = useState(false);

    const [immunizationList, setImmunizationList] = useState([]);
    const [immunizationChanged, setImmunizationChanged] = useState(false);

    const [familyChanged, setFamilyChanged] = useState(false);
    const [familyHistoryList, setFamilyHistoryList] = useState([]);

    const [obstetricList, setObstetricList] = useState([]);
    const [obstetricChanged, setObstetricChanged] = useState(false);

    const [socialList, setSocialList] = useState({
        ALCOHOL: '',
        EXCERCISE: '',
        MARRIAGE: '',
        OCCUPATIN:'',
        SMOKING:''
    });

    const [socialChanged, setSocialChanged] = useState(false);

    const [medsList, setMedsList] = useState([]);
    const [medsChanged, setMedsChanged] = useState(false);

    const [allergiesList, setAllergiesList] = useState([]);
    const [allergiesChanged, setAllergiesChanged] = useState(false);

    // bottom right treatment pt
    const [treatments, setTreatments] = useState([]);
    const [newTreatment, setNewTreatment] = useState({
        KEYWORD_DESC: '',
        TREATMENT_TYPE: '',
        DURATION: '',
        SUCCESS: false,
        TREATMENT_ID: '',
        VISIT_ID: '',
        PATIENT_ID: ''
      });

    const [deletedTreatments, setDeletedTreatments] = useState([]);
    const [treatmentsChanged, setTreatmentsChanged] = useState(false);


    // handle date selection for getting data for a specific visit
    const handleDateSelect = (eventKey) => {
        console.log(eventKey);
        const [date, id] = eventKey.split(':');
        setSelectedDate(date);
        console.log(id);
        get_visit_info(1, id);
    };

    // BUTTON HANDLE FOR NEW VISIT IF CLICKED
    const handleNewVisit = () => {
        const date = new Date();
        let dateString = date.toISOString().split('T')[0];        
        //dateString = 'test_date';
        const past_visit_id = visitData.VISIT_ID;
        const new_visit_id = visitResults.length + 1
        setVisitData((prevVisitData) => ({
            ...prevVisitData,
            VISIT_DATE: dateString,
            VISIT_ID: new_visit_id,
            REF_VISIT_ID: past_visit_id,
        }));
        setNewTreatment(
            {
                KEYWORD_DESC: '',
                TREATMENT_TYPE: '',
                DURATION: '',
                SUCCESS: false,
                TREATMENT_ID: '',
                VISIT_ID: new_visit_id,
                PATIENT_ID: ''
              }
        );
        setTreatments([]);
        setSelectedDate(dateString);
        setVisitUpdated(true);
    };

    // if patient has prior visits, fetch whatever selected date is and fill in
    // THE BIG API REQUEST FOR PRETTY MUCH EVERYTHING
    const get_visit_info = (patient_id, visit_id) => {
        fetch(
            `http://3.95.80.50:8005/patientchart/chart3.php?endpoint=get_visit_info&patient_id=${patient_id}&visit_id=${visit_id}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            setServerData(data);
        })
        .catch(error => {
            console.log(error);
        })
    };

    const postrequest = (e) => {
        e.preventDefault();
        fetch('http://3.95.80.50:8005/patientchart/push2db.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            updateVisit: visitUpdated,
            visitData : visitData,
            updatePatient: patientChanged,
            patientData: patientGenerics,
            updatePreExisting: preExistingChanged,
            preExistingData: PreExistingList,
            updateTreatments: treatmentsChanged,
            treatmentData: treatments,
            deleteTreatments: deletedTreatments,
            updateImmunizations: immunizationChanged,
            immunizationList: immunizationList,
            updateObstetric: obstetricChanged,
            obstetricData: obstetricList,
            updateAllergies: allergiesChanged,
            allergiesData: allergiesList,
            updateMeds: medsChanged,
            medData: medsList,
            updateFamily: familyChanged,
            familyData: familyHistoryList,
            updateSocial: socialChanged,
            socialData: socialList,
          })
        })
        .then(response => response.json())
        .then(data => data.forEach(value => console.log(value)))
        .catch(error => console.log(error));

        // reset change variables
        setVisitUpdated(false);
        setPatientChanged(false);
        setPreExistingChanged(false);
        setTreatmentsChanged(false);
        setImmunizationChanged(false);
        setObstetricChanged(false);
        setAllergiesChanged(false);
        setMedsChanged(false);
        setFamilyChanged(false);
        setSocialChanged(false);
      }

    // if patient_id provided, fetch request to get_all_visit info.
    // need to see how to check what patient_id is/if passed along...
    const get_all_visits = (patient_id) => {
        return new Promise((resolve, reject) => {
            fetch(`http://3.95.80.50:8005/patientchart/chart3.php?endpoint=get_all_visits&patient_id=${patient_id}`, {
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
    
    // calls on first render automatically. 
    useEffect(() => {
        get_all_visits(1);
      }, []);
      
    useEffect(() => {
    if (visitResults.length > 0) {
        const sortedResults = visitResults.sort((a, b) => b.VISIT_ID - a.VISIT_ID);
        const most_recent = sortedResults[0];
        setVisitResults(sortedResults);
        get_visit_info(1, most_recent.VISIT_ID);
    }
    }, [visitResults]);

    useEffect(() => {
        if (serverData.length > 0){

            setVisitData(serverData[0]);
            setTreatments(serverData.slice(9));
            newTreatment.VISIT_ID = serverData[0].VISIT_ID;
            newTreatment.PATIENT_ID = serverData[0].PATIENT_ID;
            setNewTreatment(newTreatment);
            setPatientGenerics(serverData[1]);
            setFamilyHistoryList(serverData[2]);
            setImmunizationList(serverData[3]);
            setMedsList(serverData[4]);
            setObstetricList(serverData[5]);
            setPreExistingList(serverData[6]);
            setAllergiesList(serverData[7]);
            setSocialList(serverData[8]);
        }
    }, [serverData]);

    // console.log(socialList);

    // console.log(visitUpdated);
    // console.log(visitResults);
    // console.log(serverData);
    // console.log(visitData);
    // console.log(patientChanged);
    // console.log(patientGenerics);
    // console.log(familyHistoryList);
    console.log(treatments);
    // console.log(PreExistingList);
    // console.log(preExistingChanged);
    // console.log(treatments);
    // console.log(deletedTreatments);
    // console.log(treatmentsChanged);
    // console.log(immunizationList);
    // console.log(immunizationChanged);
    // console.log(obstetricList);
    // console.log(obstetricChanged);
    // console.log(medsChanged);
    // console.log(medsList);

    // handles changes to each of the fields of any treatment (including new one)
    const handleTreatmentsChange = (index, field, value) => {
        if (index > -1){
            setTreatments(prevTreatments => {
                const newTreatments = [...prevTreatments];
                newTreatments[index][field] = value;
                return newTreatments;
            });
            setTreatmentsChanged(true);
        }
        else{
            setNewTreatment(prevNewTreatment => ({
                ...prevNewTreatment,
                [field]: value
            }));
        }
      };

    const handleTreatmentDeletion = (index) => {
        const newTreatments = [...treatments];
        const deletedTreatment = newTreatments.splice(index, 1)[0];
        const newDeleted = [...deletedTreatments];
        newDeleted.push(deletedTreatment.TREATMENT_ID);
        setDeletedTreatments(newDeleted);
        setTreatments(newTreatments);
        setTreatmentsChanged(true);
    };

    // handles the creation of a new treatment by pressing the button. adds it to the treatment list object
    const handleNewTreatment = () => {
        setTreatments(prevTreatments => [...prevTreatments, newTreatment]);
        setNewTreatment({
            KEYWORD_DESC: '',
            TREATMENT_TYPE: '',
            DURATION: '',
            SUCCESS: false,
            TREATMENT_ID: '',
            VISIT_ID: '',
            PATIENT_ID:''
        });
        setTreatmentsChanged(true);
    };

    // this should only get called if you created a whole new patient
    // else if there is already a valid patient id, the patient should not be changeable
    const updatePatientInfo = (field, value) => {
        setPatientGenerics(prevGenerics => {
            return {
                ...prevGenerics,
                [field]: value
            };
        });
        setPatientChanged(true);
    };

    const visitChanged = (field, value) => {
        setVisitData(priorInfo => {
            return {
                ...priorInfo,
                [field]: value
            };
        });
        setVisitUpdated(true);
    };

    // change social
    const handleCellClick = (social_key) => {
        const newSocial = prompt('Enter new value:');
        if (newSocial !== null){
            setSocialList((prevInfo) => ({ ...prevInfo, [social_key]: newSocial }));
            setSocialChanged(true);
        }
      };

    // handles the bottom left list stuff changing. a little gross but effective
    const handleListChange = (listItems, setListItems, action, index) => {
        let newValue = null;
        let newList = null; 
        switch(action) {
            case 'edit':
                // prompt user for new value and update list
                newValue = prompt('Enter new value:');
                newList = [...listItems];
                if (newValue !== null ){
                    if (listItems === familyHistoryList){
                        while (!(newValue.includes(":"))){
                            newValue = prompt("Incorrect Format. (Relative: Affliction)");
                        }
                        const parts = newValue.split(": ");
                        newList[index].AFFLICTION = parts[1];
                        newList[index].RELATIVE1 = parts[0];
                        setFamilyChanged(true);
                    }
                    else if(listItems === medsList){
                        while (!(newValue.includes(": "))){
                            newValue = prompt("Incorrect formatting (Medication: ActiveStatus)");
                        }
                        const parts = newValue.split(": ");
                        newList[index].MEDICATION = parts[0];
                        newList[index].ACTIVE = parts[1];  
                        setMedsChanged(true);
                    }
                    else if(listItems === obstetricList){
                        while (!(newValue.includes(": "))){
                            newValue = prompt("Incorrect formatting (Start date (yyyy-mm-dd): End Date (yyyy-mm-dd))");
                        }
                        const parts = newValue.split(": ");
                        newList[index].STARTDATE = parts[0];
                        newList[index].ENDDATE = parts[1];  
                        setObstetricChanged(true);
                    }
                    else if (listItems === PreExistingList){
                        newList[index].CONDITION = newValue;
                        setPreExistingChanged(true);
                    }
                    else if (listItems === immunizationList){
                        newList[index].IMMUNIZATION = newValue;
                        setImmunizationChanged(true);
                    }
                    else if (listItems === allergiesList){
                        newList[index].ALLERGY = newValue;
                        setAllergiesChanged(true);
                    }
                }
                setListItems(newList);
                break;
            case 'delete':
                // remove item from list
                const filteredList = listItems.filter((item, i) => i !== index);
                setListItems(filteredList);
                if (listItems === familyHistoryList){
                    setFamilyChanged(true);
                }
                else if(listItems === medsList){
                    setMedsChanged(true);
                }
                else if(listItems === PreExistingList){
                    setPreExistingChanged(true);
                }
                else if(listItems === allergiesList){
                    setAllergiesChanged(true);
                }
                else if(listItems === immunizationList){
                    setImmunizationChanged(true);
                }
                else if(listItems === obstetricList){
                    setObstetricChanged(true);
                }
                break;
            case 'add':
                newValue = prompt('Enter new value:');
                newList = [...listItems];
                if (newValue !== null){
                    if (listItems === familyHistoryList){
                        while (!(newValue.includes(":"))){
                            newValue = prompt("Incorrect Format. (Relative: Affliction)");
                            if (newValue === null){
                                break;
                            }
                        }
                        if (newValue === null){
                            break;
                        }
                        const parts = newValue.split(": ");
                        newList.push({PATIENT_ID: visitData.PATIENT_ID, AFFLICTION: parts[1], RELATIVE1: parts[0] });
                        setFamilyChanged(true);
                    }
                    else if(listItems === medsList){
                        while (!(newValue.includes(": "))){
                            newValue = prompt("Incorrect formatting (Medication: ActiveStatus(yes/no))");
                            if (newValue === null){
                                break;
                            }
                        }
                        if (newValue === null){
                            break;
                        }
                        const parts = newValue.split(": ");
                        newList.push({PATIENT_ID: visitData.PATIENT_ID, MEDICATION: parts[0], ACTIVE: parts[1]});
                        setMedsChanged(true);
                    }
                    else if(listItems === obstetricList){
                        while (!(newValue.includes(": "))){
                            newValue = prompt("Incorrect formatting (Start date (yyyy-mm-dd): End Date (yyyy-mm-dd))");
                            if (newValue === null){
                                break;
                            }
                        }
                        if (newValue === null){
                            break;
                        }
                        const parts = newValue.split(": ");
                        newList.push({PATIENT_ID: visitData.PATIENT_ID, STARTDATE: parts[0], ENDDATE: parts[1]});
                        setObstetricChanged(true);
                    }
                    else if (listItems === PreExistingList){
                        newList.push({PATIENT_ID: visitData.PATIENT_ID, CONDITION: newValue});
                        setPreExistingChanged(true);
                    }
                    else if (listItems === immunizationList){
                        newList.push({PATIENT_ID: visitData.PATIENT_ID, IMMUNIZATION: newValue});
                        setImmunizationChanged(true);
                    }
                    else if (listItems === allergiesList){
                        newList.push({PATIENT_ID: visitData.PATIENT_ID, ALLERGY: newValue});
                        setAllergiesChanged(true);
                    }
                }
                setListItems(newList);
                break;              
            default:
                console.log('Invalid action:', action);
        }
      };

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
                                        {visitResults.map((result) => (
                                        <Dropdown.Item key={result.VISIT_ID} eventKey={`${result.VISIT_DATE}:${result.VISIT_ID}`}>
                                            {result.VISIT_DATE}
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
                                        <Form.Group controlId="CHIEF_COMPLAINT">
                                            <Form.Label>Chief Complaint</Form.Label>
                                            <Form.Control type="text" 
                                                placeholder="None" 
                                                value = {visitData.CHIEF_COMPLAINT} 
                                                onChange = {(e) => visitChanged('CHIEF_COMPLAINT', e.target.value)}
                                            />
                                        </Form.Group>
                                        </Col>
                                        <Col md={4} className="d-flex align-items-center justify-content-center">
                                            <Row>
                                                <Col>
                                                    <h6 style={{marginTop:'10px', marginLeft:'10px'}}>Type:</h6>      
                                                </Col>
                                                <Col>
                                                <Dropdown onSelect={(key) => visitChanged('VISIT_TYPE', key)}>
                                                    <Dropdown.Toggle style={{ backgroundColor: '#f8f9fa', borderColor: '#f8f9fa', color: '#212529' }}>
                                                        {visitData.VISIT_TYPE}                                            
                                                    </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item eventKey="Cleaning/Checkup">Cleaning/Checkup</Dropdown.Item>
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
                                            <Form.Group controlId="DIAGNOSIS">
                                                <Form.Label>Diagnosis</Form.Label>
                                                <Form.Control type="text" 
                                                    placeholder="None" 
                                                    value = {visitData.DIAGNOSIS} 
                                                    onChange = {(e) => visitChanged('DIAGNOSIS', e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4} className="d-flex align-items-center justify-content-center">
                                            <Row>
                                                <Col>
                                                    <h6 style={{marginTop:'10px'}}>Doctor:</h6>
                                                </Col>
                                                <Col>
                                                    <Dropdown onSelect={(key) => visitChanged('DOCTOR_NAME', key)}>
                                                        <Dropdown.Toggle style={{ backgroundColor: '#f8f9fa', borderColor: '#f8f9fa', color: '#212529' }}>
                                                            {visitData.DOCTOR_NAME}                                            
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item eventKey="Miller">Dr. Miller</Dropdown.Item>
                                                            <Dropdown.Item eventKey="Ding">Dr. Ding</Dropdown.Item>
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
                                    <h6 style={{marginTop:'10px'}}>ID: {visitData.PATIENT_ID}</h6>
                                </Col>
                                <Col>
                                    <Dropdown onSelect={(key) => updatePatientInfo('GENDER', key)}>
                                        <Dropdown.Toggle style={{ backgroundColor: '#f8f9fa', borderColor: '#f8f9fa', color: '#212529' }}>
                                            {patientGenerics.GENDER}                                            
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="Male">Male</Dropdown.Item>
                                            <Dropdown.Item eventKey="Female">Female</Dropdown.Item>
                                            <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                            <Form.Group controlId="FIRST_NAME">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" 
                                    placeholder="None" 
                                    value = {patientGenerics.FIRST_NAME} 
                                    onChange = {(e) => updatePatientInfo('FIRST_NAME', e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="LAST_NAME">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" 
                                    placeholder="None" 
                                    value = {patientGenerics.LAST_NAME} 
                                    onChange = {(e) => updatePatientInfo('LAST_NAME', e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="DOB">
                                <Form.Label>DOB</Form.Label>
                                <Form.Control type="text" 
                                    placeholder="yyyy-mm-dd" 
                                    value = {patientGenerics.DOB} 
                                    onChange = {(e) => updatePatientInfo('DOB', e.target.value)}
                                />
                            </Form.Group>
                            <div style={{marginTop: '20px'}}>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventkey="0">
                                        <Accordion.Header>More Info</Accordion.Header>
                                        <Accordion.Body>
                                            <Row>
                                                <Col>
                                                    <Form.Group controlId="WEIGHT">
                                                        <Form.Label>Weight</Form.Label>
                                                        <Form.Control type="number" 
                                                            placeholder="None" 
                                                            value = {visitData.WEIGHT} 
                                                            onChange = {(e) => visitChanged('WEIGHT', e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group controlId="HEIGHT">
                                                        <Form.Label>Height</Form.Label>
                                                        <Form.Control type="text" 
                                                            placeholder="None" 
                                                            value = {visitData.HEIGHT} 
                                                            onChange = {(e) => visitChanged('HEIGHT', e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Form.Group controlId="RACE">
                                                <Form.Label>Race</Form.Label>
                                                <Form.Control type="text" 
                                                    value = {patientGenerics.RACE} 
                                                    onChange = {(e) => updatePatientInfo('RACE', e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="PHONE">
                                                <Form.Label>PHONE</Form.Label>
                                                <Form.Control type="text" 
                                                    placeholder="XXX-XXX-XXXX" 
                                                    value = {patientGenerics.PHONE} 
                                                    onChange = {(e) => updatePatientInfo('PHONE', e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="LANGUAGE">
                                                <Form.Label>Preferred Language</Form.Label>
                                                <Form.Control type="text" 
                                                    value = {patientGenerics.PREF_LANGUAGE} 
                                                    onChange = {(e) => updatePatientInfo('PREF_LANGUAGE', e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="patientAddress">
                                                <h6 style={{marginTop:'10px'}}>Address:</h6>
                                                <Form.Label>Street 1</Form.Label>
                                                <Form.Control type="text" 
                                                    placeholder="None" 
                                                    value = {patientGenerics.STREET1} 
                                                    onChange = {(e) => updatePatientInfo('STREET1', e.target.value)}
                                                />
                                                <Form.Label>Street 2</Form.Label>
                                                <Form.Control type="text" 
                                                    placeholder="None" 
                                                    value = {patientGenerics.STREET2} 
                                                    onChange = {(e) => updatePatientInfo('STREET2', e.target.value)}
                                                />
                                                <Form.Label>City</Form.Label>
                                                <Form.Control type="text" 
                                                    placeholder="None" 
                                                    value = {patientGenerics.CITY} 
                                                    onChange = {(e) => updatePatientInfo('CITY', e.target.value)}
                                                />
                                                <Form.Label>State</Form.Label>
                                                <Form.Control type="text" 
                                                    placeholder="None" 
                                                    value = {patientGenerics.STATE} 
                                                    onChange = {(e) => updatePatientInfo('STATE', e.target.value)}
                                                />
                                                <Form.Label>Zip</Form.Label>
                                                <Form.Control type="text" 
                                                    placeholder="None" 
                                                    value = {patientGenerics.ZIP} 
                                                    onChange = {(e) => updatePatientInfo('ZIP', e.target.value)}
                                                />
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
                                                            {item.CONDITION}
                                                            <span
                                                                className='float-right text-danger'
                                                                style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '5px', cursor: 'pointer'}}
                                                                onClick={() => handleListChange(PreExistingList, setPreExistingList, 'delete', index)}
                                                            >
                                                                &times;
                                                            </span>
                                                            </ListGroup.Item>
                                                        ))}
                                                        <Button onClick={() => handleListChange(PreExistingList, setPreExistingList, 'add', 0)}>
                                                            Add Item
                                                        </Button>
                                                    </ListGroup>
                                                </div>
                                            </Card.Body>
                                        </Tab>
                                        <Tab eventKey="immunization" title="Immunization">
                                            <Card.Body>
                                                <div style={{ height: '200px', overflowY: 'scroll' }}>
                                                    <ListGroup variant='flush'>
                                                        {immunizationList.map((item, index) => (
                                                            <ListGroup.Item
                                                            key={index}
                                                            onDoubleClick={() => handleListChange(immunizationList, setImmunizationList, 'edit', index)}
                                                            >
                                                            {item.IMMUNIZATION}
                                                            <span
                                                                className='float-right text-danger'
                                                                style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '5px', cursor: 'pointer'}}
                                                                onClick={() => handleListChange(immunizationList, setImmunizationList, 'delete', index)}
                                                            >
                                                                &times;
                                                            </span>
                                                            </ListGroup.Item>
                                                        ))}
                                                        <Button onClick={() => handleListChange(immunizationList, setImmunizationList, 'add', 0)}>
                                                            Add Item
                                                        </Button>
                                                    </ListGroup>
                                                </div>
                                            </Card.Body>
                                        </Tab>
                                        <Tab eventKey="family" title="Family">
                                            <Card.Body>
                                                <div style={{ height: '200px', overflowY: 'scroll' }}>
                                                    <ListGroup variant='flush'>
                                                        {familyHistoryList.map((item, index) => (
                                                            <ListGroup.Item
                                                            key={index}
                                                            onDoubleClick={() => handleListChange(familyHistoryList, setFamilyHistoryList, 'edit', index)}
                                                            >
                                                            {`${item.RELATIVE1}: ${item.AFFLICTION}`}
                                                            <span
                                                                className='float-right text-danger'
                                                                style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '5px', cursor: 'pointer'}}
                                                                onClick={() => handleListChange(familyHistoryList, setFamilyHistoryList, 'delete', index)}
                                                            >
                                                                &times;
                                                            </span>
                                                            </ListGroup.Item>
                                                        ))}
                                                        <Button onClick={() => handleListChange(familyHistoryList, setFamilyHistoryList, 'add', 0)}>
                                                            Add Item
                                                        </Button>
                                                    </ListGroup>
                                                </div>
                                            </Card.Body>
                                        </Tab>
                                        <Tab eventKey="obstetric" title="Obstetric">
                                            <Card.Body>
                                            <div style={{ height: '200px', overflowY: 'scroll' }}>
                                                    <ListGroup variant='flush'>
                                                        {obstetricList.map((item, index) => (
                                                            <ListGroup.Item
                                                            key={index}
                                                            onDoubleClick={() => handleListChange(obstetricList, setObstetricList, 'edit', index)}
                                                            >
                                                            {`${item.STARTDATE}: ${item.ENDDATE}`}
                                                            <span
                                                                className='float-right text-danger'
                                                                style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '5px', cursor: 'pointer'}}
                                                                onClick={() => handleListChange(obstetricList, setObstetricList, 'delete', index)}
                                                            >
                                                                &times;
                                                            </span>
                                                            </ListGroup.Item>
                                                        ))}
                                                        <Button onClick={() => handleListChange(obstetricList, setObstetricList, 'add', 0)}>
                                                            Add Item
                                                        </Button>
                                                    </ListGroup>
                                                </div>
                                            </Card.Body>
                                        </Tab>
                                        <Tab eventKey="social" title="Social">
                                            <Card.Body>
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>Alcohol Use</th>
                                                            <th>Excercise</th>
                                                            <th>Martial Status</th>
                                                            <th>Occupation</th>
                                                            <th>Smoking Use</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td onDoubleClick={() => handleCellClick('ALCOHOL')}>
                                                                {socialList.ALCOHOL ? socialList.ALCOHOL : 'NONE'}
                                                            </td>
                                                            <td onDoubleClick={() => handleCellClick('EXERCISE')}>
                                                                {socialList.EXERCISE ? socialList.EXERCISE : 'NONE'}
                                                            </td>
                                                            <td onDoubleClick={() => handleCellClick('MARRIAGE')}>
                                                                {socialList.MARRIAGE ? socialList.MARRIAGE : 'NONE'}
                                                            </td>
                                                            <td onDoubleClick={() => handleCellClick('OCCUPATION')}>
                                                                {socialList.OCCUPATION ? socialList.OCCUPATION : 'NONE'}
                                                            </td>
                                                            <td onDoubleClick={() => handleCellClick('SMOKING')}>
                                                                {socialList.SMOKING ? socialList.SMOKING : 'NONE'}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                                <h6>Double Click to Edit Any Value</h6>
                                            </Card.Body>
                                        </Tab>
                                        <Tab eventKey="Medications" title="Medications">
                                            <Card.Body>
                                                <div style={{ height: '200px', overflowY: 'scroll' }}>
                                                    <ListGroup variant='flush'>
                                                        {medsList.map((item, index) => (
                                                            <ListGroup.Item
                                                            key={index}
                                                            onDoubleClick={() => handleListChange(medsList, setMedsList, 'edit', index)}
                                                            >
                                                            {`${item.MEDICATION}: ${item.ACTIVE.toLowerCase().includes('yes') ? 'active' : 'not active'}`}
                                                            <span
                                                                className='float-right text-danger'
                                                                style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '5px', cursor: 'pointer'}}
                                                                onClick={() => handleListChange(medsList, setMedsList, 'delete', index)}
                                                            >
                                                                &times;
                                                            </span>
                                                            </ListGroup.Item>
                                                        ))}
                                                        <Button onClick={() => handleListChange(medsList, setMedsList, 'add', 0)}>
                                                            Add Item
                                                        </Button>
                                                    </ListGroup>
                                                </div>
                                            </Card.Body>
                                        </Tab>
                                        <Tab eventKey="allergies" title="Allergies">
                                            <Card.Body>
                                                <div style={{ height: '200px', overflowY: 'scroll' }}>
                                                    <ListGroup variant='flush'>
                                                        {allergiesList.map((item, index) => (
                                                            <ListGroup.Item
                                                            key={index}
                                                            onDoubleClick={() => handleListChange(allergiesList, setAllergiesList, 'edit', index)}
                                                            >
                                                            {`${item.ALLERGY}`}
                                                            <span
                                                                className='float-right text-danger'
                                                                style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '5px', cursor: 'pointer'}}
                                                                onClick={() => handleListChange(allergiesList, setAllergiesList, 'delete', index)}
                                                            >
                                                                &times;
                                                            </span>
                                                            </ListGroup.Item>
                                                        ))}
                                                        <Button onClick={() => handleListChange(allergiesList, setAllergiesList, 'add', 0)}>
                                                            Add Item
                                                        </Button>
                                                    </ListGroup>
                                                </div>
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
                        <h3>Plan of Action</h3>
                    </Card.Header>
                    <Card.Body>
                        <div style={{marginTop: '20px'}}>
                            <Accordion>
                                {treatments.map((treatment, index) => (
                                    <Accordion.Item eventKey={index.toString()} key={index}>
                                        <Accordion.Header>Treatment {index + 1}</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Group controlId={`treatmentKeyword-${index}`}>
                                                <Form.Label>Keyword Desc</Form.Label>
                                                <Form.Control type="text" placeholder="None" value={treatment.KEYWORD_DESC} onChange={e => handleTreatmentsChange(index, 'KEYWORD_DESC', e.target.value)}/>
                                            </Form.Group>
                                            <Form.Group controlId={`treatmentType-${index}`}>
                                                <Form.Label>Type</Form.Label>
                                                <Form.Control type="text" placeholder="None" value={treatment.TREATMENT_TYPE} onChange={e => handleTreatmentsChange(index, 'TREATMENT_TYPE', e.target.value)}/>
                                            </Form.Group>
                                            <Form.Group controlId={`treatmentDuration-${index}`}>
                                                <Form.Label>Duration</Form.Label>
                                                <Form.Control type="text" placeholder="None" value={treatment.DURATION} onChange={e => handleTreatmentsChange(index, 'DURATION', e.target.value)}/>
                                            </Form.Group>
                                            <Form.Group controlId={`treatmentSuccess-${index}`}>
                                                <Row>
                                                    <Col>
                                                    <h6>Success: </h6>
                                                    </Col>
                                                    <Col>
                                                    <Form.Check type='checkbox' id={`successCheckbox-${index}`} checked={treatment.SUCCESS} onChange={(e) => handleTreatmentsChange(index, 'SUCCESS', e.target.value)}/>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                            <Button onClick={(index) => handleTreatmentDeletion(index)}>Delete Treatment</Button>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                                <Accordion.Item eventKey={treatments.length + 1} key={treatments.length + 1}>
                                    <Accordion.Header>Add Treatment</Accordion.Header>
                                        <Accordion.Body>
                                        <Form.Group controlId='treatmentKeyword-new'>
                                            <Form.Label>Keyword Desc</Form.Label>
                                            <Form.Control type="text" placeholder="None" value={newTreatment.KEYWORD_DESC} onChange={(e) => handleTreatmentsChange(-1, 'KEYWORD_DESC', e.target.value)} />
                                        </Form.Group>
                                        <Form.Group controlId='treatmentType-new'>
                                            <Form.Label>Type</Form.Label>
                                            <Form.Control type="text" placeholder="None" value={newTreatment.TREATMENT_TYPE} onChange={(e) => handleTreatmentsChange(-1, 'TREATMENT_TYPE', e.target.value)} />
                                        </Form.Group>
                                        <Form.Group controlId='treatmentDuration-new'>
                                            <Form.Label>Duration</Form.Label>
                                            <Form.Control type="text" placeholder="None" value={newTreatment.DURATION} onChange={(e) => handleTreatmentsChange(-1, 'DURATION', e.target.value)} />
                                        </Form.Group>
                                        <Form.Group controlId='treatmentSuccess-new'>
                                        <Row>
                                            <Col>
                                            <h6>Success: </h6>
                                            </Col>
                                            <Col>
                                            <Form.Check type='checkbox' id='successCheckbox-new' checked={newTreatment.SUCCESS} onChange={(e) => handleTreatmentsChange(-1, 'SUCCESS', e.target.value)}/>
                                            </Col>
                                        </Row>
                                        </Form.Group>
                                        <Button onClick={handleNewTreatment}>Add Treatment</Button>
                                        </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row style={{padding:'25px'}}>
                <Col>
                    <Card style={{width:'100%'}}>
                        <Card.Header>
                            <h3>Additional Information</h3>
                        </Card.Header>
                        <Form>
                            <Form.Group controlId="NOTES">
                                <Form.Label>Notes</Form.Label>
                                <Form.Control type="text" 
                                    placeholder="None" 
                                    value = {visitData.NOTES} 
                                    onChange = {(e) => visitChanged('NOTES', e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Card>
                </Col>
            </Row>
            <Button variant="primary" onClick={postrequest} className="mx-auto d-block" style={{marginBottom:'10px'}}>Save Changes</Button>
        </div>
    );
}

export default PatientChart;

