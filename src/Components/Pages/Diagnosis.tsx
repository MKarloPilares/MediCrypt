import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ThemeProvider } from 'react-bootstrap';
import './Diagnosis.css';

const Diagnosis = ({ setDiagDetails }) => {
  const [diagDiagnosis, setDiagDiagnosis] = useState('');
  const [prognosis, setPrognosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [diagDate, setDiagDate] = useState('');
  const [diagDoctor, setDiagDoctor] = useState('');
  const [facility, setFacility] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    checkFormValidity();
  }, [diagDiagnosis, prognosis, treatment, diagDate, diagDoctor, facility]);

  const checkFormValidity = () => {
    setIsFormValid(
      diagDiagnosis !== '' &&
      prognosis !== '' &&
      treatment !== '' &&
      diagDate !== '' &&
      diagDoctor !== '' &&
      facility !== ''
    );
  };

  const appendDiagnosis = (newDiagnosis, newPrognosis, newTreatment, newDate, newDoctor, newFacility) => {
    setDiagDetails(prevDetails => ({
      ...prevDetails,
      diagDiagnosis: [...prevDetails.diagDiagnosis, newDiagnosis],
      prognosis: [...prevDetails.prognosis, newPrognosis],
      treatment: [...prevDetails.treatment, newTreatment],
      diagDate: [...prevDetails.diagDate, newDate],
      diagDoctor: [...prevDetails.diagDoctor, newDoctor],
      facility: [...prevDetails.facility, newFacility],
    }));
  };

  const resetForm = () => {
    setDiagDiagnosis('');
    setPrognosis('');
    setTreatment('');
    setDiagDate('');
    setDiagDoctor('');
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
            <Form.Group className='mb-3'>
              <Form.Label>Diagnosis</Form.Label>
              <Form.Control
                placeholder='Diagnosis'
                value={diagDiagnosis}
                className="form-control"
                onChange={(e) => setDiagDiagnosis(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Prognosis</Form.Label>
              <Form.Control
                placeholder='Prognosis'
                value={prognosis}
                className="form-control"
                onChange={(e) => setPrognosis(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
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
            <Form.Group className='mb-3'>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder='Date'
                value={diagDate}
                className="form-control"
                onChange={(e) => setDiagDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Doctor</Form.Label>
              <Form.Control
                placeholder='Doctor'
                value={diagDoctor}
                className="form-control"
                onChange={(e) => setDiagDoctor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
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
         onClick={() => {appendDiagnosis(diagDiagnosis, prognosis, treatment, diagDate, diagDoctor, facility); resetForm()}}>Add</Button>
      </Form>
    </ThemeProvider>
  );
};

export default Diagnosis;
