import { Container, Image, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';
import logo from '../Images/MediCrypt_Logo.png';
import { useNavigate } from 'react-router-dom';
import ConnectMetaMaskButton from '../Buttons/ConnectMetaMaskButton';
import NewRecordButton from '../Buttons/NewRecordButton';
import './Home.css';

interface HomePageProps {
  userWalletAddress: string;
  setUserWalletAddress: React.Dispatch<React.SetStateAction<string>>;
  setIsOwner: React.Dispatch<React.SetStateAction<boolean>>;
  updateMedicalRecord: (a: any) => void;
  isMedicalProvider: boolean;
  isOwner: boolean;
  setIsMedicalProvider: React.Dispatch<React.SetStateAction<boolean>>
  setTokenID: React.Dispatch<React.SetStateAction<number | null>>
}

//Medicrypt's homepage
const HomePage: React.FC<HomePageProps>  = ({userWalletAddress, setUserWalletAddress, setIsOwner, updateMedicalRecord, isMedicalProvider, isOwner, setIsMedicalProvider, setTokenID }) => {
  const navigate = useNavigate();

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Container className="container-home">
          <Image src={logo} className="logo-image" />
        <Row>
          {userWalletAddress === "" ? (
            <ConnectMetaMaskButton setUserWalletAddress={setUserWalletAddress} setIsOwner={setIsOwner} setIsMedicalProvider={setIsMedicalProvider} className={"home-button-connectToMetamask"}/>
          ) : (
            <>
              {isMedicalProvider === true && <NewRecordButton updateMedicalRecord={updateMedicalRecord} setTokenID={setTokenID} className={"home-button-newRecord"}/>}
              <Button variant='success' className={isMedicalProvider ? "button-recordList-provider" : "button-recordList-patient"} onClick={() => navigate("/RecList")}>Records List</Button>
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
