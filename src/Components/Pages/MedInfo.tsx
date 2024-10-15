import { Form, Row, Col, ThemeProvider } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MedInfo.css';

interface medicalInfo {
  heart: boolean | null;
  lung: boolean | null;
  kidney: boolean | null;
  extremities: boolean | null;
  cancer: boolean | null;
  digestive: boolean | null;
  std: boolean | null;
  head: boolean | null;
  mental: boolean | null;
  drug: boolean | null;
  preg: boolean | null;
  smoke: boolean | null;
}

interface MedInfoProps {
  medicalInfo: medicalInfo;
  setMedicalInfo: React.Dispatch<React.SetStateAction<any>>
}

//Page that contains checkboxes for patient's general medical information
const MedInfo: React.FC<MedInfoProps> = ({ medicalInfo, setMedicalInfo }) => {

  //Changes the data stored in medicalInfo when a change is done in this page.
  const handleMedicalInfoChange = (field, value) => {
    setMedicalInfo({ ...medicalInfo, [field]: value });
  };

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Form className="medinfo-form-container">
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
                  {...medicalInfo.heart === true ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("heart", true)}
                />
                <Form.Check
                  inline
                  label="No"
                  name="HeartCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.heart === false ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("heart", false)}
                />
              </div>
            ))}
          </Col>
          <Col>
            <Form.Label>Lung Problems</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="LungCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.lung === true ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("lung", true)}
                />
                <Form.Check
                  inline
                  label="No"
                  name="LungCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.lung === false ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("lung", false)}
                />
              </div>
            ))}
          </Col>
          <Col>
            <Form.Label>Kidney Problems</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="KidCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.kidney === true ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("kidney", true)}
                />
                <Form.Check
                  inline
                  label="No"
                  name="KidCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.kidney === false ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("kidney", false)}
                />
              </div>
            ))}
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Extremities</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="ExtCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.extremities === true ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("extremities", true)}
                />
                <Form.Check
                  inline
                  label="No"
                  name="ExtCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.extremities === false ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("extremities", false)}
                />
              </div>
            ))}
          </Col>
          <Col>
            <Form.Label>Cancer</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="CanCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.cancer === true ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("cancer", true)}
                />
                <Form.Check
                  inline
                  label="No"
                  name="CanCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.cancer === false ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("cancer", false)}
                />
              </div>
            ))}
          </Col>
          <Col>
            <Form.Label>Digestive Problems</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="DigCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.digestive === true ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("digestive", true)}
                />
                <Form.Check
                  inline
                  label="No"
                  name="DigCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.digestive === false ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("digestive", false)}
                />
              </div>
            ))}
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>STD</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="STDCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.std === true ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("std", true)}
                />
                <Form.Check
                  inline
                  label="No"
                  name="STDCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.std === false ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("std", false)}
                />
              </div>
            ))}
          </Col>
          <Col>
            <Form.Label>Head Problems</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="HeadCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.head === true ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("head", true)}
                />
                <Form.Check
                  inline
                  label="No"
                  name="HeadCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.head === false ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("head", false)}
                />
              </div>
            ))}
          </Col>
          <Col>
            <Form.Label>Mental Problems</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="MentCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.mental === true ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("mental", true)}
                />
                <Form.Check
                  inline
                  label="No"
                  name="MentCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.mental === false ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("mental", false)}
                />
              </div>
            ))}
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Drug Abuse</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="DrugCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.drug === true ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("drug", true)}
                />
                <Form.Check
                  inline
                  label="No"
                  name="DrugCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.drug === false ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("drug", false)}
                />
              </div>
            ))}
          </Col>
          <Col>
            <Form.Label>Pregnant</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="PregCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.preg === true ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("preg", true)}
                />
                <Form.Check
                  inline
                  label="No"
                  name="PregCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.preg === false ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("preg", false)}
                />
              </div>
            ))}
          </Col>
          <Col>
            <Form.Label>Smoker</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="SmokerCheck"
                  id={`inline-${type}-1`}
                  {...medicalInfo.smoke === true ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("smoke", true)}
                />
                <Form.Check
                  inline
                  label="No"
                  name="SmokerCheck"
                  id={`inline-${type}-2`}
                  {...medicalInfo.smoke === false ? { checked: true } : { checked: false }}
                  onChange={() => handleMedicalInfoChange("smoke", false)}
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
