import { useState } from 'react';
import { Col, ThemeProvider, Container, Image, Button, Form } from 'react-bootstrap';
import MintButton from '../Buttons/MintButton';
import './sidebar.css';

const Sidebar = ({combinedData, uploadImageToIPFS, imageSource, ethereumAccount, tokenID, isMedicalProvider}) => {
  const [newImage, setnewImage] = useState<Boolean>(false);
  const [file, setFile] = useState<any>([]);

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Container className="sidebar-container">
        <Col>
          <Image src={imageSource} alt="No Image" className="sidebar-image" />
          <Button variant='warning' className="new-image-button" onClick={() => setnewImage(!newImage)}>New Image</Button>
          <Form.Group className={newImage ? "upload-form-visible" : "upload-form-hidden"}>
            <Form.Control type="file" className="file-input" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0])}/>
            <Button variant='warning' className="upload-button" onClick={() =>uploadImageToIPFS("profileChange",file)}>Upload</Button>
          </Form.Group>
          {isMedicalProvider ? (
            <MintButton account={ethereumAccount} combinedData={combinedData} tokenID={tokenID}></MintButton>
          ) : (
            <h5 className="view-only-mode">VIEW ONLY MODE</h5>
          )}
        </Col>
      </Container>
    </ThemeProvider>
  );
};

export default Sidebar;
