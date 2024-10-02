import { useState, useEffect } from 'react';
import { ListGroup, Modal, Form } from 'react-bootstrap';
import { Card, Button, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';
import { ethers, Signer } from 'ethers';
import MyAbi from '../Buttons/MyAbi.json';
import NewAgencyButton from '../Buttons/NewAgencyButton';
import RemoveAgencyButton from '../Buttons/RemoveAgency';
import './Agencies.css';

//Page for the owner to  list, add, and remove agencies.
const Agencies = () => {
  const [AddShow, setAddShow] = useState(false); //Variable to control if the adding modal is visible
  const [name, setName] = useState<string>(""); //Variable to store the name of the agency to be added
  const [walletAddress, setWalletAddress] = useState<string>(""); //Variable to store the wallet address of the agency to be added
  const [AgencyNames, setAgencyNames] = useState<string[]>([]); //Variable to store the list of agency names taken from the smart contract.
  const [AgencyAddresses, setAgencyAddresses] = useState<string[]>([]); //Variable to store the list of agency wallet addresses taken from the smart contract.
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null); //Variable to store the instace of metamask's web3Provider
  const [isProviderReady, setIsProviderReady] = useState(false); // Track provider readiness

  //Controls the adding modal's visibility
  const handleAddShow = () => {
    setAddShow(!AddShow);
  }

  //Initializes the connection to metamask
  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);
        setIsProviderReady(true);
      }
    };
    initializeProvider();
  }, []);

  //Contacts the smart contract to get the agency list from it when metamask is connected.
  useEffect(() => {
    const getAgencies= async () => {
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
        setAgencyNames(await contract.listAgencyNames());
        setAgencyAddresses(await contract.listAgencyAddresses());

      } catch (error) {
        console.error('Error Getting Agencies:', error);
      }
    };

    if (isProviderReady) {
      getAgencies();
    }
  }, [provider, isProviderReady]);

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Container className="container-agencies">
        <Col>
          <h3 className="agencies-heading">Agencies</h3>
        </Col>
        <Col>
          <Button variant='success' className="button-addAgencies" onClick={handleAddShow}>Add Agency</Button>
        </Col>
        <Modal show={AddShow} onHide={handleAddShow}>
          <Modal.Header closeButton>
            <Modal.Title className="modal-header-title">Add Agency</Modal.Title>
              </Modal.Header>
                <Modal.Body>
                  <Form>
                      <Form.Label className="modal-body-form-label">Enter Wallet Address</Form.Label>
                      <Form.Control className="modal-body-form-control" placeholder='Wallet Address' onChange={(e) => setWalletAddress(e.target.value)} maxLength={42}></Form.Control>
                      <Form.Label className="modal-body-form-label">Enter Name of Address Owner</Form.Label>
                      <Form.Control className="modal-body-form-control" placeholder='Address Owner' onChange={(e) => setName(e.target.value)} maxLength={50}></Form.Control>
                  </Form>
                </Modal.Body>
              <Modal.Footer>
            <NewAgencyButton walletAddress={walletAddress} name={name} setAddShow={handleAddShow}/>
          </Modal.Footer>
        </Modal>
        <Card className="card-agencies">
          <Card.Body>
            {AgencyNames.map((data: any, index: number) =>
            <>
              <ListGroup key={index}>
                <ListGroup.Item className="list-group-agencies">
                  <Col>
                    {data}
                    <RemoveAgencyButton walletAddress={AgencyAddresses[index]}/>
                  </Col>
                </ListGroup.Item>
              </ListGroup>
            </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default Agencies;
