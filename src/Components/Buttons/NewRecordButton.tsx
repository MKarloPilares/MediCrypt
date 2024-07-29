import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

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


const NewRecordButton = ({updateCombinedData}) => {
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


  return (
    <Button onClick={() => updateCombinedData(combinedData)}>
      New Record
    </Button>
  );
};

export default NewRecordButton;