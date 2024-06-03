 import {useState} from 'react';
import {ListGroup, Modal, Form} from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';


const RecList = ({setPage, setTest}) => {
  const [Shareshow, setShareShow] = useState(false);
  const [Keyshow, setKeyShow] = useState(false);
  const [AddShow, setAddShow] = useState(false);
  const [AddedShow, setAddedShow] = useState(false);
  const handleShareClose = () => setShareShow(false);
  const handleShareShow = () => setShareShow(true);
  const handleKeyClose = () => setKeyShow(false);
  const handleKeyShow = () => setKeyShow(true);
  const handleAddShow = () => setAddShow(true);
  const handleAddClose = () => setAddShow(false);
  const handleAddedShow = () => setAddedShow(true);
  const handleAddedClose = () => setAddedShow(false);
  const Records = ['Mhar Karlo Pilares']
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

      <Modal show={AddShow} onHide={handleAddClose}>
        <Modal.Header closeButton>
          <Modal.Title>Access Key Generated!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Enter Access Key</Form.Label>
            <Form.Control placeholder='Access Key'></Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => {handleAddClose(); handleAddedShow();}}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      
      <Modal show={AddedShow} onHide={handleAddedClose}>
        <Modal.Header closeButton>
          <Modal.Title>Access Key Generated!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Record Added!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAddedClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

    <Row style={{position: 'relative', bottom: '180px', height: '30vh'}}>
    <h3 style={{marginBottom: '30px'}}>Records</h3>
    <Button variant='success' style={{position: 'sticky', width: '12%', left: '80%', bottom: '100%', height: '12%'}} onClick={handleAddShow}>+ Add Record</Button>
    <Card style={{bottom: 60}}>
      <Card.Body>
    {Records.map((data: any) => 
        <ListGroup>
          <ListGroup.Item>
            <Col>
            {data}
            <Button size='sm' variant="success" style={{position: 'sticky', left: '67%', width: '12%'}} onClick={() => {setPage(1);setTest('1')}}>OPEN RECORD</Button>
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
