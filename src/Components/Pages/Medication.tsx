import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { ThemeProvider } from 'react-bootstrap';
import './Medication.css';

const Medication = ({ appendMedication }) => {
  const [generic, setGeneric] = useState('');
  const [brand, setBrand] = useState('');
  const [dose, setDose] = useState('');
  const [diag, setDiag] = useState('');
  const [date, setDate] = useState('');
  const [doctor, setDoctor] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    checkFormValidity();
  }, [generic, brand, dose, diag, date, doctor]);

  const checkFormValidity = () => {
    setIsFormValid(
      generic !== '' &&
      brand !== '' &&
      dose !== '' &&
      diag !== '' &&
      date !== '' &&
      doctor !== ''
    );
  };

  const resetForm = () => {
    setGeneric('');
    setBrand('');
    setDose('');
    setDate('');
    setDoctor('');
    setDiag('');
  };

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Form className="medication-form">
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Generic Name</Form.Label>
              <Form.Control placeholder='Generic Name' value={generic} className="input-field" onChange={(e) => setGeneric(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Brand Name</Form.Label>
              <Form.Control placeholder='Brand Name' value={brand} className="input-field" onChange={(e) => setBrand(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Dosage</Form.Label>
              <Form.Control placeholder='Dosage' value={dose} className="input-field" onChange={(e) => setDose(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Diagnosis</Form.Label>
              <Form.Control placeholder='Diagnosis' value={diag} className="input-field" onChange={(e) => setDiag(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Date of Prescription</Form.Label>
              <Form.Control placeholder='Date' value={date} className="input-field" onChange={(e) => setDate(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Prescribing Doctor</Form.Label>
              <Form.Control placeholder='Name of Doctor' value={doctor} className="input-field" onChange={(e) => setDoctor(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Button variant='success' disabled={!isFormValid} className="submit-button" onClick={() => { appendMedication(generic, brand, dose, diag, date, doctor); resetForm() }}>Add</Button>
      </Form>
    </ThemeProvider>
  );
};

export default Medication;
