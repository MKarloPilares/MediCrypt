import React from 'react';
import { Button } from 'react-bootstrap';
import './LogoutButton.css'; // Import the CSS file

//Type setting of inherited variables and functions
interface ConnectMetaMaskButtonProps {
  setUserWalletAddress: React.Dispatch<React.SetStateAction<string>>;
  setIsOwner: React.Dispatch<React.SetStateAction<boolean>>
  setIsMedicalProvider: React.Dispatch<React.SetStateAction<boolean>>;
}

//Button to connect to Metamask
const ConnectMetaMaskButton: React.FC<ConnectMetaMaskButtonProps> = ({ setUserWalletAddress, setIsOwner, setIsMedicalProvider}) => {

  const logOut = () => {
    setUserWalletAddress("")
    setIsOwner(false)
    setIsMedicalProvider(false)
    window.location.reload();
  }

  return (
    <Button
      onClick={logOut}
      variant="success"
      className='logOut-button'
    >
      Log Out
    </Button>
  );
};

export default ConnectMetaMaskButton;
