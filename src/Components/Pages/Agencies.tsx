import { useState, useEffect } from 'react';
import { ListGroup, Modal, Form } from 'react-bootstrap';
import { Card, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';
import { ethers, Signer } from 'ethers';
import MyAbi from '../Buttons/MyAbi.json';
import NewAgencyButton from '../Buttons/NewAgencyButton';
import RemoveAgencyButton from '../Buttons/RemoveAgency';
import './Agencies.css';

const Agencies = () => {
  const [AddShow, setAddShow] = useState(false);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [AgencyNames, setAgencyNames] = useState<string[]>([]);
  const [AgencyAddresses, setAgencyAddresses] = useState<string[]>([]);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [isProviderReady, setIsProviderReady] = useState(false); // Track provider readiness

  const handleAddShow = () => {
    setAddShow(!AddShow);
    console.log(AddShow);
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
        setAgencyNames(await contract.listAgencyNames());
        setAgencyAddresses(await contract.listAgencyAddresses());

      } catch (error) {
        console.error('Error Getting Agencies:', error);
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
          <h3 className="h3-records">Agencies</h3>
        </Col>
        <Col>
          <Button variant='success' className="button-addProvider" onClick={handleAddShow}>Add Agency</Button>
        </Col>
        <Modal show={AddShow} onHide={handleAddShow}>
          <Modal.Header closeButton>
            <Modal.Title className="modal-header-title">Add Agency</Modal.Title>
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
            <NewAgencyButton address={address} agencyName={name} setAddShow={handleAddShow}/>
          </Modal.Footer>
        </Modal>
        <Card className="card-records">
          <Card.Body>
            {AgencyNames.map((data: any, index: number) =>
            <>
              <ListGroup key={index}>
                <ListGroup.Item className="list-group-item">
                  <Col>
                    {data}
                    <RemoveAgencyButton address={AgencyAddresses[index]}/>
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

export default Agencies;
