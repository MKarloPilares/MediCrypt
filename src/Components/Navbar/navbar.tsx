import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import ConnectMetaMaskButton from "../Buttons/ConnectMetaMaskButton";
import { useNavigate } from "react-router-dom";
import logoSolo from '../Images/MEDICRYPT LOGO_SOLO.png';

const NavbarComponent = ({ethereumAccount, setEthereumAccount, setIsOwner, setIsMedicalProvider}) => {
  const navigate = useNavigate();

  return (
      <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
        <Navbar.Brand>
          <img
            alt=""
            src={logoSolo}
            width="55"
            height="35"
            className="d-inline-block align-top"
          />{' '}
          MediCrypt
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <NavDropdown title="Records" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate("Profile")}>Record Page</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("RecList")}>Records List </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {ethereumAccount === null ? (
          <ConnectMetaMaskButton setEthereumAccount={setEthereumAccount} setIsOwner={setIsOwner} setIsMedicalProvider={setIsMedicalProvider} className={"navbar"} />
        ) : (
          <h6>Logged in as: {ethereumAccount}</h6>
        )}
      </Navbar>
  );
};

export default NavbarComponent;
