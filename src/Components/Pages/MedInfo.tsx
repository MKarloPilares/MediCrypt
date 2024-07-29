import { Form, Row, Col, ThemeProvider } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MedInfo.css';

const MedInfo = ({ medicalInfo, setMedicalInfo }) => {
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Form className="form-container">
        <Row>
          <Col>
            <Form.Label>Heart Problems</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="HeartCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.heart === 'Yes' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("heart", 'Yes')}
                />
                <Form.Check
                  inline
                  label="No"
                  name="HeartCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.heart === 'No' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("heart", 'No')}
                />
              </div>
            ))}
            <Form.Label>Lung Problems</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="LungCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.lung === 'Yes' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("lung", 'Yes')}
                />
                <Form.Check
                  inline
                  label="No"
                  name="LungCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.lung === 'No' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("lung", 'No')}
                />
              </div>
            ))}
            <Form.Label>Kidney Problems</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="KidCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.kidney === 'Yes' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("kidney", 'Yes')}
                />
                <Form.Check
                  inline
                  label="No"
                  name="KidCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.kidney === 'No' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("kidney", 'No')}
                />
              </div>
            ))}
          </Col>
          <Col>
            <Form.Label>Extremities</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="ExtCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.extremities === 'Yes' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("extremities", 'Yes')}
                />
                <Form.Check
                  inline
                  label="No"
                  name="ExtCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.extremities === 'No' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("extremities", 'No')}
                />
              </div>
            ))}
            <Form.Label>Cancer</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="CanCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.cancer === 'Yes' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("cancer", 'Yes')}
                />
                <Form.Check
                  inline
                  label="No"
                  name="CanCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.cancer === 'No' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("cancer", 'No')}
                />
              </div>
            ))}
            <Form.Label>Digestive Problems</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="DigCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.digestive === 'Yes' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("digestive", 'Yes')}
                />
                <Form.Check
                  inline
                  label="No"
                  name="DigCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.digestive === 'No' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("digestive", 'No')}
                />
              </div>
            ))}
          </Col>
          <Col>
            <Form.Label>STD</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="STDCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.std === 'Yes' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("std", 'Yes')}
                />
                <Form.Check
                  inline
                  label="No"
                  name="STDCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.std === 'No' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("std", 'No')}
                />
              </div>
            ))}
            <Form.Label>Head Problems</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="HeadCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.head === 'Yes' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("head", 'Yes')}
                />
                <Form.Check
                  inline
                  label="No"
                  name="HeadCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.head === 'No' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("head", 'No')}
                />
              </div>
            ))}
            <Form.Label>Mental Problems</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="MentCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.mental === 'Yes' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("mental", 'Yes')}
                />
                <Form.Check
                  inline
                  label="No"
                  name="MentCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.mental === 'No' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("mental", 'No')}
                />
              </div>
            ))}
          </Col>
          <Col>
            <Form.Label>Drug Abuse</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="DrugCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.drug === 'Yes' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("drug", 'Yes')}
                />
                <Form.Check
                  inline
                  label="No"
                  name="DrugCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.drug === 'No' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("drug", 'No')}
                />
              </div>
            ))}
            <Form.Label>Pregnant</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="PregCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.preg === 'Yes' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("preg", 'Yes')}
                />
                <Form.Check
                  inline
                  label="No"
                  name="PregCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.preg === 'No' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("preg", 'No')}
                />
              </div>
            ))}
            <Form.Label>Smoker</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="SmokerCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.smoke === 'Yes' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("smoke", 'Yes')}
                />
                <Form.Check
                  inline
                  label="No"
                  name="SmokerCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.smoke === 'No' ? { checked: true } : { checked: false }}
                  onChange={() => setMedicalInfo("smoke", 'No')}
                />
              </div>
            ))}
          </Col>
        </Row>
      </Form>
    </ThemeProvider>
  );
};

export default MedInfo;
