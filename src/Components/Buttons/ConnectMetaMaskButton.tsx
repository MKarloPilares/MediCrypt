import React from 'react';
import { ethers, Signer } from 'ethers';
import { Button } from 'react-bootstrap';
import MyAbi from './MyAbi.json';
import './ConnectMetaMaskButton.css'; // Import the CSS file

interface ConnectMetaMaskButtonProps {
  setUserWalletAddress: (a: string) => void;
  setIsOwner: (a: boolean) => void;
  setIsMedicalProvider: (a: boolean) => void;
  className: string;
}

const ConnectMetaMaskButton: React.FC<ConnectMetaMaskButtonProps> = ({ setUserWalletAddress, setIsOwner, setIsMedicalProvider, className }) => {

const connectMetamaskWallet = async () => {
  if (typeof (window as any).ethereum === 'undefined') {
    // Redirect to MetaMask Mobile app if MetaMask is not installed
    window.open('https://metamask.app.link/', '_blank');
    return;
  }

  try {
    // Request account connection
    const accounts: string[] = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    setUserWalletAddress(accounts[0]);

    const web3Provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = web3Provider.getSigner();

    // Only for mobile users, request an additional approval via signature
    if (isMobileDevice()) {
      await requestSignature(signer, accounts[0]);
    }

    // Proceed with your logic, checking contract owner, etc.
    checkContractOwner(web3Provider, accounts[0]);
    
  } catch (error) {
    alert(`Something went wrong: ${error.message}`);
  }
};

// Utility to detect if the user is on a mobile device
const isMobileDevice = () => {
  return /Mobi|Android/i.test(navigator.userAgent);
};

// Request the user to sign a message to confirm wallet connection
const requestSignature = async (signer: ethers.Signer, account: string) => {
  const message = `Please sign this message to connect your wallet and verify your address: ${account}`;
  try {
    const signature = await signer.signMessage(message);
    console.log('Signature:', signature);
    // You can now verify the signature if needed on your server-side
  } catch (err) {
    console.error('Signature request failed:', err);
  }
};

  const checkContractOwner = async (web3Provider: ethers.providers.Web3Provider, account: string) => {
    if (!web3Provider) {
      console.error('User is not connected to an Ethereum wallet.');
      return;
    }

    // Create a signer from the user's Ethereum account
    const signer: Signer = web3Provider.getSigner();

    const contractAddress = import.meta.env.VITE_REACT_APP_CONTRACT_ADDRESS;

    if (!contractAddress) {
      console.error('Contract address is not defined.');
      return;
    }

    // Connect to the contract using the ABI and address
    const contract = new ethers.Contract(contractAddress, MyAbi, signer);

    if (account === (await contract.owner()).toLowerCase()){
      setIsOwner(true);
    }

    if (await contract.isMedicalProvider(account)){
      setIsMedicalProvider(true);
    }
  };

  return (
    <Button
      onClick={connectMetamaskWallet}
      variant="success"
      className={className}
    >
      Connect Metamask
    </Button>
  );
};

export default ConnectMetaMaskButton;
