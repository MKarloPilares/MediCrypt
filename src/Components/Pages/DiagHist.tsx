import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ThemeProvider } from 'react-bootstrap';
import './DiagHist.css';

//Page the lists the diagnosis history that is in the record.
const DiagHist = ({ diagDetails }) => {
  const entries = diagDetails.diagDiagnosis.map((_, index) => ({ //Maps the diagDetails variable to be iterable.
    diagDiagnosis: diagDetails.diagDiagnosis[index],
    prognosis: diagDetails.prognosis[index],
    treatment: diagDetails.treatment[index],
    diagDate: diagDetails.diagDate[index],
    diagDoctor: diagDetails.diagDoctor[index], 
    facility: diagDetails.facility[index],
  }));

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Form className="diag-form">
        {entries.map((item, index) => (
          <Row key={index} className="diag-row">
            <Col>
              <Form.Group className='mb-3' controlId={`diagnosis-${index}`}>
                <Form.Label>Diagnosis</Form.Label>
                <br />
                <Form.Text>{item.diagDiagnosis}</Form.Text>
              </Form.Group>
              <Form.Group className='mb-3' controlId={`prognosis-${index}`}>
                <Form.Label>Prognosis</Form.Label>
                <br />
                <Form.Text>{item.prognosis}</Form.Text>
              </Form.Group>
              <Form.Group className='mb-3' controlId={`treatment-${index}`}>
                <Form.Label>Treatment</Form.Label>
                <br />
                <Form.Text>{item.treatment}</Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId={`date-${index}`}>
                <Form.Label>Date</Form.Label>
                <br />
                <Form.Text>{item.diagDate}</Form.Text>
              </Form.Group>
              <Form.Group className='mb-3' controlId={`doctor-${index}`}>
                <Form.Label>Doctor</Form.Label>
                <br />
                <Form.Text>{item.diagDoctor}</Form.Text>
              </Form.Group>
              <Form.Group className='mb-3' controlId={`facility-${index}`}>
                <Form.Label>Facility</Form.Label>
                <br />
                <Form.Text>{item.facility}</Form.Text>
              </Form.Group>
            </Col>
          </Row>
        ))}
      </Form>
    </ThemeProvider>
  );
};

export default DiagHist;
