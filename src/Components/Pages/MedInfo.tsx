import React from 'react';
import { Container, Form } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';


const MedInfo = ({nextPage, prevPage}) => {
  const test = ['1', '2'];
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
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="HeartCheck"
                      type={type}
                      id={`inline-${type}-2`}
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
                        type={type}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="No"
                        name="LungCheck"
                        type={type}
                        id={`inline-${type}-2`}
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
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="KidCheck"
                      type={type}
                      id={`inline-${type}-2`}
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
                        type={type}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="No"
                        name="ExtCheck"
                        type={type}
                        id={`inline-${type}-2`}
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
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="CanCheck"
                      type={type}
                      id={`inline-${type}-2`}
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
                        type={type}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="No"
                        name="DigCheck"
                        type={type}
                        id={`inline-${type}-2`}
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
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="STDCheck"
                      type={type}
                      id={`inline-${type}-2`}
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
                          type={type}
                          id={`inline-${type}-1`}
                        />
                        <Form.Check
                          inline
                          label="No"
                          name="HeadCheck"
                          type={type}
                          id={`inline-${type}-2`}
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
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="MentCheck"
                      type={type}
                      id={`inline-${type}-2`}
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
                        type={type}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="No"
                        name="DrugCheck"
                        type={type}
                        id={`inline-${type}-2`}
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
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="PregCheck"
                      type={type}
                      id={`inline-${type}-2`}
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
                          type={type}
                          id={`inline-${type}-1`}
                        />
                        <Form.Check
                          inline
                          label="No"
                          name="SmokerCheck"
                          type={type}
                          id={`inline-${type}-2`}
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
                <Form.Control placeholder='kg' style={{width: '50px'}}></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='heightForm.ControlInput'>
                <Form.Label>Height</Form.Label>
                <Form.Control placeholder='ft' style={{width: '50px'}}></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md='3'>
              <Form.Group className='mb-3' controlId='BPForm.ControlInput'>
                <Form.Label>Blood Pressure</Form.Label>
                <Form.Control placeholder='mmHG' style={{width: '80px'}}></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='tempForm.ControlInput'>
                <Form.Label>Temperature</Form.Label>
                <Form.Control placeholder='C' style={{width: '50px'}}></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md='3'>
              <Form.Group className='mb-3' controlId='PRForm.ControlInput'>
                <Form.Label>Pulse Rate</Form.Label>
                <Form.Control placeholder='ppM' style={{width: '60px'}}></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='RRForm.ControlInput'>
                <Form.Label>Respiration Rate</Form.Label>
                <Form.Control placeholder='rpM' style={{width: '60px'}}></Form.Control>
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
