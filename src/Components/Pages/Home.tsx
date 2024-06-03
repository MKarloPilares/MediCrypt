import { Container, Image, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ThemeProvider} from 'react-bootstrap';
import logo from '../Images/MediCrypt_Logo.png';


const HomePage = ({setPage, connectMetamaskWallet, ethereumAccount, setTest}) => {

  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
      <Container style={{position: 'relative', top: '50px', width: '100vw'}}>
        <Row>
            <Image src={logo} style={{width: '85%', position: 'relative', left: 0, bottom: 130}}/>
        </Row>
        <Row>
            {ethereumAccount === null ? (
            <Button variant='success' style={ethereumAccount === null ? ({position: 'relative', left: '35%', width: '15%', bottom: 120}) : ({display: 'none'})}
              onClick={connectMetamaskWallet}>Connect Metamask</Button>): (
            <>
            <Button variant='success' style={ethereumAccount !== null ? ({position: 'relative', left: '15%', width: '15%', bottom: 120}) : ({display: 'none'})}
              onClick={() => {setPage(1);setTest('0')}}>Create Record</Button>             
            <Button variant='success' style={ethereumAccount !== null? ({position: 'relative', left: '40%', width: '15%', bottom: 120}) : ({display: 'none'})}
              onClick={() => setPage(5)}>Records List</Button>
            </>)}
        </Row> 
      </Container>
  </ThemeProvider>
  );
};

export default HomePage;
