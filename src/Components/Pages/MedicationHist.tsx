import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ThemeProvider } from 'react-bootstrap';
import './MedicationHist.css';

const MedicationHist = ({ medicationDetails }) => {
  const entries = medicationDetails.generic.map((_, index) => ({
    generic: medicationDetails.generic[index],
    brand: medicationDetails.brand[index],
    dose: medicationDetails.dose[index],
    diag: medicationDetails.diag[index],
    date: medicationDetails.date[index],
    doctor: medicationDetails.doctor[index],
  }));

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Form className="form-container">
        {entries.map((item, index) => (
          <Row key={index} className="row-border">
            <Col>
              <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
                <Form.Label>Generic Name</Form.Label>
                <br />
                <Form.Text>{item.generic}</Form.Text>
              </Form.Group>
              <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
                <Form.Label>Brand Name</Form.Label>
                <br />
                <Form.Text>{item.brand}</Form.Text>
              </Form.Group>
              <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
                <Form.Label>Dosage</Form.Label>
                <br />
                <Form.Text>{item.dose}</Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
                <Form.Label>Diagnosis</Form.Label>
                <br />
                <Form.Text>{item.diag}</Form.Text>
              </Form.Group>
              <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
                <Form.Label>Date of Prescription</Form.Label>
                <br />
                <Form.Text>{item.date}</Form.Text>
              </Form.Group>
              <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
                <Form.Label>Prescribing Doctor</Form.Label>
                <br />
                <Form.Text>{item.doctor}</Form.Text>
              </Form.Group>
            </Col>
          </Row>
        ))}
      </Form>
    </ThemeProvider>
  );
};

export default MedicationHist;
