import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';
import { useState } from 'react';


const MedInfo = ({nextPage, prevPage, test}) => {
  const[heart, setHeart] = useState('No');
  const[lung, setLung] = useState('No');
  const[kidney, setKidney] = useState('No');
  const[extremeties, setExtremities] = useState('No');
  const[cancer, setCancer] = useState('No');
  const[digestive, setDigestive] = useState('No');
  const[std, setSTD] = useState('No');
  const[head, setHead] = useState('No');
  const[mental, setMental] = useState('Yes');
  const[drug, setDrug] = useState('No');
  const[preg, setPreg] = useState('No');
  const[smoke, setSmoke] = useState('No');
  const[weight, setWeight] = useState('75');
  const[height, setHeight] = useState('5.5');
  const[bp, setBP] = useState('120/80');
  const[temp,setTemp] = useState('36')
  const[pr, setPR] = useState('100');
  const[rr, setRR] = useState('20');

  return ( 
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
      <Row style={{position: 'relative', bottom: '180px', height: '30vh'}}>
        <Col>
          <Form>
            <h3>Medical Information</h3>
            <p></p>
            <p></p>
            <Row>
              <Col md='4'>
                  <Form.Label>Heart Problems</Form.Label>
                  {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Yes"
                      name="HeartCheck"
                      id={`inline-${type}-1`}
                      {...(test === '1' && heart === 'Yes' ? { checked: true } : {checked: false})}
                      onChange={() => setHeart('Yes')}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="HeartCheck"
                      id={`inline-${type}-2`}
                      {...(test === '1' && heart === 'No' ? { checked: true } : {checked: false})}
                      onChange={() => setHeart('No')}
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
                        {...(test === '1' && lung === 'Yes' ? { checked: true } : {checked: false})}
                        onChange={() => setLung('Yes')}
                      />
                      <Form.Check
                        inline
                        label="No"
                        name="LungCheck"
                        id={`inline-${type}-2`}
                        {...(test === '1' && lung === 'No' ? { checked: true } : {checked: false})}
                        onChange={() => setLung('No')}
                      />
                      </div>
                    ))}
              </Col>
            </Row>
            <Row>
              <Col md='4'>
                  <Form.Label>Kidney Problems</Form.Label>
                  {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Yes"
                      name="KidCheck"
                      id={`inline-${type}-1`}
                      {...(test === '1' && kidney === 'Yes' ? { checked: true } : {checked: false})}
                      onChange={() => setKidney('Yes')}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="KidCheck"
                      id={`inline-${type}-2`}
                      {...(test === '1' && kidney === 'No' ? { checked: true } : {checked: false})}
                      onChange={() => setKidney('No')}
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
                        {...(test === '1' && extremeties === 'Yes' ? { checked: true } : {checked: false})}
                        onChange={() => setExtremities('Yes')}
                      />
                      <Form.Check
                        inline
                        label="No"
                        name="ExtCheck"
                        id={`inline-${type}-2`}
                        {...(test === '1' && extremeties === 'No' ? { checked: true } : {checked: false})}
                        onChange={() => setExtremities('No')}
                      />
                      </div>
                    ))}
              </Col>
            </Row>
            <Row>
              <Col md='4'>
                  <Form.Label>Cancer</Form.Label>
                  {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Yes"
                      name="CanCheck"
                      id={`inline-${type}-1`}
                      {...(test === '1' && cancer === 'Yes' ? { checked: true } : {checked: false})}
                      onChange={() => setCancer('Yes')}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="CanCheck"
                      id={`inline-${type}-2`}
                      {...(test === '1' && cancer === 'No' ? { checked: true } : {checked: false})}
                      onChange={() => setCancer('No')}
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
                        {...(test === '1' && digestive === 'Yes' ? { checked: true } : {checked: false})}
                        onChange={() => setDigestive('Yes')}
                      />
                      <Form.Check
                        inline
                        label="No"
                        name="DigCheck"
                        id={`inline-${type}-2`}
                        {...(test === '1' && digestive === 'No' ? { checked: true } : {checked: false})}
                        onChange={() => setDigestive('No')}
                      />
                      </div>
                    ))}
              </Col>
            </Row>
            <Row>
              <Col md='4'>
                  <Form.Label>STD</Form.Label>
                  {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Yes"
                      name="STDCheck"
                      id={`inline-${type}-1`}
                      {...(test === '1' && std === 'Yes' ? { checked: true } : {checked: false})}
                      onChange={() => setSTD('Yes')}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="STDCheck"
                      id={`inline-${type}-2`}
                      {...(test === '1' && std === 'No' ? { checked: true } : {checked: false})}
                      onChange={() => setSTD('No')}
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
                          {...(test === '1' && head === 'Yes' ? { checked: true } : {checked: false})}
                          onChange={() => setHead('Yes')}
                        />
                        <Form.Check
                          inline
                          label="No"
                          name="HeadCheck"
                          id={`inline-${type}-2`}
                          {...(test === '1' && head === 'No' ? { checked: true } : {checked: false})}
                          onChange={() => setHead('No')}
                        />
                        </div>
                      ))}
              </Col>
            </Row>
            <Row>
              <Col md='4'>
                  <Form.Label>Mental Problems</Form.Label>
                  {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Yes"
                      name="MentCheck"
                      id={`inline-${type}-1`}
                      {...(test === '1' && mental === 'Yes' ? { checked: true } : {checked: false})}
                      onChange={() => setMental('Yes')}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="MentCheck"
                      id={`inline-${type}-2`}
                      {...(test === '1' && mental === 'No' ? { checked: true } : {checked: false})}
                      onChange={() => setMental('No')}
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
                        {...(test === '1' && drug === 'Yes' ? { checked: true } : {checked: false})}
                        onChange={() => setDrug('Yes')}
                      />
                      <Form.Check
                        inline
                        label="No"
                        name="DrugCheck"
                        id={`inline-${type}-2`}
                        {...(test === '1' && drug === 'No' ? { checked: true } : {checked: false})}
                        onChange={() => setDrug('No')}
                      />
                      </div>
                    ))}
              </Col>
            </Row>
            <Row>
              <Col md='4'>
                  <Form.Label>Pregnant</Form.Label>
                  {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Yes"
                      name="PregCheck"
                      id={`inline-${type}-1`}
                      {...(test === '1' && preg === 'Yes' ? { checked: true } : {checked: false})}
                      onChange={() => setPreg('Yes')}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="PregCheck"
                      id={`inline-${type}-2`}
                      {...(test === '1' && preg === 'No' ? { checked: true } : {checked: false})}
                      onChange={() => setPreg('No')}
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
                          {...(test === '1' && smoke === 'Yes' ? { checked: true } : {checked: false})}
                          onChange={() => setSmoke('Yes')}
                        />
                        <Form.Check
                          inline
                          label="No"
                          name="SmokerCheck"
                          id={`inline-${type}-2`}
                          {...(test === '1' && smoke === 'No' ? { checked: true } : {checked: false})}
                          onChange={() => setSmoke('No')}
                        />
                        </div>
                      ))}
              </Col>
            </Row>
          </Form>
        </Col>
        <Col>
          <Form>
          <h3>Vitals</h3>
          <p></p>
          <p></p>
           <Row>
            <Col md='3'>
              <Form.Group className='mb-3' controlId='weightForm.ControlInput'>
                <Form.Label>Weight</Form.Label>
                <Form.Control placeholder='kg' {...(test === '0' ? {} : { value: weight })} style={{width: '50px'}} onChange={(e) => setWeight(e.target.value)}></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='heightForm.ControlInput'>
                <Form.Label>Height</Form.Label>
                <Form.Control placeholder='ft' {...(test === '0' ? {} : { value: height })} style={{width: '50px'}} onChange={(e) => setHeight(e.target.value)}></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md='3'>
              <Form.Group className='mb-3' controlId='BPForm.ControlInput'>
                <Form.Label>Blood Pressure</Form.Label>
                <Form.Control placeholder='mmHG' {...(test === '0' ? {} : { value: bp })} style={{width: '80px'}} onChange={(e) => setBP(e.target.value)}></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='tempForm.ControlInput'>
                <Form.Label>Temperature</Form.Label>
                <Form.Control placeholder='C' {...(test === '0' ? {} : { value: temp })} style={{width: '50px'}} onChange={(e) => setTemp(e.target.value)}></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md='3'>
              <Form.Group className='mb-3' controlId='PRForm.ControlInput'>
                <Form.Label>Pulse Rate</Form.Label>
                <Form.Control placeholder='ppM' {...(test === '0' ? {} : { value: pr })} style={{width: '60px'}} onChange={(e) => setPR(e.target.value)}></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='RRForm.ControlInput'>
                <Form.Label>Respiration Rate</Form.Label>
                <Form.Control placeholder='rpM' {...(test === '0' ? {} : { value: rr })} style={{width: '60px'}} onChange={(e) => setRR(e.target.value)}></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          </Form>
        </Col>
        <Row>
        <Col md='9'>
            <Button size='lg' variant="success"  style={{width: '120px', position: 'sticky'}} onClick={prevPage}>Back</Button>
          </Col>
          <Col>
            <Button size='lg' variant="success" style={{width: '120px', position: 'sticky'}} onClick={nextPage}>Next</Button>
          </Col>
        </Row>
    </Row>
  </ThemeProvider>
  );
};

export default MedInfo;
