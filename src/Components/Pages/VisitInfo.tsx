  import { useState } from 'react';
import {  Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';


const VisitInfo = ({nextPage, prevPage, test}) => {
  const[cc, setCC] = useState('Stomach ache');
  const[ptype, setType] = useState('OutPatient');
  const[doh, setDOH] = useState('06/29/24');
  const[diag, setDiag] = useState('Ulcer');
  const[proc, setProd] = useState('Checkup');
  const[prog, setProg] = useState('Recovery in 5 days');
  const[facName, setFacName] = useState('Nazareth');
  const[facNum, setFacNum] = useState('1234567890');
  const[facAdd, setFacAdd] = useState('Libjo');
  const [AddedShow, setAddedShow] = useState(false);
  const handleAddedShow = () => setAddedShow(true);
  const handleAddedClose = () => setAddedShow(false);

  return (

    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
          <Modal show={AddedShow} onHide={handleAddedClose}>
        <Modal.Header closeButton>
          <Modal.Title>Access Key Generated!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Record Added!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAddedClose}>
            OK
          </Button>
        </Modal.Footer>
        </Modal>


      <Row style={{position: 'relative', bottom: '180px', height: '30vh'}}>
        <Col>
          <Form>
            <h3>Visit Information</h3>
            <p></p>
            <p></p>
            <Form.Group className='mb-3' controlId='chiefComplaintForm.ControlInput'>
              <Form.Label>Chief Complaint</Form.Label>
              <Form.Control placeholder='Chief Complaint' {...(test === '0' ? {} : { value: cc })} style={{width: '71%'}} onChange={(e) => setCC(e.target.value)}></Form.Control>
            </Form.Group>
                <Form.Label>Patient Type</Form.Label>
                {['radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    inline
                    label="InPatient"
                    name="group1"
                    id={`inline-${type}-1`}
                    {...(test === '1' && type === 'InPatient' ? { checked: true } : {checked: false})}
                    onChange={() => setType('InPatient')}
                  />
                  <Form.Check
                    inline
                    label="OutPatient"
                    name="group1"
                    id={`inline-${type}-2`}
                    {...(test === '1' && ptype === 'OutPatient' ? { checked: true } : {checked: false})}
                    onChange={() => setType('OutPatient')}
                  />
                  </div>
                ))}
            <Form.Group className='mb-3' controlId='hostDateForm.ControlInput'>
              <Form.Label>Date of Hospitalization</Form.Label>
              <Form.Control placeholder='Date of Hospitalization' {...(test === '0' ? {} : { value: doh })} style={{width: '71%'}} onChange={(e) => setDOH(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='diagnosisForm.ControlInput'>
              <Form.Label>Diagnosis</Form.Label>
              <Form.Control placeholder='Diagnosis' {...(test === '0' ? {} : { value: diag })} style={{width: '71%'}} onChange={(e) => setDiag(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='procDoneForm.ControlInput'>
              <Form.Label>Procedure Done</Form.Label>
              <Form.Control placeholder='Procedure' {...(test === '0' ? {} : { value: proc })} style={{width: '71%'}} onChange={(e) => setProd(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='prognosisForm.ControlInput'>
              <Form.Label>Prognosis</Form.Label>
              <Form.Control placeholder='Prognosis' {...(test === '0' ? {} : { value: prog })} style={{width: '71%'}} onChange={(e) => setProg(e.target.value)}></Form.Control>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Form>
          <h3>Facility Information</h3>
          <p></p>
          <p></p>
            <Form.Group className='mb-3' controlId='FacNameForm.ControlInput'>
              <Form.Label>Facility Name</Form.Label>
              <Form.Control placeholder='Name' {...(test === '0' ? {} : { value: facName })} style={{width: '71%'}} onChange={(e) => setFacName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='FacContactForm.ControlInput'>
              <Form.Label>Facility Contact Number</Form.Label>
              <Form.Control placeholder='Contact Number' {...(test === '0' ? {} : { value: facNum })} style={{width: '71%'}} onChange={(e) => setFacNum(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='FacAddForm.ControlInput'>
              <Form.Label>Facility Address</Form.Label>
              <Form.Control placeholder='Address' {...(test === '0' ? {} : { value: facAdd })} style={{width: '71%'}} onChange={(e) => setFacAdd(e.target.value)}></Form.Control>
            </Form.Group>
          </Form>
        </Col>
        <Row>
        <Col md='9'>
            <Button size='lg' variant="success"  style={{width: '120px', position: 'sticky'}} onClick={prevPage}>Back</Button>
          </Col>
          <Col>
            <Button size='lg' variant="success" style={{width: '120px', position: 'sticky'}} onClick={nextPage}>Next</Button>
          </Col>
        </Row>
        <Row style={{marginTop: '50px'}}>
          <Button variant='success' style={{width: '25%', position:'relative', left: '32%'}} onClick={handleAddedShow}>Submit Record</Button>
        </Row>
      </Row>
  </ThemeProvider>
  );
};

export default VisitInfo;
