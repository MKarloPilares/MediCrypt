import { Container, Image, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ThemeProvider} from 'react-bootstrap';
import logo from '../Images/MediCrypt_Logo.png';


const HomePage = ({setPage, connectMetamaskWallet, ethereumAccount}) => {

  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
      <Container style={{position: 'relative', top: '50px', width: '100vw'}}>
        <Row>
            <Image src={logo} style={{width: '85%', position: 'sticky', left: '18.5%', marginBottom: '5%'}}/>
        </Row>
        <Row>
            {ethereumAccount === null ? (
            <Button variant='success' style={ethereumAccount === null ? ({position: 'fixed', right: '43%', width: '15%', top: '90%'}) : ({visibility: 'hidden'})}
              onClick={connectMetamaskWallet}>Connect Metamask</Button>): (
            <>
            <Button variant='success' style={ethereumAccount !== null ? ({position: 'fixed', right: '52%', width: '7.5%', top: '90%'}) : ({visibility: 'hidden'})}
              onClick={() => setPage(1)}>Create Record</Button>             
            <Button variant='success' style={ethereumAccount !== null? ({position: 'fixed', right: '42%', width: '7.5%', top: '90%'}) : ({visibility: 'hidden'})}
              onClick={() => setPage(5)}>Records List</Button>
            </>)}
        </Row> 
      </Container>
  </ThemeProvider>
  );
};

export default HomePage;
