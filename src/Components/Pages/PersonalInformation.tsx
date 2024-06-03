import { Form } from 'react-bootstrap';
import {  useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';


const PersInfo = ({nextPage, test}) => {
const[name, setName] = useState('Mhar Karlo Pilares');
const[gender, setGender] = useState('Male');
const[age, setAge] = useState('26');
const[birthday, setBirthday] = useState('06/29/1997');
const[address, setAddress] = useState('Kumintang Ilaya, Batangas City');
const[email, setEmail] = useState('karlo29pilares@gmail.com');
const[phonenum, setPhoneNum] = useState('09951462173');
const[emName, setEmName] = useState('Grace Pilares');
const[emNum, setEmNum] = useState('09951815125');
const[relationship, setRelationship] = useState('Mother');

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
              <Form.Control placeholder='Name'  {...(test === '0' ? {} : { value: name })}  style={{width: '71%'}} onChange={(e) => setName(e.target.value)}></Form.Control>
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
                    {...(test === '1' && gender === 'Male' ? { checked: true } : {checked: false})}
                    onChange={() => setGender('Male')}
                  />
                  <Form.Check
                    inline
                    label="Female"
                    name="group1"
                    id={`inline-${type}-2`}
                    {...(test === '1' && gender === 'Female' ? { checked: true } : {checked: false})}
                    onChange={() => setGender('Female')}
                  />
                  </div>
                ))}
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
                  <Form.Label>Age</Form.Label>
                  <Form.Control placeholder='Age' {...(test === '0' ? {} : { value: age })} style={{width: '60px'}} onChange={(e) => setAge(e.target.value)}></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control placeholder='Date of Birth' {...(test === '0' ? {} : { value: birthday })} style={{width: '71%'}} onChange={(e) => setBirthday(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder='Address' {...(test === '0' ? {} : { value: address })} style={{width: '71%'}} onChange={(e) => setAddress(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Email</Form.Label>
              <Form.Control placeholder='Email' {...(test === '0' ? {} : { value: email })} style={{width: '71%'}} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control placeholder='Phone Number' {...(test === '0' ? {} : { value: phonenum })} style={{width: '71%'}} onChange={(e) => setPhoneNum(e.target.value)}></Form.Control>
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
              <Form.Control placeholder='Name' {...(test === '0' ? {} : { value: emName })}style={{width: '71%'}} onChange={(e) => setEmName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Emergency Contact Number</Form.Label>
              <Form.Control placeholder='Contact Number' {...(test === '0' ? {} : { value: emNum})} style={{width: '71%'}} onChange={(e) => setEmNum(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='nameForm.ControlInput'>
              <Form.Label>Relationship With Patient</Form.Label>
              <Form.Control placeholder='Relationship' {...(test === '0' ? {} : { value: relationship })} style={{width: '71%'}} onChange={(e) => setRelationship(e.target.value)}></Form.Control>
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
