import { useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilX } from '@coreui/icons';
import { Col, ThemeProvider, Container, Image, Form } from 'react-bootstrap';
import MintButton from '../Buttons/MintButton';
import UploadToIPFSButton from '../Buttons/UploadToIPFSButton';
import './sidebar.css';

interface medicalRecord {
  personalInfo: object,
  emergencyInfo: object,
  medicalInfo: object,
  vitals: object,
  diagDetails: object,
  medicationDetails: object,
  patientImages: object
}

interface personalInfo {
  profilePictureUri: string;
}

interface SidebarProps {
  medicalRecord: medicalRecord;
  tokenID: number | null;
  isMedicalProvider: boolean;
  setPersonalInfo: React.Dispatch<React.SetStateAction<any>>;
  personalInfo: personalInfo;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

//The sidebar contains the mint button, the patient's profile picture and the button to change it
const Sidebar: React.FC<SidebarProps> = ({medicalRecord, tokenID, isMedicalProvider, setPersonalInfo, personalInfo, isOpen, setIsOpen}) => {
  const [newImage, setnewImage] = useState<Boolean>(false);
  const [file, setFile] = useState<any>([]);
  const [ownerWalletAddress, setOwnerWalletAddress] = useState<string>("")

  //Changes the url in personalInfo to the content hash of the new uploaded image
  const handleUploadProfilePicture = (link) => {
    setPersonalInfo({ ...personalInfo, profilePictureUri: link})
  }

  //Resets the form after uploading an image
  const clearForm = () => {
    setnewImage(false)
    setFile(null)
  }

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Container className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        <button className='close-sidebar-button' onClick={() => {setIsOpen(!isOpen)}}>
            <CIcon icon={cilX} className='x-icon'/>
        </button>
        <Col>
          <Image src={personalInfo.profilePictureUri} alt="No Image" className="sidebar-image"  onClick={() => setnewImage(!newImage)}/>
          <Form.Group className={newImage ? "upload-form-visible" : "upload-form-hidden"}>
            <Form.Control type="file" className="file-input" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0])}/>
            <UploadToIPFSButton appendImageUri={handleUploadProfilePicture} ActionAfterAppend={clearForm} file={file} className="sidebar-button-upload"/>
          </Form.Group>
          {isMedicalProvider ? (
            <>
            {tokenID === null &&
              <Form.Control placeholder='Input Owner Wallet Address' className="wallet-input" maxLength={42} onChange={(e) => setOwnerWalletAddress(e.target.value)}></Form.Control>
            }
              <MintButton ownerWalletAddress={ownerWalletAddress} medicalRecord={medicalRecord} tokenID={tokenID}></MintButton>
            </>
          ) : (
            <h5 className="view-only-mode">VIEW ONLY MODE</h5>
          )}
        </Col>
      </Container>
    </ThemeProvider>
  );
};

export default Sidebar;
