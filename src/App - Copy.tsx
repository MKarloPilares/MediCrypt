import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';
import SearchTextField from './Components/TextFields/search';
import SearchButton from './Components/Buttons/search';
import Sidebar from './Components/Sidebar/sidebar';
import DashBoard from './Components/Pages/DashBoard';
import Assessment from './Components/Pages/Assessment';
import OralAssessment from './Components/Pages/OralAssessment';const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('DashBoard');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
    <body style={{overflow: 'auto', boxSizing: 'border-box', backgroundColor: 'burlywood', maxWidth: '1920px', width: '160%'}} >
    <Sidebar setCurrentPage={setCurrentPage} sendToggle={toggleSidebar} />
    <Container>
      <Row>
        <Col>
      <header>
        <Row>
          <Col>
        <SearchTextField/>
        <SearchButton/>
          </Col>
        </Row>
      </header>
      </Col>
     </Row> 
    </Container>
    <Container style={isSidebarOpen ?  ({marginTop: '50px', position: 'relative', right: '200px'}) : ({marginTop: '50px', position: 'relative', right: '320px'})}>
      <Row>
          <Col>
        {currentPage === 'DashBoard' && <DashBoard setCurrentPage={setCurrentPage}/>}
        {currentPage === 'Assessment' && <Assessment setCurrentPage={setCurrentPage}/>}
        {currentPage === 'OralAssessment' && <OralAssessment setCurrentPage={setCurrentPage}/>}
        </Col>
      </Row>
    </Container>
    </body>
    </ThemeProvider>
  );
};

export default App;
