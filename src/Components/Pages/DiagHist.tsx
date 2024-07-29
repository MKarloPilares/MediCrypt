import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ThemeProvider } from 'react-bootstrap';
import './DiagHist.css';

const DiagHist = ({ diagDetails }) => {
  const entries = diagDetails.diagnosis.map((_, index) => ({
    diagnosis: diagDetails.diagnosis[index],
    prognosis: diagDetails.prognosis[index],
    treatment: diagDetails.treatment[index],
    date: diagDetails.date[index],
    doctor: diagDetails.doctor[index],
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
                <Form.Text>{item.diagnosis}</Form.Text>
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
                <Form.Text>{item.date}</Form.Text>
              </Form.Group>
              <Form.Group className='mb-3' controlId={`doctor-${index}`}>
                <Form.Label>Doctor</Form.Label>
                <br />
                <Form.Text>{item.doctor}</Form.Text>
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
