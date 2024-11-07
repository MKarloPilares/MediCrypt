import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import ConnectMetaMaskButton from "../Buttons/ConnectMetaMaskButton";
import LogOutButton from "../Buttons/LogOutButton";
import { useNavigate } from "react-router-dom";
import logoSolo from '../Images/MEDICRYPT LOGO_SOLO.png';

interface NavBarProps {
  userWalletAddress: string;
  setUserWalletAddress: React.Dispatch<React.SetStateAction<string>>;
  setIsOwner: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMedicalProvider: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarComponent: React.FC<NavBarProps> = ({userWalletAddress, setUserWalletAddress, setIsOwner, setIsMedicalProvider}) => {
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
        {userWalletAddress === "" ? (
          <ConnectMetaMaskButton setUserWalletAddress={setUserWalletAddress} setIsOwner={setIsOwner} setIsMedicalProvider={setIsMedicalProvider} className={"navbar-button-connectToMetamask"} />
        ) : (
          <>
            <LogOutButton setUserWalletAddress={setUserWalletAddress} setIsOwner={setIsOwner} setIsMedicalProvider={setIsMedicalProvider}/>
            <h6> Logged in as: {userWalletAddress}</h6>
          </>
        )}
      </Navbar>
  );
};

export default NavbarComponent;
