import { useState, useEffect } from 'react';
import { Container, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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

type PersonalInfo = {
  patientName: string;
  gender: string;
  age: string;
  birthday: string;
  address: string;
  email: string;
  phonenum: string;
  profilePictureUri: string;
};

type EmergencyInfo = {
  emName: string;
  emNum: string;
  relationship: string;
};

type MedicalInfo = {
  heart: string;
  lung: string;
  kidney: string;
  extremities: string;
  cancer: string;
  digestive: string;
  std: string;
  head: string;
  mental: string;
  drug: string;
  preg: string;
  smoke: string;
};

type Vitals = {
  weight: string;
  height: string;
  bp: string;
  temp: string;
  pr: string;
  rr: string;
};

type DiagDetails = {
  diagDiagnosis: string[];
  prognosis: string[];
  treatment: string[];
  diagDate: string[];
  diagDoctor: string[];
  facility: string[];
};

type MedicationDetails = {
  generic: string[];
  brand: string[];
  dose: string[];
  medDiag: string[];
  medDate: string[];
  medDoctor: string[];
};

type PatientImages = {
  imageUri: string[];
  description: string[];
  imageDate: string[];
};


const MainPage = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const [userWalletAddress, setUserWalletAddress] = useState<string | null>(null);
  const [tokenID, setTokenID] = useState<number | null>(null);
  const [isOwner, setIsOwner] = useState<Boolean>(false);
  const [isMedicalProvider, setIsMedicalProvider] = useState<Boolean>(false);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    patientName: 'Name',
    gender: 'Gender',
    age: 'Age',
    birthday: 'Date of Birth',
    address: 'Address',
    email: 'Email',
    phonenum: 'Phone Number',
    profilePictureUri: 'https://ipfs.io/ipfs/QmNXVoaLNFGbTnuM5UpUbPy9rqEFXYWoT39kmrpVmwuuSn',
  });

  const [emergencyInfo, setEmergencyInfo] = useState<EmergencyInfo>({
    emName: 'Name',
    emNum: 'Contact Number',
    relationship: 'Relationship',
  });

  const [medicalInfo, setMedicalInfo] = useState<MedicalInfo>({
    heart: "heart",
    lung: "lung",
    kidney: "kid",
    extremities: "extr",
    cancer: "canc",
    digestive: "dige",
    std: "std",
    head: "head",
    mental: "ment",
    drug: "drg",
    preg: "prg",
    smoke: "smk"
  });

  const [vitals, setVitals] = useState<Vitals>({
    weight: "kg",
    height: "ft",
    bp: "mmHG",
    temp: "C",
    pr: "ppM",
    rr: "rpM"
  });

  const [diagDetails, setDiagDetails] = useState<DiagDetails>({
    diagDiagnosis: [],
    prognosis: [],
    treatment: [],
    diagDate: [],
    diagDoctor: [],
    facility: []
  });

  const [medicationDetails, setMedicationDetails] = useState<MedicationDetails>({
    generic: [],
    brand: [],
    dose: [],
    medDiag: [],
    medDate: [],
    medDoctor: []
  });

  const [PatientImages, setPatientImages] = useState<PatientImages>({
    imageUri: [],
    description: [],
    imageDate: [],
  });

  const combinedData = {
    personalInfo,
    emergencyInfo,
    medicalInfo,
    vitals,
    diagDetails,
    medicationDetails,
    PatientImages
  };

  const updateCombinedData = (newData) => {
    setPersonalInfo(newData.personalInfo);
    setEmergencyInfo(newData.emergencyInfo);
    setMedicalInfo(newData.medicalInfo);
    setVitals(newData.vitals);
    setDiagDetails(newData.diagDetails);
    setMedicationDetails(newData.medicationDetails);
  };

  useEffect(() => {
    document.title = 'MediCrypt';
  }, []);

  const radios = [
    { name: 'Profile', value: '/Profile' },
    { name: 'Diagnosis and Medications', value: '/Diagnosis' },
    { name: 'Images', value: '/Images' },
  ];

  const shouldRenderSidebar = ['/Profile', '/Diagnosis', '/Images'].includes(location.pathname);

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <NavbarComponent userWalletAddress={userWalletAddress} setUserWalletAddress={setUserWalletAddress} setIsOwner={setIsOwner} setIsMedicalProvider={setIsMedicalProvider}/>
      {shouldRenderSidebar && (
        <Sidebar
          combinedData={combinedData}
          tokenID={tokenID}
          isMedicalProvider={isMedicalProvider}
          setPersonalInfo={setPersonalInfo}
          personalInfo={personalInfo}
        />
      )}
      <body className="main-body">
        <Container className="main-container">
          <Container className="button-group-container">
            {shouldRenderSidebar && (
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
            )}
          </Container>
          <Routes>
            <Route path="/" element={<HomePage userWalletAddress={userWalletAddress} setUserWalletAddress={setUserWalletAddress} setIsOwner={setIsOwner} updateCombinedData={updateCombinedData} 
              isOwner={isOwner} setIsMedicalProvider={setIsMedicalProvider}></HomePage>} />
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
                  <DisplayImagePage patientImages={PatientImages} />
                </Container>
              </>
            } />
            <Route path="/RecList" element={<RecList userWalletAddress={userWalletAddress} updateCombinedData={updateCombinedData} setTokenID={setTokenID} />} />
            <Route path="/Providers" element={<Providers />} />
            <Route path="/Agencies" element={<Agencies/>} />
          </Routes>
        </Container>
      </body>
    </ThemeProvider>
  );
};

export default MainPage;
