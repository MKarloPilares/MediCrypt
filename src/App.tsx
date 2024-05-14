import React, {useState} from 'react';
import {Container, Row, Col, Nav, Navbar, NavDropdown, Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';
import PersInfo from './Components/Pages/PersonalInformation';
import MedInfo from './Components/Pages/MedInfo';
import VisitInfo from './Components/Pages/VisitInfo';
import VisitHist from './Components/Pages/VisitHist';
import RecList from './Components/Pages/RecordsList';
import logo from './Components/Images/logo.png';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);

 
  const nextPage = () => {
    setCurrentPage(currentPage+1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage-1);
  }

  const setPage = (pageNum) => {
    setCurrentPage(pageNum);
  }

  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
          <Navbar expand="lg" className="bg-body-tertiary" fixed='top'>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="35"
              height="35"
              className="d-inline-block align-top"
            />{' '}
            MediCrypt
          </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">About</Nav.Link>
                <NavDropdown title="Records" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => setPage(5)}>Record List</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
              <Button variant='success' style={{position: 'sticky', left: '180%'}}>Connect Metamask</Button>
        </Navbar>    
      <body style={{overflowY: 'auto', boxSizing: 'border-box', display: '-ms-flexbox', backgroundColor: 'mintcream', position: 'fixed', padding: '0', margin: '0', width: '100%', height:'20px', bottom: '0px', color: 'green'}} >
        <Container style={{width: '100%', paddingLeft: '100px'}}>
            {currentPage === 1 && <PersInfo nextPage={nextPage} prevPage={prevPage}/>}
            {currentPage === 2 && <MedInfo nextPage={nextPage} prevPage={prevPage}/>}
            {currentPage === 3 && <VisitInfo nextPage={nextPage} prevPage={prevPage}/>}
            {currentPage === 4 && <VisitHist setCurrentPage={prevPage}/>}
            {currentPage === 5 && <RecList setPage={setPage}/>}
        </Container>
      </body>
    </ThemeProvider>
  );
};

export default App;
