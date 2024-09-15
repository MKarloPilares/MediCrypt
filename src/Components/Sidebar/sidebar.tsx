import { useState } from 'react';
import { Col, ThemeProvider, Container, Image, Button, Form } from 'react-bootstrap';
import MintButton from '../Buttons/MintButton';
import UploadToIPFSButton from '../Buttons/UploadToIPFSButton';
import './sidebar.css';

const Sidebar = ({combinedData, tokenID, isMedicalProvider, setPersonalInfo, personalInfo}) => {
  const [newImage, setnewImage] = useState<Boolean>(false);
  const [file, setFile] = useState<any>([]);
  const [ownerWalletAddress, setOwnerWalletAddress] = useState<string>("")

  const handleUploadProfilePicture = (link) => {
    setPersonalInfo({ ...personalInfo, profilePictureUri: link})
  }

  const clearForm = () => {
    setnewImage(false)
    setFile(null)
  }

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Container className="sidebar-container">
        <Col>
          <Image src={personalInfo.profilePictureUri} alt="No Image" className="sidebar-image"  onClick={() => setnewImage(!newImage)}/>
          <Form.Group className={newImage ? "upload-form-visible" : "upload-form-hidden"}>
            <Form.Control type="file" className="file-input" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0])}/>
            <UploadToIPFSButton appendImageUri={handleUploadProfilePicture} ActionAfterAppend={clearForm} file={file} className="sidebar-button-upload"/>
          </Form.Group>
          {isMedicalProvider ? (
            <>
              <Form.Control placeholder='Input Owner Wallet Address' className="wallet-input" onChange={(e) => setOwnerWalletAddress(e.target.value)}></Form.Control>
              <MintButton account={ownerWalletAddress} combinedData={combinedData} tokenID={tokenID}></MintButton>
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
