import {useState, useEffect} from 'react';
import {Container, Nav, Navbar, NavDropdown, Button, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';
import PersInfo from './Components/Pages/PersonalInformation';
import MedInfo from './Components/Pages/MedInfo';
import VisitInfo from './Components/Pages/VisitInfo';
import VisitHist from './Components/Pages/VisitHist';
import RecList from './Components/Pages/RecordsList';
import logoSolo from './Components/Images/MEDICRYPT LOGO_SOLO.png';
import HomePage from './Components/Pages/Home';
import About from './Components/Pages/About';

const App = () => {
  const[test, setTest] = useState('0');
  const [currentPage, setCurrentPage] = useState(6);
  const [ethereumAccount, setEthereumAccount] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'MediCrypt';
  }, []); 
 
  const nextPage = () => {
    setCurrentPage(currentPage+1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage-1);
  }

  const setPage = (pageNum) => {
    setCurrentPage(pageNum);
  }

  async function connectMetamaskWallet(): Promise<void> {
    (window as any).ethereum
      .request({
          method: "eth_requestAccounts",
      })
      .then((accounts : string[]) => {
        setEthereumAccount(accounts[0]);
      })
      .catch((error: any) => {
          alert(`Something went wrong: ${error}`);
      });
  }

  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
          <Navbar expand="lg" className="bg-body-tertiary" fixed='top'>
          <Navbar.Brand onClick={() => setPage(6)}>
            <img
              alt=""
              src={logoSolo}
              width="55"
              height="35"
              className="d-inline-block align-top"
            />{' '}
            MediCrypt
          </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={() => setPage(6)}>Home</Nav.Link>
                <NavDropdown title="Records" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => {setPage(1);setTest('0')}}>New Record</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => setPage(5)}>Records List </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
              <Button size='sm' variant='success' style={ethereumAccount === null ? ({position: 'sticky', left: '180%', width: '9%', marginRight: '50px'}) : ({visibility: 'hidden'})} onClick={connectMetamaskWallet}>Connect Metamask</Button>
        </Navbar>    
      <body style={{overflowY: 'auto', boxSizing: 'border-box', display: '-ms-flexbox', backgroundColor: 'mintcream',
       position: 'fixed', padding: '0', margin: '0', width: '100%', height:'20px', bottom: '0px', color:'green', fontFamily: 'MontSerrat'}} >
        <Image src={logoSolo} style={currentPage != 6 ? ({zIndex: '-1', width: '85%', position: 'absolute', opacity: '0.2', top: '40px', left: '150px'}) : ({visibility: 'hidden', zIndex: '-1', width: '100%', position: 'absolute'})}></Image>
        <Container style={{width: '100vw', paddingLeft: '100px'}}>
            {currentPage === 1 && <PersInfo nextPage={nextPage} test={test}/>}
            {currentPage === 2 && <MedInfo nextPage={nextPage} prevPage={prevPage} test={test}/>}
            {currentPage === 3 && <VisitInfo nextPage={nextPage} prevPage={prevPage} test={test}/>}
            {currentPage === 4 && <VisitHist setCurrentPage={prevPage} test={test}/>}
            {currentPage === 5 && <RecList setPage={setPage} setTest={setTest}/>}
            {currentPage === 6 && <HomePage setPage={setPage} connectMetamaskWallet={connectMetamaskWallet} ethereumAccount={ethereumAccount} setTest={setTest}/>}
            {currentPage === 7 && <About/>}
        </Container>
      </body>
    </ThemeProvider>
  );
};

export default App;
