import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ThemeProvider } from 'react-bootstrap';
import './Vitals.css';

//Accepts input and lists the vitals of the patient
const Vitals = ({ vitals, setVitals }) => {

  //Changes in this page are reflected on the vitals data in the record
  const handleVitalsChange = (field, value) => {
    setVitals({ ...vitals, [field]: value });
  };

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Form className="form-container">
        <Row>
          <Col md="5">
            <Form.Group className="mb-3">
              <Form.Label>Weight</Form.Label>
              <Form.Control defaultValue={vitals.weight} className="form-group-width-50" onChange={(e) => handleVitalsChange("weight", e.target.value)} maxLength={5}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Height</Form.Label>
              <Form.Control defaultValue={vitals.height} className="form-group-width-50" onChange={(e) => handleVitalsChange("height", e.target.value)} maxLength={5}/>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <Form.Group className="mb-3">
              <Form.Label>Blood Pressure</Form.Label>
              <Form.Control defaultValue={vitals.bp} className="form-group-width-80" onChange={(e) => handleVitalsChange("bp", e.target.value)} maxLength={11}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="temp-form">
              <Form.Label>Temperature</Form.Label>
              <Form.Control defaultValue={vitals.temp} className="form-group-width-50" onChange={(e) => handleVitalsChange("temp", e.target.value)} maxLength={2}/>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <Form.Group className="pr-form">
              <Form.Label>Pulse Rate</Form.Label>
              <Form.Control defaultValue={vitals.pr} className="form-group-width-60" onChange={(e) => handleVitalsChange("pr", e.target.value)} maxLength={3} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="rr-form">
              <Form.Label>Respiration Rate</Form.Label>
              <Form.Control defaultValue={vitals.rr} className="form-group-width-60" onChange={(e) => handleVitalsChange("rr", e.target.value)} maxLength={3} />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </ThemeProvider>
  );
};

export default Vitals;
