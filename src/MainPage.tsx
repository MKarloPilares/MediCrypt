import { useState, useEffect } from 'react';
import { Container, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilUser } from '@coreui/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';
import PersInfo from './Components/Pages/PersonalInformation';
import MedInfo from './Components/Pages/MedInfo';
import Sidebar from './Components/Sidebar/sidebar';
import EmerInfo from './Components/Pages/EmergencyInformation';
import Vitals from './Components/Pages/Vitals';
import Diagnosis from './Components/Pages/Diagnosis';
import DiagHist from './Components/Pages/DiagHist';
import Medication from './Components/Pages/Medication';
import MedicationHist from './Components/Pages/MedicationHist';
import AddImagePage from './Components/Pages/AddImagePage';
import DisplayImagePage from './Components/Pages/DisplayImagePage';
import RecList from './Components/Pages/RecordsList';
import HomePage from './Components/Pages/Home';
import NavbarComponent from './Components/Navbar/navbar';
import Providers from './Components/Pages/Providers';
import Agencies from './Components/Pages/Agencies';
import './main.css';


//Type setting for global variables
type personalInfo = {
  patientName: string;
  gender: string;
  age: number;
  birthday: string;
  address: string;
  email: string;
  phonenum: string;
  profilePictureUri: string;
};

type emergencyInfo = {
  emName: string;
  emNum: string;
  relationship: string;
};

type medicalInfo = {
  heart: boolean | null;
  lung: boolean | null;
  kidney: boolean | null;
  extremities: boolean | null;
  cancer: boolean | null;
  digestive: boolean | null;
  std: boolean | null;
  head: boolean | null;
  mental: boolean | null;
  drug: boolean | null;
  preg: boolean | null;
  smoke: boolean | null;
};

type vitals = {
  weight: number;
  height: number;
  bp: string;
  temp: number;
  pr: number;
  rr: number;
};

type diagDetails = {
  diagDiagnosis: string[];
  prognosis: string[];
  treatment: string[];
  diagDate: string[];
  diagDoctor: string[];
  facility: string[];
};

type medicationDetails = {
  generic: string[];
  brand: string[];
  dose: number[];
  medDiag: string[];
  medDate: string[];
  medDoctor: string[];
};

type patientImages = {
  imageUri: string[];
  description: string[];
  imageDate: string[];
};

const MainPage = () => {
  //Global variable and state declarations
  let navigate = useNavigate();
  let location = useLocation();
  const [userWalletAddress, setUserWalletAddress] = useState<string>(""); //Wallet address of the user, acting as their user identifier
  const [tokenID, setTokenID] = useState<number | null>(null); //NFT ID variable to be passed around the pages
  const [isOwner, setIsOwner] = useState<boolean>(false); //Variable to check if the user is the owner of the smart contract
  const [isMedicalProvider, setIsMedicalProvider] = useState<boolean>(false); //Variable to check if the user is a medical provider
  const [isOpen, setIsOpen] = useState<boolean>(false); //Variable to control if the sidebar is open

  //Import of environment variables
  const pinataGatewayToken = import.meta.env.VITE_REACT_APP_GATEWAY_TOKEN;
  const pinataGateway = import.meta.env.VITE_REACT_APP_GATEWAY;

  //Declarion of patient's personal information variables
  const [personalInfo, setPersonalInfo] = useState<personalInfo>({
    patientName: 'Name',
    gender: 'Gender',
    age: 0,
    birthday: '01/01/2024',
    address: 'Address',
    email: 'Email',
    phonenum: 'Phone Number',
    profilePictureUri: `${pinataGateway}/ipfs/QmNXVoaLNFGbTnuM5UpUbPy9rqEFXYWoT39kmrpVmwuuSn?pinataGatewayToken=${pinataGatewayToken}`,
  });

  //Declarion of patient's emergency information variables
  const [emergencyInfo, setEmergencyInfo] = useState<emergencyInfo>({
    emName: 'Name',
    emNum: 'Contact Number',
    relationship: 'Relationship',
  });

  //Declarration of patients medical information variables
  const [medicalInfo, setMedicalInfo] = useState<medicalInfo>({
    heart: null,
    lung: null,
    kidney: null,
    extremities: null,
    cancer: null,
    digestive: null,
    std: null,
    head: null,
    mental: null,
    drug: null,
    preg: null,
    smoke: null
  });

  //Declaration of patient's vitals variables
  const [vitals, setVitals] = useState<vitals>({
    weight: 0,
    height: 0,
    bp: "mmHG",
    temp: 0,
    pr: 0,
    rr: 0,
  });

  //Declaration of patient's diagnosis information variables
  const [diagDetails, setDiagDetails] = useState<diagDetails>({
    diagDiagnosis: [],
    prognosis: [],
    treatment: [],
    diagDate: [],
    diagDoctor: [],
    facility: []
  });

  //Declaration of patient's medication information variables
  const [medicationDetails, setMedicationDetails] = useState<medicationDetails>({
    generic: [],
    brand: [],
    dose: [],
    medDiag: [],
    medDate: [],
    medDoctor: []
  });

  //Declaration of patient's images variables
  const [patientImages, setPatientImages] = useState<patientImages>({
    imageUri: [],
    description: [],
    imageDate: [],
  });

  //Combination of medical record data
  const medicalRecord = {
    personalInfo,
    emergencyInfo,
    medicalInfo,
    vitals,
    diagDetails,
    medicationDetails,
    patientImages
  };

  //Function to update combinedData
  const updateMedicalRecord = (newData) => {
    setPersonalInfo(newData.personalInfo);
    setEmergencyInfo(newData.emergencyInfo);
    setMedicalInfo(newData.medicalInfo);
    setVitals(newData.vitals);
    setDiagDetails(newData.diagDetails);
    setMedicationDetails(newData.medicationDetails);
    setPatientImages(newData.patientImages)
  };

  //Changes tab name to MediCrypt
  useEffect(() => {
    document.title = 'MediCrypt';
  }, []);

  //Varaible for radios in button group and their respective pages
  const radios = [
    { name: 'Profile', value: '/Profile' },
    { name: 'Diagnosis and Medications', value: '/Diagnosis' },
    { name: 'Images', value: '/Images' },
  ];

  //Sidebar only renders in profile, diagnosis, and images page
  const shouldRenderSidebar = ['/Profile', '/Diagnosis', '/Images'].includes(location.pathname);

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <NavbarComponent userWalletAddress={userWalletAddress} setUserWalletAddress={setUserWalletAddress} setIsOwner={setIsOwner} setIsMedicalProvider={setIsMedicalProvider}/>
      {shouldRenderSidebar && (
          <Sidebar
            medicalRecord={medicalRecord}
            tokenID={tokenID}
            isMedicalProvider={isMedicalProvider}
            setPersonalInfo={setPersonalInfo}
            personalInfo={personalInfo}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
      )}
      <body className="main-body">
        <Container className="main-container">
          <Container className={`button-group-container ${location.pathname === "/Images" ? 'images' : ''}`}>
            {shouldRenderSidebar && (
              <>
                <button className={`open-sidebar-button  ${location.pathname === "/Profile" ? '' : 'not-profile'}`} onClick={() => {setIsOpen(!isOpen)}}>
                  <CIcon icon={cilUser} className='user-icon'/>
                </button>
                <ButtonGroup>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={idx % 2 ? 'outline-success' : 'outline-success'}
                      className="toggle-button"
                      name="radio"
                      value={radio.value}
                      checked={location.pathname === radio.value}
                      onChange={(e) => navigate(e.currentTarget.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </>
            )}
          </Container>
          <Routes>
            <Route path="/" element={<HomePage userWalletAddress={userWalletAddress} setUserWalletAddress={setUserWalletAddress} setIsOwner={setIsOwner} updateMedicalRecord={updateMedicalRecord} 
              isOwner={isOwner} setIsMedicalProvider={setIsMedicalProvider} setTokenID={setTokenID}></HomePage>} />
            <Route path="/Profile" element={
              <>
                <h2 className="profile-heading">Patient Information</h2>
                <Container className="profile-container">
                  <PersInfo personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />
                </Container>
                <h2 className="emergency-heading">Emergency Information</h2>
                <Container className="emergency-container">
                  <EmerInfo emergencyInfo={emergencyInfo} setEmergencyInfo={setEmergencyInfo} />
                </Container>
                <h2 className="medical-heading">Medical Information</h2>
                <Container className="medical-container">
                  <MedInfo medicalInfo={medicalInfo} setMedicalInfo={setMedicalInfo} />
                </Container>
                <h2 className="vitals-heading">Vitals</h2>
                <Container className="vitals-container">
                  <Vitals vitals={vitals} setVitals={setVitals} />
                </Container>
              </>
            } />
            <Route path="/Diagnosis" element={
              <>
                <h2 className="diagnosis-heading">Diagnosis</h2>
                <Container className="diagnosis-container">
                  <Diagnosis setDiagDetails={setDiagDetails} />
                </Container>
                <h2 className="diagnosis-history-heading">Diagnosis History</h2>
                <Container className="diagnosis-history-container">
                  <DiagHist diagDetails={diagDetails} />
                </Container>
                <h2 className="medications-heading">Medications</h2>
                <Container className="medications-container">
                  <Medication setMedicationDetails={setMedicationDetails} />
                </Container>
                <h2 className="medication-history-heading">Medication History</h2>
                <Container className="medication-history-container">
                  <MedicationHist medicationDetails={medicationDetails} />
                </Container>
              </>
            } />
            <Route path="/Images" element={
              <>
                <Container className="add-image-container">
                  <AddImagePage setPatientImages={setPatientImages}/>
                </Container>
                <Container className="display-image-container">
                  <DisplayImagePage patientImages={patientImages} />
                </Container>
              </>
            } />
            <Route path="/RecList" element={<RecList userWalletAddress={userWalletAddress} updateMedicalRecord={updateMedicalRecord} setTokenID={setTokenID} />} />
            <Route path="/Providers" element={<Providers />} />
            <Route path="/Agencies" element={<Agencies/>} />
          </Routes>
        </Container>
      </body>
    </ThemeProvider>
  );
};

export default MainPage;
