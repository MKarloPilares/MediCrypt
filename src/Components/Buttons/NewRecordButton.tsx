import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './NewRecordButton.css'; // Import the CSS file

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

interface NewRecordButtonProps {
  updateCombinedData: (a) => void; // User's Ethereum account
  className: string;
}

const NewRecordButton: React.FC<NewRecordButtonProps> = ({ updateCombinedData, className }) => {
  const navigate = useNavigate();
  const [personalInfo] = useState<PersonalInfo>({
    patientName: 'Name',
    gender: 'Gender',
    age: 'Age',
    birthday: 'Date of Birth',
    address: 'Address',
    email: 'Email',
    phonenum: 'Phone Number',
    profilePictureUri: 'https://ipfs.io/ipfs/QmNXVoaLNFGbTnuM5UpUbPy9rqEFXYWoT39kmrpVmwuuSn',
  });

  const [emergencyInfo] = useState<EmergencyInfo>({
    emName: 'Name',
    emNum: 'Contact Number',
    relationship: 'Relationship',
  });

  const [medicalInfo] = useState<MedicalInfo>({
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

  const [vitals] = useState<Vitals>({
    weight: 'kg',
    height: 'ft',
    bp: 'mmHG',
    temp: 'C',
    pr: 'ppM',
    rr: 'rpM',
  });

  const [diagDetails] = useState<DiagDetails>({
    diagDiagnosis: [],
    prognosis: [],
    treatment: [],
    diagDate: [],
    diagDoctor: [],
    facility: []
  });

  const [medicationDetails] = useState<MedicationDetails>({
    generic: [],
    brand: [],
    dose: [],
    medDiag: [],
    medDate: [],
    medDoctor: []
  });

  const [patientImages] = useState<PatientImages>({
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

  const handleNewRecord = () => {
    updateCombinedData(combinedData);
    navigate("/Profile");
  }

  return (
    <Button variant="success" onClick={handleNewRecord} className={className}>
      New Record
    </Button>
  );
};

export default NewRecordButton;
