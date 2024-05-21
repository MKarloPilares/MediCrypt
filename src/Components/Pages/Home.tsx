import { Container, Image } from 'react-bootstrap';
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
      <Container style={{position: 'relative', top: '50px', height: '60vh'}}>
            <Image src={logo} style={{width: '80%', position: 'relative', left: '6%', bottom: '150px'}}/>
            <Button variant='success' style={ethereumAccount === null ? ({position: 'fixed', left: '42%', width: '15%', bottom: '190px'}) : ({visibility: 'hidden'})}
              onClick={connectMetamaskWallet}>Connect Metamask</Button>
            <Button variant='success' style={ethereumAccount !== null ? ({position: 'sticky', left: '40%', width: '15%', bottom: '190px'}) : ({visibility: 'hidden'})}
              onClick={() => setPage(1)}>Create Record</Button>             
            <Button variant='success' style={ethereumAccount !== null? ({position: 'sticky', left: '50%', width: '15%', bottom: '190px'}) : ({visibility: 'hidden'})}
              onClick={() => setPage(5)}>Records List</Button>    
      </Container>
  </ThemeProvider>
  );
};

export default HomePage;
