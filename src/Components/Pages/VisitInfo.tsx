import React from 'react';
import { Container, Form } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';


const VisitInfo = ({nextPage, prevPage}) => {
  const test = ['1', '2'];
  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
      <Row style={{position: 'relative', bottom: '180px', height: '30vh'}}>
        <Col>
          <Form>
            <h3>Visit Information</h3>
            <p></p>
            <p></p>
            <Form.Group className='mb-3' controlId='chiefComplaintForm.ControlInput'>
              <Form.Label>Chief Complaint</Form.Label>
              <Form.Control placeholder='Chief Complaint' style={{width: '71%'}}></Form.Control>
            </Form.Group>
                <Form.Label>Patient Type</Form.Label>
                {['radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    inline
                    label="InPatient"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    inline
                    label="OutPatient"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                  </div>
                ))}
            <Form.Group className='mb-3' controlId='hostDateForm.ControlInput'>
              <Form.Label>Date of Hospitalization</Form.Label>
              <Form.Control placeholder='Date of Hospitalization  ' style={{width: '71%'}}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='diagnosisForm.ControlInput'>
              <Form.Label>Diagnosis</Form.Label>
              <Form.Control placeholder='Diagnosis' style={{width: '71%'}}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='procDoneForm.ControlInput'>
              <Form.Label>Procedure Done</Form.Label>
              <Form.Control placeholder='Procedure' style={{width: '71%'}}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='prognosisForm.ControlInput'>
              <Form.Label>Prognosis</Form.Label>
              <Form.Control placeholder='Prognosis' style={{width: '71%'}}></Form.Control>
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
              <Form.Control placeholder='Name' style={{width: '71%'}}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='FacContactForm.ControlInput'>
              <Form.Label>Facility Contact Number</Form.Label>
              <Form.Control placeholder='Contact Number' style={{width: '71%'}}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='FacAddForm.ControlInput'>
              <Form.Label>Facility Address</Form.Label>
              <Form.Control placeholder='Address' style={{width: '71%'}}></Form.Control>
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
      </Row>
  </ThemeProvider>
  );
};

export default VisitInfo;
