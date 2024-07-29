import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ThemeProvider } from 'react-bootstrap';
import './EmergencyInformation.css'

const EmerInfo = ({ emergencyInfo, setEmergencyInfo }) => {
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Form className="form-container">
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Emergency Contact</Form.Label>
              <Form.Control value={emergencyInfo.emName} className="input-field" onChange={(e) => setEmergencyInfo('emName', e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Emergency Contact Number</Form.Label>
              <Form.Control value={emergencyInfo.emNum} className="input-field" onChange={(e) => setEmergencyInfo('emNum', e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Relationship With Patient</Form.Label>
              <Form.Control value={emergencyInfo.relationship} className="input-field" onChange={(e) => setEmergencyInfo('relationship', e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </ThemeProvider>
  );
};

export default EmerInfo;
