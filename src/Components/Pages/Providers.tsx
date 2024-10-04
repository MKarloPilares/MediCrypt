import { useState, useEffect } from 'react';
import { ListGroup, Modal, Form } from 'react-bootstrap';
import { Card, Button, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';
import { ethers, Signer } from 'ethers';
import MyAbi from '../Buttons/MyAbi.json';
import NewProviderButton from '../Buttons/NewProviderButton';
import './Providers.css';
import RemoveProviderButton from '../Buttons/RemoveProvider';

//Page for the owner to list, add, and remove medical providers.
const Providers = () => {
  const [AddShow, setAddShow] = useState<boolean>(false); //Controls the adding modal's visibility
  const [name, setName] = useState<string>(""); //Stores the name of the provider to be added
  const [walletAddress, setWalletAddress] = useState<string>(""); //Stores the wallet address of the provider to be added
  const [ProviderNames, setProviderNames] = useState<string[]>([]); //Stores the list of names of providers taken from the smart contract
  const [ProviderAddresses, setProviderAddresses] = useState<string[]>([]); //Stores the list of wallet addresses of providers taken from the smart contract
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null); //Stores the instance of Metamask
  const [isProviderReady, setIsProviderReady] = useState(false); // Track provider readiness

  //Controls
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

  //Gets the provider list from the smart contract when metamask is ready
  useEffect(() => {
    const getProviders = async () => {
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
        setProviderNames(await contract.listMedicalProviderNames());
        setProviderAddresses(await contract.listMedicalProviderAddresses());
        // Convert BigNumber IDs to plain number

      } catch (error) {
        console.error('Error Getting Providers:', error);
      }
    };

    if (isProviderReady) {
      getProviders();
    }
  }, [provider, isProviderReady]);

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Container className="container-providers">
        <Col>
          <h2 className="providers-heading">{ProviderAddresses.length} Providers</h2>
        </Col>
        <Col>
          <Button variant='success' className="button-addProvider" onClick={handleAddShow}>Add Provider</Button>
        </Col>
        <Modal show={AddShow} onHide={handleAddShow}>
          <Modal.Header closeButton>
            <Modal.Title className="modal-header-title">Add Provider</Modal.Title>
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
            <NewProviderButton walletAddress={walletAddress} name={name} setAddShow={handleAddShow}/>
          </Modal.Footer>
        </Modal>
        <Card className="card-providers">
          <Card.Body>
            {ProviderNames.map((data: any, index: number) =>
            <>
              <ListGroup key={index}>
                <ListGroup.Item className="list-group-providers">
                  <Col>
                    {data}
                    <RemoveProviderButton walletAddress={ProviderAddresses[index]}/>
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

export default Providers;
