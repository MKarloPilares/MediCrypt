import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider, Row, Col, Form } from 'react-bootstrap';
import moment from 'moment';
import './PersonalInformation.css';
import React from 'react';

interface personalInfo {
  patientName: string;
  gender: string;
  age: number;
  birthday: string;
  address: string;
  email: string;
  phonenum: string;
  profilePictureUri: string;
}

interface PersInfoProps {
  personalInfo: personalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<any>>
}

//Page that shows and accepts input of the patient's personal information.
const PersInfo: React.FC<PersInfoProps> = ({ personalInfo, setPersonalInfo }) => {

  //Calculates the users age through their birthday
  const calcAge = (e) => {
    const inputDate = e.target.value;
    const dateObj = new Date(inputDate);
    const formattedDate = dateObj.toISOString().split('T')[0];
    const today = moment();
    const birthMoment = moment(formattedDate);
    const age = today.diff(birthMoment, 'years');
    
    setPersonalInfo({
      ...personalInfo,
      birthday: inputDate, // The original date input
      age: age // Calculated age as a string
    });
  }

  //Changes data stored in personalInfo when a change is done here
  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Form className="form-container">
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                defaultValue={personalInfo.patientName}
                className="name-input"
                maxLength={50}
                onChange={(e) => handlePersonalInfoChange('patientName', e.target.value)}
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
                      checked={personalInfo.gender === 'Male'}
                      onChange={() => handlePersonalInfoChange('gender', 'Male')}
                    />
                    <Form.Check
                      inline
                      label="Female"
                      name="group1"
                      id={`inline-${type}-2`}
                      checked={personalInfo.gender === 'Female'}
                      onChange={() => handlePersonalInfoChange('gender', 'Female')}
                    />
                  </div>
                ))}
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Row>
                    <Form.Label>Age</Form.Label>
                  </Row>
                  <Form.Label>{personalInfo.age}</Form.Label>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                defaultValue={personalInfo.birthday ? moment(personalInfo.birthday).format('YYYY-MM-DD') : ''}
                className="birthday-input"
                onChange={calcAge}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                defaultValue={personalInfo.address}
                className="address-input"
                maxLength={200}
                onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                defaultValue={personalInfo.email}
                className="email-input"
                maxLength={50}
                onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                defaultValue={personalInfo.phonenum}
                className="phone-input"
                maxLength={13}
                onChange={(e) => handlePersonalInfoChange('phonenum', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </ThemeProvider>
  );
};

export default PersInfo;
