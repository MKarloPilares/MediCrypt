import { useState, useEffect } from 'react';
import { ListGroup, Modal, Form } from 'react-bootstrap';
import { Card, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';
import { ethers, Signer } from 'ethers';
import MyAbi from '../Buttons/MyAbi.json';
import WhiteListButton from '../Buttons/WhiteListButton';
import GetWhiteListedNamesButton from '../Buttons/GetWhiteListedNamesButton';
import RemoveFromWhiteListButton from '../Buttons/RemoveFromWhiteListButton';
import NewRecordButton from '../Buttons/NewRecordButton';
import './RecordsList.css';
import GetRecordFromContractButton from '../Buttons/GetRecordFromContractButton';

const RecList = ({ userWalletAddress,updateCombinedData, setTokenID }) => {
  const [AddShow, setAddShow] = useState(false);
  const [whiteListModalShow, setWhiteListModalShow] = useState(false);
  const [ownedNames, setOwnedNames] = useState<string[]>([]);
  const [ownedIds, setOwnedIds] = useState<number[]>([]);
  const [sharedNames, setSharedNames] = useState<string[]>([]);
  const [sharedIds, setSharedIds] = useState<number[]>([]);
  const [chosenTokenId, setChosenTokenId] = useState<number>(0);
  const [chosenTokenName, setChosenTokenName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [whiteListName, setWhiteListName] = useState<string>("");
  const [whiteListNames, setWhiteListNames] = useState<string[]>([]);
  const [whiteListAddresses, setWhiteListAddresses] = useState<string[]>([]);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [isProviderReady, setIsProviderReady] = useState(false); // Track provider readiness

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
        if (await contract.isAgency(userWalletAddress)) {
          setSharedNames(await contract.listAllTokenNames())
          const ids = await contract.listAllTokenIds();
          setSharedIds(ids.map((id: ethers.BigNumber) => id.toNumber()));
        }

        else {
          setSharedNames(await contract.getAllWhitelistedTokenNames(userWalletAddress))
          const ids = await contract.getAllWhitelistedTokenIds(userWalletAddress);
          setSharedIds(ids.map((id: ethers.BigNumber) => id.toNumber()));
          console.log(sharedNames[0])
        }

        setOwnedNames(await contract.getAllOwnedTokenNames(userWalletAddress));
        const ids = await contract.getAllOwnedTokenIds(userWalletAddress);
        // Convert BigNumber IDs to plain numbers
        setOwnedIds(ids.map((id: ethers.BigNumber) => id.toNumber()));

      } catch (error) {
        console.error('Error Getting Records:', error);
      }
    };

    if (isProviderReady) {
      getNamesFromContract();
    }
  }, [provider, isProviderReady]);

  const openAddModal = (tokenID, tokenName) => {
    setChosenTokenId(tokenID);
    setChosenTokenName(tokenName)
    setAddShow(!AddShow)
  }

  const openWhiteListModal = (tokenID, tokenName) => {
    setChosenTokenId(tokenID);
    setChosenTokenName(tokenName)
    setWhiteListModalShow(!whiteListModalShow)
  }

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Row className="row-records">
        <Col>
          <h3 className="records-heading">Records</h3>
        </Col>
        <Col>
          <NewRecordButton updateCombinedData={updateCombinedData} className={"recList-button-newRecord"}/>
        </Col>
        <Modal show={AddShow} onHide={() => setAddShow(!AddShow)} dialogClassName="custom-modal" backdropClassName="custom-modal-backdrop"> 
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
            <WhiteListButton address={address} tokenID={chosenTokenId} whiteListName={whiteListName} tokenName={chosenTokenName} setAddShow={() => setAddShow(!AddShow)}/>
          </Modal.Footer>
        </Modal>
              <Modal show={whiteListModalShow} onHide={() => setWhiteListModalShow(!whiteListModalShow)} dialogClassName="custom-modal" backdropClassName="custom-modal-backdrop">
                <Modal.Header closeButton>
                  <Modal.Title className="modal-header-title">Whitelist</Modal.Title>
                </Modal.Header>
              {whiteListNames.map((data: any, index: number) =>
                <Modal.Body key={index} className="modal-body-row">
                    <Col md='8' className="modal-body-col">{index+1}. {data}</Col>
                    <Col><RemoveFromWhiteListButton tokenID={chosenTokenId} address={whiteListAddresses[index]} tokenName={chosenTokenName} 
                      setWhiteListModalShow={() => setWhiteListModalShow(!whiteListModalShow)}/></Col>
                </Modal.Body>
              )}
            <Modal.Footer>
              <Button variant="success" onClick={() => setWhiteListModalShow(!whiteListModalShow)}>OK</Button>
            </Modal.Footer>
          </Modal>
        <h4 className="ownedRecords-heading">Owned Records</h4>
        <Card className="card-ownedRecords">
          <Card.Body>
            {ownedNames.map((data: any, index: number) =>
            <>
              <ListGroup key={index}>
                <ListGroup.Item className="list-group-item">
                  <Col>
                    {data}
                    <GetRecordFromContractButton tokenID={ownedIds[index]} className="recList-openButton-ownedRecord" updateCombinedData={updateCombinedData} setTokenID={setTokenID}/>
                    <Button size='sm' variant="success" className="button-share-access" onClick={() => {openAddModal(ownedIds[index], data)}}>SHARE</Button>
                    <GetWhiteListedNamesButton tokenID={ownedIds[index]} setWhiteListNames={setWhiteListNames} setWhiteListAddresses ={setWhiteListAddresses} openWhiteListModal={() => openWhiteListModal(ownedIds[index], data)}/>
                  </Col>
                </ListGroup.Item>
              </ListGroup>
            </>
            )}
          </Card.Body>
        </Card>
        <h4 className="sharedRecords-heading">Shared Records</h4>
        <Card className="card-sharedRecords">
          <Card.Body>
          {sharedNames.map((data: any, index: number) =>
            <>
          <ListGroup>
                <ListGroup.Item className="list-group-item">
                  <Col>
                    {data}
                    <GetRecordFromContractButton tokenID={sharedIds[index]} className="recList-openButton-sharedRecord" updateCombinedData={updateCombinedData} setTokenID={setTokenID}/>
                  </Col>
                </ListGroup.Item>
              </ListGroup>
            </> )}
          </Card.Body>
        </Card>
      </Row>
    </ThemeProvider>
  );
};

export default RecList;
