import { useState, useEffect } from 'react';
import { ListGroup, Modal, Form } from 'react-bootstrap';
import { Card, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';
import { ethers, Signer } from 'ethers';
import MyAbi from '../Buttons/MyAbi.json';
import NewProviderButton from '../Buttons/NewProviderButton';
import './Providers.css';
import RemoveProviderButton from '../Buttons/RemoveProvider';

const Providers = () => {
  const [AddShow, setAddShow] = useState(false);
  const [whiteListModalShow, setWhiteListModalShow] = useState(false);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [ProviderNames, setProviderNames] = useState<string[]>([]);
  const [ProviderAddresses, setProviderAddresses] = useState<string[]>([]);
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
        setIsProviderReady(true);
      }
    };
    initializeProvider();
  }, []);

  useEffect(() => {
    const getProviders = async () => {
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
        const names = await contract.listMedicalProviderNames();
        const addresses = await contract.listMedicalProviderAddresses();
        // Convert BigNumber IDs to plain number

        setProviderNames(names);
        setProviderAddresses(addresses)
      } catch (error) {
        console.error('Error minting NFT:', error);
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
      <Row className="row-records">
        <Col>
          <h3 className="h3-records">Providers</h3>
        </Col>
        <Col>
          <Button variant='success' className={"button-addProvider"} onClick={handleAddShow}>Add Provider</Button>
        </Col>
        <Card className="card-records">
          <Card.Body>
            {ProviderNames.map((data: any, index: number) =>
            <>
              <Modal show={AddShow} onHide={handleAddShow}>
                <Modal.Header closeButton>
                  <Modal.Title className="modal-header-title">Add Provider</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                  <Form.Label className="modal-body-form-label">Enter Wallet Address</Form.Label>
                    <Form.Control className="modal-body-form-control" placeholder='Wallet Address' onChange={(e) => setAddress(e.target.value)}></Form.Control>
                    <Form.Label className="modal-body-form-label">Enter Name of Address Owner</Form.Label>
                    <Form.Control className="modal-body-form-control" placeholder='Address Owner' onChange={(e) => setName(e.target.value)}></Form.Control>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <NewProviderButton address={address} providerName={name} setAddShow={handleAddShow}/>
                </Modal.Footer>
              </Modal>
              <Modal show={whiteListModalShow} onHide={handleWhiteListModalShow}>
                  <Modal.Header closeButton>
                    <Modal.Title className="modal-header-title">Whitelist</Modal.Title>
                  </Modal.Header>
                  {ProviderNames.map((data: any, index: number) =>
                  <Modal.Body key={index} className="modal-body-row">
                    <Col md='8' className="modal-body-col">{index+1}. {data}</Col>
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
                    <RemoveProviderButton address={ProviderAddresses[index]}/>
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

export default Providers;
