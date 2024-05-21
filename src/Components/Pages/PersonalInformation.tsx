import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';


const PersInfo = ({nextPage}) => {

  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
      <Row style={{position: 'relative', bottom: '180px', height: '30vh'}}>
        <Col>
          <Form>
            <h3>Personal Information</h3>
            <p></p>
            <p></p>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder='Name' style={{width: '71%'}}></Form.Control>
            </Form.Group>
            <Row>
              <Col md='4'>
                <Form.Label>Gender</Form.Label>
                {['radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    inline
                    label="Male"
                    name="group1"
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    inline
                    label="Female"
                    name="group1"
                    id={`inline-${type}-2`}
                  />
                  </div>
                ))}
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
                  <Form.Label>Age</Form.Label>
                  <Form.Control placeholder='Age' style={{width: '60px'}}></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control placeholder='Date of Birth' style={{width: '71%'}}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder='Address' style={{width: '71%'}}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Email</Form.Label>
              <Form.Control placeholder='Email' style={{width: '71%'}}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control placeholder='Phone Number' style={{width: '71%'}}></Form.Control>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Form>
          <h3>Emergency Information</h3>
          <p></p>
          <p></p>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Emergency Contact</Form.Label>
              <Form.Control placeholder='Name' style={{width: '71%'}}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Emergency Contact Number</Form.Label>
              <Form.Control placeholder='Contact Number' style={{width: '71%'}}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Relationship With Patient</Form.Label>
              <Form.Control placeholder='Relationship' style={{width: '71%'}}></Form.Control>
            </Form.Group>
          </Form>
        </Col>
            <Col md='9'>
            </Col>
            <Col>
              <Button size='lg' variant="success" style={{width: '120px', position: 'sticky'}} onClick={nextPage}>Next</Button>
            </Col>
      </Row>
      
  </ThemeProvider>
  );
};

export default PersInfo;
