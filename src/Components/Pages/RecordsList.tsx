import React, {useState} from 'react';
import {ListGroup, Modal} from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';


const RecList = ({setPage}) => {
  const [Shareshow, setShareShow] = useState(false);
  const [Keyshow, setKeyShow] = useState(false);
  const handleShareClose = () => setShareShow(false);
  const handleShareShow = () => setShareShow(true);
  const handleKeyClose = () => setKeyShow(false);
  const handleKeyShow = () => setKeyShow(true);
  const VisitHist = ['Lorem Ipsum1', 'Lorem Ipsum2', 'Lorem Ipsum3', 'Lorem Ipsum4', 'Lorem Ipsum5', 'Lorem Ipsum6', 'Lorem Ipsum7', 'Lorem Ipsum8'];
  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
    
    <Modal show={Shareshow} onHide={handleShareClose}>
        <Modal.Header closeButton>
          <Modal.Title>Access Sharing</Modal.Title>
        </Modal.Header>
        <Modal.Body>Choose a share duration to generate an access key</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => {handleKeyShow();handleShareClose()}}>
            1 Day
          </Button>
          <Button variant="success" onClick={() => {handleKeyShow();handleShareClose()}}>
           1 Week
          </Button>
          <Button variant="success" onClick={() => {handleKeyShow();handleShareClose()}}>
            1 Month
          </Button>
          <Button variant="success" onClick={() => {handleKeyShow();handleShareClose()}}>
            1 Year
          </Button>
          <Button variant="success" onClick={() => {handleKeyShow();handleShareClose()}}>
            Shared Owner
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={Keyshow} onHide={handleKeyClose}>
        <Modal.Header closeButton>
          <Modal.Title>Access Key Generated!</Modal.Title>
        </Modal.Header>
        <Modal.Body>qwertyuio12345</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleKeyClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

    <Row style={{position: 'relative', bottom: '180px', height: '30vh'}}>
    <h3 style={{marginBottom: '30px'}}>Records</h3>
    <Card>
      <Card.Body>
    {VisitHist.map((data: any) => 
        <ListGroup>
          <ListGroup.Item>
            <Col>
            {data}
            <Button size='sm' variant="success" style={{position: 'sticky', left: '67%', width: '12%'}} onClick={() => setPage(1)}>OPEN RECORD</Button>
            <Button size='sm' variant="success" style={{position: 'sticky', left: '80%', width: '12%'}} onClick={handleShareShow}>SHARE ACCESS</Button>
            </Col>
          </ListGroup.Item>
        </ListGroup>
    )}
    </Card.Body>
    </Card>
    </Row>
  </ThemeProvider>
  );
};

export default RecList;
