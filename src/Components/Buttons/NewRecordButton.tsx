import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './NewRecordButton.css'; // Import the CSS file

//Type setting of the list of data declared

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
  dose: string[];
  medDiag: string[];
  medDate: string[];
  medDoctor: string[];
};

type patientImages = {
  imageUri: string[];
  description: string[];
  imageDate: string[];
};

//Type setting of inherited variables and functions
interface NewRecordButtonProps {
  updateMedicalRecord: (a) => void;
  className: string;
  setTokenID: (a) => void;
}

//Button to reset the contents of the global variables from the main page
const NewRecordButton: React.FC<NewRecordButtonProps> = ({ updateMedicalRecord, className, setTokenID}) => {
  const navigate = useNavigate();
  const [personalInfo] = useState<personalInfo>({
    patientName: 'Name',
    gender: 'Gender',
    age: 0,
    birthday: '2024-01-01',
    address: 'Address',
    email: 'Email',
    phonenum: 'Phone Number',
    profilePictureUri: 'https://ipfs.io/ipfs/QmNXVoaLNFGbTnuM5UpUbPy9rqEFXYWoT39kmrpVmwuuSn',
  });

  const [emergencyInfo] = useState<emergencyInfo>({
    emName: 'Name',
    emNum: 'Contact Number',
    relationship: 'Relationship',
  });

  const [medicalInfo] = useState<medicalInfo>({
    heart: 'heart',
    lung: 'lung',
    kidney: 'kid',
    extremities: 'extr',
    cancer: 'canc',
    digestive: 'dige',
    std: 'std',
    head: 'head',
    mental: 'ment',
    drug: 'drg',
    preg: 'prg',
    smoke: 'smk',
  });

  const [vitals] = useState<vitals>({
    weight: 0,
    height: 0,
    bp: 'mmHG',
    temp: 0,
    pr: 0,
    rr: 0,
  });

  const [diagDetails] = useState<diagDetails>({
    diagDiagnosis: [],
    prognosis: [],
    treatment: [],
    diagDate: [],
    diagDoctor: [],
    facility: []
  });

  const [medicationDetails] = useState<medicationDetails>({
    generic: [],
    brand: [],
    dose: [],
    medDiag: [],
    medDate: [],
    medDoctor: []
  });

  const [patientImages] = useState<patientImages>({
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
    patientImages,
  };

  //Function to to set the combinedData to the default values as well as the tokenID, then navigates to the record page
  const handleNewRecord = () => {
    updateMedicalRecord(combinedData);
    setTokenID(null)
    navigate("/Profile");
  }

  return (
    <Button variant="success" onClick={handleNewRecord} className={className}>
      New Record
    </Button>
  );
};

export default NewRecordButton;
