import { useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilScreenDesktop, cilBook, cilPencil, cilHamburgerMenu, cilX} from '@coreui/icons';
import { Col, ThemeProvider, Container, Image, Button, Form } from 'react-bootstrap';
import MintButton from '../Buttons/MintButton';
import NewRecordButton from '../Buttons/NewRecordButton';

import './sidebar.css'; // Import CSS file for styling

const Sidebar = ({combinedData, uploadImageToIPFS, imageSource, ethereumAccount, tokenID, updateCombinedData}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [newImage, setnewImage] = useState<Boolean>(false);
  const [file, setFile] = useState<any>([]);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Container style={{position: 'fixed', top: '0px', left: '0px', width: '20vw', height: '100vh', backgroundColor: 'green', zIndex: '99'}}>
        <Col>
          <Image src={imageSource} alt="No Image" style={{position: 'fixed', width: '10vw', height: '20vh', top: '15vh', left: '4.5vw', border: '5px solid white'}}/>
          <Button variant='warning' style={{position: 'fixed', top: '40vh', left: '6vw', width: '7vw'}} onClick={() => setnewImage(!newImage)}>New Image</Button>
          <Form.Group style={newImage ? {visibility: 'visible', position: 'fixed', top: '45vh', left: '2vw'} : {visibility: 'hidden', position: 'fixed', top: '45vh', left: '2vw'}}>
            <Form.Control type="file" style= {{width: '16vw'}} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0])}/>
            <Button variant='warning' style={{position: 'fixed', top: '50vh', left: '7vw', width: '5vw'}} onClick={() =>uploadImageToIPFS("profileChange",file)}>Upload</Button>
          </Form.Group>
          <MintButton  contractAddress="0x971bB56Fc660C554380Af187Fa889994393cC37a" account={ethereumAccount} combinedData={combinedData} tokenID={tokenID}></MintButton>
        </Col>
      </Container>
    </ThemeProvider>
  );
};

export default Sidebar;
