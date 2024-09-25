import { Container, Image, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';
import logo from '../Images/MediCrypt_Logo.png';
import { useNavigate } from 'react-router-dom';
import ConnectMetaMaskButton from '../Buttons/ConnectMetaMaskButton';
import NewRecordButton from '../Buttons/NewRecordButton';
import './Home.css'

//Medicrypt's homepage
const HomePage = ({userWalletAddress, setUserWalletAddress, setIsOwner, updateCombinedData, isOwner, setIsMedicalProvider, setTokenID }) => {
  const navigate = useNavigate();

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Container className="container-home">
        <Row>
          <Image src={logo} className="logo-image" />
        </Row>
        <Row>
          {userWalletAddress === "" ? (
            <ConnectMetaMaskButton setUserWalletAddress={setUserWalletAddress} setIsOwner={setIsOwner} setIsMedicalProvider={setIsMedicalProvider} className={"home-button-connectToMetamask"}/>
          ) : (
            <>
              <NewRecordButton updateCombinedData={updateCombinedData} setTokenID={setTokenID} className={"home-button-newRecord"}/>
              <Button variant='success' className="button-recordList" onClick={() => navigate("/RecList")}>Records List</Button>
              {isOwner === true && <Button variant='success' className='button-providerList' onClick={() => navigate("/Providers")}>Provider List</Button>}
              {isOwner === true && <Button variant='success' className='button-agencyList' onClick={() => navigate("/Agencies")}>Agency List</Button>}
            </>
          )}
        </Row>
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;
