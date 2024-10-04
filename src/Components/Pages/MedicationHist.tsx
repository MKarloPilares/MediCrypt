import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ThemeProvider } from 'react-bootstrap';
import './MedicationHist.css';

interface medicationDetails {
  generic: string[];
  brand: string[];
  dose: number[];
  medDiag: string[];
  medDate: string[];
  medDoctor: string[];
}

interface MedicationHistProps {
  medicationDetails: medicationDetails;
}

//Page to list the medications in medicationDetails
const MedicationHist: React.FC<MedicationHistProps> = ({ medicationDetails }) => {
  const entries = medicationDetails.generic.map((_, index) => ({ //Maps medicationDetails to be iterable.
    generic: medicationDetails.generic[index],
    brand: medicationDetails.brand[index],
    dose: medicationDetails.dose[index],
    medDiag: medicationDetails.medDiag[index],
    medDate: medicationDetails.medDate[index],
    medDoctor: medicationDetails.medDoctor[index],
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
              <Form.Group className='mb-3'>
                <Form.Label>Generic Name</Form.Label>
                <br />
                <Form.Text>{item.generic}</Form.Text>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Brand Name</Form.Label>
                <br />
                <Form.Text>{item.brand}</Form.Text>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Dosage</Form.Label>
                <br />
                <Form.Text>{item.dose}mg</Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3'>
                <Form.Label>Diagnosis</Form.Label>
                <br />
                <Form.Text>{item.medDiag}</Form.Text>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Date of Prescription</Form.Label>
                <br />
                <Form.Text>{item.medDate}</Form.Text>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Prescribing Doctor</Form.Label>
                <br />
                <Form.Text>{item.medDoctor}</Form.Text>
              </Form.Group>
            </Col>
          </Row>
        ))}
      </Form>
    </ThemeProvider>
  );
};

export default MedicationHist;
