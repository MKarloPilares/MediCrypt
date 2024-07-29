import { Container, Image, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';
import logo from '../Images/MediCrypt_Logo.png';
import { useNavigate } from 'react-router-dom';
import './Home.css'
const HomePage = ({ethereumAccount, connectMetamaskWallet }) => {
  const navigate = useNavigate();

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Container className="container-custom">
        <Row>
          <Image src={logo} className="logo-image" />
        </Row>
        <Row>
          {ethereumAccount === null ? (
            <Button variant='success' className="button-connect" onClick={connectMetamaskWallet}>
              Connect Metamask
            </Button> 
          ) : (
            <>
              <Button variant='success' className="button-recordpage" onClick={() => navigate("/Profile")}>
                Create Record
              </Button>
              <Button variant='success' className="button-recordlist" onClick={() => navigate("/RecList")}>
                Records List
              </Button>
            </>
          )}
        </Row>
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;
