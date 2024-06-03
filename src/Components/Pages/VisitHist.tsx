import {  Form } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';


const VisitHist = ({setCurrentPage, test}) => {
  const visitHist1 = ['Broken Bone', 'InPatient', '05/25/24', 'Fracture', 'Cast', 'Recovery in 10 months'];
  const visitHist2 = ['Brain Damage', 'OutPatient', '12/28/15', 'Concussion', 'Nothing', 'No Recovery Possible']
  const facHist1 = ['HealthCare', '123456789', 'Diversion'];
  const facHist2 = ['HealthCare', '123456789', 'Diversion'];
  const VisitHist = [visitHist1, visitHist2];
  const FacHist = [facHist1, facHist2];
  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
      <Row style={{position: 'relative', top: '180px', height: '100vh'}}>
        <Col>
          <Form>
            <h3>Visit History</h3>
            <p></p>
            <p></p>
            {test === '1' && (
            <>
              {VisitHist.map((data: any) => 
                <Card style={{width: '18rem', marginBottom: '30px'}}>
                  <Card.Body>
                      <ListGroup variant='flush'>
                        <ListGroup.Item>CC: {data[0]}</ListGroup.Item>
                        <ListGroup.Item>Type: {data[1]}</ListGroup.Item>
                        <ListGroup.Item>Date: {data[2]}</ListGroup.Item>
                        <ListGroup.Item>Diagnosis: {data[3]}</ListGroup.Item>
                        <ListGroup.Item>Procedure: {data[4]}</ListGroup.Item>
                        <ListGroup.Item>Prognosis: {data[5]}</ListGroup.Item>
                      </ListGroup>
                  </Card.Body>
                </Card>
              )}
            </>
            )}
          </Form>
          <Button size='lg' variant="success" style={{width: '120px'}} onClick={setCurrentPage}>Back</Button>
        </Col>
        <Col>
          <Form>
          <h3>Facility History</h3>
          <p></p>
          <p></p>
          {test === '1' && (
          <>
            {FacHist.map((data: any) => 
              <Card style={{width: '18rem', marginBottom: '154px'}}>
                <Card.Body>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>Name: {data[0]}</ListGroup.Item>
                      <ListGroup.Item>Number: {data[1]}</ListGroup.Item>
                      <ListGroup.Item>Address: {data[2]}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
              </Card>
            )}
          </>
          )}
          </Form>
        </Col>
      </Row>
  </ThemeProvider>
  );
};

export default VisitHist;
