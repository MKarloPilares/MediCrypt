import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { ThemeProvider } from 'react-bootstrap';
import './PersonalInformation.css';

const PersInfo = ({ personalInfo, setPersonalInfo }) => {
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Form className="form-container">
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="nameForm.ControlInput">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={personalInfo.name}
                className="name-input"
                onChange={(e) => setPersonalInfo('name', e.target.value)}
              />
            </Form.Group>
            <Row>
              <Col md="6">
                <Form.Label>Gender</Form.Label>
                {['radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Male"
                      name="group1"
                      id={`inline-${type}-1`}
                      {...(personalInfo.gender === 'Male' ? { checked: true } : { checked: false })}
                      onChange={() => setPersonalInfo('gender', 'Male')}
                    />
                    <Form.Check
                      inline
                      label="Female"
                      name="group1"
                      id={`inline-${type}-2`}
                      {...(personalInfo.gender === 'Female' ? { checked: true } : { checked: false })}
                      onChange={() => setPersonalInfo('gender', 'Female')}
                    />
                  </div>
                ))}
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="nameForm.ControlInput">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    value={personalInfo.age}
                    className="age-input"
                    onChange={(e) => setPersonalInfo('age', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="nameForm.ControlInput">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                value={personalInfo.birthday}
                className="birthday-input"
                onChange={(e) => setPersonalInfo('birthday', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="nameForm.ControlInput">
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={personalInfo.address}
                className="address-input"
                onChange={(e) => setPersonalInfo('address', e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="nameForm.ControlInput">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={personalInfo.email}
                className="email-input"
                onChange={(e) => setPersonalInfo('email', e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="nameForm.ControlInput">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                value={personalInfo.phonenum}
                className="phone-input"
                onChange={(e) => setPersonalInfo('phonenum', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </ThemeProvider>
  );
};

export default PersInfo;
