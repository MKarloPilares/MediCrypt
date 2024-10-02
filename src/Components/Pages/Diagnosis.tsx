import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ThemeProvider } from 'react-bootstrap';
import './Diagnosis.css';

//Page to input and append a new diagnosis to the diagDetails variable.
const Diagnosis = ({ setDiagDetails }) => {
  const [diagDiagnosis, setDiagDiagnosis] = useState<string>(''); //Stores the diagnosis
  const [prognosis, setPrognosis] = useState<string>(''); //Stores the expected result
  const [treatment, setTreatment] = useState<string>(''); //Stores the treatment done
  const [diagDate, setDiagDate] = useState<string>(''); //Stores the date when the diagnosis visit/procedure was done
  const [diagDoctor, setDiagDoctor] = useState<string>(''); //Stores the name of the doctor
  const [facility, setFacility] = useState<string>(''); //Stores the name fo the facility
  const [isFormValid, setIsFormValid] = useState<boolean>(false); //Checks if the inputs are valid to control the activation of the add button

  //Checks if the inputs are valid and not empty
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

  //Appends the added data to diagDetails
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

  //Empties the input controls
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
                maxLength={30}
                onChange={(e) => setDiagDiagnosis(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Prognosis</Form.Label>
              <Form.Control
                placeholder='Prognosis'
                value={prognosis}
                className="form-control"
                maxLength={30}
                onChange={(e) => setPrognosis(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Treatment</Form.Label>
              <Form.Control
                placeholder='Treatment'
                value={treatment}
                className="form-control"
                maxLength={30}
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
                maxLength={50}
                onChange={(e) => setDiagDoctor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Facility</Form.Label>
              <Form.Control
                placeholder='Facility'
                value={facility}
                className="form-control"
                maxLength={50}
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
