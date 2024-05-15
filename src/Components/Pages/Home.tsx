import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ThemeProvider} from 'react-bootstrap';


const HomePage = ({setPage}) => {
  const[showConnect, setShowConnect] = useState(true);
  const[showTwoButs, setShowTwoButs] = useState(false);

  const handleShowConnect = () => {
    setShowConnect(!showConnect)
  }

  const handleShowTwoButs = () => {
    setShowTwoButs(!showTwoButs)
  }

  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
      <Container style={{position: 'relative', top: '50px', height: '60vh'}}>
          <h1 style={{textAlign: 'right', fontSize: '90px'}}>Your Medical Records, <p style={{textAlign: 'right'}}>Decentralized.</p></h1>
          <Button variant='success' style={showConnect ? ({position: 'sticky', left: '87%', marginTop: '30px'}) : ({visibility: 'hidden'})}
            onClick={() => {handleShowConnect(); handleShowTwoButs()}}>Connect Metamask</Button>
          <Button variant='success' style={showTwoButs ? ({position: 'sticky', left: '71%', marginTop: '30px'}) : ({visibility: 'hidden'})}
            onClick={() => setPage(1)}>Create Record</Button>
          <Button variant='success' style={showTwoButs ? ({position: 'sticky', left: '87%', marginTop: '30px'}) : ({visibility: 'hidden'})}
            onClick={() => setPage(5)}>Records List</Button>    
      </Container>
  </ThemeProvider>
  );
};

export default HomePage;
