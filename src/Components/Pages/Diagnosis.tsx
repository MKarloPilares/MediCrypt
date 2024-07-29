import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ThemeProvider } from 'react-bootstrap';
import './Diagnosis.css';

const Diagnosis = ({ appendDiagnosis }) => {
  const [diagnosis, setDiagnosis] = useState('');
  const [prognosis, setPrognosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [date, setDate] = useState('');
  const [doctor, setDoctor] = useState('');
  const [facility, setFacility] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    checkFormValidity();
  }, [diagnosis, prognosis, treatment, date, doctor, facility]);

  const checkFormValidity = () => {
    setIsFormValid(
      diagnosis !== '' &&
      prognosis !== '' &&
      treatment !== '' &&
      date !== '' &&
      doctor !== '' &&
      facility !== ''
    );
  };

  const resetForm = () => {
    setDiagnosis('');
    setPrognosis('');
    setTreatment('');
    setDate('');
    setDoctor('');
    setFacility('');
  };

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Form className="form-container">
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='diagnosisForm.ControlInput'>
              <Form.Label>Diagnosis</Form.Label>
              <Form.Control
                placeholder='Diagnosis'
                value={diagnosis}
                className="form-control"
                onChange={(e) => setDiagnosis(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='prognosisForm.ControlInput'>
              <Form.Label>Prognosis</Form.Label>
              <Form.Control
                placeholder='Prognosis'
                value={prognosis}
                className="form-control"
                onChange={(e) => setPrognosis(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='treatmentForm.ControlInput'>
              <Form.Label>Treatment</Form.Label>
              <Form.Control
                placeholder='Treatment'
                value={treatment}
                className="form-control"
                onChange={(e) => setTreatment(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='dateForm.ControlInput'>
              <Form.Label>Date</Form.Label>
              <Form.Control
                placeholder='Date'
                value={date}
                className="form-control"
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='doctorForm.ControlInput'>
              <Form.Label>Doctor</Form.Label>
              <Form.Control
                placeholder='Doctor'
                value={doctor}
                className="form-control"
                onChange={(e) => setDoctor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='facilityForm.ControlInput'>
              <Form.Label>Facility</Form.Label>
              <Form.Control
                placeholder='Facility'
                value={facility}
                className="form-control"
                onChange={(e) => setFacility(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant='success' disabled={!isFormValid} className="add-button"
         onClick={() => {appendDiagnosis(diagnosis, prognosis, treatment, date, doctor, facility); resetForm()}}>Add</Button>
      </Form>
    </ThemeProvider>
  );
};

export default Diagnosis;
