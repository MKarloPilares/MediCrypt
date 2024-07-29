import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ThemeProvider } from 'react-bootstrap';
import './Vitals.css';

const Vitals = ({ vitals, setVitals }) => {
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
              <Form.Control value={vitals.weight} className="form-group-width-50" onChange={(e) => setVitals("weight", e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Height</Form.Label>
              <Form.Control value={vitals.height} className="form-group-width-50" onChange={(e) => setVitals("height", e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <Form.Group className="mb-3">
              <Form.Label>Blood Pressure</Form.Label>
              <Form.Control value={vitals.bp} className="form-group-width-80" onChange={(e) => setVitals("bp", e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Temperature</Form.Label>
              <Form.Control value={vitals.temp} className="form-group-width-50" onChange={(e) => setVitals("temp", e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <Form.Group className="mb-3">
              <Form.Label>Pulse Rate</Form.Label>
              <Form.Control defaultValue={vitals.pr} className="form-group-width-60" onChange={(e) => setVitals("pr", e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Respiration Rate</Form.Label>
              <Form.Control defaultValue={vitals.rr} className="form-group-width-60" onChange={(e) => setVitals("rr", e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </ThemeProvider>
  );
};

export default Vitals;
