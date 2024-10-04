import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ThemeProvider } from 'react-bootstrap';
import './EmergencyInformation.css'

interface emergencyInfo {
  emName: string;
  emNum: string;
  relationship: string;
}

interface EmerInfoProps {
  emergencyInfo: emergencyInfo;
  setEmergencyInfo: React.Dispatch<React.SetStateAction<any>>
}

//Page to accept and show the patient's emergency information
const EmerInfo: React.FC<EmerInfoProps> = ({ emergencyInfo, setEmergencyInfo }) => {

  //Edits the patient's emergency information in the record
  const handleEmergencyInfoChange = (field, value) => {
    setEmergencyInfo({ ...emergencyInfo, [field]: value });
  };

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Form className="form-container">
        <Row>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Emergency Contact</Form.Label>
              <Form.Control defaultValue={emergencyInfo.emName} className="input-field" onChange={(e) => handleEmergencyInfoChange('emName', e.target.value)} maxLength={50} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Emergency Contact Number</Form.Label>
              <Form.Control defaultValue={emergencyInfo.emNum} className="input-field" onChange={(e) => handleEmergencyInfoChange('emNum', e.target.value)} maxLength={13}/>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Relationship With Patient</Form.Label>
              <Form.Control defaultValue={emergencyInfo.relationship} className="input-field" onChange={(e) => handleEmergencyInfoChange('relationship', e.target.value)} maxLength={10}/>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </ThemeProvider>
  );
};

export default EmerInfo;
