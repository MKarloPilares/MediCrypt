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

interface RecListProps {
  userWalletAddress: string;
  updateMedicalRecord: (a: any) => void;
  setTokenID: React.Dispatch<React.SetStateAction<number | null>>
  isMedicalProvider: boolean;
}


//Page to list owned and shared records, and to control access to owned one
const RecList: React.FC<RecListProps> = ({ userWalletAddress,updateMedicalRecord, setTokenID, isMedicalProvider}) => {
  const [AddShow, setAddShow] = useState<boolean>(false); //Controls the visibility of the adding modal
  const [whiteListModalShow, setWhiteListModalShow] = useState<boolean>(false); //Controls the visibility of the whitelist modal
  const [ownedNFTNames, setOwnedNames] = useState<string[]>([]); //Stores the names of the NFTs owned by the user
  const [ownedTokenIds, setOwnedIds] = useState<number[]>([]); //Stores the IDs of the NFTs owned by the user
  const [sharedNFTNames, setSharedNames] = useState<string[]>([]); //Stores the names of the NFTs shared to the user
  const [sharedTokenIds, setSharedIds] = useState<number[]>([]); //Stores the IDs of the NFTs shared to the user
  const [chosenTokenId, setChosenTokenId] = useState<number>(0); //Stores the ID of the NFT chosen to be shared or unshared
  const [chosenNFTName, setChosenTokenName] = useState<string>(""); //Stores the name of the NFT chosen to be shared or unshared
  const [address, setAddress] = useState<string>(""); //Stores the wallet address which will be added to an NFT's whitelist
  const [whiteListName, setWhiteListName] = useState<string>(""); //Stores the name which will be added to an NFT's whitelist
  const [whiteListNames, setWhiteListNames] = useState<string[]>([]); //Stores the names whitelisted for an NFT taken from the smart contract
  const [whiteListAddresses, setWhiteListAddresses] = useState<string[]>([]); //Stores the addresses whitelisted for an NFT taken from the smart contract
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null); //Variable to store the instace of metamask's web3Provider
  const [isProviderReady, setIsProviderReady] = useState<boolean>(false); // Track provider readiness

  //Initializes the connection to metamask
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

  //Gets the names and Ids from of the owned and shared records from the smart contract
  useEffect(() => {
    const getNamesFromContract = async () => {
      if (!provider) {
        console.error('User is not connected to an Ethereum wallet.');
        return;
      }

      const signer: Signer = provider.getSigner(); //Gets and stores the user's signature(private key) from metamask
      const contractAddress = import.meta.env.VITE_REACT_APP_CONTRACT_ADDRESS; //Imports the smart contract's address from env variables

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

  //Controls adding modal for sharing
  const openAddModal = (tokenID, tokenName) => {
    setChosenTokenId(tokenID);
    setChosenTokenName(tokenName)
    setAddShow(!AddShow)
  }

  //Controls whitelist modal for unsharing
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
          {isMedicalProvider === true && <NewRecordButton updateMedicalRecord={updateMedicalRecord} setTokenID={setTokenID} className={"recList-button-newRecord"}/>}
        </Col>
        <Modal show={AddShow} onHide={() => setAddShow(!AddShow)} dialogClassName="custom-modal" backdropClassName="custom-modal-backdrop"> 
          <Modal.Header closeButton>
            <Modal.Title className="modal-header-title">Give an address access to this record.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Label className="modal-body-form-label">Enter Wallet Address</Form.Label>
              <Form.Control className="modal-body-form-control" placeholder='Wallet Address' onChange={(e) => setAddress(e.target.value)} maxLength={42}></Form.Control>
              <Form.Label className="modal-body-form-label">Enter Name of Address Owner</Form.Label>
              <Form.Control className="modal-body-form-control" placeholder='Address Owner' onChange={(e) => setWhiteListName(e.target.value)} maxLength={50}></Form.Control>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <WhiteListButton walletAddress={address} tokenID={chosenTokenId} name={whiteListName} nftName={chosenNFTName} setAddShow={() => setAddShow(!AddShow)}/>
          </Modal.Footer>
        </Modal>
              <Modal show={whiteListModalShow} onHide={() => setWhiteListModalShow(!whiteListModalShow)} dialogClassName="custom-modal" backdropClassName="custom-modal-backdrop">
                <Modal.Header closeButton>
                  <Modal.Title className="modal-header-title">Whitelist</Modal.Title>
                </Modal.Header>
              {whiteListNames.map((data: any, index: number) =>
                <Modal.Body key={index} className="modal-body-row">
                    <Col md='8' className="modal-body-col">{index+1}. {data}</Col>
                    <Col><RemoveFromWhiteListButton tokenID={chosenTokenId} walletAddress={whiteListAddresses[index]} nftName={chosenNFTName} 
                      setWhiteListModalShow={() => setWhiteListModalShow(!whiteListModalShow)}/></Col>
                </Modal.Body>
              )}
            <Modal.Footer>
              <Button variant="success" onClick={() => setWhiteListModalShow(!whiteListModalShow)}>OK</Button>
            </Modal.Footer>
          </Modal>
        <h4 className="ownedRecords-heading">{ownedTokenIds.length} Owned Records</h4>
        <Card className="card-ownedRecords">
          <Card.Body>
            {ownedNFTNames.map((data: any, index: number) =>
            <>
              <ListGroup key={index}>
                <ListGroup.Item className="list-group-item">
                  <Col>
                    {data}
                    <GetRecordFromContractButton tokenID={ownedTokenIds[index]} className="recList-openButton-ownedRecord" updateMedicalRecord={updateMedicalRecord} setTokenID={setTokenID}/>
                    <Button size='sm' variant="success" className="button-share-access" onClick={() => {openAddModal(ownedTokenIds[index], data)}}>SHARE</Button>
                    <GetWhiteListedNamesButton tokenID={ownedTokenIds[index]} setWhiteListNames={setWhiteListNames} setWhiteListAddresses ={setWhiteListAddresses} openWhiteListModal={() => openWhiteListModal(ownedTokenIds[index], data)}/>
                  </Col>
                </ListGroup.Item>
              </ListGroup>
            </>
            )}
          </Card.Body>
        </Card>
        <h4 className="sharedRecords-heading">{sharedTokenIds.length} Shared Records</h4>
        <Card className="card-sharedRecords">
          <Card.Body>
          {sharedNFTNames.map((data: any, index: number) =>
            <>
          <ListGroup>
                <ListGroup.Item className="list-group-item">
                  <Col>
                    {data}
                    <GetRecordFromContractButton tokenID={sharedTokenIds[index]} className="recList-openButton-sharedRecord" updateMedicalRecord={updateMedicalRecord} setTokenID={setTokenID}/>
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
