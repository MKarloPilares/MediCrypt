import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { ThemeProvider } from 'react-bootstrap';
import './Medication.css';

//Page to add medications to the medicationDetails
const Medication = ({ setMedicationDetails }) => {
  const [generic, setGeneric] = useState<string>(''); //Generic name of the drug
  const [brand, setBrand] = useState<string>(''); //Brand name of the drug
  const [dose, setDose] = useState<string>(''); //Dosage indicated
  const [medDiag, setMedDiag] = useState<string>(''); //What illness the drug is needed for
  const [medDate, setMedDate] = useState<string>(''); //Date the drug was prescribed
  const [medDoctor, setMedDoctor] = useState<string>(''); //Name of the prescribing doctor
  const [isFormValid, setIsFormValid] = useState(false); //Checks the validity of inputs and controls activation of the add button

  //Checks if inputs are valid
  useEffect(() => {
    checkFormValidity();
  }, [generic, brand, dose, medDiag, medDate, medDoctor]);

  const checkFormValidity = () => {
    setIsFormValid(
      generic !== '' &&
      brand !== '' &&
      dose !== '' &&
      medDiag !== '' &&
      medDate !== '' &&
      medDoctor !== ''
    );
  };

  //Empties input controls when the add button is pressed
  const resetForm = () => {
    setGeneric('');
    setBrand('');
    setDose('');
    setMedDate('');
    setMedDoctor('');
    setMedDiag('');
  };

  //Appends inputs to medicationDetails
  const appendMedication = (newGeneric, newBrand, newDose, newDiag, newDate, newDoctor) => {
    setMedicationDetails(prevDetails => ({
      ...prevDetails,
      generic: [...prevDetails.generic, newGeneric],
      brand: [...prevDetails.brand, newBrand],
      dose: [...prevDetails.dose, newDose],
      medDiag: [...prevDetails.medDiag, newDiag],
      medDate: [...prevDetails.medDate, newDate],
      medDoctor: [...prevDetails.medDoctor, newDoctor],
    }));
  };

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Form className="medication-form">
        <Row>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Generic Name</Form.Label>
              <Form.Control placeholder='Generic Name' value={generic} className="input-field" onChange={(e) => setGeneric(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Brand Name</Form.Label>
              <Form.Control placeholder='Brand Name' value={brand} className="input-field" onChange={(e) => setBrand(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Dosage</Form.Label>
              <Form.Control placeholder='Dosage' value={dose} className="input-field" onChange={(e) => setDose(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Diagnosis</Form.Label>
              <Form.Control placeholder='Diagnosis' value={medDiag} className="input-field" onChange={(e) => setMedDiag(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Date of Prescription</Form.Label>
              <Form.Control placeholder='Date' type='date' value={medDate} className="input-field" onChange={(e) => setMedDate(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Prescribing Doctor</Form.Label>
              <Form.Control placeholder='Name of Doctor' value={medDoctor} className="input-field" onChange={(e) => setMedDoctor(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Button variant='success' disabled={!isFormValid} className="submit-button" onClick={() => { appendMedication(generic, brand, dose, medDiag, medDate, medDoctor); resetForm() }}>Add</Button>
      </Form>
    </ThemeProvider>
  );
};

export default Medication;
