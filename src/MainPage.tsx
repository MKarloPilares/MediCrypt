import {useState, useEffect} from 'react';
import {Container, Nav, Navbar, NavDropdown, Button, ButtonGroup, ToggleButton} from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';
import PersInfo from './Components/Pages/PersonalInformation';
import MedInfo from './Components/Pages/MedInfo';
import logoSolo from './Components/Images/MEDICRYPT LOGO_SOLO.png';
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
import { useNavigate, useLocation } from 'react-router-dom';
import './main.css'
import HomePage from './Components/Pages/Home';

const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkOGY1YTBhYi1lN2VjLTRiNTMtOTNmYy0xYmZkNzJiN2UzMTgiLCJlbWFpbCI6ImF6YXplbGwyOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZWI3MGEzYTBkNThhNjU0ZTA1ODgiLCJzY29wZWRLZXlTZWNyZXQiOiI0MzAxMGYxZWNlODk1ZDJkMTQ1MjFkNmQzNGJkMmNlNDFmMDg5ZmM4ZWQ1ZGFlMWUyMjIwZTU3NTczZWQ2YzlkIiwiZXhwIjoxNzUzMTU5OTkyfQ.Meyzh7TmWi5816v-OTORWTfq86kHl0O8l3jwhdLW5O8';


type PersonalInfo = {
  name: string;
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
  diagnosis: string[];
  prognosis: string[];
  treatment: string[];
  date: string[];
  doctor: string[];
  facility: string[];
};

type MedicationDetails = {
  generic: string[];
  brand: string[];
  dose: string[];
  diag: string[];
  date: string[];
  doctor: string[];
};

type PatientImages = {
  uri: string[];
  description: string[];
  date: string[];
};


const MainPage = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const [ethereumAccount, setEthereumAccount] = useState<string | null>(null);
  const [tokenID, setTokenID] = useState<Number | null>(null);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: 'Name',
    gender: 'Gender',
    age: 'Age',
    birthday: 'Date of Birth',
    address: 'Address',
    email: 'Email',
    phonenum: 'Phone Number',
    profilePictureUri: '',
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
    diagnosis: [],
    prognosis: [],
    treatment: [],
    date: [],
    doctor: [],
    facility: []
  });

  const [medicationDetails, setMedicationDetails] = useState<MedicationDetails>({
    generic: [],
    brand: [],
    dose: [],
    diag: [],
    date: [],
    doctor: []
  });

  const [PatientImages, setPatientImages] = useState<PatientImages>({
    uri: [],
    description: [],
    date: [],
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


  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const handleEmergencyInfoChange = (field, value) => {
    setEmergencyInfo({ ...emergencyInfo, [field]: value });
  };

  const handleMedicalInfoChange = (field, value) => {
    setMedicalInfo({ ...medicalInfo, [field]: value });
  };

  const handleVitalsChange = (field, value) => {
    setVitals({ ...vitals, [field]: value });
  };

  const appendDiagnosis = (newDiagnosis, newPrognosis, newTreatment, newDate, newDoctor, newFacility) => {
    setDiagDetails(prevDetails => ({
      ...prevDetails,
      diagnosis: [...prevDetails.diagnosis, newDiagnosis],
      prognosis: [...prevDetails.prognosis, newPrognosis],
      treatment: [...prevDetails.treatment, newTreatment],
      date: [...prevDetails.date, newDate],
      doctor: [...prevDetails.doctor, newDoctor],
      facility: [...prevDetails.facility, newFacility],
    }));
  };

  const appendMedication = (newGeneric, newBrand, newDose, newDiag, newDate, newDoctor) => {
    setMedicationDetails(prevDetails => ({
      ...prevDetails,
      generic: [...prevDetails.generic, newGeneric],
      brand: [...prevDetails.brand, newBrand],
      dose: [...prevDetails.dose, newDose],
      diag: [...prevDetails.diag, newDiag],
      date: [...prevDetails.date, newDate],
      doctor: [...prevDetails.doctor, newDoctor],
    }));
  };

  const appendImage = (newDesc, newDate) => {
    setPatientImages(prevDetails => ({
      ...prevDetails,
      description: [...prevDetails.description, newDesc],
      date: [...prevDetails.date, newDate],
    }));
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


  const uploadImageToIPFS = async (event, file) => {

    try {
      const data = new FormData();
      data.append("file", file);
  
      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: data,
      });
      const resData = await res.json();
      if (event === 'profileChange') {
        setPersonalInfo({ ...personalInfo, profilePictureUri: `https://ipfs.io/ipfs/${resData.IpfsHash}` })
      }
      else {
        setPatientImages(prevDetails => ({
          ...prevDetails,
          uri: [...prevDetails.uri, `https://ipfs.io/ipfs/${resData.IpfsHash}`],
        }))
      }
    console.log(resData)
    console.log(PatientImages)
  } catch (error) {
    console.log(error);
  }
}

const shouldRenderSidebar = ['/Profile', '/Diagnosis', '/Images'].includes(location.pathname);

  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Navbar.Brand>
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
          <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
          <NavDropdown title="Records" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => navigate("Profile")}>Record Page</NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("RecList")}>Records List </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      <Button
        size="sm"
        variant="success"
        className={ethereumAccount === null ? 'connect-metamask' : 'hidden'}
        onClick={connectMetamaskWallet}
      >
        Connect Metamask
      </Button>
    </Navbar>
    {shouldRenderSidebar && (
      <Sidebar
        combinedData={combinedData}
        uploadImageToIPFS={uploadImageToIPFS}
        imageSource={personalInfo.profilePictureUri}
        ethereumAccount={ethereumAccount}
        tokenID={tokenID}
        updateCombinedData={updateCombinedData}
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
          <Route path="/" element={<HomePage ethereumAccount={ethereumAccount} connectMetamaskWallet={connectMetamaskWallet}/>} />
          <Route path="/Profile" element={
            <>
              <h2 className="profile-heading">Patient Information</h2>
              <Container className="profile-container">
                <PersInfo personalInfo={personalInfo} setPersonalInfo={handlePersonalInfoChange} />
              </Container>
              <h2 className="emergency-heading">Emergency Information</h2>
              <Container className="emergency-container">
                <EmerInfo emergencyInfo={emergencyInfo} setEmergencyInfo={handleEmergencyInfoChange} />
              </Container>
              <h2 className="medical-heading">Medical Information</h2>
              <Container className="medical-container">
                <MedInfo medicalInfo={medicalInfo} setMedicalInfo={handleMedicalInfoChange} />
              </Container>
              <h2 className="vitals-heading">Vitals</h2>
              <Container className="vitals-container">
                <Vitals vitals={vitals} setVitals={handleVitalsChange} />
              </Container>
            </>
          } />
          <Route path="/Diagnosis" element={
            <>
              <h2 className="diagnosis-heading">Diagnosis</h2>
              <Container className="diagnosis-container">
                <Diagnosis appendDiagnosis={appendDiagnosis} />
              </Container>
              <h2 className="diagnosis-history-heading">Diagnosis History</h2>
              <Container className="diagnosis-history-container">
                <DiagHist diagDetails={diagDetails} />
              </Container>
              <h2 className="medications-heading">Medications</h2>
              <Container className="medications-container">
                <Medication appendMedication={appendMedication} />
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
                <AddImagePage appendImage={appendImage} uploadImageToIPFS={uploadImageToIPFS} />
              </Container>
              <Container className="display-image-container">
                <DisplayImagePage patientImages={PatientImages} />
              </Container>
            </>
          } />
          <Route path="/RecList" element={<RecList updateCombinedData={updateCombinedData} setTokenID={setTokenID} />} />
        </Routes>
      </Container>
    </body>
  </ThemeProvider>
  );
};

export default MainPage;
