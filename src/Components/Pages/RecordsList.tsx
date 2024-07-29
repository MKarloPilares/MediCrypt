import { useState, useEffect } from 'react';
import { ListGroup, Modal, Form } from 'react-bootstrap';
import { Card, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';
import { ethers, Signer } from 'ethers';
import MyAbi from '../Buttons/MyAbi.json';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import WhiteListButton from '../Buttons/WhiteListButton';
import GetWhiteListedNamesButton from '../Buttons/GetWhiteListedNamesButton';
import RemoveFromWhiteListButton from '../Buttons/RemoveFromWhiteListButton';
import './RecordsList.css';

const RecList = ({ updateCombinedData, setTokenID }) => {
  let navigate = useNavigate();
  const [AddShow, setAddShow] = useState(false);
  const [whiteListModalShow, setWhiteListModalShow] = useState(false);
  const [names, setNames] = useState<string[]>([]);
  const [ids, setIds] = useState<number[]>([]);
  const [address, setAddress] = useState<string>("");
  const [whiteListName, setWhiteListName] = useState<string>("");
  const [whiteListNames, setWhiteListNames] = useState<string[]>([]);
  const [whiteListAddresses, setWhiteListAddresses] = useState<string[]>([]);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [isProviderReady, setIsProviderReady] = useState(false); // Track provider readiness

  const handleAddShow = () => setAddShow(!AddShow);
  const handleWhiteListModalShow = () => {
    setWhiteListModalShow(!whiteListModalShow);
  }

  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);
        setIsProviderReady(true); // Indicate that provider is ready
      }
    };
    initializeProvider();
  }, []);

  useEffect(() => {
    const getNamesFromContract = async () => {
      if (!provider) {
        console.error('User is not connected to an Ethereum wallet.');
        return;
      }

      const signer: Signer = provider.getSigner();
      const contractAddress = import.meta.env.VITE_REACT_APP_CONTRACT_ADDRESS;

      if (!contractAddress) {
        console.error('Contract address is not defined.');
        return;
      }

      const contract = new ethers.Contract(contractAddress, MyAbi, signer);

      try {
        const names = await contract.getAllOwnedTokenNames("0x3fcc9F262124D96B48e03CC3683462C08049384E");
        const ids = await contract.getAllOwnedTokenIds("0x3fcc9F262124D96B48e03CC3683462C08049384E");
        // Convert BigNumber IDs to plain numbers
        const plainIds = ids.map((id: ethers.BigNumber) => id.toNumber());

        setNames(names);
        setIds(plainIds)
      } catch (error) {
        console.error('Error minting NFT:', error);
      }
    };

    if (isProviderReady) {
      getNamesFromContract();
    }
  }, [provider, isProviderReady]);

  const getRecordFromContract = async (tokenID) => {
    if (!provider) {
      console.error('User is not connected to an Ethereum wallet.');
      return;
    }

    const signer: Signer = provider.getSigner();
    const contractAddress = import.meta.env.VITE_REACT_APP_CONTRACT_ADDRESS;

    if (!contractAddress) {
      console.error('Contract address is not defined.');
      return;
    }

    const contract = new ethers.Contract(contractAddress, MyAbi, signer);

    const record = await contract.getTokenMetadata(tokenID);
    const fileUrl = record[0];
    const fileRes = await fetch(fileUrl);
    const fileContent = await fileRes.text();

    const bytes = CryptoJS.AES.decrypt(fileContent, record[2]);

    // Convert the decrypted bytes back to a JSON string
    const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
  
    // Parse the JSON string back into an object
    const decryptedData = JSON.parse(decryptedJsonString);
  
    console.log(decryptedData.personalInfo.age)
    setTokenID(tokenID)
    updateCombinedData(decryptedData)

    navigate("/Profile");

    try {

    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };

  const openAddModal = (tokenID) => {
    setTokenID(tokenID);
    handleAddShow();
  }

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Row className="row-records">
        <h3 className="h3-records">Records</h3>
        <Card className="card-records">
          <Card.Body>
            {names.map((data: any, index: number) =>
            <>
              <Modal show={AddShow} onHide={handleAddShow}>
                <Modal.Header closeButton>
                  <Modal.Title className="modal-header-title">Give an address access to this record.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Label className="modal-body-form-label">Enter Wallet Address</Form.Label>
                    <Form.Control className="modal-body-form-control" placeholder='Wallet Address' onChange={(e) => setAddress(e.target.value)}></Form.Control>
                    <Form.Label className="modal-body-form-label">Enter Name of Address Owner</Form.Label>
                    <Form.Control className="modal-body-form-control" placeholder='Address Owner' onChange={(e) => setWhiteListName(e.target.value)}></Form.Control>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <WhiteListButton address={address} tokenID={ids[index]} whiteListName={whiteListName} setAddShow={handleAddShow}/>
                </Modal.Footer>
              </Modal>
              <Modal show={whiteListModalShow} onHide={handleWhiteListModalShow}>
                  <Modal.Header closeButton>
                    <Modal.Title className="modal-header-title">Whitelist</Modal.Title>
                  </Modal.Header>
                  {whiteListNames.map((data: any, index: number) =>
                  <Modal.Body key={index} className="modal-body-row">
                    <Col md='8' className="modal-body-col">{index+1}. {data}</Col>
                    <Col><RemoveFromWhiteListButton tokenID={ids[index]} address={whiteListAddresses[index]} setWhiteListModalShow={handleWhiteListModalShow}/></Col>
                  </Modal.Body>
                  )}
                  <Modal.Footer>
                    <Button variant="success" onClick={handleWhiteListModalShow}>OK</Button>
                  </Modal.Footer>
              </Modal>
              <ListGroup key={index}>
                <ListGroup.Item className="list-group-item">
                  <Col>
                    {data}
                    <Button size='sm' variant="success" className="button-open-record" onClick={() => getRecordFromContract(ids[index])}>OPEN RECORD</Button>
                    <Button size='sm' variant="success" className="button-share-access" onClick={() => openAddModal(ids[index])}>SHARE ACCESS</Button>
                    <GetWhiteListedNamesButton tokenID={ids[index]} setWhiteListNames={setWhiteListNames} setWhiteListAddresses ={setWhiteListAddresses} setWhiteListModalShow={handleWhiteListModalShow}/>
                  </Col>
                </ListGroup.Item>
              </ListGroup>
            </>
            )}
          </Card.Body>
        </Card>
      </Row>
    </ThemeProvider>
  );
};

export default RecList;
