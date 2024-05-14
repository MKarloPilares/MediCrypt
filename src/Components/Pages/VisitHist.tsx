import React from 'react';
import { Container, Form, ListGroupItem } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';


const VisitHist = ({setCurrentPage}) => {
  const VisitHist = ['Lorem Ipsum1', 'Lorem Ipsum2', 'Lorem Ipsum3', 'Lorem Ipsum4'];
  const FacHist = ['Dolor Imet1', 'Dolor Imet2', 'Dolor Imet3', 'Dolor Imet4'];
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
            {VisitHist.map((data: any) => 
              <Card style={{width: '18rem'}}>
                <Card.Body>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>{data}</ListGroup.Item>
                      <ListGroup.Item>{data}</ListGroup.Item>
                      <ListGroup.Item>{data}</ListGroup.Item>
                      <ListGroup.Item>{data}</ListGroup.Item>
                      <ListGroup.Item>{data}</ListGroup.Item>
                      <ListGroup.Item>{data}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
              </Card>
            )}
          </Form>
          <Button size='lg' variant="success" style={{width: '120px'}} onClick={setCurrentPage}>Back</Button>
        </Col>
        <Col>
          <Form>
          <h3>Facility History</h3>
          <p></p>
          <p></p>
          {FacHist.map((data: any) => 
            <Card style={{width: '18rem'}}>
              <Card.Body>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>{data}</ListGroup.Item>
                    <ListGroup.Item>{data}</ListGroup.Item>
                    <ListGroup.Item>{data}</ListGroup.Item>
                  </ListGroup>
              </Card.Body>
            </Card>
          )}
          </Form>
        </Col>
      </Row>
  </ThemeProvider>
  );
};

export default VisitHist;
